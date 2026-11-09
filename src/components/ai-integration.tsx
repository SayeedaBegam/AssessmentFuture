"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Fingerprint, ArrowUpRight, Compass } from "lucide-react";
import { aiSpectrum } from "@/lib/logic";
import { PageHeading } from "./shell";
export function AIIntegration({ initialAi }: { initialAi?: string }) {
  const initialIndex = aiSpectrum.findIndex((a) => a.id === initialAi);
  const [index, setIndex] = useState(initialIndex >= 0 ? initialIndex : 2);
  const current = aiSpectrum[index];
  return (
    <div className="section-wrap page-body">
      <PageHeading
        eyebrow="AI INTEGRATION SPECTRUM"
        title="Different roles. Deliberate choices."
        description="The role of AI depends on the learning objectives, the evidence you need, and your institutional context. Explore six illustrative possibilities."
      />
      <div className="notice">
        <Compass size={22} />
        <p>
          This is an exploration, not a universal AI policy or a progression
          toward a preferred endpoint. More AI is not inherently better.
        </p>
      </div>
      <div
        className="spectrum-selector"
        aria-label="AI integration possibilities"
      >
        {aiSpectrum.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            className={i === index ? "selected" : ""}
            aria-pressed={i === index}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <i
              style={{ background: `hsl(${260 - i * 17} 26% ${62 + i * 2}%)` }}
            />
            <strong>{s.name}</strong>
            <small>{s.label}</small>
          </button>
        ))}
      </div>
      <div className="spectrum-detail" aria-live="polite">
        <div className="spectrum-detail-heading">
          <Fingerprint size={42} />
          <span className="eyebrow">
            POSSIBILITY {String(index + 1).padStart(2, "0")}
          </span>
          <h2>{current.name}</h2>
          <p>{current.description}</p>
        </div>
        <div className="spectrum-considerations">
          <section>
            <span className="eyebrow">AN ILLUSTRATIVE APPLICATION</span>
            <h3>Bring it into context.</h3>
            <p>{current.example}</p>
          </section>
          <section>
            <span className="eyebrow">A QUESTION TO EXPLORE</span>
            <h3>Make the conditions explicit.</h3>
            <p>{current.question}</p>
          </section>
          <Link href={`/playground?ai=${current.id}`} className="text-link">
            Explore a design with this in mind <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <div className="three-columns">
        {[
          [
            "Learning objectives",
            "Which decisions, knowledge, and skills should students be able to demonstrate?",
          ],
          [
            "Fair & accessible conditions",
            "Can students participate equitably, and are tool, language, and disability related accommodations clear?",
          ],
          [
            "Institutional context",
            "Verify approved tools, data protection, and examination regulations before implementation.",
          ],
        ].map(([t, d]) => (
          <section className="soft-card" key={t}>
            <h3>{t}</h3>
            <p>{d}</p>
          </section>
        ))}
      </div>
      <Link className="evidence-source" href="/research/guidance-generative-ai">
        <span className="eyebrow">CONTEXTUAL READING · UNESCO, 2023</span>
        <h3>
          Guidance for generative AI in education and research{" "}
          <ArrowUpRight size={18} />
        </h3>
        <p>
          The spectrum above is our editorial framework. It is not a validated
          scale from this guidance.
        </p>
      </Link>
    </div>
  );
}
