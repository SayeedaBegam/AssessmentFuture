import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  CircleHelp,
} from "lucide-react";
import {
  competencies,
  programmes,
  resourceTemplates,
} from "@/content/assessments";
import { papers } from "@/content/research";
import { catalogue } from "@/content/catalogue";
import type { AssessmentApproach } from "@/lib/types";
import { PageHeading } from "./shell";
import { Button } from "./ui/button";
import {
  classificationLabel,
  editorialReviewLabels,
  researchVerificationLabels,
} from "@/lib/content-labels";

export function AssessmentDetail({
  assessment: a,
}: {
  assessment: AssessmentApproach;
}) {
  const sections = [
    "Overview",
    "Competency evidence",
    "Existing strengths",
    "AI related considerations",
    "Possible adaptations",
    "Continuous assessment",
    "Practical implementation",
    "Research evidence",
    "Limitations & trade offs",
    "Across disciplines",
    "Resources",
  ];
  return (
    <div className="section-wrap page-body">
      <Link className="back-link" href="/explore">
        ← Assessment explorer
      </Link>
      <PageHeading
        eyebrow={a.family.toUpperCase()}
        title={a.name}
        description={a.description}
      >
        <div className="tag-list detail-tags">
          <span className="tag">{a.mode}</span>
          <span className="tag">{a.duration}</span>
          <span className="tag">
            {classificationLabel(a.catalogueClassification)}
          </span>
          <span className="tag">
            {editorialReviewLabels[a.editorialReview.status]}
          </span>
          <span className="tag">
            {researchVerificationLabels[a.researchVerification.status]}
          </span>
        </div>
      </PageHeading>
      <section
        className="detail-section"
        aria-label="Related implementation examples"
      >
        <h2>Try this approach in context</h2>
        <p>
          Proposed teaching examples connect this approach with activities,
          individual evidence and research. They are not claims about current
          course practice.
        </p>
        <div className="related-links">
          {catalogue.implementations
            .filter((p) => p.assessmentIds.includes(a.id))
            .map((p) => (
              <Link key={p.id} href={`/implementations/${p.slug}`}>
                {p.title}
                <span>Proposed implementation ↗</span>
              </Link>
            ))}
        </div>
        {!catalogue.implementations.some((p) =>
          p.assessmentIds.includes(a.id),
        ) && (
          <Link className="text-link" href="/implementations">
            Browse the eight implementation examples →
          </Link>
        )}
        {catalogue.implementations.some((p) =>
          p.assessmentIds.includes(a.id),
        ) && (
          <>
            <h3>Research connected through these examples</h3>
            <p>
              These sources inform the proposed adaptations. They do not
              directly validate this approach.
            </p>
            <div className="related-links">
              {[
                ...new Set(
                  catalogue.implementations
                    .filter((p) => p.assessmentIds.includes(a.id))
                    .flatMap((p) =>
                      p.researchConnections.map((c) => c.link.paperId),
                    ),
                ),
              ].map((id) => {
                const r = papers.find((r) => r.id === id)!;
                return (
                  <Link key={id} href={`/research/${r.slug}`}>
                    {r.title}
                    <span>
                      {r.verificationScope.replaceAll("-", " ")} · Proposed
                      interpretation
                    </span>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </section>
      <div className="detail-layout">
        <aside className="detail-nav">
          <span className="eyebrow">IN THIS EXPLORATION</span>
          {sections.map((s, i) => (
            <a href={`#section-${i}`} key={s}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {s}
            </a>
          ))}
          <Button asChild variant="outline">
            <Link href={`/compare?ids=${a.id}`}>
              Add to comparison <ArrowRight size={14} />
            </Link>
          </Button>
        </aside>
        <article className="detail-article">
          <section id="section-0" className="detail-section">
            <span className="eyebrow">01 / OVERVIEW</span>
            <h2>How this format works.</h2>
            <p>{a.classificationNote}</p>
            <p>
              {a.description} The ideas below are options to consider alongside
              the learning goals you have set for your course.
            </p>
            <div className="notice">
              <CircleHelp size={20} />
              <p>
                These are general examples, rather than descriptions of a
                particular course or lecturer. Check the stated support and
                limitations of each adaptation before applying it to your
                course.
              </p>
            </div>
          </section>
          <section id="section-1" className="detail-section">
            <span className="eyebrow">02 / COMPETENCY EVIDENCE</span>
            <h2>What could students demonstrate?</h2>
            <p>{a.evidence}</p>
            <div className="competency-list">
              {a.competencyIds.map((id) => {
                const c = competencies.find((c) => c.id === id)!;
                return (
                  <div key={id}>
                    <Check size={16} />
                    <div>
                      <strong>{c.name}</strong>
                      <p>{c.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section id="section-2" className="detail-section">
            <span className="eyebrow">03 / EXISTING STRENGTHS</span>
            <h2>Build on what the format offers.</h2>
            <p>
              {a.strengths} How well this works will depend on the task, the
              students, and the support available. These are reasons to consider
              the format, rather than proven results for your course.
            </p>
          </section>
          <section id="section-3" className="detail-section">
            <span className="eyebrow">04 / AI RELATED CONSIDERATIONS</span>
            <h2>Where might AI help, and what would you need to check?</h2>
            <p>{a.aiConsiderations}</p>
            <p>
              Be clear about which tools students may use and whether everyone
              can access them. Think about what the finished work tells you and
              what a student might still need to explain in their own words.
            </p>
            <Link href="/ai-integration" className="text-link">
              Explore the AI integration spectrum <ArrowRight size={16} />
            </Link>
          </section>
          <section id="section-4" className="detail-section">
            <span className="eyebrow">05 / POSSIBLE ADAPTATIONS</span>
            <h2>A few changes you could try.</h2>
            <div className="adaptation-grid">
              {a.adaptations.map((x, i) => (
                <div className="soft-card" key={x.id}>
                  <span className="eyebrow">
                    OPTION {i + 1} ·{" "}
                    {x.validated
                      ? "CONTEXT SPECIFIC SOURCE SUPPORT"
                      : "UNVALIDATED PROPOSAL"}
                  </span>
                  <h3>{x.title}</h3>
                  <p>{x.description}</p>
                  {x.validated && (
                    <>
                      <p>{x.validationNote}</p>
                      {x.validationEvidence?.map((link) => {
                        const source = papers.find(
                          (p) => p.id === link.paperId,
                        )!;
                        return (
                          <Link
                            key={link.id}
                            className="text-link"
                            href={`/research/${source.slug}`}
                          >
                            {source.title} <ArrowUpRight size={14} />
                          </Link>
                        );
                      })}
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section id="section-5" className="detail-section">
            <span className="eyebrow">06 / CONTINUOUS ASSESSMENT</span>
            <h2>Give students time to use the feedback.</h2>
            <p>
              You could begin with a question or an outline, give feedback on a
              draft, and ask students to explain what they changed in the final
              submission. The draft does not need a grade. Its purpose can be to
              help students improve while there is still time.
            </p>
            <Link className="text-link" href="/continuous-assessment">
              Explore a semester pathway <ArrowRight size={16} />
            </Link>
          </section>
          <section id="section-6" className="detail-section">
            <span className="eyebrow">07 / PRACTICAL IMPLEMENTATION</span>
            <h2>What would you need to put this into practice?</h2>
            <dl className="practical-table">
              {[
                [
                  "Preparation",
                  a.workload +
                    ". Agree criteria, scope, and examples before release.",
                ],
                ["Student effort", a.studentEffort],
                ["Resources", a.resources],
                ["Feedback", a.feedback],
                ["Individual accountability", a.accountability],
                ["Accessibility & fairness", a.accessibility],
                ["Scalability", a.scalability],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <Link href="/workload" className="text-link">
              Explore workload assumptions <ArrowRight size={16} />
            </Link>
          </section>
          <section id="section-7" className="detail-section">
            <span className="eyebrow">08 / RESEARCH EVIDENCE</span>
            <h2>Trace the connection.</h2>
            <p>
              Read each source relationship for what it supports and what
              remains uncertain. A source link does not by itself validate an
              assessment design.
            </p>
            <p>
              <strong>
                {researchVerificationLabels[a.researchVerification.status]}.
              </strong>{" "}
              {a.researchVerification.note}
            </p>
            {a.evidenceLinks.map((e) => {
              const p = papers.find((p) => p.id === e.paperId)!;
              return (
                <Link
                  className="evidence-source"
                  key={e.id}
                  href={`/research/${p.slug}`}
                >
                  <span className="status-tag">
                    {p.type} · {p.year}
                  </span>
                  <h3>
                    {p.title}
                    <ArrowUpRight size={18} />
                  </h3>
                  <p>{e.relationship}</p>
                  <small>{p.verification}</small>
                </Link>
              );
            })}
          </section>
          <section id="section-8" className="detail-section">
            <span className="eyebrow">09 / LIMITATIONS & TRADE OFFS</span>
            <h2>What still needs careful thought?</h2>
            <p>
              {a.scalability} The finished work may not tell you everything
              about a student’s understanding. Asking for more documentation
              also takes time for students to prepare and for you to read. If
              you try an adaptation, start with a manageable task and ask
              students how they found it.
            </p>
            <p>
              Before using an adaptation, check the relevant examination rules,
              including ASPO requirements, with your institution. This site
              cannot confirm whether a design meets those rules.
            </p>
          </section>
          <section id="section-9" className="detail-section">
            <span className="eyebrow">10 / ACROSS DISCIPLINES</span>
            <h2>A format, more than one perspective.</h2>
            <div className="adaptation-grid">
              {programmes.map((p) => (
                <div className="soft-card" key={p.id}>
                  <span className="eyebrow">HYPOTHETICAL TRANSFER EXAMPLE</span>
                  <h3>{p.name}</h3>
                  <p>
                    {p.id === "ai-robotics"
                      ? `For ${a.name.toLowerCase()}, explore how students could explain a technical decision using reproducible evidence.`
                      : `For ${a.name.toLowerCase()}, explore how students could examine a human AI scenario and justify choices using stakeholder perspectives.`}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section id="section-10" className="detail-section">
            <span className="eyebrow">11 / RESOURCES</span>
            <h2>A few things to make your own.</h2>
            <p>
              Editable starting points, not institution approved rubrics or
              regulations.
            </p>
            <div className="resource-list">
              {resourceTemplates.map((r) => (
                <a
                  download={`${r.id}.txt`}
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(r.content)}`}
                  key={r.id}
                >
                  <span>
                    <strong>{r.name}</strong>
                    <small>{r.status} · TXT</small>
                  </span>
                  <Download size={18} />
                </a>
              ))}
            </div>
            <Button asChild>
              <Link href={`/playground?format=${a.id}`}>
                Take this into the playground <ArrowRight size={16} />
              </Link>
            </Button>
          </section>
        </article>
      </div>
    </div>
  );
}
