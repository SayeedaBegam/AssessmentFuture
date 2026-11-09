# Lecturer decision support in the existing research map

Updated 4 November 2026. The six stage pathway, graph nodes and relationships remain in the existing Competency Evidence Graph. No additional graph layer, dashboard or innovation record was introduced.

## What changed

- Seven optional assessment challenge entry points narrow the existing graph to relevant frameworks, their established approaches and research connections.
- All eight original framework records now have an explicit existing/proposed comparison. These describe possible assessment structures and opportunities, not deficiencies in current UTN courses.
- Map detail panels expose the original illustrative semester sequence, lecturer preparation, student activities, feedback, revision, individual evidence, criteria and weights.
- Source details show publication titles, original links, source types, bounded insights, the authored relationship, limitations, source verification and editorial status. Theoretical support, contextual readings, institutional guidance and our proposed adaptation are visibly distinct.
- Feasibility panels show preparation, grading, feedback, oral time, student effort, access/fairness, AI conditions, data protection questions and examination regulation review needs. Editable links lead to the existing workload calculator and timeline.
- All eight frameworks, 24 discipline applications, 18 assessment records, 15 research records and stable URLs are retained. The general framework remains separate from its original course specific worked example.

## Content architecture

| File                                          | Responsibility                                                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `src/content/records/assessment-challenge.ts` | Seven explicit challenge records with stable IDs, draft editorial status and existing implementation IDs                 |
| `src/content/records/map-decision-support.ts` | Eight explicit comparison, extra effort, scalability and data protection extensions keyed by original implementation IDs |
| `src/content/records/pathways.ts`             | Attaches those extensions to the same existing framework/worked example records                                          |
| `src/lib/content-schema.ts`                   | Required comparison content and typed optional challenge collection                                                      |
| `src/lib/content-validation.ts`               | Checks challenge identity and references alongside all existing content/relationship checks                              |
| `src/lib/implementation-tools.ts`             | Combines challenge filtering with the existing course, method, competency and relation filters                           |
| `src/lib/map-decision-support.ts`             | Reuses the existing workload calculation and classifies authored research connections without ratings                    |
| `src/components/map-decision-panel.tsx`       | Native accessible disclosure panels for comparisons, semester sequence, research/guidance, feasibility and applications  |
| `src/components/evidence-map.tsx`             | Connects selection and filtering to the panel without adding graph nodes                                                 |

To add a challenge, supply an explicit ID, title, description, actual relevant existing implementation IDs and an editorial review object. Mappings are editorial entry points, not causal claims. The source approaches and publications are resolved through those implementations; do not copy them into a separate graph dataset. Missing references, duplicate IDs and repeated implementation references are rejected.

To edit a comparison, update the matching stable ID in `map-decision-support.ts`. Required fields are `existingStructure`, `existingFeedback`, `existingEvidence`, `proposedChanges`, `introducedCheckpoints`, `additionalEvidence`, `additionalEffort`, `scalability`, and at least two `dataProtectionQuestions`. Keep existing opportunities conditional and respect variation in course practice. The comparison shares its parent record's draft editorial status and does not upgrade research verification.

The semester, rubric, feedback, AI, accessibility, limitations and institutional sections read the original structured records. Do not duplicate schedules or assign different weights only in the map. Changes made in the calculator and timeline stay in page state; downloading the timeline retains the lecturer's edits without altering the source records.

## Filtering and focus

The optional challenge filter intersects with the existing filters. Conflicting combinations give an empty result rather than introducing an unrelated approach or competency. Reset clears the challenge as well. The six stage projection and complete filtered text lists keep their existing behavior.

The existing route accepts an optional `challenge` query parameter alongside `focus`, for example:

`/evidence-map?challenge=individual-group-competency&focus=innovation:collaborative-individual-ml`

Initial unknown challenge values fall back to the unfiltered entry state. Repeated query parameters use the established first value behavior. Selecting an item still updates the normal inspector. The associated lecturer panel opens the section appropriate to a research, implementation, application or adaptation item; other sections remain available through standard keyboard operable disclosures. Expanded content is outside the inspector's live region so a selection does not announce the whole decision panel at once.

## Estimates and evidence transparency

The cohort table uses the existing workload formula for 30, 60 and 120 students, preserving the original average group size and entered per unit times. Preparation is counted once; grading and feedback use marking units; oral discussion is counted per student. The original oral example therefore has 2.5, 5 and 10 oral hours respectively, with illustrative model totals of 9, 16 and 30 hours. These are arithmetic scenarios, not measured workload, efficiency claims or a validated scalability result. Local moderation, scheduling, access arrangements, resits and operations need separate allowances.

All current design research connections remain theoretical or contextual. The panel states the relationship type without interpreting a broad review as direct validation of a teaching workflow. Metadata only records retain pending findings language. A full paper appraisal is not inferred from publication identity, an abstract summary or an editorial draft. No new evidence ratings, papers or research findings were added.

Institutional guidance is shown separately, including source access results and check dates. The previously supplied ASPO link's recorded failure and pending review flag remain visible. Data protection content consists of questions to resolve locally, not a legal determination. No ASPO compliance, privacy approval or official UTN endorsement is claimed.

## Andrea's briefing

No Tischvorlage AI & Assessment dated 3 November 2026, or other Andrea briefing file, was found in the workspace search. Its 25 candidate entries have not been reconstructed or imported. The five priority topic names in the implementation request are recorded as a pending review queue in [ANDREA_BRIEFING_REVIEW.md](ANDREA_BRIEFING_REVIEW.md). They are not treated as verified publications or evidence of a particular institution's practice. There is no ninth innovation.

## Recommended five minute demonstration

1. **0:00–1:00:** Open the map and choose “Identifying individual competency in group projects”. Select “Collaborative Project with Individual Evidence”. Compare the existing opportunities with the proposed changes.
2. **1:00–2:00:** Expand “Semester implementation”. Show the existing feedback checkpoint, individual explanation and illustrative 60/40 group/individual weighting.
3. **2:00–3:00:** Expand “Research and guidance”. Show the Corbin record's metadata only scope, contextual connection, original source and pending appraisal. This is a proposal, not a validated group assessment method.
4. **3:00–4:00:** Expand feasibility. Compare the illustrative cohort scenarios, review AI/access/data protection questions and open the editable workload calculator.
5. **4:00–5:00:** Return to the map, open the semester timeline, move the individual explanation checkpoint to another week and export it. Finish by showing that the graph nodes and complete text alternative remain keyboard accessible.

## Verification

Verified on 4 November 2026:

| Check | Result |
| --- | --- |
| TypeScript | Passed, also checked by the final build |
| ESLint | Passed |
| Content and relationship validation | All 58 content checks passed |
| Unit and content tests | All 80 passed, including those 58 content checks |
| Browser suite | All 37 passed, including all 33 preceding tests |
| Production build | Passed; all 58 static pages generated and dynamic routes compiled |
| Narrow layout inspection | No page overflow at 320 pixels in the inspected challenge/map state |

New checks cover all seven challenge mappings, filter intersections, comparison completeness, data protection fields, workload arithmetic, source labels, all eight map panels, preserved applications, keyboard disclosures, responsive light/dark states, calculator handoff and an exported edited timeline. Existing route, graph, search, comparison, download and accessibility checks remain in the suite. The desktop comparison was visually inspected. Browser tests used the local development server and installed Chrome; production compilation was verified separately. Automated accessibility checks do not establish complete conformance or replace lecturer and assistive technology feedback.
