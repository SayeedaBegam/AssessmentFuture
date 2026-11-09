import type {
  CatalogueContent,
  EditorialReview,
  EvidenceGraphRelationship,
  GraphNodeReference,
  EvidenceLink,
} from "./types";
import {
  graphReferenceKey,
  validateGraphRelationships,
} from "./content-validation";

export interface EvidenceGraphNode {
  key: string;
  reference: GraphNodeReference;
  label: string;
  description: string;
  editorialReview?: EditorialReview;
}
export interface CompetencyEvidenceGraph {
  schemaVersion: 1;
  nodes: EvidenceGraphNode[];
  relationships: EvidenceGraphRelationship[];
}

/** Project only explicit catalogue references. This creates no learning effect
 * or causal claim and does not automatically upgrade any review status. */
export function buildCompetencyEvidenceGraph(
  content: CatalogueContent,
): CompetencyEvidenceGraph {
  const nodes: EvidenceGraphNode[] = [];
  const relationships: EvidenceGraphRelationship[] = [];
  function addNode(
    reference: GraphNodeReference,
    label: string,
    description: string,
    editorialReview?: EditorialReview,
  ) {
    nodes.push({
      key: graphReferenceKey(reference),
      reference,
      label,
      description,
      ...(editorialReview ? { editorialReview } : {}),
    });
  }
  function proposed(
    from: GraphNodeReference,
    to: GraphNodeReference,
    relation: EvidenceGraphRelationship["relation"],
    explanation: string,
    editorialReview: EditorialReview,
  ) {
    relationships.push({
      id: `${graphReferenceKey(from)}|${relation}|${graphReferenceKey(to)}`,
      from,
      to,
      relation,
      basis: "editorial-proposal",
      explanation,
      editorialReview,
      evidenceLinks: [],
      provenance: `Explicit references in ${graphReferenceKey(from)}; editorial mapping, not measured student data.`,
    });
  }
  content.competencies.forEach((c) =>
    addNode({ kind: "competency", id: c.id }, c.name, c.description),
  );
  function sourced(
    from: GraphNodeReference,
    to: GraphNodeReference,
    relation: EvidenceGraphRelationship["relation"],
    link: EvidenceLink,
    review: EditorialReview,
    provenance: string,
  ) {
    relationships.push({
      id: `${graphReferenceKey(from)}|${relation}|${graphReferenceKey(to)}|${link.id}`,
      from,
      to,
      relation,
      basis: link.directEvidence
        ? "direct-research-evidence"
        : "contextual-source",
      explanation: link.relationship,
      editorialReview: link.directEvidence
        ? {
            status: "reviewed",
            note: link.reviewNote,
            reviewedBy: link.reviewedBy,
            reviewedOn: link.reviewedOn,
          }
        : review,
      evidenceLinks: [link],
      provenance,
    });
  }
  content.papers.forEach((p) =>
    addNode(
      { kind: "research-paper", id: p.id },
      p.title,
      `${p.verificationNote} ${p.evidenceStrength}`,
      p.editorialReview,
    ),
  );
  content.institutionalResources.forEach((r) =>
    addNode(
      { kind: "institutional-resource", id: r.id },
      r.title,
      `${r.description} ${r.verificationNote}`,
      r.editorialReview,
    ),
  );
  const proposedReview: EditorialReview = {
    status: "draft",
    note: "Illustrative teaching context and intended outcome; subject review pending.",
  };
  content.courses.forEach((c) =>
    addNode(
      { kind: "course", id: c.id },
      c.name,
      c.description,
      proposedReview,
    ),
  );
  for (const o of content.learningOutcomes) {
    const ref: GraphNodeReference = { kind: "learning-outcome", id: o.id };
    addNode(
      ref,
      o.description,
      "Illustrative intended learning outcome, not an official module specification.",
      proposedReview,
    );
    proposed(
      { kind: "course", id: o.courseId },
      ref,
      "course-has-outcome",
      "Intended outcome in this fictional course context.",
      proposedReview,
    );
    o.competencyIds.forEach((id) =>
      proposed(
        ref,
        { kind: "competency", id },
        "outcome-targets-competency",
        "Proposed alignment between the learning outcome and competency.",
        proposedReview,
      ),
    );
  }
  for (const p of content.implementations) {
    const ref: GraphNodeReference = {
      kind: "implementation-pathway",
      id: p.id,
    };
    addNode(ref, p.title, p.rationale, p.editorialReview);
    const innovation: GraphNodeReference = { kind: "innovation", id: p.id };
    const adaptation: GraphNodeReference = {
      kind: "lecturer-adaptation",
      id: p.id,
    };
    addNode(innovation, p.title, p.framework.summary, p.editorialReview);
    addNode(
      adaptation,
      `Adapt ${p.title} to your teaching`,
      "Choose the intended outcome, review access and institutional requirements, and edit the worked example's planning assumptions in the existing tools.",
      p.editorialReview,
    );
    proposed(
      innovation,
      ref,
      "innovation-has-worked-example",
      "The original worked example is one application of this cross disciplinary framework, not its only suitable context.",
      p.editorialReview,
    );
    for (const a of p.framework.applications) {
      const app: GraphNodeReference = {
        kind: "implementation-application",
        id: a.id,
      };
      const evidence: GraphNodeReference = {
        kind: "observable-evidence",
        id: `${a.id}-evidence`,
      };
      addNode(
        app,
        a.title,
        `${a.discipline}. Intended outcome: ${a.outcome} ${a.feasibility}`,
        p.editorialReview,
      );
      proposed(
        innovation,
        app,
        "innovation-has-application",
        `Illustrative application in ${a.discipline}; editorial proposal, not an evaluated course intervention.`,
        p.editorialReview,
      );
      proposed(
        app,
        evidence,
        "application-produces-evidence",
        a.observableEvidence,
        p.editorialReview,
      );
      a.competencyIds.forEach((id) =>
        proposed(
          app,
          { kind: "competency", id },
          "application-targets-competency",
          "Intended competency mapping for this illustrative application; not a validated measure.",
          p.editorialReview,
        ),
      );
      proposed(
        evidence,
        adaptation,
        "evidence-guides-adaptation",
        "Consider whether this proposed student evidence fits your intended outcomes, access conditions and marking criteria.",
        p.editorialReview,
      );
    }
    p.observableEvidenceIds.forEach((id) =>
      proposed(
        { kind: "observable-evidence", id },
        adaptation,
        "evidence-guides-adaptation",
        "Use the proposed evidence to review and adapt the worked example before teaching.",
        p.editorialReview,
      ),
    );
    p.researchConnections.forEach((c) => {
      const insight: GraphNodeReference = {
        kind: "research-insight",
        id: `${p.id}-${c.id}`,
      };
      const paper = content.papers.find((r) => r.id === c.link.paperId)!;
      addNode(
        insight,
        `${p.title}: ${paper.authors.split(",")[0]} (${paper.year})`,
        `Proposed research to practice interpretation. ${c.link.relationship} ${c.link.reviewNote}`,
        p.editorialReview,
      );
      const provenance = `Implementation ${p.id}, authored research connection ${c.id}. ${c.link.reviewNote}`;
      sourced(
        { kind: "research-paper", id: paper.id },
        insight,
        "source-informs-interpretation",
        c.link,
        p.editorialReview,
        provenance,
      );
      sourced(
        insight,
        innovation,
        "interpretation-informs-innovation",
        c.link,
        p.editorialReview,
        provenance,
      );
    });
    p.learningOutcomeIds.forEach((id) =>
      proposed(
        ref,
        { kind: "learning-outcome", id },
        "implementation-addresses-outcome",
        "This proposed sequence addresses the stated outcome.",
        p.editorialReview,
      ),
    );
    p.competencyIds.forEach((id) =>
      proposed(
        ref,
        { kind: "competency", id },
        "assesses-competency",
        "Intended competency evidence in this proposed implementation; not a validated measurement.",
        p.editorialReview,
      ),
    );
    p.assessmentIds.forEach((id) =>
      proposed(
        ref,
        { kind: "assessment", id },
        "implements-approach",
        p.classificationNote,
        p.editorialReview,
      ),
    );
    p.observableEvidenceIds.forEach((id) =>
      proposed(
        ref,
        { kind: "observable-evidence", id },
        "produces-student-evidence",
        p.individualEvidence,
        p.editorialReview,
      ),
    );
    p.resourceIds.forEach((id) =>
      proposed(
        ref,
        { kind: "institutional-resource", id },
        "informed-by-guidance",
        `Resource pointer for institutional review, not a compliance finding. ${p.institutionalConsiderations.note}`,
        p.editorialReview,
      ),
    );
    p.researchConnections.forEach((c) =>
      relationships.push({
        id: `${graphReferenceKey(ref)}|${c.relation}|research-paper:${c.link.paperId}|${c.id}`,
        from: ref,
        to: { kind: "research-paper", id: c.link.paperId },
        relation: c.relation,
        basis: c.link.directEvidence
          ? "direct-research-evidence"
          : "contextual-source",
        explanation: c.link.relationship,
        editorialReview: c.link.directEvidence
          ? {
              status: "reviewed",
              note: c.link.reviewNote,
              reviewedBy: c.link.reviewedBy,
              reviewedOn: c.link.reviewedOn,
            }
          : p.editorialReview,
        evidenceLinks: [c.link],
        provenance: `Implementation ${p.id}, authored research connection ${c.id}. ${c.link.reviewNote}`,
      }),
    );
  }
  content.aiUseConditions.forEach((c) =>
    addNode(
      { kind: "ai-use-condition", id: c.id },
      c.name,
      c.description,
      c.editorialReview,
    ),
  );
  content.implementationConsiderations.forEach((c) =>
    addNode(
      { kind: "implementation-consideration", id: c.id },
      c.label,
      c.description,
      c.editorialReview,
    ),
  );
  for (const evidence of content.observableEvidence) {
    const reference: GraphNodeReference = {
      kind: "observable-evidence",
      id: evidence.id,
    };
    addNode(
      reference,
      evidence.label,
      evidence.description,
      evidence.editorialReview,
    );
    evidence.competencyIds.forEach((id) =>
      proposed(
        reference,
        { kind: "competency", id },
        "may-demonstrate",
        "Proposed interpretation of observable work, not a validated measurement claim.",
        evidence.editorialReview,
      ),
    );
    evidence.aiUseConditionIds.forEach((id) =>
      proposed(
        { kind: "ai-use-condition", id },
        reference,
        "ai-affects-evidence-interpretation",
        evidence.interpretationLimits,
        evidence.editorialReview,
      ),
    );
  }
  for (const assessment of content.assessments) {
    const from: GraphNodeReference = { kind: "assessment", id: assessment.id };
    addNode(
      from,
      assessment.name,
      assessment.description,
      assessment.editorialReview,
    );
    assessment.competencyIds.forEach((id) =>
      proposed(
        from,
        { kind: "competency", id },
        "targets-competency",
        "Intended competency from the editorial assessment record. No learning effect is implied.",
        assessment.editorialReview,
      ),
    );
    assessment.observableEvidenceIds.forEach((id) =>
      proposed(
        from,
        { kind: "observable-evidence", id },
        "elicits-evidence",
        "Proposed student evidence to consider when designing this assessment.",
        assessment.editorialReview,
      ),
    );
    assessment.aiUseConditionIds.forEach((id) =>
      proposed(
        from,
        { kind: "ai-use-condition", id },
        "considers-ai-condition",
        assessment.aiConsiderations,
        assessment.editorialReview,
      ),
    );
    assessment.implementationConsiderationIds.forEach((id) =>
      proposed(
        from,
        { kind: "implementation-consideration", id },
        "has-implementation-consideration",
        "Implementation consideration linked explicitly in the assessment record.",
        assessment.editorialReview,
      ),
    );
    assessment.relatedApproaches.forEach((related) =>
      proposed(
        from,
        { kind: "assessment", id: related.approachId },
        "related-approach",
        `${related.relation}: ${related.rationale}`,
        assessment.editorialReview,
      ),
    );
    assessment.evidenceLinks.forEach((link) => {
      const to: GraphNodeReference = {
        kind: "research-paper",
        id: link.paperId,
      };
      const relation = link.directEvidence
        ? "has-direct-source"
        : "has-contextual-source";
      relationships.push({
        id: `${graphReferenceKey(from)}|${relation}|${graphReferenceKey(to)}|${link.id}`,
        from,
        to,
        relation,
        basis: link.directEvidence
          ? "direct-research-evidence"
          : "contextual-source",
        explanation: link.relationship,
        editorialReview: link.directEvidence
          ? {
              status: "reviewed",
              note: link.reviewNote,
              reviewedBy: link.reviewedBy,
              reviewedOn: link.reviewedOn,
            }
          : assessment.editorialReview,
        evidenceLinks: [link],
        provenance: `Assessment ${assessment.id}, evidence link ${link.id}; ${link.reviewNote}`,
      });
    });
  }
  relationships.push(...content.additionalRelationships);
  validateGraphRelationships(content, relationships);
  return { schemaVersion: 1, nodes, relationships };
}
