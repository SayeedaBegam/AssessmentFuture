import type { AssessmentApproach, ResearchPaper } from "./types";

export const featuredAssessmentIds = [
  "individual-coding-assignments",
  "individual-research-projects",
  "portfolios-and-staged-assessment",
] as const;
export function requireAssessment(
  items: AssessmentApproach[],
  id: string,
): AssessmentApproach {
  const assessment = items.find((item) => item.id === id);
  if (!assessment) throw new Error(`Unknown assessment ID: ${id}`);
  return assessment;
}
export function requirePaper(
  items: ResearchPaper[],
  id: string,
): ResearchPaper {
  const paper = items.find((item) => item.id === id);
  if (!paper) throw new Error(`Unknown research paper ID: ${id}`);
  return paper;
}
export function comparisonAssessments(
  items: AssessmentApproach[],
  ids: string[],
): AssessmentApproach[] {
  return [...new Set(ids)]
    .flatMap((id) => {
      const record = items.find((a) => a.id === id);
      return record ? [record] : [];
    })
    .slice(0, 3);
}
export function playgroundAssessment(
  items: AssessmentApproach[],
  id?: string,
): AssessmentApproach {
  return (
    items.find((a) => a.id === id) ??
    requireAssessment(items, "individual-coding-assignments")
  );
}
