import { requireAssessment, requirePaper } from "@/lib/catalogue-selectors";
import { assessments, competencies } from "./assessments";
import { papers } from "./research";
import type { CatalogueContent } from "@/lib/types";
export interface KnowledgeNode {
  id: string;
  label: string;
  kind: string;
  description: string;
  href?: string;
}
export interface KnowledgeEdge {
  from: string;
  to: string;
  label: string;
}
export function buildKnowledgeMap({
  assessments,
  competencies,
  papers,
}: Pick<CatalogueContent, "assessments" | "competencies" | "papers">) {
  const nodes: KnowledgeNode[] = [
    ...["unesco-genai", "institutional-policies", "feedback-self-regulation"]
      .map((id) => requirePaper(papers, id))
      .map((p) => ({
        id: p.id,
        label:
          p.id === "unesco-genai"
            ? "UNESCO guidance"
            : p.id === "institutional-policies"
              ? "Institutional AI policies"
              : "Feedback & self regulation",
        kind: "Research",
        description: `${p.title}. ${p.evidenceStrength}`,
        href: `/research/${p.slug}`,
      })),
    {
      id: "responsible-use",
      label: "Responsible AI use",
      kind: "Principle",
      description:
        "An editorial principle informed by UNESCO’s human centered policy framing. It does not establish a single assessment policy.",
    },
    {
      id: "context-matters",
      label: "Context matters",
      kind: "Principle",
      description:
        "An editorial prompt to consider disciplinary fit. Institutional policy patterns are descriptive, not evidence that one approach is effective.",
    },
    {
      id: "feedback-loop",
      label: "Feedback & revision",
      kind: "Principle",
      description:
        "A design exploration. The linked conceptual reading is pending full text verification; no effectiveness claim is made.",
    },
    ...[
      "individual-coding-assignments",
      "peer-review",
      "portfolios-and-staged-assessment",
    ]
      .map((id) => requireAssessment(assessments, id))
      .map((a) => ({
        id: a.id,
        label: a.name,
        kind: "Approach",
        description: a.description,
        href: `/explore/${a.slug}`,
      })),
    ...competencies
      .filter((c) => ["coding", "reasoning", "reflection"].includes(c.id))
      .map((c) => ({
        id: c.id,
        label: c.name,
        kind: "Competency",
        description: `Proposed competency connection: ${c.description} This is an editorial design relationship, not a validated outcome.`,
      })),
    {
      id: "workload",
      label: "Workload & resources",
      kind: "Implementation",
      description:
        "Implementation question: how much preparation, marking, and feedback time is available?",
      href: "/workload",
    },
    {
      id: "access",
      label: "Equitable participation",
      kind: "Implementation",
      description:
        "Implementation question: are materials, tool access, and routes to demonstrate competence accessible?",
      href: "/ai-integration",
    },
  ];
  const edges: KnowledgeEdge[] = [
    {
      from: "unesco-genai",
      to: "responsible-use",
      label: "Contextual policy framing",
    },
    {
      from: "institutional-policies",
      to: "context-matters",
      label: "Descriptive institutional context",
    },
    {
      from: "feedback-self-regulation",
      to: "feedback-loop",
      label: "Candidate conceptual link · pending review",
    },
    {
      from: "responsible-use",
      to: "individual-coding-assignments",
      label: "Proposed design consideration",
    },
    {
      from: "responsible-use",
      to: "portfolios-and-staged-assessment",
      label: "Proposed design consideration",
    },
    {
      from: "context-matters",
      to: "individual-coding-assignments",
      label: "Proposed context question",
    },
    {
      from: "feedback-loop",
      to: "peer-review",
      label: "Proposed design connection · unvalidated",
    },
    {
      from: "feedback-loop",
      to: "portfolios-and-staged-assessment",
      label: "Proposed design connection · unvalidated",
    },
    {
      from: "individual-coding-assignments",
      to: "coding",
      label: "Intended competency evidence",
    },
    {
      from: "individual-coding-assignments",
      to: "reasoning",
      label: "Intended competency evidence",
    },
    {
      from: "peer-review",
      to: "reasoning",
      label: "Intended competency evidence",
    },
    {
      from: "peer-review",
      to: "reflection",
      label: "Intended competency evidence",
    },
    {
      from: "portfolios-and-staged-assessment",
      to: "reflection",
      label: "Intended competency evidence",
    },
    { from: "coding", to: "workload", label: "Consider technical review time" },
    {
      from: "reasoning",
      to: "access",
      label: "Consider equivalent evidence routes",
    },
    {
      from: "reflection",
      to: "workload",
      label: "Consider review and feedback time",
    },
  ];

  const ids = new Set(nodes.map((n) => n.id));
  if (ids.size !== nodes.length)
    throw new Error("Duplicate curated knowledge node IDs");
  for (const edge of edges)
    if (!ids.has(edge.from) || !ids.has(edge.to))
      throw new Error(
        `Unknown curated knowledge relationship: ${edge.from} → ${edge.to}`,
      );
  return { nodes, edges };
}
const curatedKnowledge = buildKnowledgeMap({
  assessments,
  competencies,
  papers,
});
export const knowledgeNodes = curatedKnowledge.nodes;
export const knowledgeEdges = curatedKnowledge.edges;
