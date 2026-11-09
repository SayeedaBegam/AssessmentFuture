# Assessment Futures

**Designing Assessment in the Age of AI**  
Research-informed assessment possibilities for higher education.

A complete local application prototype for the KI-Tutorien Bayern context. Neutral project branding; no official UTN endorsement is claimed. All assessment examples and practical adaptations are illustrative. No private institutional material, real assignments, lecturer profiles, student work, grades, or student-data collection are included.

## Run locally

Requires Node.js 22.16+ and npm. No API keys, paid services, account, database, or environment file is required.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. To run the production application:

```sh
npm run build
npm start
```

For this Windows workspace, a portable runtime is available in the ignored `.tools/node-v22.16.0-win-x64` folder. In PowerShell, prepend it for the current shell:

```powershell
$env:PATH = "$((Resolve-Path '.tools\node-v22.16.0-win-x64').Path);$env:PATH"
npm.cmd run dev
```

The portable runtime is a development convenience, not an application dependency or a distributable part of the source.

In this workspace you can also run `./start-local.ps1`, which selects the available portable runtime and starts the development server.

## Quality checks

For public hosting through GitHub Pages, see [deployment instructions](docs/GITHUB_PAGES_DEPLOYMENT.md). The workflow preserves the application under the repository URL prefix and builds a static export.

```sh
npm run typecheck
npm run lint
npm run validate:content
npm test
npm run build
```

Tests cover independent workload calculations, individual/group assessment units, per-student oral verification, invalid assumptions, combined filters, content IDs and references, map edges, evidence statuses, and playground rules.

Browser tests cover navigation, combined filters and dialog focus, research depth, comparisons, playground output, live workload calculations, semester editing, map connections, theme persistence, mobile layouts, and automated axe WCAG checks. Run `npx playwright install chromium` once, then `npm run test:e2e`. To use an existing Chrome installation instead of downloading a browser, set `PLAYWRIGHT_CHROME_PATH` to its executable path. Tests start or reuse a local development server. Automated checks support, but do not replace, a formal accessibility audit.

## Project structure

```text
src/
  app/                     Next.js App Router pages, metadata, styles, not-found
    explore/[slug]/        Assessment detail pages (18 seeded approaches)
    research/[slug]/       Research digests and three reading depths
    compare/               Qualitative comparison studio
    playground/            Deterministic design exploration
    workload/              Workload calculator and scenario chart
    ai-integration/        Six illustrative AI-use conditions
    continuous-assessment/ Editable semester pathway
    knowledge-map/         Structured relationships and list alternative
    evidence-map/          Full competency evidence graph, filters and text alternatives
    implementations/       Eight proposed teaching pathways and detailed examples
    resources/             Institutional, practitioner and provider source pointers
    programmes/            Two provisional programme perspectives
    about/                 Methodology, evidence boundaries, safeguards
  components/              Reusable interactive features and shared shell
    ui/                    shadcn-style Button and Radix accessible Dialog
  content/
    records/               Explicit typed records with stable IDs and review workflows
    catalogue.ts           Validated corpus entry point
    competency-evidence.ts Validated graph foundation, including implementation pathways
    knowledge.ts           Existing curated map using stable references
  lib/
    types.ts               Schema derived content types and workload model
    content-schema.ts      Runtime schemas and inferred content types
    content-validation.ts  Identity, reference, workflow, and graph validation
    competency-evidence-graph.ts Structured graph projection
    logic.ts               Pure filtering, workload, and playground rules
    utils.ts               Class composition
tests/core.test.ts         Important logic and content integrity tests
docs/CONTENT.md            Editorial and extension guide
```

## Features

The Research to Implementation Map also supports seven optional assessment challenges, existing/proposed design comparisons, semester implementation views and feasibility/source details. It reuses the current graph and planning tools. See [docs/MAP_DECISION_SUPPORT.md](docs/MAP_DECISION_SUPPORT.md), including the recommended five minute demonstration and the missing Andrea briefing limitation.

The current interface uses a navy and teal academic design, locally bundled Manrope and Inter fonts, five primary navigation sections and a visible Adapt & Plan menu. Eight innovation frameworks now each include three technical discipline applications and a lecturer guide alongside their original worked example. The central map follows typed research, interpretation, innovation, implementation, evidence and adaptation relationships. See [docs/UI_REDESIGN.md](docs/UI_REDESIGN.md) for design tokens, schema changes and verification.

- All requested routes and navigation, mobile navigation, persistent light/dark preference.
- Assessment search, family chips, additional filters, useful empty states, up to three comparison selections, deep links to tools.
- Assessment details with all eleven requested content areas, contextual source links, optional adaptations, and downloadable illustrative resources.
- Searchable research library, publication-type and verification filters, three reading depths, original-source links, evidence scope and limitations.
- Qualitative comparison derived from the actual assessment records; no numerical quality scores.
- Design playground using explicit deterministic rules and downloadable outlines. Editing inputs shows when an outline needs regeneration.
- Workload calculator, cohort presets, group/individual marking units, two scenario snapshots plus current scenario, stacked Recharts chart and accessible data table, visible calculation formula.
- Semester stage adding/removing/reordering, week editing, formative/graded designation, illustrative weights, validation prompts, overview and export. List reordering does not change entered weeks.
- Interactive AI spectrum, programme contexts, and a structured knowledge graph with labeled connections and a list view.
- WCAG 2.2 AA target: semantic structure, skip link, focus styles, keyboard controls, accessible Radix dialog, reduced motion, non-color status text, chart table. A formal audit has not been completed.

## Evidence boundaries

The library contains 15 research records with visible source verification scopes, including pending appraisals. Eight proposed implementation examples connect existing approaches to activities, evidence and research. Eight institutional/practitioner/provider resources have explicit access/check limits. See [RESEARCH_CONTENT_STATUS.md](RESEARCH_CONTENT_STATUS.md). Publication metadata verification is not full paper appraisal, editorial approval or proof of effectiveness.

UNESCO guidance and a descriptive institutional-policy preprint provide context. Neither validates the editorial assessment adaptations. Pending readings do not display findings. Detailed reading mode gives a fuller structured record of available information, not an invented full-text synthesis. No causal learning gains, invented effects, quotations, institutional statistics, or quality ratings are included.

The graph's research-to-principle links are contextual interpretations, and its downstream links are proposed design relationships. The graph is not a validated causal model. ASPO and all examination-regulation compatibility require institutional verification.

## Workload model

```text
units = students (individual) or groups (collaborative)
submissions = units × submissions per unit per checkpoint × marked checkpoints
grading hours = submissions × grading minutes / 60
feedback hours = submissions × additional feedback minutes / 60
oral hours = students × oral minutes / 60  (once per scenario)
total = grading + feedback + preparation hours + oral hours
```

Preparation is a total, not per checkpoint. Feedback is additional to grading time. Ungraded feedback events are not separately modeled; include the time in preparation or adjust a scenario. Moderation, administration, resits, and scheduling overhead are excluded. These are entered assumptions, not measured UTN workload. Group count is bounded by cohort size. Scenarios and designs remain in React session state; exports let the user retain their own results.

## Extending the application

See [docs/CONTENT_SCHEMA.md](docs/CONTENT_SCHEMA.md) for the full schema and exact steps for adding reviewed assessment records, research papers, and graph relationships. [docs/CONTENT.md](docs/CONTENT.md) is the short authoring checklist.

The catalogue distinguishes the supplied programme inventory, adaptations and combinations, and additional or emerging possibilities. These classifications describe this collection and do not establish institutional usage or absence. Editorial approval and assessment research verification are tracked separately. Current migrated assessment records remain editorial drafts with assessment research review pending; linking a checked publication page does not upgrade those statuses.

All 18 existing assessment IDs and URLs are preserved. Record names and array order no longer assign identity or pedagogical metadata. Source records declare their verification scope and independent editorial review. The same Competency Evidence Graph now includes courses, learning outcomes, implementation pathways and institutional resources. `/evidence-map` offers interactive focus and complete text alternatives; `/knowledge-map` retains its curated subset. See [docs/RESEARCH_TO_PRACTICE.md](docs/RESEARCH_TO_PRACTICE.md) for exact authoring instructions and tool handoffs.

- **Approved research database:** introduce a repository adapter behind the typed content imports; preserve source IDs, provenance, verification scope, and human review. Do not let retrieved text become a verified claim automatically.
- **CMS:** map CMS documents to the same TypeScript interfaces and validate at ingestion. Add draft/review/published workflows and role-controlled editorial access.
- **Optional AI exploration:** add an institution-approved server-side provider with retrieval from the reviewed corpus, claim-level citations, uncertainty labels, explicit disclosure, privacy review, and human editorial oversight. Keep the deterministic playground available.
- **Authentication:** add an approved identity provider and server-side authorization for editorial/private records. Revisit retention, consent, processing agreements, and GDPR obligations before collecting any personal data.
- **German localization:** use stable content IDs, move shared interface strings to locale dictionaries, add locale-prefixed routes and translated content variants. All current records are English; no nonfunctional language toggle is shown.
- **Institution-approved hosting:** use a Node-compatible Next.js host or an institution-approved deployment adapter after institutional review. Configure security headers, approved domain, backups, accessibility and privacy review. This deliverable runs locally and has not been published.

The application uses locally bundled Manrope and Inter fonts with system fallbacks and code-native SVG/CSS visuals. It does not need remote font or image requests. Font license files are included beside the bundled assets. It contains no analytics and calls no AI services. Theme is the only localStorage value. Next.js/React server activity during local development is framework behavior; production deployment needs its own operational privacy review.
