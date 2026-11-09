import { describe, expect, it } from "vitest";
import { catalogue } from "../src/content/catalogue";
import {
  parseCatalogue,
  validateGraphRelationships,
} from "../src/lib/content-validation";
import { buildCompetencyEvidenceGraph } from "../src/lib/competency-evidence-graph";
import { competencyEvidenceGraph } from "../src/content/competency-evidence";
import { buildKnowledgeMap } from "../src/content/knowledge";
import { catalogueClassifications } from "../src/lib/content-labels";
import {
  comparisonAssessments,
  playgroundAssessment,
  featuredAssessmentIds,
  requireAssessment,
} from "../src/lib/catalogue-selectors";
import { filterAssessments } from "../src/lib/logic";
import type { AssessmentApproach } from "../src/lib/types";
import identities from "./fixtures/catalogue-identity.json";

const copy = () => structuredClone(catalogue);
const sortedIds = (items: { id: string }[]) => items.map((x) => x.id).sort();
function fixtureApproach(id: string): AssessmentApproach {
  return {
    ...structuredClone(catalogue.assessments[0]),
    id,
    slug: id,
    name: `Test fixture ${id}`,
    classificationNote: "Test fixture only. Not published catalogue content.",
    relatedApproaches: [],
    editorialReview: {
      status: "draft",
      note: "Test fixture draft, not published",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Test fixture research not reviewed",
    },
  };
}

describe("explicit catalogue identities and product relationships", () => {
  it("preserves all 18 existing identifiers and URLs exactly", () => {
    for (const identity of identities)
      expect(
        catalogue.assessments.find((a) => a.id === identity.id)?.slug,
      ).toBe(identity.slug);
  });
  it("preserves metadata and relationship identity when names and ordering change", () => {
    const changed = copy();
    changed.assessments.reverse().forEach((a) => {
      a.name = `Renamed ${a.name}`;
      a.evidenceLinks.forEach((link) => {
        link.relationship = `Updated wording: ${link.relationship}`;
      });
    });
    const parsed = parseCatalogue(changed);
    for (const original of catalogue.assessments) {
      const current = requireAssessment(parsed.assessments, original.id);
      expect({
        ...current,
        name: original.name,
        evidenceLinks: original.evidenceLinks,
      }).toEqual(original);
    }
    expect(
      sortedIds(buildCompetencyEvidenceGraph(parsed).relationships),
    ).toEqual(sortedIds(competencyEvidenceGraph.relationships));
    const before = buildKnowledgeMap(catalogue),
      after = buildKnowledgeMap(parsed);
    expect(after.edges).toEqual(before.edges);
    expect(after.nodes.map((n) => n.id)).toEqual(before.nodes.map((n) => n.id));
    expect(
      featuredAssessmentIds.map(
        (id) => requireAssessment(parsed.assessments, id).id,
      ),
    ).toEqual([...featuredAssessmentIds]);
  });
  it("keeps catalogue filters consistent after reordering", () => {
    const reversed = [...catalogue.assessments].reverse();
    const filters = {
      family: "Research & inquiry",
      mode: "Individual",
      competency: "research",
      classification: "programme-inventory",
      editorialStatus: "draft",
      researchStatus: "not-reviewed",
    };
    expect(sortedIds(filterAssessments(reversed, filters))).toEqual(
      sortedIds(filterAssessments(catalogue.assessments, filters)),
    );
  });
  it("resolves comparison selections and playground links by stable ID", () => {
    const renamed = [...catalogue.assessments]
      .reverse()
      .map((a) => ({ ...a, name: `Renamed ${a.name}` }));
    const ids = [
      "peer-review",
      "unknown-id",
      "individual-coding-assignments",
      "peer-review",
      "oral-examinations",
      "practical-projects",
    ];
    expect(comparisonAssessments(renamed, ids).map((a) => a.id)).toEqual([
      "peer-review",
      "individual-coding-assignments",
      "oral-examinations",
    ]);
    for (const identity of identities)
      expect(playgroundAssessment(renamed, identity.id).slug).toBe(
        identity.slug,
      );
    expect(playgroundAssessment(renamed, "unknown-id").id).toBe(
      "individual-coding-assignments",
    );
  });
  it("does not require programme records to interpret the catalogue", () => {
    expect(
      parseCatalogue({ ...copy(), programmes: [] }).assessments,
    ).toHaveLength(catalogue.assessments.length);
  });
});

describe("classification and independent editorial/research workflows", () => {
  it("defines three classifications without inventing additional published content", () => {
    expect(catalogueClassifications.map((c) => c.id)).toEqual([
      "programme-inventory",
      "adaptation-combination",
      "additional-emerging",
    ]);
    expect(new Set(catalogueClassifications.map((c) => c.id)).size).toBe(3);
  });
  it("filters adaptations and emerging possibilities without tying them to review statuses", () => {
    const data = copy();
    const adaptation = fixtureApproach("fixture-adaptation");
    adaptation.catalogueClassification = "adaptation-combination";
    adaptation.relatedApproaches = [
      {
        approachId: "individual-coding-assignments",
        relation: "adaptation-of",
        rationale: "Test fixture derived from an established format.",
      },
    ];
    adaptation.editorialReview = {
      status: "reviewed",
      reviewedBy: "fixture-reviewer",
      reviewedOn: "2026-11-03",
      note: "Test fixture editorial review only.",
    };
    const emerging = fixtureApproach("fixture-emerging");
    emerging.catalogueClassification = "additional-emerging";
    data.assessments.push(adaptation, emerging);
    const parsed = parseCatalogue(data);
    expect(
      filterAssessments(parsed.assessments, {
        classification: "adaptation-combination",
        editorialStatus: "reviewed",
        researchStatus: "not-reviewed",
      }).map((a) => a.id),
    ).toEqual(["fixture-adaptation"]);
    expect(
      filterAssessments(parsed.assessments, {
        classification: "additional-emerging",
        editorialStatus: "draft",
      }).map((a) => a.id),
    ).toEqual(["fixture-emerging"]);
  });
  it("does not promote assessment review when a linked publication page is checked", () => {
    const data = copy();
    data.assessments[0].editorialReview = {
      status: "draft",
      note: "Test fixture draft",
    };
    data.assessments[0].researchVerification = {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Test fixture research still pending",
    };
    const parsed = parseCatalogue(data);
    expect(parsed.assessments[0].editorialReview.status).toBe("draft");
    expect(parsed.assessments[0].researchVerification.status).toBe(
      "not-reviewed",
    );
  });
  it("requires a base approach for adaptations and two sources for combinations", () => {
    const data = copy();
    data.assessments[0].catalogueClassification = "adaptation-combination";
    expect(() => parseCatalogue(data)).toThrow(/established source approaches/);
    data.assessments[0].relatedApproaches[0].relation = "combines";
    expect(() => parseCatalogue(data)).toThrow(/at least two/);
  });
  it("requires editorial review provenance without treating it as research verification", () => {
    const data = copy();
    data.assessments[0].editorialReview.status = "reviewed";
    expect(() => parseCatalogue(data)).toThrow(/reviewer and review date/);
  });
  it("requires a review scope and checked sources for completed research verification", () => {
    const data = copy();
    data.assessments[0].researchVerification.status = "reviewed";
    expect(() => parseCatalogue(data)).toThrow(
      /scope, reviewer, and review date/,
    );
    data.assessments[0].researchVerification = {
      status: "reviewed",
      scope: "format-specific-evidence",
      note: "Test fixture only",
      reviewedBy: "fixture-reviewer",
      reviewedOn: "2026-11-03",
    };
    expect(() => parseCatalogue(data)).toThrow(/direct evidence links/);
  });
});

describe("runtime schema and relationship validation", () => {
  it("rejects missing explicit IDs instead of deriving them from names", () => {
    const data = copy();
    Reflect.deleteProperty(data.assessments[0], "id");
    expect(() => parseCatalogue(data)).toThrow(/assessments.0.id/);
  });
  it.each(["id", "slug"] as const)("rejects duplicate %s values", (key) => {
    const data = copy();
    data.assessments[1][key] = data.assessments[0][key];
    expect(() => parseCatalogue(data)).toThrow(new RegExp(`duplicate ${key}`));
  });
  it("rejects unexpected fields and incomplete implementation fields", () => {
    const data = copy();
    Object.assign(data.assessments[0], { inventedRating: 5 });
    expect(() => parseCatalogue(data)).toThrow(/Unrecognized key/);
    const incomplete = copy();
    incomplete.assessments[0].scalability = "";
    expect(() => parseCatalogue(incomplete)).toThrow(/scalability/);
  });
  it.each([
    "competencyIds",
    "observableEvidenceIds",
    "aiUseConditionIds",
    "implementationConsiderationIds",
  ] as const)("rejects dangling %s references", (field) => {
    const data = copy();
    data.assessments[0][field] = ["missing-record"];
    expect(() => parseCatalogue(data)).toThrow(/unknown/);
  });
  it("rejects duplicate references and self related approaches", () => {
    const data = copy();
    data.assessments[0].competencyIds.push(
      data.assessments[0].competencyIds[0],
    );
    expect(() => parseCatalogue(data)).toThrow(/Duplicate references/);
    const self = copy();
    self.assessments[0].relatedApproaches[0].approachId =
      self.assessments[0].id;
    expect(() => parseCatalogue(self)).toThrow(/cannot reference itself/);
  });
  it("allows related alternatives but rejects cyclic derivation", () => {
    const data = copy();
    data.assessments[0].relatedApproaches[0].relation = "adaptation-of";
    data.assessments[1].relatedApproaches[0].relation = "adaptation-of";
    expect(() => parseCatalogue(data)).toThrow(/cyclic/);
    expect(() => parseCatalogue(catalogue)).not.toThrow();
  });
  it("rejects unknown research papers and unchecked source claims", () => {
    const data = copy();
    data.assessments[0].evidenceLinks[0].paperId = "nonexistent-paper";
    expect(() => parseCatalogue(data)).toThrow(/unknown research paper/);
    const pending = copy();
    pending.assessments[0].evidenceLinks[1].verificationStatus =
      "source-checked";
    expect(() => parseCatalogue(pending)).toThrow(/only metadata verification/);
  });
  it("rejects malformed original source URLs, DOI syntax, and review dates", () => {
    const url = copy();
    url.papers[0].url = "javascript:alert(1)";
    expect(() => parseCatalogue(url)).toThrow(/HTTPS/);
    const malformed = copy();
    malformed.papers[0].url = "not a URL";
    expect(() => parseCatalogue(malformed)).toThrow(
      /Content validation failed/,
    );
    const credentials = copy();
    credentials.papers[0].url = "https://user:password@example.org/paper";
    expect(() => parseCatalogue(credentials)).toThrow(/credentials/);
    const doi = copy();
    doi.papers[0].doi = "invented-doi";
    expect(() => parseCatalogue(doi)).toThrow(/DOI syntax/);
    const date = copy();
    date.papers[0].verifiedOn = "2026-02-30";
    expect(() => parseCatalogue(date)).toThrow(/real calendar date/);
  });
  it("rejects unsupported direct evidence and false validation of adaptations", () => {
    const data = copy();
    data.assessments[0].evidenceLinks[0].directEvidence = true;
    expect(() => parseCatalogue(data)).toThrow(/Direct evidence needs/);
    const adapted = copy();
    adapted.assessments[0].adaptations[0].validated = true;
    expect(() => parseCatalogue(adapted)).toThrow(/direct supporting evidence/);
  });
});

describe("Competency Evidence Graph foundation", () => {
  it("preserves the foundation and extends it with qualified course and implementation node keys", () => {
    expect(
      new Set(competencyEvidenceGraph.nodes.map((n) => n.reference.kind)),
    ).toEqual(
      new Set([
        "competency",
        "assessment",
        "observable-evidence",
        "ai-use-condition",
        "research-paper",
        "implementation-consideration",
        "institutional-resource",
        "course",
        "learning-outcome",
        "implementation-pathway",
        "innovation",
        "research-insight",
        "implementation-application",
        "lecturer-adaptation",
      ]),
    );
    expect(new Set(competencyEvidenceGraph.nodes.map((n) => n.key)).size).toBe(
      competencyEvidenceGraph.nodes.length,
    );
    expect(
      competencyEvidenceGraph.nodes.filter(
        (n) => n.reference.kind === "assessment",
      ),
    ).toHaveLength(catalogue.assessments.length);
  });
  it("retains proposed mappings and contextual reading links without inventing direct support", () => {
    expect(
      competencyEvidenceGraph.relationships
        .filter((r) => r.basis === "direct-research-evidence")
        .every((r) =>
          r.evidenceLinks.some(
            (link) =>
              link.directEvidence && link.supportingClaim && link.sourceLocator,
          ),
        ),
    ).toBe(true);
    expect(
      competencyEvidenceGraph.relationships.some(
        (r) => r.relation === "elicits-evidence",
      ),
    ).toBe(true);
    expect(
      competencyEvidenceGraph.relationships.some(
        (r) => r.relation === "ai-affects-evidence-interpretation",
      ),
    ).toBe(true);
    expect(() =>
      validateGraphRelationships(
        catalogue,
        competencyEvidenceGraph.relationships,
      ),
    ).not.toThrow();
  });
  it("rejects wrong endpoint kinds, unknown nodes, and duplicate edges", () => {
    const edge = structuredClone(competencyEvidenceGraph.relationships[0]);
    edge.from = { kind: "assessment", id: catalogue.assessments[0].id };
    expect(() => validateGraphRelationships(catalogue, [edge])).toThrow(
      /requires/,
    );
    const missing = structuredClone(competencyEvidenceGraph.relationships[0]);
    missing.to.id = "nonexistent-node";
    expect(() => validateGraphRelationships(catalogue, [missing])).toThrow(
      /unknown/,
    );
    expect(() =>
      validateGraphRelationships(catalogue, [
        competencyEvidenceGraph.relationships[0],
        competencyEvidenceGraph.relationships[0],
      ]),
    ).toThrow(/duplicate/);
    const duplicate = copy();
    duplicate.additionalRelationships.push(
      structuredClone(competencyEvidenceGraph.relationships[0]),
    );
    expect(() => buildCompetencyEvidenceGraph(duplicate)).toThrow(/duplicate/);
  });
  it("allows reviewed direct evidence independently of draft assessment prose, using explicit provenance", () => {
    const data = copy();
    const assessment = data.assessments[0];
    const paper = data.papers.find((p) => p.id === "unesco-genai")!;
    Object.assign(assessment.evidenceLinks[0], {
      directEvidence: true,
      verificationStatus: "full-text-reviewed",
      supportingClaim: "Test fixture claim only",
      sourceLocator: "Test fixture section",
      limitations: "Test fixture context only",
      reviewedBy: "fixture-reviewer",
      reviewedOn: "2026-11-03",
    });
    expect(() => parseCatalogue(data)).toThrow(/full text/);
    paper.verificationScope = "full-text";
    paper.reviewedBy = "fixture-reviewer";
    paper.verificationNote =
      "Test fixture full text review only. This record is not published.";
    assessment.researchVerification = {
      status: "reviewed",
      scope: "format-specific-evidence",
      note: "Test fixture only",
      reviewedBy: "fixture-reviewer",
      reviewedOn: "2026-11-03",
    };
    const parsed = parseCatalogue(data);
    expect(parsed.assessments[0].editorialReview.status).toBe("draft");
    expect(
      buildCompetencyEvidenceGraph(parsed).relationships.some(
        (r) => r.basis === "direct-research-evidence",
      ),
    ).toBe(true);
  });
});
