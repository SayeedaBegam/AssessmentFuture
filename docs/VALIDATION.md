# Validation record

This is the initial implementation record. See [WEBSITE_AUDIT.md](../WEBSITE_AUDIT.md) for the subsequent independent review, additional regression checks, fixes, and remaining limitations. Server state described below belongs to the initial handoff.

Checked on 3 November 2026 in the supplied Windows workspace, using Node.js 22.16.0 and local Chrome through Playwright.

| Check                            | Result                                                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Dependency installation          | Passed; lockfile included                                                                                                     |
| Development server               | Started successfully; homepage HTTP 200                                                                                       |
| TypeScript strict checks         | Passed                                                                                                                        |
| ESLint                           | Passed with no warnings or errors                                                                                             |
| Production build                 | Passed; all requested route patterns included                                                                                 |
| Vitest                           | 19 tests passed                                                                                                               |
| Playwright                       | 9 tests passed in the final complete run                                                                                      |
| Light-theme axe checks           | No reported violations on 11 representative pages                                                                             |
| Dark-theme axe checks            | No reported violations on 5 representative pages                                                                              |
| Reduced-motion initial rendering | Regression test passed with no console errors and no element transform                                                        |
| Responsive layout                | 390 px route checks passed; additional 320 px checks showed no page overflow on home, workload, timeline, map, and playground |
| Visual review                    | Actual desktop, dark-theme, and mobile screenshots inspected                                                                  |

## Browser coverage

- Home navigation, assessment search, combined filters, dialog dismissal and focus return, detail navigation.
- Research search, pending-evidence wording, original DOI navigation, reading-depth tabs and arrow-key focus.
- Actual comparison data and deterministic playground output, including changed-input notification.
- Live individual/group workload results, per-student oral verification, scenario table and chart data.
- Adding/removing semester stages, switching formative/graded purpose, illustrative-weight review prompt.
- AI spectrum selection and knowledge-map node connections/list view.
- Theme persistence, mobile navigation, skip link, reduced motion, and responsive page widths.

The initial reduced-motion hydration mismatch and tinted-surface contrast failures found during QA were fixed before the final run. The graph offers a list alternative, and chart data is also available in a semantic table.

## Content review

The source contains programme-level editorial examples and no identifiable course assignments, lecturer information, student submissions, grades, or private institutional documents. All practical adaptations remain explicitly unvalidated. The initial source collection has two source-page/abstract summaries and two metadata-verified readings awaiting full-text review. Contextual links are not presented as causal evidence for the proposed assessment designs.

## Limits

Automated testing and visual checks do not establish full WCAG conformance or pedagogical validation. Screen-reader testing, broader browser/device testing, full-text evidence appraisal, and institutional review of examination regulations, branding, privacy, and hosting remain appropriate before an official deployment. Authentication, CMS, AI integration, German translation, and external hosting are future integrations described in the README; they are not represented as active features.

This deliverable was not published. The local QA server is stopped at handoff; use `./start-local.ps1` or the README commands to launch the application.
