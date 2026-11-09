import { catalogue } from "@/content/catalogue";
import { evidenceAvailability } from "./content-labels";
import type { AssessmentApproach, WorkloadScenario } from "./types";
import { competencies } from "@/content/assessments";
export interface AssessmentFilters {
  query?: string;
  family?: string;
  mode?: string;
  use?: string;
  competency?: string;
  aiLevel?: string;
  groupSize?: string;
  workload?: string;
  feedback?: string;
  duration?: string;
  resources?: string;
  evidenceStatus?: string;
  classification?: string;
  editorialStatus?: string;
  researchStatus?: string;
}
export function filterAssessments(
  items: AssessmentApproach[],
  filters: AssessmentFilters,
) {
  return items.filter((a) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value || value === "All") return true;
      if (key === "query")
        return `${a.name} ${a.description} ${a.family} ${a.competencyIds.map((id) => `${id} ${competencies.find((c) => c.id === id)?.name ?? ""}`).join(" ")}`
          .toLowerCase()
          .includes(value.toLowerCase().trim());
      if (key === "competency") return a.competencyIds.includes(value);
      if (key === "use") return a.uses.includes(value);
      if (key === "mode") return a.mode === value || a.mode === "Either";
      if (key === "classification") return a.catalogueClassification === value;
      if (key === "editorialStatus") return a.editorialReview.status === value;
      if (key === "researchStatus")
        return a.researchVerification.status === value;
      if (key === "evidenceStatus") return evidenceAvailability(a) === value;
      return a[key as keyof AssessmentApproach] === value;
    }),
  );
}
export const defaultScenario: WorkloadScenario = {
  name: "Your scenario",
  students: 30,
  groups: 6,
  mode: "individual",
  submissions: 1,
  minutes: 20,
  checkpoints: 2,
  preparation: 3,
  feedback: 5,
  oral: 0,
};
export function calculateWorkload(s: WorkloadScenario) {
  const safe = (n: number) => (Number.isFinite(n) ? Math.max(0, n) : 0);
  const students = Math.floor(safe(s.students));
  const groups = Math.min(students, Math.floor(safe(s.groups)));
  const units = s.mode === "group" ? groups : students;
  const totalSubmissions =
    units * Math.floor(safe(s.submissions)) * Math.floor(safe(s.checkpoints));
  const grading = (totalSubmissions * safe(s.minutes)) / 60;
  const preparation = safe(s.preparation);
  const feedback = (totalSubmissions * safe(s.feedback)) / 60;
  const verification = (students * safe(s.oral)) / 60;
  return {
    grading,
    preparation,
    feedback,
    verification,
    total: grading + preparation + feedback + verification,
    totalSubmissions,
    units,
  };
}
export const aiSpectrum = catalogue.aiUseConditions;
export interface DesignInputs {
  assessmentId: string;
  competencies: string[];
  students: number;
  mode: string;
  ai: string;
  feedback: string;
  hours: number;
  resources: string;
}
export function createDesign(a: AssessmentApproach, input: DesignInputs) {
  const estimatedUnits =
    input.mode === "Collaborative"
      ? Math.ceil(input.students / 4)
      : input.students;
  const minutesAvailable = estimatedUnits
    ? (input.hours * 60) / estimatedUnits
    : 0;
  return [
    {
      title: "Possible assessment structure",
      text: `${input.mode === "Collaborative" ? `Approximately ${estimatedUnits} groups of up to four` : `${input.students} individual learners`} could prepare ${a.name.toLowerCase()}. ${a.evidence}${a.mode !== "Either" && input.mode !== a.mode ? ` The catalogue describes this as ${a.mode === "Individual" ? "an individual" : "a collaborative"} format. Your selected arrangement would be an adaptation, so review how each student would demonstrate their understanding.` : ""}`,
    },
    {
      title: "Suggested competency evidence",
      text: input.competencies.length
        ? `For ${input.competencies.join(", ")}, decide what students could show or explain. A few clear criteria can help you assess their reasoning as well as the finished work.`
        : "Select intended competencies before agreeing evidence criteria.",
    },
    {
      title: "Optional formative checkpoint",
      text:
        input.feedback === "Final feedback only"
          ? "You selected final feedback only. You could still give students a few questions to check their work against the criteria before they submit it. This would not need an extra marked task."
          : `Consider one ungraded outline or prototype with ${input.feedback.toLowerCase()}, followed by a revision note.`,
    },
    { title: "Individual verification", text: a.accountability },
    {
      title: "AI use considerations",
      text: `${input.ai}. ${aiSpectrum.find((x) => x.label === input.ai)?.question ?? "Agree permitted assistance and a proportionate account of tool use."}`,
    },
    {
      title: "Workload implications",
      text: `${input.hours} marking hours provide approximately ${minutesAvailable.toFixed(1)} minutes per ${input.mode === "Collaborative" ? "group" : "student"} for one submission, before preparation and feedback. ${minutesAvailable < 10 ? "Consider a tightly scoped artefact and sampling strategy." : "Check this assumption in the workload simulator."}`,
    },
    {
      title: "Resources & questions to work through",
      text: `You have ${input.resources.toLowerCase()} available. This format usually needs ${a.resources.toLowerCase()}. Can all students access what they need? Are any adjustments or institutional approvals needed before you begin?`,
    },
  ];
}
