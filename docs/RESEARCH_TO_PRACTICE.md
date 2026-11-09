# Research to practice authoring, V1

This extends [CONTENT_SCHEMA.md](CONTENT_SCHEMA.md). The existing 18 assessment IDs and slugs remain unchanged. An implementation is a concrete teaching pathway using one or more established approaches, not a duplicate approach record. All eight examples are proposed designs in fictional teaching contexts.

The [UI redesign guide](UI_REDESIGN.md) describes the current presentation of these records as eight general innovation frameworks. Each now includes a lecturer guide and three additional technical discipline applications while retaining its original detailed worked example and stable URL. The map's new interpretation and application nodes project those same records.

## Files and routes

`src/content/records/teaching-material.ts` contains original fictional teaching packs keyed by stable implementation ID. Every implementation requires at least one `teachingMaterials` entry with `title`, `content` and `lecturerNote`; material must be original fictional content or appropriately sourced public teaching material.

| Source                                          | Responsibility                                                                          |
| ----------------------------------------------- | --------------------------------------------------------------------------------------- |
| `src/content/records/research.ts`               | Four original publications, including the reused Nicol record                           |
| `src/content/records/research-expansion.ts`     | Eleven additional publications and the exact scope of source checks                     |
| `src/content/records/institutional-resource.ts` | Eight institutional, practitioner and provider pointers                                 |
| `src/content/records/pathways.ts`               | Courses, learning outcomes, eight implementation pathways and their observable evidence |
| `src/lib/content-schema.ts`                     | Strict runtime schemas and inferred types                                               |
| `src/lib/content-validation.ts`                 | Reference, identity, DOI, relationship and claim validation                             |
| `src/lib/competency-evidence-graph.ts`          | The existing graph builder, extended to project the new entities                        |
| `src/lib/implementation-tools.ts`               | Tool URLs and pure combined graph filtering                                             |
| `/implementations`, `/implementations/[slug]`   | Browse and read the examples                                                            |
| `/resources`                                    | Source types, access and check limits                                                   |
| `/evidence-map`                                 | Focused interactive exploration and complete accessible lists                           |

`/knowledge-map` keeps its existing curated subset and interface, with a link to the full evidence map. The full map reads the `competencyEvidenceGraph` named export from `src/content/catalogue.ts`, produced by the existing builder. There is no second graph corpus or separate source of relationships.

## Add an implementation

1. Search existing implementation, assessment and publication IDs first. Reuse an approach rather than copying its catalogue record.
2. Add or reuse an illustrative course record and a learning outcome with an explicit ID, course reference and competency IDs. Use official course information only with appropriate verification and permission.
3. Add an `ImplementationPathway` record to `implementationPathwayRecords`. Choose a permanent `id` and `slug`. The first `assessmentIds` entry is the deliberately chosen primary approach for the playground; it is not used to assign pedagogical metadata. All IDs resolve through the validated catalogue. URL construction resolves assessment slugs independently of IDs.
4. Fill every required field described below. Write student facing instructions that can actually be followed using supplied fictional or public materials. Each current example includes a small original fictional teaching pack in `teaching-material.ts`, keyed explicitly by implementation ID. These are draft prompts and evidence cards, not complete tested lab environments. Check and extend them before teaching.
5. Start both review workflows independently. The current examples are `editorialReview.status: "draft"` and `researchVerification.status: "not-reviewed"`. Do not copy another record's reviewer or approval.
6. Supply explicit observable evidence IDs. `pathwayEvidenceRecords` projects the implementation's authored individual evidence and interpretation limits into the same observable evidence collection as the existing catalogue. A repeated evidence ID is rejected. If several pathways deliberately share an evidence record, author it once and change this projection accordingly; do not duplicate it.
7. Keep `institutionalConsiderations.aspoReview` as `Required before use`. V1 has no approved compliance status. Obtain the current official regulations and institutional review outside this prototype.
8. Run the checks below, inspect the rendered page and cross navigation, and arrange subject and editorial review before presenting the design as approved.

### Required implementation content

| Field                 | What to author                                                                                                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identity and context  | `id`, `slug`, `title`, `courseId`, `context`                                                                                                                   |
| Alignment             | `learningOutcomeIds`, `competencyIds`, `assessmentIds`                                                                                                         |
| Classification        | `catalogueClassification`, `classificationNote`; explain the combination or exploratory inclusion without asserting institutional absence                      |
| Review                | Independent `editorialReview` and `researchVerification` objects with notes; completed reviews require actual provenance                                       |
| Purpose               | `rationale`, `suitableSituations`                                                                                                                              |
| Brief                 | At least three `studentInstructions`                                                                                                                           |
| Sequence              | At least three `activities`: permanent ID, week 1–14, title, instructions, evidence, feedback opportunity, formative/summative purpose and illustrative weight |
| Assessment            | `formativeComponents`, `summativeComponents`; summative activity weights total 100, ungraded formative activities have zero weight                             |
| Feedback              | Existing opportunities, possible adaptations, timing, sources, student action, role of revision and workload                                                   |
| Individual evidence   | `individualEvidence`, `observableEvidenceIds`; describe interpretation limits, not authorship proof                                                            |
| Rubric                | At least three explicit criteria with IDs, suggested weight and examples of stronger and developing evidence; weights total 100                                |
| AI conditions         | Existing `conditionId`, permitted and restricted uses, disclosure and an equitable alternative                                                                 |
| Workload              | The calculator's numeric assumptions plus student effort, potentially reusable preparation and an explicit scope/exclusions note                               |
| Inclusion             | At least two accessibility considerations, two fairness considerations and two limitations/failure modes                                                       |
| Research              | At least one `researchConnections` entry with explicit ID, relationship type and existing `EvidenceLink`                                                       |
| Institutional context | Resource IDs, ASPO review flag, note and review questions                                                                                                      |

The inline helpers `step`, `rubric` and `source` only reduce repetition of object syntax. IDs, teaching decisions, times, criteria, weights, classifications and references are explicitly authored for each pathway. No array position assigns those values.

## Add or review a publication

1. Search by DOI, stable ID, original URL and title. Compare versions. Reuse `feedback-self-regulation` for Nicol and Macfarlane-Dick (2006); do not create another record. The user confirmed the Garcia and Peters/Angelov DOI identities recorded in V1.
2. Follow the original publisher, preprint server or author/institution repository. Record title, authors, year, venue, DOI and original URL only when checked. `publishedOn` is optional and requires an actual verified calendar date. A URL's upload year is not necessarily the document's version year.
3. Record `verifiedOn`, `verificationScope`, `verificationNote` and independent `editorialReview`. The older `reviewStatus` remains the source-summary display state for compatibility, not editorial approval. `metadata-only` still requires the pending source-summary labels. Editorial review can be completed while full paper appraisal remains pending; do not upgrade scope automatically.
4. Fill the digest slots with explicit pending language for questions, methods, samples or findings that have not been checked. The quick overview may explain why the reading was included and what was checked. Detailed and practice views must preserve the same uncertainty.
5. For an abstract bounded summary, identify it as such and attribute statements to the authors. A review's study count is not an intervention sample or effect size. Do not assert causality from a pilot or review title.
6. Full paper review requires the actual responsible reviewer. To claim direct support through an evidence link, also provide the precise supported claim, locator, limitations, completed full text verification and real reviewer/date provenance. Software validation does not verify the truth of the claim or reviewer identity.

Research connections use stable explicit connection and link IDs. Choose:

- `contextually-related-to`: background or a reading candidate; not direct support.
- `theoretically-informed-by`: an explicit conceptual interpretation. A systematic review can inspire a design without empirically testing it.
- `directly-investigated-by`: only with a direct evidence link meeting all full text/provenance requirements and a reviewed relationship. None of the current eight implementations has such a link.

General feedback theory must not be used as direct evidence of AI feedback effectiveness. Corbin and colleagues do not currently supply verified direct support for our transfer or group accountability adaptations. Additional targeted literature is needed.

## Resources and privacy

An institutional/practitioner resource has an explicit ID, title, HTTPS URL, source type, access result, description, check note/date and editorial review object. Provider claims and practitioner commentary are not peer reviewed findings. Record access failure rather than inventing document contents. Keep private Canvas, Drive and collaboration material as pointers; do not bypass access controls or copy documents without permission.

The ASPO URL returned 404 during checking. The public AI manual's internal version is April 2025 despite a 2026 upload path. Both limits are visible. No implementation is labelled ASPO compliant. No paid tools, live AI service or API keys are required. Optional provider links are informational.

## The extended graph

The original six node types remain. Four additional kinds extend the same schema: `course`, `learning-outcome`, `implementation-pathway`, `institutional-resource`. Qualified keys remain `kind:id`. Node and relationship IDs are stable under display text edits and record reordering.

New endpoint pairs are enforced by `relationshipEndpoints`:

| Relationship                       | From             | To                     |
| ---------------------------------- | ---------------- | ---------------------- |
| `course-has-outcome`               | Course           | Learning outcome       |
| `outcome-targets-competency`       | Learning outcome | Competency             |
| `implementation-addresses-outcome` | Implementation   | Learning outcome       |
| `assesses-competency`              | Implementation   | Competency             |
| `produces-student-evidence`        | Implementation   | Observable evidence    |
| `implements-approach`              | Implementation   | Assessment             |
| Three research connection types    | Implementation   | Research paper         |
| `informed-by-guidance`             | Implementation   | Institutional resource |

Every edge has an ID, typed endpoints, a description, basis, provenance and review status. Generated edges identify their source record; research edges also retain the specific evidence link. Manually authored additional edges must also provide a specific `provenance` string. Missing provenance is a validation error, not an invitation to infer a source.

The interface offers ordinary keyboard operable controls, focused neighborhood exploration, course/method/relation filters, detail links, visible explanations and complete filtered text lists. Shared competencies do not pull unrelated course implementations into a filtered result. The visual neighborhood is intentionally simple. A course or competency definition has no standalone detail page; it can still be selected and described in the inspector.

## Tool handoffs and estimates

- Comparison receives the stable assessment IDs; the existing playground receives the primary assessment and AI condition.
- Workload receives `?implementation=ID` and loads the record's assumptions. Inputs remain editable. Reset restores the loaded example.
- Timeline receives the same ID and loads activity weeks, names, purposes and weights. Existing editing and download functions remain available. The numeric stage IDs are local editor handles, not content identities.
- AI spectrum accepts `?ai=CONDITION_ID`. Unknown or repeated parameters are handled using the established first value/default behavior.
- The evidence map accepts a qualified `?focus=kind:id`. Unknown focus values fall back to an available item.
- Changes remain in page state and do not modify the source record or survive navigation/reload. Export the existing tool output before leaving.

The workload formula is unchanged: preparation once, grading and feedback per marking unit/submission/checkpoint, oral discussion per student once. For the short dialogic example, 30 × 5 minutes = 150 minutes, or 2.5 hours of oral time. Transitions, scheduling, breaks, moderation, resits and accommodations are extra. Student hours and reusable preparation are authored estimates displayed separately; they are not added to lecturer totals. The group example bundles individual grading explicitly into the group grading budget to avoid omitting it.

## Verification

Run `npm run validate:content`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run test:e2e`, and `npm run build`. `validate:content` includes the architecture and implementation suites. Browser tests cover all eight pages, assessment navigation, source scope, editable handoffs, graph filtering and keyboard behavior, the text alternative and narrow layouts. Automated accessibility checks do not establish complete conformance or substitute for lecturer and assistive technology feedback.

The release scope, source checks and remaining content work are recorded in [RESEARCH_CONTENT_STATUS.md](../RESEARCH_CONTENT_STATUS.md).
