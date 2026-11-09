# Content architecture migration

This development stage follows the website audit. It changes the content foundation and a small number of metadata displays while preserving the existing design and tools.

## Preserved behavior

- All 18 original assessment IDs and slugs remain unchanged. The four research IDs and slugs are also unchanged.
- Existing assessment names, practical descriptors, purpose values, feedback approaches, and AI descriptors were copied into explicit records. They were not silently reassigned or promoted to reviewed findings.
- Search, existing filters, comparisons, playground links, AI selection handoff, workload calculations, timeline editing, downloads, theme behavior, and the curated knowledge map continue to use the existing interfaces.
- Featured formats, comparison presets, playground fallback, and curated map membership now use stable IDs instead of collection positions.
- Homepage and research collection counts now come from the records, so future additions do not leave incorrect fixed counts in the UI.

## New data foundation

- Runtime Zod schemas are the source for TypeScript content types.
- Explicit records live in `src/content/records`; compatibility exports use the validated `catalogue` boundary.
- Three classifications are available, with a note recording why each record belongs to its class. Existing records stay in the supplied programme inventory category; the other classes remain empty until content is authored.
- Editorial review and assessment research verification are independent workflow objects, each with notes and review provenance where completed.
- Research papers record verification scope. Evidence links have explicit stable IDs, review scope, rationale, and stronger requirements for direct support.
- Competencies, observable student evidence, AI conditions, research papers, assessments, and implementation considerations have typed relationships and stable qualified graph keys.
- The graph projection labels proposed mappings, contextual sources, and direct reviewed claims separately. No direct evidence claims or additional research relationships were invented during migration.
- Existing assessment evidence descriptions and practical considerations were migrated into draft entity records. These are proposed ways to interpret student work, not observed student data or validated measurements.

## Validation and regressions

The application validates record shape and cross references when loading the corpus. The content suite tests missing and duplicate IDs, slugs, unknown references, unsupported evidence claims, invalid dates and source URLs, review provenance, classification lineage, and graph endpoint constraints. It also checks that renaming/reordering preserves identities and tool relationships.

The original identity fixture protects existing URLs while allowing new records and display name edits. Classification and review filtering is tested with clearly labeled, nonpublished fixtures from all three classes. Browser regressions cover the actual classification controls, independent review labels, legacy detail URLs, comparison links, playground initialization, and map navigation.

Run the complete checks documented in [CONTENT_SCHEMA.md](CONTENT_SCHEMA.md) after content changes. That guide explains precisely how to add and review assessments and papers. Passing validation checks the declared data contract, not the truth of a study, the identity of a reviewer, or institutional approval.

Verified on 3 November 2026: TypeScript checks, ESLint, all 50 unit and content tests, all 22 Playwright browser tests, and the production build passed. The build generated all 36 static pages. Browser tests used the locally installed Chrome browser and include the existing accessibility and responsive checks.

## Limits intentionally retained

The original programme inventory and competency mappings still need subject review. The existing four reference records retain their actual verification limits. There are no newly completed paper appraisals, evidence quality ratings, institutional adoption claims, or claims that an approach is absent from UTN. The five previously unmapped programme competencies were not populated with invented associations.

There is no new graph interface, CMS, database, authentication, automatic source verification, AI service, or editorial publishing platform. Existing development dependency advisories from the audit were not addressed through unrelated major upgrades. The new explicit runtime dependency is Zod, which was already present transitively in this workspace.
