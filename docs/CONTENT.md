# Content and evidence authoring

The current authoring contract is [CONTENT_SCHEMA.md](CONTENT_SCHEMA.md). It contains the complete schema, file map, review workflows, relationship rules, and instructions for adding reviewed assessments and research papers.

## Where to edit

- Assessments: `src/content/records/assessment.ts`
- Research papers: `src/content/records/research.ts`
- Additional publications: `src/content/records/research-expansion.ts`
- Courses, outcomes and implementation pathways: `src/content/records/pathways.ts`
- General innovation frameworks and discipline applications: `src/content/records/innovation-framework.ts`
- Challenge entry points: `src/content/records/assessment-challenge.ts`
- Map comparison and feasibility notes: `src/content/records/map-decision-support.ts`
- Institutional and practitioner resources: `src/content/records/institutional-resource.ts`
- Competencies: `src/content/records/competency.ts`
- Observable student evidence: `src/content/records/observableEvidence.ts`
- AI use conditions: `src/content/records/aiCondition.ts`
- Implementation considerations: `src/content/records/implementation.ts`
- Additional graph relationships: `src/content/records/relationships.ts`
- Programme contexts and resources: their respective record files.

The former seed adapter has been removed. IDs and slugs are explicit and must remain stable. The public assessment and research modules are compatibility exports from the validated corpus, not authoring locations.

## Review before publication

1. Choose one of the three catalogue classifications and explain its basis. Inventory membership or additional/emerging classification does not establish institutional usage or absence.
2. Complete assessment metadata and resolve every referenced record. Do not infer values from array position or duplicate another entry's review approvals.
3. Track editorial review and assessment research verification independently. A source page check is not a completed assessment review.
4. Preserve original source details. Separate findings, authors' interpretations, practical proposals, limitations, and uncertainty. Do not invent references, ratings, outcomes, or reviewer identities.
5. Use contextual links where appropriate. Direct support requires full paper review, a specific claim, a locator, limitations, and actual reviewer provenance.
6. Run `npm run validate:content`, type checks, lint, unit tests, browser tests, and the production build. Inspect the resulting interfaces as well as the records.

The Competency Evidence Graph supports the interactive `/evidence-map` and complete text alternatives. Its proposed mappings are not validated measurements or causal findings. The existing knowledge map interface remains a curated subset. See [RESEARCH_TO_PRACTICE.md](RESEARCH_TO_PRACTICE.md) for the implementation schema, graph extension and authoring workflow.

All assessment examples should remain respectful of lecturer judgment. Do not add identifiable private assignments, student work, grades, or evaluations of individual lecturers or courses. Verify institutional requirements separately.

The [interface and framework extension guide](UI_REDESIGN.md) documents the shared design tokens, general lecturer frameworks, three discipline applications per innovation, and the extended six stage research pathway. Original detailed examples and URLs remain stable.

The [map decision support guide](MAP_DECISION_SUPPORT.md) documents the seven challenge entry points, required `decisionSupport` extension, reused semester/research/feasibility content and testing. The [Andrea briefing review](ANDREA_BRIEFING_REVIEW.md) explicitly records the missing source limitation.
