import { describe, expect, it } from "vitest";
import { catalogue, competencyEvidenceGraph } from "../src/content/catalogue";
import { parseCatalogue } from "../src/lib/content-validation";
import { filterEvidenceGraph } from "../src/lib/implementation-tools";
import {
  illustrativeCohortScenarios,
  researchConnectionLabel,
} from "../src/lib/map-decision-support";
describe("assessment challenge entry points", () => {
  it("connects seven optional challenges to existing frameworks without creating graph nodes or publications", () => {
    expect(catalogue.assessmentChallenges).toHaveLength(7);
    expect(catalogue.implementations).toHaveLength(8);
    expect(
      catalogue.implementations.flatMap((p) => p.framework.applications),
    ).toHaveLength(24);
    expect(catalogue.papers).toHaveLength(15);
    for (const c of catalogue.assessmentChallenges) {
      expect(c.editorialReview.status).toBe("draft");
      const filtered = filterEvidenceGraph(competencyEvidenceGraph, catalogue, {
        challengeId: c.id,
      });
      expect(
        filtered.nodes
          .filter((n) => n.reference.kind === "innovation")
          .map((n) => n.reference.id)
          .sort(),
      ).toEqual([...c.implementationIds].sort());
      for (const id of c.implementationIds) {
        const p = catalogue.implementations.find((p) => p.id === id)!;
        expect(
          p.assessmentIds.every((id) =>
            filtered.nodes.some((n) => n.key === `assessment:${id}`),
          ),
        ).toBe(true);
        expect(
          p.researchConnections.every((link) =>
            filtered.nodes.some(
              (n) => n.key === `research-paper:${link.link.paperId}`,
            ),
          ),
        ).toBe(true);
      }
    }
    expect(
      competencyEvidenceGraph.nodes.some((n) =>
        String(n.reference.kind).includes("challenge"),
      ),
    ).toBe(false);
  });
  it("combines challenge, course, method and competency filters without leaking unrelated items", () => {
    const graph = filterEvidenceGraph(competencyEvidenceGraph, catalogue, {
      challengeId: "individual-group-competency",
      courseId: "machine-learning",
      assessmentId: "collaborative-coding-assignments",
      competencyId: "collaboration",
    });
    expect(
      graph.nodes
        .filter((n) => n.reference.kind === "innovation")
        .map((n) => n.reference.id),
    ).toEqual(["collaborative-individual-ml"]);
    expect(
      filterEvidenceGraph(competencyEvidenceGraph, catalogue, {
        challengeId: "critical-ai-use",
        assessmentId: "oral-examinations",
      }).nodes,
    ).toHaveLength(0);
    expect(
      filterEvidenceGraph(competencyEvidenceGraph, catalogue, {
        challengeId: "missing",
      }).nodes,
    ).toHaveLength(0);
  });
  it("rejects unknown and repeated challenge references", () => {
    const c = structuredClone(catalogue);
    c.assessmentChallenges[0].implementationIds = ["missing"];
    expect(() => parseCatalogue(c)).toThrow(
      /assessment challenge.*unknown implementations/,
    );
    c.assessmentChallenges[0].implementationIds = [
      "assessment-twins-ml",
      "assessment-twins-ml",
    ];
    expect(() => parseCatalogue(c)).toThrow(/Duplicate references/);
  });
});
describe("decision support content and estimates", () => {
  it("requires complete comparisons and data protection questions for all eight original records", () => {
    for (const p of catalogue.implementations) {
      for (const value of Object.values(p.decisionSupport))
        expect(value.length).toBeGreaterThan(1);
      expect(
        p.decisionSupport.dataProtectionQuestions.length,
      ).toBeGreaterThanOrEqual(2);
    }
    const c = structuredClone(catalogue);
    delete (c.implementations[0] as Partial<(typeof c.implementations)[0]>)
      .decisionSupport;
    expect(() => parseCatalogue(c)).toThrow(/decisionSupport/);
  });
  it("reuses the workload formula with constant group size and counts oral effort per student", () => {
    const p = catalogue.implementations.find(
      (p) => p.id === "dialogic-defence-robotics",
    )!;
    const scenarios = illustrativeCohortScenarios(p);
    expect(scenarios.map((s) => s.students)).toEqual([30, 60, 120]);
    expect(scenarios.map((s) => s.groups)).toEqual([6, 12, 24]);
    expect(scenarios.map((s) => s.verification)).toEqual([2.5, 5, 10]);
    expect(scenarios.map((s) => s.preparation)).toEqual([2, 2, 2]);
    expect(scenarios.map((s) => s.total)).toEqual([9, 16, 30]);
  });
  it("distinguishes theoretical and contextual connections while keeping all current proposals unverified", () => {
    const labels = new Set(
      catalogue.implementations.flatMap((p) =>
        p.researchConnections.map(researchConnectionLabel),
      ),
    );
    expect(labels).toEqual(
      new Set([
        "Theoretical or conceptual support",
        "Contextual research reading",
      ]),
    );
    expect(
      catalogue.implementations.every(
        (p) => p.researchVerification.status === "not-reviewed",
      ),
    ).toBe(true);
  });
});
