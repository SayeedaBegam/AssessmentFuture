import { describe, expect, it } from "vitest";
import { catalogue } from "../src/content/catalogue";
import { parseCatalogue } from "../src/lib/content-validation";
import { implementationPathwaySchema } from "../src/lib/content-schema";
import { calculateWorkload } from "../src/lib/logic";
import {
  implementationToolLinks,
  filterEvidenceGraph,
} from "../src/lib/implementation-tools";
import { competencyEvidenceGraph } from "../src/content/catalogue";
import {
  validateGraphRelationships,
  graphReferenceKey,
} from "../src/lib/content-validation";
describe("research and resource expansion", () => {
  it("tracks publication editorial approval independently of source appraisal", () => {
    const c = structuredClone(catalogue);
    const paper = c.papers.find(
      (p) => p.id === "garcia-assessment-strategies",
    )!;
    paper.editorialReview = {
      status: "reviewed",
      reviewedBy: "Test fixture reviewer",
      reviewedOn: "2026-11-03",
      note: "Test fixture only: reviewed bibliographic presentation, not study findings.",
    };
    const parsed = parseCatalogue(c).papers.find((p) => p.id === paper.id)!;
    expect(parsed.editorialReview.status).toBe("reviewed");
    expect(parsed.verificationScope).toBe("metadata-only");
    expect(parsed.reviewStatus).toBe("Pending verification");
  });
  it("retains the original readings and deduplicates verified identifiers", () => {
    expect(catalogue.papers.map((p) => p.id)).toEqual(
      expect.arrayContaining([
        "unesco-genai",
        "institutional-policies",
        "feedback-self-regulation",
        "long-term-learning",
        "garcia-assessment-strategies",
        "peters-angelov-aicai",
      ]),
    );
    expect(catalogue.papers).toHaveLength(15);
    const duplicate = structuredClone(catalogue);
    duplicate.papers[1].doi = duplicate.papers[0].doi;
    expect(() => parseCatalogue(duplicate)).toThrow(/duplicate DOI/);
  });
  it("keeps inaccessible resources and the failed ASPO link explicit", () => {
    expect(catalogue.institutionalResources).toHaveLength(8);
    expect(
      catalogue.institutionalResources.find((r) => r.id === "utn-aspo")?.access,
    ).toBe("Supplied link returned 404");
    expect(
      catalogue.institutionalResources.find((r) => r.id === "utn-workshop")
        ?.access,
    ).toBe("Access not verified");
    expect(
      catalogue.institutionalResources.every(
        (r) => r.editorialReview.status === "draft",
      ),
    ).toBe(true);
  });
});
describe("connected graph and tool handoffs", () => {
  it("rejects relationships without explicit provenance", () => {
    const edge = structuredClone(competencyEvidenceGraph.relationships[0]);
    delete (edge as Partial<typeof edge>).provenance;
    expect(() => validateGraphRelationships(catalogue, [edge])).toThrow(/provenance/);
  });
  it("projects all new entities into the existing graph with traceable, stable relationships", () => {
    const graph = competencyEvidenceGraph;
    expect(
      graph.nodes.filter((n) => n.reference.kind === "implementation-pathway"),
    ).toHaveLength(8);
    expect(
      graph.nodes.filter((n) => n.reference.kind === "learning-outcome"),
    ).toHaveLength(8);
    expect(
      graph.nodes.filter((n) => n.reference.kind === "course"),
    ).toHaveLength(3);
    expect(() =>
      validateGraphRelationships(catalogue, graph.relationships),
    ).not.toThrow();
    const nodes = new Set(graph.nodes.map((n) => n.key));
    for (const e of graph.relationships) {
      expect(nodes.has(graphReferenceKey(e.from))).toBe(true);
      expect(nodes.has(graphReferenceKey(e.to))).toBe(true);
      expect(e.provenance.length).toBeGreaterThan(15);
      expect(e.editorialReview.status).toBeTruthy();
    }
    expect(
      graph.relationships.some(
        (e) => e.relation === "directly-investigated-by",
      ),
    ).toBe(false);
  });
  it("combines course, method and relationship filters without leaking unrelated pathways", () => {
    const filtered = filterEvidenceGraph(competencyEvidenceGraph, catalogue, {
      courseId: "robotics",
      assessmentId: "oral-examinations",
      relation: "implements-approach",
    });
    expect(filtered.relationships).toHaveLength(2);
    expect(
      filtered.nodes
        .filter((n) => n.reference.kind === "implementation-pathway")
        .map((n) => n.reference.id),
    ).toEqual(["dialogic-defence-robotics"]);
    expect(
      filterEvidenceGraph(competencyEvidenceGraph, catalogue, {
        courseId: "human-and-ai",
        assessmentId: "oral-examinations",
      }).nodes,
    ).toHaveLength(0);
  });
  it("keeps URL slugs independent of IDs when constructing links and preserves tool assumptions", () => {
    const c = structuredClone(catalogue);
    const p = c.implementations[0];
    c.assessments.find((a) => a.id === p.assessmentIds[0])!.slug =
      "test-display-url";
    const links = implementationToolLinks(p, c);
    expect(links.find((l) => l.label === "Assessment Explorer")!.href).toBe(
      "/explore/test-display-url",
    );
    expect(
      links.find((l) => l.label === "Assessment Playground")!.href,
    ).toContain(`format=${p.assessmentIds[0]}&ai=${p.aiUse.conditionId}`);
    expect(
      links.find((l) => l.label === "Workload Calculator")!.href,
    ).toContain(`implementation=${p.id}`);
  });
});
describe("eight complete proposed implementation pathways", () => {
  it("validates eight distinct pathways without duplicating the original approaches", () => {
    expect(catalogue.implementations).toHaveLength(8);
    expect(catalogue.assessments).toHaveLength(18);
    expect(new Set(catalogue.implementations.map((p) => p.id)).size).toBe(8);
    for (const p of catalogue.implementations) {
      expect(implementationPathwaySchema.safeParse(p).success).toBe(true);
      expect(p.editorialReview.status).toBe("draft");
      expect(p.researchVerification.status).toBe("not-reviewed");
      expect(p.institutionalConsiderations.aspoReview).toBe(
        "Required before use",
      );
      expect(p.researchConnections.every((c) => !c.link.directEvidence)).toBe(
        true,
      );
      expect(implementationToolLinks(p)).toHaveLength(8);
    }
  });
  it.each([
    "studentInstructions",
    "teachingMaterials",
    "feedback",
    "rubric",
    "workload",
    "researchConnections",
    "institutionalConsiderations",
    "individualEvidence",
    "accessibility",
    "aiUse",
  ])(
    "requires %s instead of silently accepting an incomplete example",
    (field) => {
      const p = structuredClone(catalogue.implementations[0]) as Record<
        string,
        unknown
      >;
      delete p[field];
      expect(implementationPathwaySchema.safeParse(p).success).toBe(false);
    },
  );
  it("rejects dangling references, incorrect course alignment and unsupported direct claims", () => {
    for (const mutation of [
      (c: typeof catalogue) => {
        c.implementations[0].assessmentIds = ["missing"];
      },
      (c: typeof catalogue) => {
        c.implementations[0].courseId = "robotics";
      },
      (c: typeof catalogue) => {
        c.implementations[0].researchConnections[0].link.paperId = "missing";
      },
      (c: typeof catalogue) => {
        c.implementations[0].researchConnections[0].relation =
          "directly-investigated-by";
      },
    ]) {
      const c = structuredClone(catalogue);
      mutation(c);
      expect(() => parseCatalogue(c)).toThrow();
    }
  });
  it("rejects invalid weighting and records the oral duration as an illustrative assumption", () => {
    const p = structuredClone(catalogue.implementations[0]);
    p.rubric[0].weight += 1;
    expect(implementationPathwaySchema.safeParse(p).success).toBe(false);
    const oral = catalogue.implementations.find(
      (p) => p.id === "dialogic-defence-robotics",
    )!;
    expect(oral.workload.students * oral.workload.oral).toBe(150);
    const total = calculateWorkload({ ...oral.workload, name: oral.title });
    expect(total.feedback).toBe(1.5);
    expect(total.verification).toBe(2.5);
    expect(total.total).toBe(9);
    expect(oral.rationale).toContain("not a proven optimal duration");
  });
});
