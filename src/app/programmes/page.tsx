import Link from "next/link";
import { ArrowRight, Bot, Fingerprint } from "lucide-react";
import { PageHeading } from "@/components/shell";
import { programmes, competencies } from "@/content/assessments";
export const metadata = { title: "Programme contexts" };
export default function Page() {
  return (
    <div className="section-wrap page-body">
      <PageHeading
        eyebrow="PROGRAMME CONTEXTS"
        title="Rooted in a context. Open to others."
        description="Our starting perspectives connect technical and human centered inquiry. Explore how the same assessment format can invite different kinds of competency evidence."
      />
      <div className="notice">
        These competency areas are provisional examples, not verified official
        programme learning outcomes. All pathways are hypothetical; no
        individual course is evaluated.
      </div>
      <div className="programme-grid">
        {programmes.map((p, i) => (
          <article className={`programme-card programme-${i}`} key={p.id}>
            {i === 0 ? <Bot size={40} /> : <Fingerprint size={40} />}
            <span className="eyebrow">
              PROGRAMME PERSPECTIVE {String(i + 1).padStart(2, "0")}
            </span>
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <div className="tag-list">
              {p.competencyIds.map((id) => (
                <span className="tag" key={id}>
                  {competencies.find((c) => c.id === id)?.name}
                </span>
              ))}
            </div>
            <div className="programme-example">
              <span className="eyebrow">A POSSIBLE PATHWAY</span>
              <p>{p.example}</p>
            </div>
            <Link href="/explore" className="text-link">
              Explore adaptable approaches <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </div>
      <section className="detail-section">
        <h2>Transfer the questions, then adapt the format.</h2>
        <p>
          Across disciplines, ask what the student should demonstrate, which
          evidence would make it visible, and what conditions make the
          interpretation fair. The same portfolio, presentation, or project can
          serve different purposes when these questions change.
        </p>
        <Link href="/playground" className="button button-primary">
          Explore your own context <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
