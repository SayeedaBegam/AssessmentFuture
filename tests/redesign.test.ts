import { describe, expect, it } from "vitest";
import { catalogue, competencyEvidenceGraph } from "../src/content/catalogue";
import { parseCatalogue } from "../src/lib/content-validation";
import {
  innovationPathwayView,
  filterEvidenceGraph,
} from "../src/lib/implementation-tools";
describe("cross disciplinary frameworks preserve the original content", () => {
  it("retains the inventory, frameworks and publication identities", () => {
    expect(catalogue.assessments).toHaveLength(18);
    expect(catalogue.implementations).toHaveLength(8);
    expect(catalogue.papers).toHaveLength(15);
    const applications = catalogue.implementations.flatMap(
      (p) => p.framework.applications,
    );
    expect(applications).toHaveLength(24);
    expect(new Set(applications.map((a) => a.id)).size).toBe(24);
    for (const p of catalogue.implementations) {
      expect(
        new Set(p.framework.applications.map((a) => a.discipline)).size,
      ).toBeGreaterThanOrEqual(3);
      expect(p.framework.lecturerSteps.length).toBeGreaterThanOrEqual(4);
      expect(p.activities.length).toBeGreaterThanOrEqual(3);
      expect(p.editorialReview.status).toBe("draft");
      expect(p.researchVerification.status).toBe("not-reviewed");
    }
  });
  it("projects every six stage pathway from existing typed graph relationships", () => {
    for (const p of catalogue.implementations) {
      const columns = innovationPathwayView(competencyEvidenceGraph, p.id);
      expect(columns).toHaveLength(6);
      expect(columns.every((c) => c.nodes.length > 0)).toBe(true);
      expect(
        columns
          .find((c) => c.label === "Competency evidence")!
          .nodes.map((n) => n.reference.id),
      ).toEqual([
        ...p.observableEvidenceIds,
        ...p.framework.applications.map((a) => `${a.id}-evidence`),
      ]);
      expect(
        columns.find((c) => c.label === "Implementation")!.nodes,
      ).toHaveLength(4);
      expect(
        columns
          .find((c) => c.label === "Research")!
          .nodes.map((n) => n.reference.id)
          .sort(),
      ).toEqual(
        [...new Set(p.researchConnections.map((c) => c.link.paperId))].sort(),
      );
      expect(
        columns
          .flatMap((c) => c.nodes)
          .every((n) =>
            competencyEvidenceGraph.nodes.some(
              (existing) => existing.key === n.key,
            ),
          ),
      ).toBe(true);
    }
  });
  it("filters competency applications using explicit mappings and rejects unknown competencies", () => {
    const graph = filterEvidenceGraph(competencyEvidenceGraph, catalogue, {
      competencyId: "mathematics",
    });
    expect(
      graph.nodes.some(
        (n) => n.key === "implementation-application:audit-mathematics",
      ),
    ).toBe(true);
    const c = structuredClone(catalogue);
    c.implementations[0].framework.applications[0].competencyIds = ["missing"];
    expect(() => parseCatalogue(c)).toThrow(/unknown competencies/);
  });
  it("rejects repeated application IDs and a single discipline masquerading as three examples", () => {
    const c = structuredClone(catalogue);
    c.implementations[0].framework.applications[1].id =
      c.implementations[0].framework.applications[0].id;
    expect(() => parseCatalogue(c)).toThrow(/Duplicate application ID/);
    c.implementations[0].framework.applications.forEach((a) => {
      a.discipline = "One discipline";
    });
    expect(() => parseCatalogue(c)).toThrow(/three distinct/);
  });
});
