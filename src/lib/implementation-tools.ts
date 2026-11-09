import type { ImplementationPathway } from "./content-schema";
import type { CatalogueContent } from "./content-schema";
import type { CompetencyEvidenceGraph } from "./competency-evidence-graph";
export function implementationToolLinks(
  p: ImplementationPathway,
  content?: CatalogueContent,
) {
  const primary = p.assessmentIds[0];
  const slug =
    content?.assessments.find((a) => a.id === primary)?.slug ?? primary;
  return [
    { label: "Assessment Explorer", href: `/explore/${slug}` },
    { label: "Research Library", href: "/research" },
    {
      label: "Evidence Map",
      href: `/evidence-map?focus=implementation-pathway:${p.id}`,
    },
    {
      label: "Comparison Studio",
      href: `/compare?ids=${p.assessmentIds.join(",")}`,
    },
    {
      label: "Assessment Playground",
      href: `/playground?format=${primary}&ai=${p.aiUse.conditionId}`,
    },
    { label: "Workload Calculator", href: `/workload?implementation=${p.id}` },
    {
      label: "Semester Timeline",
      href: `/continuous-assessment?implementation=${p.id}`,
    },
    {
      label: "AI Use Spectrum",
      href: `/ai-integration?ai=${p.aiUse.conditionId}`,
    },
  ];
}
export function filterEvidenceGraph(
  graph: CompetencyEvidenceGraph,
  content: CatalogueContent,
  filters: {
    courseId?: string;
    assessmentId?: string;
    relation?: string;
    competencyId?: string;
    challengeId?: string;
  },
) {
  let allowed: Set<string> | undefined;
  if (
    filters.courseId ||
    filters.assessmentId ||
    filters.competencyId ||
    filters.challengeId
  ) {
    const challenge = content.assessmentChallenges.find(
      (c) => c.id === filters.challengeId,
    );
    const pathways = content.implementations.filter(
      (p) =>
        (!filters.challengeId || challenge?.implementationIds.includes(p.id)) &&
        (!filters.courseId || p.courseId === filters.courseId) &&
        (!filters.assessmentId ||
          p.assessmentIds.includes(filters.assessmentId)) &&
        (!filters.competencyId ||
          p.competencyIds.includes(filters.competencyId) ||
          p.framework.applications.some((a) =>
            a.competencyIds.includes(filters.competencyId!),
          )),
    );
    const seeds = new Set(
      pathways.flatMap((p) => [
        `implementation-pathway:${p.id}`,
        `innovation:${p.id}`,
        `lecturer-adaptation:${p.id}`,
        ...p.researchConnections.flatMap((c) => [
          `research-insight:${p.id}-${c.id}`,
          `research-paper:${c.link.paperId}`,
        ]),
        ...p.framework.applications.flatMap((a) => [
          `implementation-application:${a.id}`,
          `observable-evidence:${a.id}-evidence`,
        ]),
        `course:${p.courseId}`,
        ...p.learningOutcomeIds.map((id) => `learning-outcome:${id}`),
        ...p.assessmentIds.map((id) => `assessment:${id}`),
      ]),
    );
    if (!filters.challengeId && !filters.courseId && filters.assessmentId)
      seeds.add(`assessment:${filters.assessmentId}`);
    if (
      !filters.challengeId &&
      filters.competencyId &&
      !filters.courseId &&
      !filters.assessmentId
    ) {
      seeds.add(`competency:${filters.competencyId}`);
      content.assessments
        .filter((a) => a.competencyIds.includes(filters.competencyId!))
        .forEach((a) => seeds.add(`assessment:${a.id}`));
    }
    allowed = new Set(seeds);
    // Expand only authored pathway/assessment relationships, not other courses
    // that happen to share a competency or resource.
    graph.relationships.forEach((e) => {
      const from = `${e.from.kind}:${e.from.id}`;
      const to = `${e.to.kind}:${e.to.id}`;
      if (
        seeds.has(from) &&
        e.relation !== "related-approach" &&
        !(e.from.kind === "course" && !seeds.has(to))
      )
        allowed!.add(to);
    });
  }
  const relationships = graph.relationships.filter(
    (e) =>
      (!filters.relation || e.relation === filters.relation) &&
      (!allowed ||
        (allowed.has(`${e.from.kind}:${e.from.id}`) &&
          allowed.has(`${e.to.kind}:${e.to.id}`))),
  );
  const endpoints = new Set(
    relationships.flatMap((e) => [
      `${e.from.kind}:${e.from.id}`,
      `${e.to.kind}:${e.to.id}`,
    ]),
  );
  const nodes = graph.nodes.filter(
    (n) =>
      (!allowed || allowed.has(n.key)) &&
      (!filters.relation || endpoints.has(n.key)),
  );
  return { nodes, relationships };
}
/** A visual projection of actual graph edges, never a second relationship model. */
export function innovationPathwayView(
  graph: Pick<CompetencyEvidenceGraph, "nodes" | "relationships">,
  innovationId: string,
) {
  const byKey = new Map(graph.nodes.map((n) => [n.key, n]));
  const targets = (keys: string[], relations: string[], reverse = false) => [
    ...new Set(
      keys.flatMap((key) =>
        graph.relationships
          .filter(
            (e) =>
              relations.includes(e.relation) &&
              key ===
                (reverse
                  ? `${e.to.kind}:${e.to.id}`
                  : `${e.from.kind}:${e.from.id}`),
          )
          .map((e) =>
            reverse ? `${e.from.kind}:${e.from.id}` : `${e.to.kind}:${e.to.id}`,
          ),
      ),
    ),
  ];
  const innovation = [`innovation:${innovationId}`].filter((k) => byKey.has(k));
  const insights = targets(
    innovation,
    ["interpretation-informs-innovation"],
    true,
  );
  const papers = targets(insights, ["source-informs-interpretation"], true);
  const examples = targets(innovation, [
    "innovation-has-worked-example",
    "innovation-has-application",
  ]);
  const evidence = targets(examples, [
    "produces-student-evidence",
    "application-produces-evidence",
  ]);
  const adaptation = targets(evidence, ["evidence-guides-adaptation"]);
  return [
    {
      label: "Research",
      relation: "Source informs interpretation",
      keys: papers,
    },
    {
      label: "Research interpretation",
      relation: "Interpretation informs innovation",
      keys: insights,
    },
    {
      label: "Innovation",
      relation: "Framework has illustrative applications",
      keys: innovation,
    },
    {
      label: "Implementation",
      relation: "Activity produces proposed evidence",
      keys: examples,
    },
    {
      label: "Competency evidence",
      relation: "Evidence guides lecturer adaptation",
      keys: evidence,
    },
    {
      label: "Lecturer adaptation",
      relation: "Review and edit the planning assumptions",
      keys: adaptation,
    },
  ].map((g) => ({
    ...g,
    nodes: g.keys.flatMap((k) => (byKey.has(k) ? [byKey.get(k)!] : [])),
  }));
}
