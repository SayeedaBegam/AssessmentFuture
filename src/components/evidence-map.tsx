"use client";
import { useState } from "react";
import Link from "next/link";
import {
  catalogue,
  competencyEvidenceGraph as graph,
} from "@/content/catalogue";
import {
  filterEvidenceGraph,
  innovationPathwayView,
  implementationToolLinks,
} from "@/lib/implementation-tools";
import { graphReferenceKey } from "@/lib/content-validation";
import type { EvidenceGraphNode } from "@/lib/competency-evidence-graph";
import { PageHeading } from "./shell";
import { MapDecisionPanel } from "./map-decision-panel";
const relationLabels: Record<string, string> = {
  "course-has-outcome": "Course has intended outcome",
  "outcome-targets-competency": "Targets competency",
  "targets-competency": "Targets competency",
  "assesses-competency": "Assesses competency",
  "elicits-evidence": "Elicits student evidence",
  "produces-student-evidence": "Produces student evidence",
  "may-demonstrate": "May demonstrate competency",
  "implements-approach": "Implements approach",
  "implementation-addresses-outcome": "Addresses learning outcome",
  "directly-investigated-by": "Directly investigated by research",
  "theoretically-informed-by": "Theoretically informed by research",
  "contextually-related-to": "Contextually related to research",
  "informed-by-guidance": "Institutional guidance to consult",
  "has-contextual-source": "Contextual source",
  "has-direct-source": "Direct source",
  "related-approach": "Related approach",
  "source-informs-interpretation": "Source informs interpretation",
  "interpretation-informs-innovation": "Interpretation informs innovation",
  "innovation-has-worked-example": "Framework has a worked example",
  "innovation-has-application": "Framework has a discipline application",
  "application-produces-evidence": "Produces proposed student evidence",
  "application-targets-competency": "Targets competency",
  "evidence-guides-adaptation": "Evidence guides lecturer adaptation",
};
const human = (s: string) => s.replaceAll("-", " ");
const label = (r: string) => relationLabels[r] ?? human(r);
function destination(n: EvidenceGraphNode) {
  const { kind, id } = n.reference;
  if (kind === "assessment")
    return `/explore/${catalogue.assessments.find((a) => a.id === id)!.slug}`;
  if (kind === "research-paper")
    return `/research/${catalogue.papers.find((p) => p.id === id)!.slug}`;
  if (kind === "implementation-pathway")
    return `/implementations/${catalogue.implementations.find((p) => p.id === id)!.slug}`;
  if (kind === "innovation")
    return `/implementations/${catalogue.implementations.find((p) => p.id === id)!.slug}#framework`;
  if (kind === "implementation-application") {
    const p = catalogue.implementations.find((p) =>
      p.framework.applications.some((a) => a.id === id),
    )!;
    return `/implementations/${p.slug}#application-${id}`;
  }
  if (kind === "research-insight") {
    const p = catalogue.implementations.find((p) =>
      p.researchConnections.some((c) => `${p.id}-${c.id}` === id),
    )!;
    return `/implementations/${p.slug}#practice-8`;
  }
  if (kind === "lecturer-adaptation") return `/workload?implementation=${id}`;
  if (kind === "institutional-resource") return `/resources#${id}`;
  return undefined;
}
export function EvidenceMap({
  initialFocus,
  initialChallenge,
}: {
  initialFocus?: string;
  initialChallenge?: string;
}) {
  const [focus, setFocus] = useState(
    initialFocus ?? "implementation-pathway:assessment-twins-ml",
  );
  const [courseId, setCourse] = useState("");
  const [assessmentId, setAssessment] = useState("");
  const [relation, setRelation] = useState("");
  const [competencyId, setCompetency] = useState("");
  const [pathwayId, setPathway] = useState("assessment-twins-ml");
  const [challengeId, setChallenge] = useState(
    catalogue.assessmentChallenges.some((c) => c.id === initialChallenge)
      ? initialChallenge!
      : "",
  );
  const challenge = catalogue.assessmentChallenges.find(
    (c) => c.id === challengeId,
  );
  const filtered = filterEvidenceGraph(graph, catalogue, {
    courseId,
    assessmentId,
    relation,
    competencyId,
    challengeId,
  });
  const selected =
    filtered.nodes.find((n) => n.key === focus) ?? filtered.nodes[0];
  const neighbors = selected
    ? filtered.relationships.filter((e) =>
        [graphReferenceKey(e.from), graphReferenceKey(e.to)].includes(
          selected.key,
        ),
      )
    : [];
  const byKey = new Map(filtered.nodes.map((n) => [n.key, n]));
  const allRelations = [...new Set(graph.relationships.map((e) => e.relation))];
  const pathwayCandidates = catalogue.implementations
    .map((p) => ({ record: p, groups: innovationPathwayView(filtered, p.id) }))
    .filter(
      ({ record: p, groups }) =>
        groups.some((g) => g.nodes.some((n) => n.key === selected?.key)) ||
        (filtered.nodes.some((n) => n.key === `innovation:${p.id}`) &&
          ((selected?.reference.kind === "competency" &&
            (p.competencyIds.includes(selected.reference.id) ||
              p.framework.applications.some((a) =>
                a.competencyIds.includes(selected.reference.id),
              ))) ||
            (selected?.reference.kind === "course" &&
              p.courseId === selected.reference.id) ||
            (selected?.reference.kind === "assessment" &&
              p.assessmentIds.includes(selected.reference.id)) ||
            (selected?.reference.kind === "learning-outcome" &&
              p.learningOutcomeIds.includes(selected.reference.id)))),
    );
  const activePathway =
    pathwayCandidates.find((p) => p.record.id === pathwayId) ??
    pathwayCandidates[0];
  const selectedPaper =
    selected?.reference.kind === "research-paper"
      ? catalogue.papers.find((p) => p.id === selected.reference.id)
      : undefined;
  function nodeButton(n: EvidenceGraphNode) {
    return (
      <button
        type="button"
        className="evidence-node"
        onClick={() => setFocus(n.key)}
        aria-pressed={selected?.key === n.key}
      >
        <small>{human(n.reference.kind)}</small>
        <strong>{n.label}</strong>
      </button>
    );
  }
  return (
    <div className="section-wrap page-body evidence-map-page">
      <PageHeading
        eyebrow="RESEARCH TO IMPLEMENTATION MAP"
        title="Follow an idea from source to teaching."
        description="Explore research, explicit interpretations, innovation frameworks, implementation examples and proposed competency evidence. Select any item to inspect its relationships and review status."
      />
      <p className="notice">
        Research connections distinguish theory, context and direct
        investigation. No proposed implementation currently has a verified
        direct investigation link. Institutional guidance pointers do not
        establish ASPO compliance.
      </p>
      <section
        className="challenge-entry"
        aria-label="Assessment challenge entry point"
      >
        <label className="field">
          Assessment challenge (optional)
          <select
            value={challengeId}
            onChange={(e) => setChallenge(e.target.value)}
          >
            <option value="">Explore all assessment challenges</option>
            {catalogue.assessmentChallenges.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <div>
          <strong>
            {challenge
              ? challenge.title
              : "Start with a question from your teaching"}
          </strong>
          <p>
            {challenge
              ? challenge.description
              : "Choose an optional challenge to narrow the existing approaches, sources and proposed frameworks. This is an editorial starting point, not a diagnosis of a course or a ranking of methods."}
          </p>
          {challenge && (
            <div className="challenge-choices">
              {catalogue.implementations
                .filter(
                  (p) =>
                    challenge.implementationIds.includes(p.id) &&
                    filtered.nodes.some((n) => n.key === `innovation:${p.id}`),
                )
                .map((p) => (
                  <button
                    key={p.id}
                    className="filter-chip"
                    onClick={() => {
                      setFocus(`innovation:${p.id}`);
                      setPathway(p.id);
                    }}
                  >
                    {p.title}
                  </button>
                ))}
            </div>
          )}
        </div>
      </section>
      <div className="evidence-filters">
        <label className="field">
          Competency
          <select
            value={competencyId}
            onChange={(e) => setCompetency(e.target.value)}
          >
            <option value="">All competencies</option>
            {catalogue.competencies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Course context
          <select value={courseId} onChange={(e) => setCourse(e.target.value)}>
            <option value="">All course contexts</option>
            {catalogue.courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Assessment method
          <select
            value={assessmentId}
            onChange={(e) => setAssessment(e.target.value)}
          >
            <option value="">All assessment methods</option>
            {catalogue.assessments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Relationship type
          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
          >
            <option value="">All relationship types</option>
            {allRelations.map((r) => (
              <option key={r} value={r}>
                {label(r)}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Focus on an item
          <select
            value={selected?.key ?? ""}
            onChange={(e) => setFocus(e.target.value)}
          >
            {!filtered.nodes.length && (
              <option value="">No matching items</option>
            )}
            {filtered.nodes.map((n) => (
              <option key={n.key} value={n.key}>
                {human(n.reference.kind)}: {n.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p role="status">
        {filtered.nodes.length} items and {filtered.relationships.length}{" "}
        relationships match these filters.
      </p>
      <button
        className="button button-outline"
        onClick={() => {
          setCourse("");
          setAssessment("");
          setRelation("");
          setCompetency("");
          setChallenge("");
        }}
      >
        Reset map filters
      </button>
      <section className="map-legend" aria-label="Map legend">
        <span>
          <i className="legend-dot source-dot" /> Research source: see
          verification scope
        </span>
        <span>
          <i className="legend-dot interpretation-dot" /> Interpretation:
          contextual or theoretical
        </span>
        <span>
          <i className="legend-dot proposal-dot" /> Design and evidence:
          editorial proposal
        </span>
      </section>
      {activePathway && (
        <section
          className="research-pathway-section"
          aria-label="Research to implementation pathway"
        >
          <div className="pathway-section-heading">
            <div>
              <span className="eyebrow">Focused pathway</span>
              <h2>{activePathway.record.title}</h2>
            </div>
            <label className="field">
              Innovation pathway
              <select
                value={activePathway.record.id}
                onChange={(e) => {
                  setPathway(e.target.value);
                  setFocus(`innovation:${e.target.value}`);
                }}
              >
                {catalogue.implementations
                  .filter((p) =>
                    filtered.nodes.some((n) => n.key === `innovation:${p.id}`),
                  )
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <p>
            These columns follow explicit relationships in the graph. Research
            interpretations and proposed applications retain their stated
            limits.
          </p>
          <p className="content-note">
            On smaller screens, scroll the pathway sideways or use the complete
            text alternative below.
          </p>
          <div
            className="pathway-scroll"
            role="region"
            aria-label="Six stage research pathway"
            tabIndex={0}
          >
            <ol className="research-pathway-columns">
              {activePathway.groups.map((g, i) => (
                <li key={g.label}>
                  <div className="pathway-column-heading">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <h3>{g.label}</h3>
                  </div>
                  <p className="pathway-relation">
                    {g.relation}
                    {i < 5 && <span aria-hidden="true"> →</span>}
                  </p>
                  {g.nodes.map((n) => (
                    <div key={n.key} className="pathway-node-wrap">
                      {nodeButton(n)}
                      {n.reference.kind === "research-paper" && (
                        <span className="tag">
                          {catalogue.papers
                            .find((p) => p.id === n.reference.id)!
                            .verificationScope.replaceAll("-", " ")}{" "}
                          checked
                        </span>
                      )}
                    </div>
                  ))}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
      {selected ? (
        <>
          <section
            className="reading-panel evidence-inspector"
            aria-label="Selected evidence item"
            aria-live="polite"
          >
            <span className="eyebrow">{human(selected.reference.kind)}</span>
            <h2>{selected.label}</h2>
            <p>{selected.description}</p>
            <p>
              Editorial review:{" "}
              {selected.editorialReview?.status ??
                "Not recorded for this legacy definition"}
              .
            </p>
            {selectedPaper && (
              <p>
                <strong>Source verification:</strong>{" "}
                {selectedPaper.verificationScope.replaceAll("-", " ")}.{" "}
                {selectedPaper.verificationNote}
              </p>
            )}
            {selected.reference.kind === "lecturer-adaptation" && (
              <nav className="related-links" aria-label="Map adaptation tools">
                {implementationToolLinks(
                  catalogue.implementations.find(
                    (p) => p.id === selected.reference.id,
                  )!,
                  catalogue,
                ).map((l) => (
                  <Link key={l.label} href={l.href}>
                    {l.label}
                    <span>Open with this example ↗</span>
                  </Link>
                ))}
              </nav>
            )}
            {destination(selected) && (
              <Link className="text-link" href={destination(selected)!}>
                Open {human(selected.reference.kind)} page →
              </Link>
            )}
          </section>
          {activePathway && (
            <MapDecisionPanel
              key={`${activePathway.record.id}:${selected.key}`}
              pathway={activePathway.record}
              initialSection={
                selected.reference.kind === "research-paper" ||
                selected.reference.kind === "research-insight"
                  ? "research"
                  : selected.reference.kind === "implementation-application"
                    ? "applications"
                    : selected.reference.kind === "lecturer-adaptation"
                      ? "feasibility"
                      : selected.reference.kind === "implementation-pathway"
                        ? "semester"
                        : "comparison"
              }
            />
          )}
          <section
            aria-label="Focused relationship map"
            className="evidence-focus-map"
          >
            <h2>Connections for this item</h2>
            <p>
              Select any connected item to follow its relationships. Every
              control works with Tab and Enter or Space.
            </p>
            <div className="evidence-connections">
              {neighbors.map((e) => {
                const incoming = graphReferenceKey(e.to) === selected.key;
                const other = byKey.get(
                  graphReferenceKey(incoming ? e.from : e.to),
                )!;
                return (
                  <article className="evidence-connection" key={e.id}>
                    <div className="evidence-direction">
                      <span aria-hidden="true">{incoming ? "←" : "→"}</span>
                      <strong>{label(e.relation)}</strong>
                    </div>
                    {nodeButton(other)}
                    <p>{e.explanation}</p>
                    <p className="content-note">
                      {human(e.basis)} · Editorial {e.editorialReview.status}
                    </p>
                    <details>
                      <summary>Source and review details</summary>
                      <p>{e.provenance}</p>
                      <p>{e.editorialReview.note}</p>
                      {e.evidenceLinks.map((l) => {
                        const paper = catalogue.papers.find(
                          (p) => p.id === l.paperId,
                        )!;
                        return (
                          <div
                            key={l.id}
                            className="relationship-source-details"
                          >
                            <p>
                              <Link
                                className="text-link"
                                href={`/research/${paper.slug}`}
                              >
                                {paper.title}
                              </Link>{" "}
                              · {paper.type}
                            </p>
                            <a
                              className="text-link"
                              href={paper.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Original source ↗
                            </a>
                            <p>{l.relationship}</p>
                            <p>
                              <strong>Source limits:</strong>{" "}
                              {paper.evidenceStrength}{" "}
                              {paper.digest.limitations}
                            </p>
                            <p>
                              <strong>Verification:</strong>{" "}
                              {paper.verificationScope.replaceAll("-", " ")};
                              connection {human(l.verificationStatus)}.{" "}
                              {l.reviewNote}
                            </p>
                          </div>
                        );
                      })}
                    </details>
                  </article>
                );
              })}
            </div>
            {!neighbors.length && (
              <p>No relationships match the current filters for this item.</p>
            )}
          </section>
        </>
      ) : (
        <p className="empty-state">
          No items match these filters. Reset the filters or choose a different
          course or method.
        </p>
      )}
      <section className="detail-section">
        <h2>Complete accessible text alternative</h2>
        <p>
          This list contains every item and relationship matching the filters,
          including descriptions, source provenance and review status. It is
          independent of the focused view above.
        </p>
        <details className="reading-panel">
          <summary>Show complete item list ({filtered.nodes.length})</summary>
          <ul className="practice-list">
            {filtered.nodes.map((n) => (
              <li key={n.key}>
                <button className="text-link" onClick={() => setFocus(n.key)}>
                  {n.label}
                </button>{" "}
                ({human(n.reference.kind)})<p>{n.description}</p>
                {destination(n) && (
                  <Link href={destination(n)!}>
                    Open detail page for {n.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </details>
        <details className="reading-panel">
          <summary>
            Show complete relationship list ({filtered.relationships.length})
          </summary>
          <ol className="practice-list">
            {filtered.relationships.map((e) => (
              <li key={e.id}>
                <strong>
                  {byKey.get(graphReferenceKey(e.from))!.label} →{" "}
                  {label(e.relation)} →{" "}
                  {byKey.get(graphReferenceKey(e.to))!.label}
                </strong>
                <p>{e.explanation}</p>
                <p>
                  Basis: {human(e.basis)}. Editorial review:{" "}
                  {e.editorialReview.status}. {e.editorialReview.note}
                </p>
                <p>Source: {e.provenance}</p>
                {e.evidenceLinks.map((l) => (
                  <p key={l.id}>
                    Research link: {l.paperId}, {human(l.verificationStatus)}.{" "}
                    {l.reviewNote}
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </details>
      </section>
      <Link className="text-link" href="/knowledge-map">
        Open the existing curated Knowledge Map →
      </Link>
    </div>
  );
}
