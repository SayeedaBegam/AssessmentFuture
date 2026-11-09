# Catalogue content schema and review guide

This guide describes schema version 1. It is the authoring contract for the larger catalogue. The application remains a local, programme independent research prototype. None of the workflow statuses is a rating of educational effectiveness.

The research to practice extension is documented in [RESEARCH_TO_PRACTICE.md](RESEARCH_TO_PRACTICE.md), including implementation pathways, resources, additional graph entities and independent publication editorial review. Existing schema version 1 IDs remain stable; the new corpus collections accept empty defaults for compatibility.

The subsequent [UI and framework extension](UI_REDESIGN.md) adds a required `framework` object to each implementation, three distinct discipline applications with explicit competency mappings, and four projected graph kinds. Author those fields in the keyed framework record extension. They do not create duplicate assessments or publications, and their draft status does not imply research verification.

The [map decision support extension](MAP_DECISION_SUPPORT.md) adds a required `decisionSupport` object to each implementation and a validated `assessmentChallenges` collection. Challenges reference existing implementation IDs and do not introduce graph nodes. Comparison, scalability and data protection questions remain editorial proposals; schedules and estimates reuse the existing record fields.

## What changed

- All 18 existing assessment IDs and slugs are now explicit, unchanged strings. Names can be edited without changing identity or URLs.
- No assessment purpose, AI category, feedback approach, workload description, or other metadata is assigned from array position. The migration preserves the previous values as draft editorial content, rather than treating them as newly reviewed facts.
- Three catalogue classifications are available. Classification, assessment editorial review, and assessment research verification are separate fields and separate filters.
- Runtime schemas check record shape and workflow consistency. Corpus validation checks IDs, slugs, references, evidence scope, adaptation lineage, and graph relationships.
- Observable student evidence, AI use conditions, and implementation considerations have their own structured records. The Competency Evidence Graph now also supplies the interactive Evidence Map and complete text alternatives.
- The current 18 approaches remain in the supplied programme inventory classification. The other two classifications are ready for authored entries but have no published assessment records yet. No new research references or evidence ratings were added.

## Files and responsibilities

| File                                        | Purpose                                                                                                           |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `src/lib/content-schema.ts`                 | Zod schemas and the authoritative inferred TypeScript types                                                       |
| `src/lib/types.ts`                          | Public type exports used by components and content authors                                                        |
| `src/lib/content-validation.ts`             | Corpus references, identity, lineage, evidence consistency, and typed relationship checks                         |
| `src/content/catalogue.ts`                  | Loads all raw collections and validates them before exporting application content                                 |
| `src/content/records/assessment.ts`         | Explicit assessment records, including workflow states and reference IDs                                          |
| `src/content/records/research.ts`           | Original publication records, source verification scope, and research digests                                     |
| `src/content/records/competency.ts`         | Programme independent competency definitions                                                                      |
| `src/content/records/observableEvidence.ts` | Possible observable student work and the limits of its interpretation                                             |
| `src/content/records/aiCondition.ts`        | Illustrative AI use conditions, also used by the existing spectrum and playground                                 |
| `src/content/records/implementation.ts`     | Practical considerations such as workload and accessibility                                                       |
| `src/content/records/programme.ts`          | Optional programme contexts that reference competencies                                                           |
| `src/content/records/resource.ts`           | Illustrative downloadable templates                                                                               |
| `src/content/records/relationships.ts`      | Additional, explicitly authored graph relationships; initially empty                                              |
| `src/lib/competency-evidence-graph.ts`      | Projects explicit references into the extended graph and validates the result                                     |
| `src/content/competency-evidence.ts`        | Exports the graph foundation for future reviewed uses                                                             |
| `src/content/knowledge.ts`                  | The existing curated knowledge map. Its current interface and subset remain unchanged; selection uses stable IDs. |
| `src/lib/catalogue-selectors.ts`            | Stable ID lookup for comparison, playground defaults, and featured records                                        |
| `tests/fixtures/catalogue-identity.json`    | The original 18 identities and URLs, protected by regression tests                                                |

`src/content/assessments.ts` and `src/content/research.ts` remain compatibility entry points for the existing UI. Edit the record files, not those entry points. The schemas are strict: unknown fields and missing required fields are errors, rather than silently ignored additions.

## Identity and URLs

Every assessment has three independent fields:

```ts
id: "individual-coding-assignments",   // permanent relationship identity
slug: "individual-coding-assignments", // existing /explore/... URL segment
name: "Individual coding assignments" // editable display text
```

Do not regenerate IDs or slugs from a name. Do not use an array index as an ID or as a rule for pedagogical metadata. Moving records changes their listing order only.

For a new record, choose an explicit, unique lowercase identifier using letters, digits, and optional hyphens. Choose and retain a unique slug. Internal IDs need not match slugs. Once a URL has been shared, preserve its slug or implement and test an intentional redirect before changing it. This migration needs no redirects because all existing slugs were retained.

The graph uses qualified keys such as `assessment:individual-coding-assignments` and `competency:reasoning`, so different entity types can have independent ID namespaces. Reference fields contain the underlying ID, not the qualified key.

## Three catalogue classifications

| Stored value             | Meaning                                                                                            | Does not establish                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `programme-inventory`    | Identified in the programme level inventory supplied for this project                              | Verified current UTN usage, completeness of that inventory, or educational effectiveness |
| `adaptation-combination` | A variation or combination, with explicit relationships to its established source approach records | That the adaptation is new, institutionally approved, or validated                       |
| `additional-emerging`    | A further possibility included for exploration                                                     | That UTN or another institution does not already use it                                  |

Every record also needs a `classificationNote` explaining the basis and limits of its classification. Classification is not a proxy for quality, novelty, research support, or institutional adoption.

An adaptation must include at least one `relatedApproaches` entry with `relation: "adaptation-of"`, or combination entries with `relation: "combines"`. A combination needs at least two source approaches. All targets must exist. Self references and cyclic derivation/composition are rejected. Ordinary `related-to` or `alternative-to` relationships may be reciprocal.

Nested `adaptations` in a format description are optional teaching variations, not automatically independent assessment records. Promote a variation into the catalogue only when it has its own complete record, classification, relationships, and review states.

## Independent assessment review fields

### Editorial review

```ts
editorialReview: {
  status: "draft", // "draft" | "in-review" | "reviewed"
  note: "Describe what has and has not been reviewed."
}
```

`reviewed` requires an actual `reviewedBy` identifier and `reviewedOn` calendar date in `YYYY-MM-DD` format. The note should describe the editorial decision and its scope. Editorial review covers the assessment prose, classification, competencies, relationships, practical assumptions, tone, and safeguards. It does not automatically upgrade research verification.

### Research verification of the assessment

```ts
researchVerification: {
  status: "not-reviewed", // "not-reviewed" | "in-progress" | "reviewed"
  scope: "not-assessed", // also "contextual-sources" or "format-specific-evidence"
  note: "Contextual readings may be linked while the format review is pending."
}
```

For `reviewed`, provide the actual reviewer, date, scope, and a note explaining what was verified and what remains uncertain.

- `contextual-sources` requires at least one source or full text checked evidence link. It is a completed review of contextual material, not direct evidence that the assessment works.
- `format-specific-evidence` requires direct evidence links with full source provenance and limitations.
- A record can be editorially reviewed while research review remains pending, or have reviewed research links while its assessment prose is still draft. The system never infers one state from another.
- A linked paper's publication page or abstract being checked does not complete an assessment review.

The existing evidence availability filter is derived from actual links: no linked sources, contextual literature, or format specific source links. It is separate from both review workflows and contains no numerical evidence rating.

## Add an assessment approach

1. **Check for an existing identity.** Search the catalogue before adding a duplicate. If changing an existing record, retain its ID and slug.
2. **Create a draft record** in `src/content/records/assessment.ts`, following the `AssessmentApproach` type. Do not copy another record's reviewer metadata or evidence claims as if they apply to the new approach.
3. **Choose a classification and explain it.** Inventory membership needs an inventory basis. Adaptations/combinations need explicit parent references. Additional/emerging entries must avoid claims about institutional absence.
4. **Fill the required fields below.** Select purpose, feedback, workload, AI descriptors, and resources deliberately for that record. No values are inferred from ordering or duration.
5. **Add any needed entity records first.** Define competencies, observable evidence, AI conditions, or practical considerations in their respective collections, then reference their stable IDs. Existing suitable definitions may be reused.
6. **Add source links only where appropriate.** An empty evidence list is allowed while research is unreviewed. Do not create a citation merely to fill a card. Record pending, contextual, and direct links honestly.
7. **Run validation and review the resulting UI.** The catalogue, details, filters, comparison, and playground use the shared records. The existing curated map is deliberately a subset and does not automatically add new graph UI nodes.
8. **Complete editorial and research reviews separately.** Update each workflow only after the corresponding work has happened. Then rerun the checks and inspect the actual pages.

### Required assessment fields

| Group                                    | Fields                                                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Identity and introduction                | `id`, `slug`, `name`, `family`, `description`                                                                                         |
| Independent classification and workflows | `catalogueClassification`, `classificationNote`, `editorialReview`, `researchVerification`                                            |
| Explicit relationships                   | `competencyIds`, `relatedApproaches`, `observableEvidenceIds`, `aiUseConditionIds`, `implementationConsiderationIds`, `evidenceLinks` |
| Practical descriptors                    | `mode`, `uses`, `aiLevel`, `groupSize`, `workload`, `feedback`, `duration`, `resources`                                               |
| Explanatory content                      | `strengths`, `evidence`, `aiConsiderations`, `scalability`, `accountability`, `studentEffort`, `accessibility`, `adaptations`         |

`competencyIds`, `observableEvidenceIds`, `aiUseConditionIds`, and `implementationConsiderationIds` each need at least one existing target and cannot contain duplicate IDs. `relatedApproaches`, `evidenceLinks`, and `adaptations` may be empty when appropriate. The paragraph fields remain useful summaries for the existing tools; structured references support more precise future exploration.

To mark a completed editorial review without misrepresenting unfinished research:

```ts
// Variables below represent the actual review, not invented example reviewers.
const reviewedApproach: AssessmentApproach = {
  ...completeDraftRecord,
  editorialReview: {
    status: "reviewed",
    note: actualEditorialDecision,
    reviewedBy: actualReviewerId,
    reviewedOn: actualReviewDate,
  },
  // Keep this pending unless a separate research appraisal has been completed.
  researchVerification: {
    status: "not-reviewed",
    scope: "not-assessed",
    note: "Editorial review is complete. Assessment research verification remains pending.",
  },
};
```

Do not publish placeholders as reviewed content. The schema checks that review metadata is present; it cannot establish that a named review actually occurred.

## Add or review a research paper

1. Add a `ResearchPaper` record in `src/content/records/research.ts` with an explicit ID and stable `/research/[slug]` segment.
2. Verify the original publication details: full title, authors, issue year, journal/venue, publication type, original HTTPS URL, and DOI where one has actually been verified. The DOI is optional; an invented DOI is never required to satisfy the schema. URLs containing credentials are rejected.
3. State exactly what was checked using `verificationScope` and `verificationNote`.
4. Write only the digest content supported by the material reviewed. Keep findings, authors' interpretations, proposed applications, limitations, and open questions separate.
5. Record the actual verification date. Full text review also requires the responsible `reviewedBy` identifier.
6. Add evidence links from assessments only after deciding what specific relationship is justified. Paper verification alone does not create or upgrade those links.

### Research paper fields

Required: `id`, `slug`, `title`, `authors`, `year`, `venue`, `url`, `type`, `editorialReview`, `verification`, `verificationScope`, `verificationNote`, `reviewStatus`, `verifiedOn`, `evidenceStrength`, and `digest`. Optional: a verified `doi`, an exact verified `publishedOn` calendar date, plus `reviewedBy`, which becomes required for full text review. New publication records may be authored in `research-expansion.ts`, which is included by the original research record module.

`digest` contains all of: `overview`, `question`, `design`, `context`, `findings`, `quantitative`, `interpretation`, `application`, `limitations`, `aiRelevance`, and `openQuestions`. If an item has not been checked, say so explicitly rather than inventing an answer, sample, quotation, or result.

| Actual scope                | `verificationScope` | Existing displayed source status        | Digest workflow label     |
| --------------------------- | ------------------- | --------------------------------------- | ------------------------- |
| Bibliographic metadata only | `metadata-only`     | `Metadata verified · full text pending` | `Pending verification`    |
| Original publication page   | `publication-page`  | `Source verified`                       | `Source summary reviewed` |
| Authors' abstract           | `abstract`          | `Source verified`                       | `Source summary reviewed` |
| Full paper appraised        | `full-text`         | `Source verified`                       | `Source summary reviewed` |

The digest `reviewStatus` is retained for the existing research reading interface. It describes source summary verification, not an assessment's independent editorial approval. `verificationScope` is now also visible beside the digest metadata. The legacy field name `evidenceStrength` stores a written rationale and limitations; do not turn it into an unsupported score or causal claim.

## Evidence links and direct support

Every assessment evidence link contains:

```ts
{
  id: "responsible-ai-context", // stable within this evidence link collection
  paperId: "unesco-genai", // use the actual existing paper ID
  relationship: "Context for discussing responsible AI use, not validation of this assessment.",
  directEvidence: false,
  verificationStatus: "source-checked",
  reviewNote: "Only the original publication page was reviewed."
}
```

Verification values are `unverified`, `metadata-checked`, `source-checked`, and `full-text-reviewed`. The link cannot claim a broader review than its paper record supports. A metadata only paper cannot support a source checked claim.

For a direct evidence claim, all of the following are required:

- `directEvidence: true` and `verificationStatus: "full-text-reviewed"`;
- a paper record with `verificationScope: "full-text"` and its responsible reviewer;
- `supportingClaim`: the specific, context bounded claim supported by the paper;
- `sourceLocator`: the relevant section, page, table, or other traceable location;
- `limitations`: applicability limits and what the paper does not establish;
- the link's actual `reviewedBy`, `reviewedOn`, and `reviewNote`.

Every evidence link has an explicit stable `id`, unique within its owning link collection. Graph source edges use this ID, not the displayed relationship wording, so editing the explanation does not change relationship identity.

The software checks those conditions. A human reviewer must still determine whether the study design, population, context, and results really justify the claim. A conceptual paper or policy document cannot be transformed into causal evidence by changing a status field.

An adaptation's existing `validated` flag remains false for every current example. Setting it true requires `validationNote` and `validationEvidence` containing direct supporting source links. The note must bound the validation claim to its context. No such claim was added during this migration.

## Competency Evidence Graph foundation

The graph covers these entity types:

1. `competency`
2. `assessment`
3. `observable-evidence`
4. `ai-use-condition`
5. `research-paper`
6. `implementation-consideration`

An observable evidence record needs a stable ID, label, description, competency references, AI condition references, `interpretationLimits`, and editorial workflow. It describes possible student work, not actual student submissions or grades.

An AI condition needs a stable ID, name, label, description, illustrative example, question, and editorial workflow. An implementation consideration needs an ID, label, category, description, and editorial workflow. These records are not institutionally approved AI policies or measured workload data.

`buildCompetencyEvidenceGraph(catalogue)` projects only explicit references already stored in the records:

| Relationship                         | From                | To                           | Interpretation                                             |
| ------------------------------------ | ------------------- | ---------------------------- | ---------------------------------------------------------- |
| `targets-competency`                 | Assessment          | Competency                   | Intended competency, editorial proposal                    |
| `elicits-evidence`                   | Assessment          | Observable evidence          | Proposed work to inspect                                   |
| `may-demonstrate`                    | Observable evidence | Competency                   | Proposed interpretation, not a validated measurement claim |
| `considers-ai-condition`             | Assessment          | AI condition                 | Illustrative condition recorded by the editor              |
| `ai-affects-evidence-interpretation` | AI condition        | Observable evidence          | Interpretation issue recorded with the evidence            |
| `has-implementation-consideration`   | Assessment          | Implementation consideration | Practical question explicitly linked by the editor         |
| `related-approach`                   | Assessment          | Assessment                   | The authored relation and rationale                        |
| `has-contextual-source`              | Assessment          | Research paper               | Contextual reading, including explicitly pending reading   |
| `has-direct-source`                  | Assessment          | Research paper               | Specific, reviewed direct claim with provenance            |

Projection never infers a competency gain, causal effect, institutional adoption, or review completion. Relationship IDs use stable entity references rather than positions. Draft mappings remain marked `editorial-proposal`; linked reading remains contextual unless direct support has been explicitly recorded and validated.

### Additional reviewed relationships

The initially empty `additionalRelationshipRecords` array supports carefully authored `research-informs-evidence`, `research-informs-ai-condition`, and `research-informs-implementation` relationships. These link a research paper to the corresponding entity type. They require contextual or direct source links and must not be presented as unsupported decorative connections.

Every additional relationship needs `id`, typed `from`/`to` references, `relation`, `basis`, `explanation`, `provenance`, `editorialReview`, and `evidenceLinks`. Missing provenance is rejected for both projected and manually authored relationships.

`basis` is one of:

- `editorial-proposal`: an explicitly proposed design relationship;
- `contextual-source`: a source informed connection with stated limits;
- `direct-research-evidence`: a specific supported claim, with full text source provenance and a reviewed relationship.

Endpoint types must match the relationship matrix in `relationshipEndpoints`. Unknown nodes, self links, duplicate identities, and duplicate semantic relationships are errors. Distinct source claims can use different source locators. A paper at an endpoint must appear in that relationship's evidence links. Direct support cannot be disguised as a different basis, and an unsupported research link cannot be labeled direct.

The existing `/knowledge-map` remains a curated 14 node, 16 edge view with stable assessment and paper references. The extended graph is rendered at `/evidence-map`, with course, outcome, implementation and institutional resource nodes added to the same data foundation. All proposed mappings retain their review limits.

## Validate and publish content deliberately

```sh
npm run validate:content
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
```

`validate:content` runs the content validation and regression suite. The application also parses the corpus at its content entry point, so malformed records or dangling references fail during application loading/build rather than silently becoming incomplete cards. Errors identify the offending record or field. TypeScript's `satisfies` declarations provide authoring feedback in addition to the runtime checks.

Regression tests protect the original IDs/slugs, rename/reorder behavior, independent classification and review filters, comparisons, playground links, and both graph data and existing map relationships. Published source or pedagogical changes should receive a content review as well as a code review. Seed specific browser assertions about a particular example's source review may need intentional updates when that example is actually reviewed; do not change evidence flags just to satisfy a test.

Before presenting a new reviewed record, inspect its detail page, filter results, comparison, playground output, and original source links. Check the tone and applicable accessibility, workload, privacy, and examination rule considerations with the relevant reviewers. Retain clear limits and uncertainty. Do not include identifiable private course material, lecturer evaluations, student work, or grades.

Future CMS/database ingestion can call the same `parseCatalogue(unknown)` boundary and graph validation. A production editorial system would also need authenticated authorship, review history, content versions, and appropriate publishing controls. The current schema validates structure and declared provenance; it does not provide those services or verify research automatically.
