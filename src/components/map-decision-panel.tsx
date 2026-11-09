import Link from "next/link";
import { catalogue } from "@/content/catalogue";
import type { ImplementationPathway } from "@/lib/content-schema";
import {
  illustrativeCohortScenarios,
  researchConnectionLabel,
} from "@/lib/map-decision-support";
export function MapDecisionPanel({
  pathway: p,
  initialSection = "comparison",
}: {
  pathway: ImplementationPathway;
  initialSection?:
    "comparison" | "semester" | "research" | "feasibility" | "applications";
}) {
  const d = p.decisionSupport;
  const course = catalogue.courses.find((c) => c.id === p.courseId)!;
  const relatedChallenges = catalogue.assessmentChallenges.filter((c) =>
    c.implementationIds.includes(p.id),
  );
  return (
    <section
      className="map-decision-panel"
      aria-label="Lecturer decision support"
    >
      <div className="decision-panel-heading">
        <span className="eyebrow">
          Consider a design in your teaching context
        </span>
        <h2>{p.title}</h2>
        <p>{p.framework.summary}</p>
        <p className="content-note">
          General framework with three discipline applications. Timings,
          weighting and numeric workload below belong to the original{" "}
          {course.name} worked example and are illustrative.
        </p>
      </div>
      <p>
        <strong>Challenges to explore:</strong>{" "}
        {relatedChallenges.map((c) => c.title).join("; ")}.
      </p>
      <details
        className="decision-disclosure"
        open={initialSection === "comparison"}
      >
        <summary>Existing vs. proposed design</summary>
        <p>
          These descriptions are possible starting points, not an evaluation of
          a lecturer or a claim about current UTN practice.
        </p>
        <div className="decision-comparison">
          <section>
            <h3>Existing approach</h3>
            <dl>
              <dt>Typical assessment structure</dt>
              <dd>{d.existingStructure}</dd>
              <dt>Feedback opportunities already possible</dt>
              <dd>{d.existingFeedback}</dd>
              <dt>Evidence already available</dt>
              <dd>{d.existingEvidence}</dd>
            </dl>
            <div className="related-links">
              {p.assessmentIds.map((id) => {
                const a = catalogue.assessments.find((a) => a.id === id)!;
                return (
                  <Link key={id} href={`/explore/${a.slug}`}>
                    {a.name}
                    <span>Existing inventory approach ↗</span>
                  </Link>
                );
              })}
            </div>
          </section>
          <section>
            <h3>Proposed adaptation</h3>
            <dl>
              <dt>What changes</dt>
              <dd>{d.proposedChanges}</dd>
              <dt>Activities or checkpoints introduced</dt>
              <dd>{d.introducedCheckpoints}</dd>
              <dt>Additional competency evidence</dt>
              <dd>{d.additionalEvidence}</dd>
              <dt>Additional effort and constraints</dt>
              <dd>{d.additionalEffort}</dd>
            </dl>
          </section>
        </div>
      </details>
      <details
        className="decision-disclosure"
        open={initialSection === "semester"}
      >
        <summary>Semester implementation</summary>
        <p>
          Illustrative sequence for the {course.name} worked example. Adapt
          weeks, purposes and weights in the existing timeline before use.
        </p>
        <h3>Lecturer preparation</h3>
        <ol className="practice-list">
          {p.framework.lecturerSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p>
          Estimated preparation: {p.workload.preparation} hours for the stated
          example. Up to {p.workload.reusablePreparationHours} hours may be
          reusable after review. {p.workload.assumptions}
        </p>
        <ol className="practice-sequence">
          {p.activities.map((a) => (
            <li key={a.id}>
              <span className="eyebrow">
                Week {a.week} ·{" "}
                {a.purpose === "formative"
                  ? "Formative, ungraded"
                  : `Summative, illustrative ${a.weight}%`}
              </span>
              <h3>{a.title}</h3>
              <p>{a.instructions}</p>
              <p>
                <strong>Student evidence:</strong> {a.evidence}
              </p>
              <p>
                <strong>Feedback and revision opportunity:</strong> {a.feedback}
              </p>
            </li>
          ))}
        </ol>
        <h3>Individual competency evidence and verification</h3>
        <p>{p.individualEvidence}</p>
        <h3>Feedback and revision</h3>
        <p>
          {p.feedback.timing} {p.feedback.studentAction}{" "}
          {p.feedback.revisionRole}
        </p>
        <p>{p.formativeComponents}</p>
        <p>{p.summativeComponents}</p>
        <h3>Illustrative assessment criteria</h3>
        <ul className="practice-list">
          {p.rubric.map((r) => (
            <li key={r.id}>
              <strong>
                {r.criterion}: suggested {r.weight}%.
              </strong>{" "}
              Stronger evidence: {r.strongEvidence} Developing evidence:{" "}
              {r.developingEvidence}
            </li>
          ))}
        </ul>
        <Link
          className="button button-outline"
          href={`/continuous-assessment?implementation=${p.id}`}
        >
          Adapt this semester sequence →
        </Link>
      </details>
      <details
        className="decision-disclosure"
        open={initialSection === "research"}
      >
        <summary>Research and guidance</summary>
        <p>
          <strong>Our proposed adaptation:</strong>{" "}
          {p.framework.meaningfulDifference}
        </p>
        <p>
          Editorial review: {p.editorialReview.status}. Research verification of
          this design: {p.researchVerification.status.replaceAll("-", " ")}. A
          related publication does not validate this implementation.
        </p>
        {p.researchConnections.map((c) => {
          const r = catalogue.papers.find((r) => r.id === c.link.paperId)!;
          return (
            <article key={c.id} className="decision-source">
              <div className="tag-list">
                <span className="tag">{researchConnectionLabel(c)}</span>
                <span className="tag">{r.type}</span>
              </div>
              <h3>
                <Link href={`/research/${r.slug}`}>{r.title}</Link>
              </h3>
              <p>
                {r.authors} · {r.year} · {r.venue}
              </p>
              <a
                className="text-link"
                href={r.url}
                target="_blank"
                rel="noreferrer"
              >
                Original publication ↗
              </a>
              <dl>
                <dt>Relevant source insight</dt>
                <dd>
                  {r.verificationScope === "metadata-only"
                    ? "A verified findings summary is pending full paper review. The connection below is an editorial rationale, not a finding from an appraised study."
                    : `${r.digest.overview} ${r.digest.findings}`}
                </dd>
                <dt>Relationship to this innovation</dt>
                <dd>{c.link.relationship}</dd>
                <dt>Evidence limitations</dt>
                <dd>
                  {r.evidenceStrength} {r.digest.limitations}
                </dd>
                <dt>Source verification</dt>
                <dd>
                  {r.verificationScope.replaceAll("-", " ")}, checked{" "}
                  {r.verifiedOn}. {r.verificationNote}
                </dd>
                <dt>Connection verification and editorial status</dt>
                <dd>
                  {c.link.verificationStatus.replaceAll("-", " ")}.{" "}
                  {c.link.reviewNote} Publication editorial review:{" "}
                  {r.editorialReview.status}.
                </dd>
              </dl>
            </article>
          );
        })}
        <h3>Institutional guidance to consult</h3>
        <p>
          Guidance and provider information have different purposes from peer
          reviewed evidence. Access to a link does not establish approval.
        </p>
        {p.resourceIds.map((id) => {
          const r = catalogue.institutionalResources.find((r) => r.id === id)!;
          return (
            <article key={id} className="decision-source">
              <span className="tag">{r.sourceType}</span>
              <h4>
                <Link href={`/resources#${id}`}>{r.title}</Link>
              </h4>
              <p>
                {r.access}. Checked {r.checkedOn}. {r.verificationNote}
              </p>
              <a
                className="text-link"
                href={r.url}
                target="_blank"
                rel="noreferrer"
              >
                Open guidance source ↗
              </a>
            </article>
          );
        })}
      </details>
      <details
        className="decision-disclosure"
        open={initialSection === "feasibility"}
      >
        <summary>Feasibility, workload and access</summary>
        <h3>Preparation and additional effort</h3>
        <p>{d.additionalEffort}</p>
        <p>{p.feedback.workload}</p>
        <h3>Illustrative effort at different cohort sizes</h3>
        <p>
          The table uses the existing workload formula, the same average group
          size and unchanged per unit assumptions. These are planning scenarios,
          not measured institutional data or a claim of scalability.
        </p>
        <div
          className="data-table-scroll"
          role="region"
          aria-label="Illustrative cohort workload scenarios"
          tabIndex={0}
        >
          <table className="compact-table">
            <caption className="sr-only">
              Illustrative lecturer hours for different student cohorts
            </caption>
            <thead>
              <tr>
                <th scope="col">Students</th>
                <th scope="col">Preparation</th>
                <th scope="col">Grading</th>
                <th scope="col">Feedback</th>
                <th scope="col">Oral</th>
                <th scope="col">Total hours</th>
              </tr>
            </thead>
            <tbody>
              {illustrativeCohortScenarios(p).map((s) => (
                <tr key={s.students}>
                  <th scope="row">{s.students}</th>
                  <td>{s.preparation.toFixed(1)}</td>
                  <td>{s.grading.toFixed(1)}</td>
                  <td>{s.feedback.toFixed(1)}</td>
                  <td>{s.verification.toFixed(1)}</td>
                  <td>{s.total.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>{d.scalability}</p>
        <p>{p.workload.assumptions}</p>
        <p>
          Student workload: illustrative {p.workload.studentHours} hours per
          student for the stated scope. Moderation, scheduling, resits,
          accommodations and local operational costs need separate allowances.
        </p>
        <h3>Accessibility and fairness</h3>
        <ul className="practice-list">
          {[...p.accessibility, ...p.fairness].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <h3>Student AI use conditions</h3>
        <p>
          <strong>Permitted:</strong> {p.aiUse.permitted.join(" ")}
        </p>
        <p>
          <strong>Restricted:</strong> {p.aiUse.restricted.join(" ")}
        </p>
        <p>
          {p.aiUse.disclosure} {p.aiUse.equitableAlternative}
        </p>
        <h3>Data protection questions</h3>
        <ul className="practice-list">
          {d.dataProtectionQuestions.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <h3>Examination regulations and institutional review</h3>
        <p>
          <strong>
            ASPO review: {p.institutionalConsiderations.aspoReview}.
          </strong>{" "}
          {p.institutionalConsiderations.note}
        </p>
        <ul className="practice-list">
          {p.institutionalConsiderations.questions.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <h3>Limitations</h3>
        <ul className="practice-list">
          {p.limitations.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <nav
          className="decision-tool-links"
          aria-label="Decision support planning tools"
        >
          <Link
            className="button button-outline"
            href={`/workload?implementation=${p.id}`}
          >
            Edit workload assumptions →
          </Link>
          <Link
            className="button button-outline"
            href={`/continuous-assessment?implementation=${p.id}`}
          >
            Adapt semester timeline →
          </Link>
        </nav>
      </details>
      <details
        className="decision-disclosure"
        open={initialSection === "applications"}
      >
        <summary>Discipline applications</summary>
        <p>
          The same general framework has three additional illustrative
          applications. They share the framework, not an assumed identical
          workload or an institutional approval.
        </p>
        <div className="application-grid">
          {p.framework.applications.map((a) => (
            <article key={a.id} className="application-card">
              <span className="eyebrow">{a.discipline}</span>
              <h3>{a.title}</h3>
              <p>{a.outcome}</p>
              <ol className="practice-list">
                {a.activities.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <p>
                <strong>Student evidence:</strong> {a.observableEvidence}
              </p>
              <p>
                <strong>Feedback:</strong> {a.feedback}
              </p>
              <p>
                <strong>AI conditions:</strong> {a.aiConditions}
              </p>
              <p>
                <strong>Feasibility:</strong> {a.feasibility}
              </p>
              <Link
                className="text-link"
                href={`/implementations/${p.slug}#application-${a.id}`}
              >
                Read the discipline example →
              </Link>
            </article>
          ))}
        </div>
      </details>
      <Link className="text-link" href={`/implementations/${p.slug}`}>
        Open the full innovation framework and worked example →
      </Link>
    </section>
  );
}
