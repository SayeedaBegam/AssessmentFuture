"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Fingerprint,
  Workflow,
  Microscope,
  ScanLine,
} from "lucide-react";
const nodes = [
  {
    x: 263,
    y: 88,
    icon: Microscope,
    label: "RESEARCH",
    title: "Start with the evidence",
    text: "Read the source. Understand its context and limits.",
    href: "/research",
  },
  {
    x: 402,
    y: 200,
    icon: Workflow,
    label: "APPROACHES",
    title: "Explore the possibilities",
    text: "Compare assessment formats and consider their practical trade offs.",
    href: "/explore",
  },
  {
    x: 346,
    y: 360,
    icon: Fingerprint,
    label: "COMPETENCIES",
    title: "Make learning visible",
    text: "Consider what students can demonstrate in your context.",
    href: "/programmes",
  },
  {
    x: 145,
    y: 349,
    icon: ScanLine,
    label: "YOUR CONTEXT",
    title: "Adapt with intention",
    text: "Explore workload, resources, and your teaching priorities.",
    href: "/playground",
  },
  {
    x: 100,
    y: 190,
    icon: Sparkles,
    label: "POSSIBILITIES",
    title: "Connect ideas to practice",
    text: "Follow relationships in the research to practice map.",
    href: "/knowledge-map",
  },
];
export function Network() {
  const [selected, setSelected] = useState(0);
  const node = nodes[selected];
  return (
    <div className="network-panel">
      <div className="network-top">
        <span>
          <span className="status-dot" /> IDEAS IN CONNECTION
        </span>
        <span>01, 05</span>
      </div>
      <div className="network-canvas">
        <svg viewBox="0 0 500 440" aria-hidden="true">
          <defs>
            <radialGradient id="networkGlow">
              <stop offset="0%" stopColor="#b8a6ff" stopOpacity=".38" />
              <stop offset="100%" stopColor="#b8a6ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="250" cy="235" r="205" fill="url(#networkGlow)" />
          <g className="orbit-lines">
            <ellipse
              cx="250"
              cy="225"
              rx="188"
              ry="145"
              transform="rotate(-32 250 225)"
            />
            <ellipse
              cx="250"
              cy="225"
              rx="188"
              ry="145"
              transform="rotate(32 250 225)"
            />
            <circle cx="250" cy="225" r="174" />
            <ellipse
              cx="250"
              cy="225"
              rx="90"
              ry="193"
              transform="rotate(-32 250 225)"
            />
          </g>
          {nodes.map((n, i) => (
            <g key={n.label}>
              <line
                x1="250"
                y1="225"
                x2={n.x}
                y2={n.y}
                stroke={i === selected ? "#8260cf" : "#c6badf"}
                strokeDasharray="3 5"
              />
              {i < 4 && (
                <line
                  x1={n.x}
                  y1={n.y}
                  x2={nodes[i + 1].x}
                  y2={nodes[i + 1].y}
                  stroke="#d1c7e4"
                />
              )}
            </g>
          ))}
          <circle cx="440" cy="121" r="4" fill="#9a83c0" />
          <circle cx="61" cy="297" r="3" fill="#9a83c0" />
          <circle cx="259" cy="407" r="3" fill="#9a83c0" />
        </svg>
        <div className="network-center">
          <span className="center-symbol">
            <i />
            <i />
            <i />
          </span>
          <strong>
            Assessment
            <br />
            futures<span>.</span>
          </strong>
        </div>
        {nodes.map((n, i) => {
          const Icon = n.icon;
          return (
            <button
              key={n.label}
              className={`network-node node-${i} ${selected === i ? "selected" : ""}`}
              style={{ left: `${n.x / 5}%`, top: `${n.y / 4.4}%` }}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              aria-label={n.title}
            >
              <span>
                <Icon size={21} />
              </span>
              <small>{n.label}</small>
            </button>
          );
        })}
      </div>
      <Link href={node.href} className="network-caption">
        <div>
          <strong>{node.title}</strong>
          <span>{node.text}</span>
        </div>
        <ArrowUpRight size={20} />
      </Link>
      <span className="network-hint">Select a node. Follow a possibility.</span>
    </div>
  );
}
