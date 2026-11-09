import Link from "next/link";
import { catalogue } from "@/content/catalogue";
import type { ImplementationPathway } from "@/lib/content-schema";
import {
  classificationLabel,
  editorialReviewLabels,
  researchVerificationLabels,
} from "@/lib/content-labels";
import { calculateWorkload } from "@/lib/logic";
import { implementationToolLinks } from "@/lib/implementation-tools";
import { PageHeading } from "./shell";
function TextList({ items }: { items: string[] }) {
  return (
    <ul className="practice-list">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
export function ImplementationDetail({
  pathway: p,
}: {
  pathway: ImplementationPathway;
}) {
  const w = calculateWorkload({ ...p.workload, name: p.title });
  const course = catalogue.courses.find((c) => c.id === p.courseId)!;
  return (
    <div className="section-wrap page-body practice-page">
      <Link className="back-link" href="/implementations">
        ← New Ideas &amp; Innovations
      </Link>
      <PageHeading
        eyebrow="NEW IDEAS & INNOVATIONS · PROPOSED FRAMEWORK"
        title={p.title}
        description={p.framework.summary}
      >
        <div className="tag-list">
          <span className="tag">
            {classificationLabel(p.catalogueClassification)}
          </span>
          <span className="tag">
            {editorialReviewLabels[p.editorialReview.status]}
          </span>
          <span className="tag">
            {researchVerificationLabels[p.researchVerification.status]}
          </span>
        </div>
      </PageHeading>
      <p className="notice">
        An illustrative design for discussion with lecturers. Empirical
        effectiveness at UTN is not established. Rubrics, weights and times are
        suggestions. ASPO review: {p.institutionalConsiderations.aspoReview}.
      </p>
      <nav className="practice-toc" aria-label="Innovation guide sections">
        <a href="#framework">Framework overview</a>
        <a href="#lecturer-guide">Lecturer guide</a>
        <a href="#discipline-applications">Discipline applications</a>
        <a href="#worked-example">Detailed worked example</a>
        <a href="#practice-8">Research foundation</a>
        <a href="#practice-10">Adapt &amp; Plan</a>
      </nav>
      <section className="framework-overview" id="framework">
        <div>
          <span className="eyebrow">What is meaningfully different?</span>
          <h2>The design idea</h2>
          <p>{p.framework.meaningfulDifference}</p>
          <Link
            className="text-link"
            href={`/evidence-map?focus=innovation:${p.id}`}
          >
            Trace the research foundation in the map →
          </Link>
        </div>
        <div>
          <span className="eyebrow">Builds on existing approaches</span>
          <h2>Start with familiar practice</h2>
          <div className="related-links">
            {p.assessmentIds.map((id) => {
              const a = catalogue.assessments.find((a) => a.id === id)!;
              return (
                <Link key={id} href={`/explore/${a.slug}`}>
                  {a.name}
                  <span>View inventory approach ↗</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="detail-section" id="lecturer-guide">
        <span className="eyebrow">General implementation framework</span>
        <h2>A practical sequence for lecturers</h2>
        <ol className="lecturer-steps">
          {p.framework.lecturerSteps.map((s, i) => (
            <li key={s}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="detail-section" id="discipline-applications">
        <span className="eyebrow">Across technical disciplines</span>
        <h2>One framework, several applications</h2>
        <p>
          These examples are editorial proposals, not descriptions of current
          courses. Their outcomes, conditions and feasibility need review in
          your context.
        </p>
        <div className="application-grid">
          {p.framework.applications.map((a) => (
            <article
              className="application-card"
              key={a.id}
              id={`application-${a.id}`}
            >
              <span className="eyebrow">{a.discipline}</span>
              <h3>{a.title}</h3>
              <p>
                <strong>Intended outcome:</strong> {a.outcome}
              </p>
              <h4>Student activities</h4>
              <ol className="practice-list">
                {a.activities.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <dl>
                <dt>Observable student evidence</dt>
                <dd>{a.observableEvidence}</dd>
                <dt>Feedback opportunity</dt>
                <dd>{a.feedback}</dd>
                <dt>AI conditions</dt>
                <dd>{a.aiConditions}</dd>
                <dt>Feasibility</dt>
                <dd>{a.feasibility}</dd>
              </dl>
              <Link
                className="text-link"
                href={`/evidence-map?focus=implementation-application:${a.id}`}
              >
                Explore this application in the map →
              </Link>
            </article>
          ))}
        </div>
      </section>
      <div className="worked-example-heading" id="worked-example">
        <span className="eyebrow">Detailed worked example · {course.name}</span>
        <h2>See the framework in a teaching context</h2>
        <p>
          The worked example below preserves its original student brief,
          materials and editable planning assumptions. The framework can be
          adapted to the other disciplines above.
        </p>
      </div>
      <nav className="practice-toc" aria-label="Implementation sections">
        {[
          "Context",
          "Student brief",
          "Sequence",
          "Feedback",
          "Evidence and rubric",
          "AI conditions",
          "Workload",
          "Access and fairness",
          "Research",
          "Institutional review",
          "Tools",
        ].map((s, i) => (
          <a key={s} href={`#practice-${i}`}>
            {s}
          </a>
        ))}
      </nav>
      <article>
        <section className="detail-section" id="practice-0">
          <h2>Context and intended learning</h2>
          <p>{p.context}</p>
          <TextList
            items={p.learningOutcomeIds.map(
              (id) =>
                catalogue.learningOutcomes.find((o) => o.id === id)!
                  .description,
            )}
          />
          <h3>Competencies</h3>
          <TextList
            items={p.competencyIds.map(
              (id) => catalogue.competencies.find((c) => c.id === id)!.name,
            )}
          />
          <p>{p.classificationNote}</p>
          <h3>Suitable teaching situations</h3>
          <TextList items={p.suitableSituations} />
          <h3>Established approaches used here</h3>
          <div className="related-links">
            {p.assessmentIds.map((id) => {
              const a = catalogue.assessments.find((a) => a.id === id)!;
              return (
                <Link key={id} href={`/explore/${a.slug}`}>
                  {a.name}
                  <span>Explore approach ↗</span>
                </Link>
              );
            })}
          </div>
        </section>
        <section className="detail-section" id="practice-1">
          <h2>Illustrative student brief</h2>
          <ol className="practice-list">
            {p.studentInstructions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <h3>Fictional teaching material</h3>
          <p>
            Original illustrative prompts, not actual course records, student
            work or research findings. Check and adapt the material before
            teaching.
          </p>
          {p.teachingMaterials.map((m) => (
            <article className="evidence-note" key={m.title}>
              <h4>{m.title}</h4>
              <p>{m.content}</p>
              <details>
                <summary>Lecturer review notes</summary>
                <p>{m.lecturerNote}</p>
              </details>
            </article>
          ))}
        </section>
        <section className="detail-section" id="practice-2">
          <h2>Activity sequence and semester timeline</h2>
          <ol className="practice-sequence">
            {p.activities.map((a) => (
              <li key={a.id}>
                <span className="eyebrow">
                  WEEK {a.week} ·{" "}
                  {a.purpose === "formative"
                    ? "FORMATIVE, UNGRADED"
                    : `SUMMATIVE, ${a.weight}%`}
                </span>
                <h3>{a.title}</h3>
                <p>{a.instructions}</p>
                <p>
                  <strong>Student evidence:</strong> {a.evidence}
                </p>
                <p>
                  <strong>Feedback opportunity:</strong> {a.feedback}
                </p>
              </li>
            ))}
          </ol>
          <h3>Formative components</h3>
          <p>{p.formativeComponents}</p>
          <h3>Summative components</h3>
          <p>{p.summativeComponents}</p>
        </section>
        <section className="detail-section" id="practice-3">
          <h2>Feedback opportunities</h2>
          <p>
            Adapt these suggestions to the feedback practices already used in
            your course.
          </p>
          <h3>Existing opportunities to build on</h3>
          <TextList items={p.feedback.existingOpportunities} />
          <h3>Possible adaptations</h3>
          <TextList items={p.feedback.possibleAdaptations} />
          <dl className="practice-definitions">
            {Object.entries({
              Timing: p.feedback.timing,
              Sources: p.feedback.sources,
              "What students do": p.feedback.studentAction,
              "Role of revision": p.feedback.revisionRole,
              "Workload implications": p.feedback.workload,
            }).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="detail-section" id="practice-4">
          <h2>Individual evidence and illustrative rubric</h2>
          <p>{p.individualEvidence}</p>
          <p>
            These criteria and weights are examples for discussion, not an
            approved marking scheme.
          </p>
          <p className="content-note">
            On smaller screens, scroll the rubric sideways to read all columns.
            The table can also receive keyboard focus.
          </p>
          <div
            className="practice-table"
            role="region"
            aria-label="Illustrative rubric"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">Criterion</th>
                  <th scope="col">Suggested weight</th>
                  <th scope="col">Stronger evidence</th>
                  <th scope="col">Developing evidence</th>
                </tr>
              </thead>
              <tbody>
                {p.rubric.map((r) => (
                  <tr key={r.id}>
                    <th scope="row">{r.criterion}</th>
                    <td>{r.weight}%</td>
                    <td>{r.strongEvidence}</td>
                    <td>{r.developingEvidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="detail-section" id="practice-5">
          <h2>AI use conditions</h2>
          <h3>Permitted</h3>
          <TextList items={p.aiUse.permitted} />
          <h3>Restricted</h3>
          <TextList items={p.aiUse.restricted} />
          <p>
            <strong>Disclosure:</strong> {p.aiUse.disclosure}
          </p>
          <p>
            <strong>Equitable alternative:</strong>{" "}
            {p.aiUse.equitableAlternative}
          </p>
        </section>
        <section className="detail-section" id="practice-6">
          <h2>Illustrative workload and feasibility</h2>
          <p>
            Assumptions for {p.workload.students} students, not measured
            institutional workload. Open the calculator below to edit cohort
            size and timings.
          </p>
          <dl className="practice-definitions">
            {Object.entries({
              Preparation: `${w.preparation.toFixed(1)} hours`,
              Feedback: `${w.feedback.toFixed(1)} hours`,
              "Assessment and grading": `${w.grading.toFixed(1)} hours`,
              "Individual oral discussion": `${w.verification.toFixed(1)} hours`,
              "Total modelled lecturer time": `${w.total.toFixed(1)} hours`,
              "Student effort": `${p.workload.studentHours} hours per student for the stated scope`,
              "Reusable preparation": `Up to ${p.workload.reusablePreparationHours} hours may be reusable after review`,
            }).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p>{p.workload.assumptions}</p>
        </section>
        <section className="detail-section" id="practice-7">
          <h2>Accessibility, fairness and limits</h2>
          <h3>Accessibility</h3>
          <TextList items={p.accessibility} />
          <h3>Fairness</h3>
          <TextList items={p.fairness} />
          <h3>Limitations and possible failure modes</h3>
          <TextList items={p.limitations} />
        </section>
        <section className="detail-section" id="practice-8">
          <h2>Research and evidence status</h2>
          <p>
            <strong>Editorial review:</strong> {p.editorialReview.status}.{" "}
            {p.editorialReview.note}
          </p>
          <p>
            <strong>Research verification:</strong>{" "}
            {p.researchVerification.status.replaceAll("-", " ")}.{" "}
            {p.researchVerification.note}
          </p>
          {p.researchConnections.map((c) => {
            const paper = catalogue.papers.find(
              (r) => r.id === c.link.paperId,
            )!;
            return (
              <article className="evidence-note" key={c.id}>
                <h3>
                  <Link href={`/research/${paper.slug}`}>{paper.title}</Link>
                </h3>
                <p>
                  <strong>{c.relation.replaceAll("-", " ")}</strong>:{" "}
                  {c.link.relationship}
                </p>
                <p>
                  Source scope: {paper.verificationScope.replaceAll("-", " ")}.{" "}
                  {paper.verificationNote}
                </p>
                <p>{c.link.reviewNote}</p>
              </article>
            );
          })}
        </section>
        <section className="detail-section" id="practice-9">
          <h2>Institutional considerations</h2>
          <p>
            <strong>
              ASPO review: {p.institutionalConsiderations.aspoReview}.
            </strong>{" "}
            {p.institutionalConsiderations.note}
          </p>
          <TextList items={p.institutionalConsiderations.questions} />
          <div className="related-links">
            {p.resourceIds.map((id) => {
              const r = catalogue.institutionalResources.find(
                (r) => r.id === id,
              )!;
              return (
                <Link key={id} href={`/resources#${id}`}>
                  {r.title}
                  <span>{r.access}</span>
                </Link>
              );
            })}
          </div>
        </section>
        <section className="detail-section" id="practice-10">
          <h2>Continue in the existing tools</h2>
          <p>
            Comparison and playground links carry the related approaches and AI
            condition. The workload and timeline links load the editable
            assumptions for this example.
          </p>
          <nav className="related-links" aria-label="Implementation tools">
            {implementationToolLinks(p, catalogue).map((l) => (
              <Link key={l.label} href={l.href}>
                {l.label}
                <span>Open tool ↗</span>
              </Link>
            ))}
          </nav>
        </section>
      </article>
    </div>
  );
}
