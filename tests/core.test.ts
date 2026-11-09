import { describe, it, expect } from "vitest";
import {
  assessments,
  competencies,
  programmes,
  resourceTemplates,
} from "../src/content/assessments";
import { papers } from "../src/content/research";
import { evidenceAvailability } from "../src/lib/content-labels";
import { knowledgeNodes, knowledgeEdges } from "../src/content/knowledge";
import {
  calculateWorkload,
  defaultScenario,
  filterAssessments,
  createDesign,
} from "../src/lib/logic";

describe("workload assumptions and calculations", () => {
  it("calculates grading, preparation, feedback, and oral verification separately", () => {
    const r = calculateWorkload({ ...defaultScenario, oral: 10 });
    expect(r.totalSubmissions).toBe(60);
    expect(r.grading).toBe(20);
    expect(r.feedback).toBe(5);
    expect(r.preparation).toBe(3);
    expect(r.verification).toBe(5);
    expect(r.total).toBe(33);
  });
  it("uses groups for shared submissions and students for individual oral verification", () => {
    const r = calculateWorkload({
      ...defaultScenario,
      mode: "group",
      groups: 6,
      oral: 10,
    });
    expect(r.units).toBe(6);
    expect(r.totalSubmissions).toBe(12);
    expect(r.grading).toBe(4);
    expect(r.feedback).toBe(1);
    expect(r.verification).toBe(5);
    expect(r.total).toBe(13);
  });
  it("multiplies submission frequency and marked checkpoints without double-counting preparation", () => {
    const r = calculateWorkload({
      ...defaultScenario,
      students: 15,
      submissions: 2,
      checkpoints: 3,
      minutes: 10,
      feedback: 0,
      preparation: 4,
    });
    expect(r.totalSubmissions).toBe(90);
    expect(r.grading).toBe(15);
    expect(r.preparation).toBe(4);
    expect(r.total).toBe(19);
  });
  it("handles zero and invalid assumptions without negative or NaN output", () => {
    const r = calculateWorkload({
      ...defaultScenario,
      students: 0,
      minutes: -1,
      feedback: NaN,
      preparation: 0,
    });
    expect(r.total).toBe(0);
    expect(r.totalSubmissions).toBe(0);
  });
  it("caps group count at student count and ignores groups in individual mode", () => {
    expect(
      calculateWorkload({
        ...defaultScenario,
        students: 10,
        groups: 100,
        mode: "group",
      }).units,
    ).toBe(10);
    expect(calculateWorkload({ ...defaultScenario, groups: 1 }).units).toBe(30);
  });
});
describe("assessment filtering", () => {
  it("finds the displayed competency name as well as its internal ID", () => {
    const found = filterAssessments(assessments, {
      query: "Critical reasoning",
    });
    expect(found.length).toBeGreaterThan(0);
    expect(
      found.every((assessment) =>
        assessment.competencyIds.includes("reasoning"),
      ),
    ).toBe(true);
  });
  it("returns the complete collection for empty filters", () =>
    expect(filterAssessments(assessments, {})).toHaveLength(
      assessments.length,
    ));
  it("matches search case-insensitively and trims whitespace", () => {
    const r = filterAssessments(assessments, { query: "  PORTFOLIO  " });
    expect(r).toHaveLength(1);
    expect(r[0].name).toBe("Portfolios & staged assessment");
  });
  it("combines family and competency filters", () => {
    const r = filterAssessments(assessments, {
      family: "Research & inquiry",
      competency: "research",
    });
    expect(r.length).toBeGreaterThan(0);
    expect(r.length).toBeLessThan(18);
    expect(
      r.every(
        (a) =>
          a.family === "Research & inquiry" &&
          a.competencyIds.includes("research"),
      ),
    ).toBe(true);
  });
  it("includes formats suitable for either working arrangement", () => {
    const r = filterAssessments(assessments, { mode: "Collaborative" });
    expect(r.some((a) => a.mode === "Either")).toBe(true);
    expect(r.every((a) => a.mode !== "Individual")).toBe(true);
  });
  it("returns an honest empty state when filters conflict", () =>
    expect(
      filterAssessments(assessments, {
        family: "Communication",
        resources: "Specialist equipment",
      }),
    ).toEqual([]));
  it("supports every advanced descriptive filter", () => {
    for (const key of [
      "aiLevel",
      "groupSize",
      "workload",
      "feedback",
      "duration",
      "resources",
    ] as const) {
      const value = assessments[0][key];
      const r = filterAssessments(assessments, { [key]: value });
      expect(r.length).toBeGreaterThan(0);
      expect(r.every((a) => a[key] === value)).toBe(true);
    }
  });
  it("filters evidence availability independently of editorial review", () => {
    const r = filterAssessments(assessments, {
      evidenceStatus: "Contextual literature",
    });
    expect(r.length).toBeGreaterThan(0);
    expect(
      r.every((a) => evidenceAvailability(a) === "Contextual literature"),
    ).toBe(true);
  });
});
describe("content integrity and evidence relationships", () => {
  it("uses stable unique IDs and slugs", () => {
    for (const collection of [assessments, papers]) {
      expect(new Set(collection.map((x) => x.id)).size).toBe(collection.length);
      expect(new Set(collection.map((x) => x.slug)).size).toBe(
        collection.length,
      );
    }
  });
  it("resolves every competency, programme, and source relationship", () => {
    for (const a of assessments) {
      for (const id of a.competencyIds)
        expect(competencies.some((c) => c.id === id)).toBe(true);
      for (const e of a.evidenceLinks)
        expect(papers.some((p) => p.id === e.paperId)).toBe(true);
    }
    for (const p of programmes)
      for (const id of p.competencyIds)
        expect(competencies.some((c) => c.id === id)).toBe(true);
  });
  it("requires support for validated adaptations and direct source claims", () => {
    for (const a of assessments) {
      for (const adaptation of a.adaptations)
        if (adaptation.validated)
          expect(
            adaptation.validationEvidence?.some((link) => link.directEvidence),
          ).toBe(true);
      for (const link of a.evidenceLinks)
        if (link.directEvidence) {
          expect(link.verificationStatus).toBe("full-text-reviewed");
          expect(
            papers.find((p) => p.id === link.paperId)?.verificationScope,
          ).toBe("full-text");
        }
    }
  });
  it("includes original sources and scopes pending verification", () => {
    for (const p of papers) {
      expect(p.url).toMatch(/^https:\/\//);
      expect(p.evidenceStrength.length).toBeGreaterThan(20);
      if (p.reviewStatus === "Pending verification") {
        expect(p.digest.findings).toContain("No findings");
        expect(p.verification).toContain("pending");
      }
    }
  });
  it("has no dangling, duplicate, self-referential, or unlabeled map edges", () => {
    const ids = new Set(knowledgeNodes.map((n) => n.id));
    expect(ids.size).toBe(knowledgeNodes.length);
    expect(new Set(knowledgeEdges.map((e) => e.from + e.to)).size).toBe(
      knowledgeEdges.length,
    );
    for (const e of knowledgeEdges) {
      expect(ids.has(e.from)).toBe(true);
      expect(ids.has(e.to)).toBe(true);
      expect(e.from).not.toBe(e.to);
      expect(e.label.length).toBeGreaterThan(5);
    }
  });
  it("marks all downloadable resources as illustrative", () => {
    for (const r of resourceTemplates) {
      expect(r.status).toBe("Illustrative template");
      expect(r.content).toContain("ILLUSTRATIVE");
    }
  });
});
describe("transparent playground rules", () => {
  it("identifies a working arrangement that adapts the catalogue format", () => {
    const outline = createDesign(assessments[0], {
      assessmentId: assessments[0].id,
      competencies: [],
      students: 30,
      mode: "Collaborative",
      ai: "Documented support",
      feedback: "Peer feedback",
      hours: 4,
      resources: "Computing environment",
    });
    expect(outline[0].text).toContain(
      "Your selected arrangement would be an adaptation",
    );
  });
  const input = {
    assessmentId: assessments[0].id,
    competencies: ["Coding"],
    students: 30,
    mode: "Collaborative",
    ai: "Documented support",
    feedback: "Peer feedback",
    hours: 4,
    resources: "Computing environment",
  };
  it("uses selected cohort, group assumptions, marking budget, and competencies", () => {
    const r = createDesign(assessments[0], input);
    expect(r[0].text).toContain("8 groups");
    expect(r[1].text).toContain("Coding");
    expect(r[5].text).toContain("30.0 minutes per group");
    expect(r[6].text).toContain("computing environment");
  });
  it("respects final-feedback-only selection and exposes tight marking constraints", () => {
    const r = createDesign(assessments[0], {
      ...input,
      mode: "Individual",
      hours: 1,
      feedback: "Final feedback only",
    });
    expect(r[2].text).toContain("final feedback only");
    expect(r[5].text).toContain("2.0 minutes per student");
    expect(r[5].text).toContain("tightly scoped");
  });
});
