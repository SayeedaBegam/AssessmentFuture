"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Network,
  List,
  MousePointer2,
} from "lucide-react";
import {
  knowledgeNodes as nodes,
  knowledgeEdges as edges,
} from "@/content/knowledge";
import { PageHeading } from "./shell";
export function KnowledgeMap() {
  const [selected, setSelected] = useState("responsible-use");
  const [list, setList] = useState(false);
  const kinds = [
    "Research",
    "Principle",
    "Approach",
    "Competency",
    "Implementation",
  ];
  const node = nodes.find((n) => n.id === selected)!;
  const related = edges.filter((e) => e.from === selected || e.to === selected);
  const neighbors = new Set([
    selected,
    ...related.flatMap((e) => [e.from, e.to]),
  ]);
  const position = (id: string) => {
    const n = nodes.find((n) => n.id === id)!;
    const col = kinds.indexOf(n.kind);
    const siblings = nodes.filter((x) => x.kind === n.kind);
    const row = siblings.findIndex((x) => x.id === id);
    return {
      x: col * 210 + 94,
      y: 85 + row * 135 + (siblings.length === 2 ? 65 : 0),
    };
  };
  return (
    <div className="section-wrap page-body map-page">
      <PageHeading
        eyebrow="RESEARCH TO PRACTICE KNOWLEDGE MAP"
        title="Ideas become more useful in connection."
        description="Trace contextual research through design principles, assessment approaches, and competencies. Select a node to see what each relationship means."
      />
      <p className="content-note">
        This curated map retains its original subset.{" "}
        <Link className="text-link" href="/evidence-map">
          Explore the full Competency Evidence Map with implementation pathways
          →
        </Link>
      </p>
      <div className="map-toolbar">
        <span>
          <MousePointer2 size={15} /> Select any node to follow its connections
        </span>
        <div className="segmented">
          <button
            className={!list ? "selected" : ""}
            onClick={() => setList(false)}
            aria-pressed={!list}
          >
            <Network size={16} /> Map
          </button>
          <button
            className={list ? "selected" : ""}
            onClick={() => setList(true)}
            aria-pressed={list}
          >
            <List size={16} /> List
          </button>
        </div>
      </div>
      <div className="knowledge-layout">
        <div
          className="knowledge-map-scroll"
          role="region"
          aria-label="Interactive knowledge relationships"
          tabIndex={0}
        >
          {!list ? (
            <div className="knowledge-canvas">
              <div className="map-columns">
                {kinds.map((k, i) => (
                  <span key={k}>
                    {String(i + 1).padStart(2, "0")} / {k}
                  </span>
                ))}
              </div>
              <svg viewBox="0 0 1050 455" aria-hidden="true">
                {edges.map((e, i) => {
                  const a = position(e.from),
                    b = position(e.to),
                    active = e.from === selected || e.to === selected;
                  return (
                    <path
                      key={i}
                      d={`M${a.x + 76},${a.y + 31} C${a.x + 140},${a.y + 31} ${b.x - 140},${b.y + 31} ${b.x - 76},${b.y + 31}`}
                      fill="none"
                      stroke={active ? "#8863be" : "var(--line)"}
                      strokeWidth={active ? 2 : 1}
                      opacity={active ? 1 : 0.6}
                    />
                  );
                })}
              </svg>
              {nodes.map((n) => {
                const p = position(n.id);
                return (
                  <button
                    key={n.id}
                    className={`map-node ${n.id === selected ? "selected" : ""} ${neighbors.has(n.id) ? "connected" : "dimmed"} kind-${kinds.indexOf(n.kind)}`}
                    style={{ left: p.x - 76, top: p.y }}
                    onClick={() => setSelected(n.id)}
                    aria-pressed={n.id === selected}
                  >
                    <small>{n.kind}</small>
                    <strong>{n.label}</strong>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="knowledge-list">
              {kinds.map((k) => (
                <section key={k}>
                  <h3>{k}</h3>
                  {nodes
                    .filter((n) => n.kind === k)
                    .map((n) => (
                      <button
                        key={n.id}
                        className={n.id === selected ? "selected" : ""}
                        onClick={() => setSelected(n.id)}
                        aria-pressed={n.id === selected}
                      >
                        {n.label}
                        <ArrowRight size={15} />
                      </button>
                    ))}
                </section>
              ))}
            </div>
          )}
        </div>
        <aside className="map-inspector" aria-live="polite">
          <span className="eyebrow">{node.kind}</span>
          <h2>{node.label}</h2>
          <p>{node.description}</p>
          <span className="eyebrow inspector-subtitle">
            {related.length} CONNECTIONS
          </span>
          <div className="map-connections">
            {related.map((e, i) => {
              const n = nodes.find(
                (n) => n.id === (e.from === selected ? e.to : e.from),
              )!;
              return (
                <button key={i} onClick={() => setSelected(n.id)}>
                  <span>
                    {e.from === selected ? "CONNECTS TO" : "CONNECTED FROM"}
                  </span>
                  <strong>
                    {n.label}
                    <ArrowUpRight size={15} />
                  </strong>
                  <small>{e.label}</small>
                </button>
              );
            })}
          </div>
          {node.href && (
            <Link className="text-link" href={node.href}>
              Open exploration <ArrowRight size={16} />
            </Link>
          )}
        </aside>
      </div>
      <div className="notice">
        <Network size={22} />
        <p>
          Every edge comes from structured content and has a labeled
          relationship. Proposed connections are editorial interpretations, not
          causal findings or validated learning pathways. The List view provides
          an accessible alternative.
        </p>
      </div>
    </div>
  );
}
