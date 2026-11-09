import {
  catalogueSchema,
  evidenceGraphRelationshipSchema,
} from "./content-schema";
import type {
  CatalogueContent,
  EvidenceGraphRelationship,
  EvidenceLink,
  GraphNodeReference,
} from "./types";

export class ContentValidationError extends Error {
  constructor(public readonly issues: string[]) {
    super(
      `Content validation failed:\n${issues.map((issue) => `- ${issue}`).join("\n")}`,
    );
    this.name = "ContentValidationError";
  }
}
export const graphReferenceKey = (reference: GraphNodeReference) =>
  `${reference.kind}:${reference.id}`;
export const relationshipEndpoints: Record<
  EvidenceGraphRelationship["relation"],
  readonly [GraphNodeReference["kind"], GraphNodeReference["kind"]]
> = {
  "targets-competency": ["assessment", "competency"],
  "elicits-evidence": ["assessment", "observable-evidence"],
  "may-demonstrate": ["observable-evidence", "competency"],
  "considers-ai-condition": ["assessment", "ai-use-condition"],
  "has-implementation-consideration": [
    "assessment",
    "implementation-consideration",
  ],
  "related-approach": ["assessment", "assessment"],
  "has-contextual-source": ["assessment", "research-paper"],
  "has-direct-source": ["assessment", "research-paper"],
  "ai-affects-evidence-interpretation": [
    "ai-use-condition",
    "observable-evidence",
  ],
  "research-informs-evidence": ["research-paper", "observable-evidence"],
  "research-informs-ai-condition": ["research-paper", "ai-use-condition"],
  "research-informs-implementation": [
    "research-paper",
    "implementation-consideration",
  ],
  "course-has-outcome": ["course", "learning-outcome"],
  "outcome-targets-competency": ["learning-outcome", "competency"],
  "assesses-competency": ["implementation-pathway", "competency"],
  "produces-student-evidence": [
    "implementation-pathway",
    "observable-evidence",
  ],
  "implements-approach": ["implementation-pathway", "assessment"],
  "implementation-addresses-outcome": [
    "implementation-pathway",
    "learning-outcome",
  ],
  "directly-investigated-by": ["implementation-pathway", "research-paper"],
  "theoretically-informed-by": ["implementation-pathway", "research-paper"],
  "contextually-related-to": ["implementation-pathway", "research-paper"],
  "informed-by-guidance": ["implementation-pathway", "institutional-resource"],
  "source-informs-interpretation": ["research-paper", "research-insight"],
  "interpretation-informs-innovation": ["research-insight", "innovation"],
  "innovation-has-worked-example": ["innovation", "implementation-pathway"],
  "innovation-has-application": ["innovation", "implementation-application"],
  "application-produces-evidence": [
    "implementation-application",
    "observable-evidence",
  ],
  "application-targets-competency": [
    "implementation-application",
    "competency",
  ],
  "evidence-guides-adaptation": ["observable-evidence", "lecturer-adaptation"],
};

function referenceRegistry(content: CatalogueContent) {
  return new Set([
    ...content.assessments.map((a) => `assessment:${a.id}`),
    ...content.competencies.map((c) => `competency:${c.id}`),
    ...content.papers.map((p) => `research-paper:${p.id}`),
    ...content.institutionalResources.map(
      (r) => `institutional-resource:${r.id}`,
    ),
    ...content.courses.map((c) => `course:${c.id}`),
    ...content.learningOutcomes.map((o) => `learning-outcome:${o.id}`),
    ...content.implementations.map((p) => `implementation-pathway:${p.id}`),
    ...content.implementations.flatMap((p) => [
      `innovation:${p.id}`,
      `lecturer-adaptation:${p.id}`,
      ...p.researchConnections.map((c) => `research-insight:${p.id}-${c.id}`),
      ...p.framework.applications.map(
        (a) => `implementation-application:${a.id}`,
      ),
    ]),
    ...content.observableEvidence.map((e) => `observable-evidence:${e.id}`),
    ...content.aiUseConditions.map((c) => `ai-use-condition:${c.id}`),
    ...content.implementationConsiderations.map(
      (c) => `implementation-consideration:${c.id}`,
    ),
  ]);
}

function evidenceIssues(
  content: CatalogueContent,
  links: EvidenceLink[],
  location: string,
): string[] {
  const issues: string[] = [];
  const seen = new Set<string>();
  const linkIds = new Set<string>();
  for (const link of links) {
    if (linkIds.has(link.id))
      issues.push(`${location}: duplicate evidence link ID ${link.id}`);
    linkIds.add(link.id);
    const key = `${link.paperId}|${link.relationship}|${link.sourceLocator ?? ""}`;
    if (seen.has(key))
      issues.push(`${location}: duplicate evidence link to ${link.paperId}`);
    seen.add(key);
    const paper = content.papers.find((p) => p.id === link.paperId);
    if (!paper) {
      issues.push(`${location}: unknown research paper ${link.paperId}`);
      continue;
    }
    if (
      link.verificationStatus === "source-checked" &&
      paper.verificationScope === "metadata-only"
    )
      issues.push(
        `${location}: ${paper.id} has only metadata verification, not source review`,
      );
    if (
      (link.directEvidence ||
        link.verificationStatus === "full-text-reviewed") &&
      paper.verificationScope !== "full-text"
    )
      issues.push(
        `${location}: full text of ${paper.id} has not been reviewed`,
      );
  }
  return issues;
}

export function validateGraphRelationships(
  content: CatalogueContent,
  relationships: EvidenceGraphRelationship[],
): void {
  const issues: string[] = [];
  const registry = referenceRegistry(content);
  const ids = new Set<string>();
  const triples = new Set<string>();
  relationships.forEach((relationship, index) => {
    const location = `relationships[${index}] (${relationship.id})`;
    const result = evidenceGraphRelationshipSchema.safeParse(relationship);
    if (!result.success) {
      issues.push(
        ...result.error.issues.map(
          (i) => `${location}.${i.path.join(".")}: ${i.message}`,
        ),
      );
      return;
    }
    if (ids.has(relationship.id))
      issues.push(`${location}: duplicate relationship ID`);
    ids.add(relationship.id);
    const sourceScope = relationship.evidenceLinks
      .map((link) => `${link.paperId}:${link.id}`)
      .sort()
      .join(";");
    const triple = `${graphReferenceKey(relationship.from)}|${relationship.relation}|${graphReferenceKey(relationship.to)}|${sourceScope}`;
    if (triples.has(triple))
      issues.push(`${location}: duplicate relationship endpoints and type`);
    triples.add(triple);
    for (const reference of [relationship.from, relationship.to])
      if (!registry.has(graphReferenceKey(reference)))
        issues.push(`${location}: unknown ${graphReferenceKey(reference)}`);
    if (
      graphReferenceKey(relationship.from) ===
      graphReferenceKey(relationship.to)
    )
      issues.push(`${location}: self relationships are not allowed`);
    const [from, to] = relationshipEndpoints[relationship.relation];
    if (relationship.from.kind !== from || relationship.to.kind !== to)
      issues.push(
        `${location}: ${relationship.relation} requires ${from} → ${to}`,
      );
    issues.push(
      ...evidenceIssues(content, relationship.evidenceLinks, location),
    );
    if (
      (relationship.relation.startsWith("research-informs-") ||
        [
          "source-informs-interpretation",
          "interpretation-informs-innovation",
        ].includes(relationship.relation)) &&
      (relationship.basis === "editorial-proposal" ||
        !relationship.evidenceLinks.length)
    )
      issues.push(
        `${location}: a research interpretation needs explicitly linked contextual or direct source support`,
      );
    if (
      relationship.evidenceLinks.some((link) => link.directEvidence) &&
      relationship.basis !== "direct-research-evidence"
    )
      issues.push(
        `${location}: direct evidence links must declare their direct research basis`,
      );
    if (
      relationship.basis !== "editorial-proposal" &&
      !relationship.evidenceLinks.length
    )
      issues.push(`${location}: a research relationship needs source links`);
    if (
      relationship.basis === "direct-research-evidence" &&
      (!relationship.evidenceLinks.some((e) => e.directEvidence) ||
        relationship.editorialReview.status !== "reviewed")
    )
      issues.push(
        `${location}: direct research evidence requires direct source support and editorial review`,
      );
    if (
      ["has-direct-source", "directly-investigated-by"].includes(
        relationship.relation,
      ) &&
      relationship.basis !== "direct-research-evidence"
    )
      issues.push(
        `${location}: a direct source edge must declare direct research evidence`,
      );
    if (
      relationship.relation === "has-contextual-source" &&
      relationship.basis !== "contextual-source"
    )
      issues.push(
        `${location}: a contextual source edge must remain contextual`,
      );
    if (
      relationship.from.kind === "research-paper" &&
      relationship.basis !== "editorial-proposal" &&
      !relationship.evidenceLinks.some(
        (e) => e.paperId === relationship.from.id,
      )
    )
      issues.push(
        `${location}: the source paper must appear in its evidence links`,
      );
    if (
      relationship.to.kind === "research-paper" &&
      !relationship.evidenceLinks.some((e) => e.paperId === relationship.to.id)
    )
      issues.push(
        `${location}: the target paper must appear in its evidence links`,
      );
  });
  if (issues.length) throw new ContentValidationError(issues);
}

/** Validate the complete corpus at the content boundary, not only in tests. */
export function parseCatalogue(input: unknown): CatalogueContent {
  const result = catalogueSchema.safeParse(input);
  if (!result.success)
    throw new ContentValidationError(
      result.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      ),
    );
  const content = result.data;
  const issues: string[] = [];
  const dois = content.papers
    .filter((p) => p.doi)
    .map((p) => p.doi!.toLowerCase());
  if (new Set(dois).size !== dois.length) issues.push("papers: duplicate DOI");
  function unique(items: { id: string; slug?: string }[], location: string) {
    for (const key of ["id", "slug"] as const) {
      const seen = new Set<string>();
      for (const item of items) {
        const value = item[key];
        if (!value) continue;
        if (seen.has(value))
          issues.push(`${location}: duplicate ${key} ${value}`);
        seen.add(value);
      }
    }
  }
  for (const [key, items] of Object.entries(content))
    if (Array.isArray(items) && key !== "additionalRelationships")
      unique(items as { id: string; slug?: string }[], key);
  const exists = (
    kind: keyof CatalogueContent,
    id: string,
    location: string,
  ) => {
    const entries = content[kind];
    if (
      !Array.isArray(entries) ||
      !entries.some((item) => "id" in item && item.id === id)
    )
      issues.push(`${location}: unknown ${kind} reference ${id}`);
  };
  for (const a of content.assessments) {
    const location = `assessment ${a.id}`;
    a.competencyIds.forEach((id) => exists("competencies", id, location));
    a.observableEvidenceIds.forEach((id) =>
      exists("observableEvidence", id, location),
    );
    a.aiUseConditionIds.forEach((id) =>
      exists("aiUseConditions", id, location),
    );
    a.implementationConsiderationIds.forEach((id) =>
      exists("implementationConsiderations", id, location),
    );
    const related = new Set<string>();
    for (const relation of a.relatedApproaches) {
      exists("assessments", relation.approachId, location);
      if (relation.approachId === a.id)
        issues.push(`${location}: an approach cannot reference itself`);
      const key = `${relation.approachId}|${relation.relation}`;
      if (related.has(key))
        issues.push(`${location}: duplicate related approach ${key}`);
      related.add(key);
    }
    if (
      a.catalogueClassification === "adaptation-combination" &&
      !a.relatedApproaches.some(
        (r) => r.relation === "adaptation-of" || r.relation === "combines",
      )
    )
      issues.push(
        `${location}: an adaptation or combination must identify its established source approaches`,
      );
    if (
      a.relatedApproaches.filter((r) => r.relation === "combines").length === 1
    )
      issues.push(
        `${location}: a combination must identify at least two approaches`,
      );
    unique(a.adaptations, `${location}.adaptations`);
    issues.push(
      ...evidenceIssues(content, a.evidenceLinks, `${location}.evidenceLinks`),
    );
    a.adaptations.forEach((adaptation) =>
      issues.push(
        ...evidenceIssues(
          content,
          adaptation.validationEvidence ?? [],
          `${location}.adaptations.${adaptation.id}`,
        ),
      ),
    );
    if (a.researchVerification.status === "reviewed") {
      if (
        a.researchVerification.scope === "contextual-sources" &&
        !a.evidenceLinks.some(
          (e) =>
            e.verificationStatus === "source-checked" ||
            e.verificationStatus === "full-text-reviewed",
        )
      )
        issues.push(
          `${location}: contextual research review needs at least one checked source`,
        );
      if (
        a.researchVerification.scope === "format-specific-evidence" &&
        !a.evidenceLinks.some((e) => e.directEvidence)
      )
        issues.push(
          `${location}: format specific review needs direct evidence links`,
        );
    }
  }
  for (const o of content.learningOutcomes) {
    exists("courses", o.courseId, `outcome ${o.id}`);
    o.competencyIds.forEach((id) =>
      exists("competencies", id, `outcome ${o.id}`),
    );
  }
  for (const c of content.assessmentChallenges)
    c.implementationIds.forEach((id) =>
      exists("implementations", id, `assessment challenge ${c.id}`),
    );
  for (const p of content.implementations) {
    const location = `implementation ${p.id}`;
    p.framework.applications.forEach((a) => {
      a.competencyIds.forEach((id) =>
        exists("competencies", id, `${location} application ${a.id}`),
      );
      exists(
        "observableEvidence",
        `${a.id}-evidence`,
        `${location} application ${a.id}`,
      );
    });
    exists("courses", p.courseId, location);
    p.learningOutcomeIds.forEach((id) => {
      exists("learningOutcomes", id, location);
      const o = content.learningOutcomes.find((o) => o.id === id);
      if (o && o.courseId !== p.courseId)
        issues.push(`${location}: outcome belongs to a different course`);
      if (o?.competencyIds.some((id) => !p.competencyIds.includes(id)))
        issues.push(
          `${location}: outcome competencies must appear in the implementation`,
        );
    });
    p.assessmentIds.forEach((id) => exists("assessments", id, location));
    p.competencyIds.forEach((id) => exists("competencies", id, location));
    p.observableEvidenceIds.forEach((id) =>
      exists("observableEvidence", id, location),
    );
    p.resourceIds.forEach((id) =>
      exists("institutionalResources", id, location),
    );
    exists("aiUseConditions", p.aiUse.conditionId, location);
    unique(p.researchConnections, `${location}.researchConnections`);
    issues.push(
      ...evidenceIssues(
        content,
        p.researchConnections.map((c) => c.link),
        location,
      ),
    );
    for (const c of p.researchConnections) {
      if ((c.relation === "directly-investigated-by") !== c.link.directEvidence)
        issues.push(
          `${location}: direct investigation and direct evidence must agree`,
        );
    }
    if (p.researchVerification.status === "reviewed") {
      const links = p.researchConnections.map((c) => c.link);
      if (
        p.researchVerification.scope === "format-specific-evidence" &&
        !links.some((e) => e.directEvidence)
      )
        issues.push(`${location}: direct implementation support required`);
      if (
        p.researchVerification.scope === "contextual-sources" &&
        !links.some((e) =>
          ["source-checked", "full-text-reviewed"].includes(
            e.verificationStatus,
          ),
        )
      )
        issues.push(`${location}: checked contextual sources required`);
    }
  }
  unique(
    content.implementations.flatMap((p) => p.framework.applications),
    "innovation applications",
  );
  for (const evidence of content.observableEvidence) {
    evidence.competencyIds.forEach((id) =>
      exists("competencies", id, `observable evidence ${evidence.id}`),
    );
    evidence.aiUseConditionIds.forEach((id) =>
      exists("aiUseConditions", id, `observable evidence ${evidence.id}`),
    );
  }
  for (const programme of content.programmes)
    programme.competencyIds.forEach((id) =>
      exists("competencies", id, `programme ${programme.id}`),
    );
  // Related alternatives can be reciprocal. Derivation/composition lineage cannot.
  const completed = new Set<string>();
  const visiting = new Set<string>();
  function visit(id: string) {
    if (visiting.has(id)) {
      issues.push(`assessment ${id}: cyclic adaptation or combination lineage`);
      return;
    }
    if (completed.has(id)) return;
    visiting.add(id);
    const record = content.assessments.find((a) => a.id === id);
    record?.relatedApproaches
      .filter(
        (r) => r.relation === "adaptation-of" || r.relation === "combines",
      )
      .forEach((r) => visit(r.approachId));
    visiting.delete(id);
    completed.add(id);
  }
  content.assessments.forEach((a) => visit(a.id));
  if (issues.length) throw new ContentValidationError(issues);
  validateGraphRelationships(content, content.additionalRelationships);
  return content;
}
