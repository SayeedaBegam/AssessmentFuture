# Academic interface redesign

Implemented on 4 November 2026 within the existing Next.js application. The original assessment IDs, research IDs, implementation IDs and route slugs remain unchanged. No services, accounts, API keys or new runtime dependencies were introduced.

## Interface and navigation

The primary navigation has five destinations: Home, Existing Assessments, New Ideas & Innovations, Research to Implementation Map, and Research & Resources. The visible Adapt & Plan disclosure links to all five planning tools and the curated Knowledge Map. Mobile navigation preserves keyboard operation, Escape handling, focus return and current page indicators.

The homepage introduces the project through the requested headline and actions, a featured Assessment Twins example, four starting points and a clickable research to practice pathway. It uses actual catalogue counts and stable links. The former decorative hero treatment has been replaced with practical navigation; the existing maps and planning tools remain available.

`src/app/design-system.css` is the active shared design layer. It centralizes the navy, teal, slate and surface colors, dark theme, typography, spacing, cards, buttons and focus treatments. Legacy token names bridge existing components to the new palette without rewriting their logic. Existing small text declarations use the shared small text token; body copy, forms, cards and detail content have explicit readable sizes. The stronger teal token is used for text on pale teal backgrounds, following a reproduced contrast failure during testing.

Headings use locally bundled Manrope and body text uses locally bundled Inter through `next/font/local`. Variable fonts, `display: swap`, generated fallback metrics and system fallbacks keep loading predictable. The original Google Fonts repository files and SIL Open Font License texts are bundled under `src/app/fonts`. The browser does not fetch fonts from Google or another third party.

Existing assessment cards retain comparison, competencies, AI considerations and scalability. An ordinary disclosure now exposes strengths, feedback and accessibility without adding permanently dense card text. Related innovation links use the existing explicit approach relationships. Inventory membership is explicitly distinguished from verified current UTN course practice.

## Eight frameworks, 24 applications, eight original worked examples

The original implementation records now include a required `framework` object:

- `summary`: the general idea, independent of the original course;
- `meaningfulDifference`: what changes in the assessment design;
- `lecturerSteps`: at least four practical lecturer actions;
- `applications`: at least three applications in distinct technical disciplines.

Each application has a stable explicit ID, discipline, title, intended outcome, competency IDs, student activities, observable evidence, feedback opportunity, AI conditions and feasibility note. All are editorial proposals. No empirical findings or institutional adoption claims were added. The existing course context, timeline, rubric, student brief, fictional teaching material and numeric workload assumptions remain as the detailed worked example within the same record.

The prominent `/implementations` route supports text and discipline filtering. Its existing detail URLs now introduce the framework, a lecturer guide and three discipline applications before the original worked example. Contents navigation distinguishes the general guide from the detailed example. Tool handoffs continue to load the numeric assumptions of that original worked example; they do not pretend that its times have been established for every new application.

Author general content in `src/content/records/innovation-framework.ts`. Its explicit keyed extensions are attached to the original records in `pathways.ts`. Add competency mappings by application ID, using existing competency IDs, then supply the complete application content. Do not copy an assessment or research record to create another discipline example. Application IDs must be unique both within a framework and across the catalogue.

## One graph foundation

The existing Competency Evidence Graph is extended with four projected node kinds: `research-insight`, `innovation`, `implementation-application`, and `lecturer-adaptation`. All original node kinds and relationship identities remain. The new entities project existing authored framework, application and research connection fields; there is no independent UI graph dataset.

| Relationship                        | Source                 | Target                          |
| ----------------------------------- | ---------------------- | ------------------------------- |
| `source-informs-interpretation`     | Research paper         | Research insight                |
| `interpretation-informs-innovation` | Research insight       | Innovation                      |
| `innovation-has-worked-example`     | Innovation             | Original implementation pathway |
| `innovation-has-application`        | Innovation             | Discipline application          |
| `application-produces-evidence`     | Discipline application | Observable evidence             |
| `application-targets-competency`    | Discipline application | Competency                      |
| `evidence-guides-adaptation`        | Observable evidence    | Lecturer adaptation             |

“Research insight” means an explicitly labelled proposed interpretation here. Its description comes from the existing research connection, with its evidence link, scope, review note and provenance retained. It is not an invented finding. A research connection cannot omit its source support or silently become direct evidence.

Application evidence is projected into the existing observable evidence collection with stable IDs derived from explicit application IDs. Its competency mappings are individually authored. It remains proposed student evidence, not observed student data or a validated measurement.

`innovationPathwayView` reads actual typed graph edges to build the six visual columns. Every clickable item is an existing graph node. `filterEvidenceGraph` supports course, competency, assessment method and relationship filters. Course filters refer to the original worked example contexts; discipline applications remain described within the associated framework. The complete filtered node and relationship lists are independent of the visual neighborhood and retain source explanations and review status. On smaller screens the column view scrolls within its own labelled keyboard focusable region, with no page overflow; ordinary cards and complete text lists provide other exploration routes.

The source detail page links directly into the map. Selecting lecturer adaptation exposes the existing contextual tool links, including editable workload and timeline handoffs. The test journey exports an edited timeline and checks the downloaded file contents.

## Research and resources

All 15 original research records and all eight resource pointers remain. Library navigation clearly separates publications and institutional/practitioner/provider resources. Research cards show citation details, source scope, editorial status and actual theoretical/contextual/direct connection roles where authored. Detail pages retain all three reading depths, pending language, limitations and original source links. No new paper appraisal was completed during this redesign.

The supplied ASPO URL and the earlier restricted/unavailable source limits remain visible. This redesign does not establish institutional approval or ASPO compliance.

## Verification and remaining limits

The stages were checked independently: visual/navigation changes; eight framework extensions and 24 applications; graph/filter/journey connections; full regression and accessibility review. The initial complete regression run reproduced insufficient contrast on selected pale teal controls and 320 pixel homepage/workload overflows. Corrections use the stronger teal text token, wrapping within the affected pathway link, constrained input panels and a labelled keyboard accessible data table scroll region. The checks were preserved. Final visual review also corrected the two row header's document height and kept the numbered map columns and their corresponding evidence in a readable order.

Verified on 4 November 2026:

| Check | Result |
| --- | --- |
| TypeScript | Passed; also checked in the final build |
| ESLint | Passed |
| Content validation | 52 checks passed, included in the unit/content total |
| Unit and content suite | All 74 tests passed |
| Complete browser suite | All 33 tests passed, including the 28 preceding tests |
| Final targeted browser rerun | All five affected journey, map, navigation, keyboard and narrow layout tests passed after the final diagram/header adjustments |
| Production build | Passed; 58 static pages generated and all dynamic routes compiled |
| Local route smoke check | Homepage, innovations, map, research and workload returned HTTP 200 |

Tests cover content and graph integrity, existing IDs/URLs, combined filters, comparison, source scope, the complete research to download journey, workload calculations, timeline editing, light/dark modes, keyboard navigation, responsive layouts and automated accessibility in representative states. Desktop homepage, map and framework screens, mobile homepage/calculator/navigation, and the six stage pathway were visually inspected. The full browser suite used the local development server and installed Chrome; the production build was verified separately. No deployment or claim of complete accessibility conformance is implied.

The application remains a local academic prototype. Planning changes remain in page state unless downloaded. Disciplinary content review, research appraisal, assistive technology/user evaluation and institutional review remain necessary. The numeric workload estimates and new discipline applications have not been empirically evaluated. Legacy component layout rules remain in `globals.css`; the shared design layer adapts those components without a full architectural rewrite.
