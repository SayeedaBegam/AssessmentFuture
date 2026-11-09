import type { AssessmentChallenge } from "@/lib/content-schema";
const editorialReview = {
  status: "draft" as const,
  note: "Editorial entry point linking existing proposed frameworks, not a claim of effectiveness or a diagnosis of current courses.",
};
export const assessmentChallengeRecords: AssessmentChallenge[] = [
  {
    id: "individual-group-competency",
    title: "Identifying individual competency in group projects",
    description:
      "Explore proportionate individual explanations alongside the evidence already available from collaborative work.",
    implementationIds: [
      "collaborative-individual-ml",
      "dialogic-defence-robotics",
      "assessment-twins-ml",
    ],
    editorialReview,
  },
  {
    id: "learning-process",
    title: "Assessing learning processes alongside final submissions",
    description:
      "Consider selected decisions, tests and revisions as evidence of reasoning. Existing project feedback and documentation can be the starting point.",
    implementationIds: [
      "process-trace-robotics",
      "ai-feedback-verification",
      "collaborative-individual-ml",
    ],
    editorialReview,
  },
  {
    id: "critical-ai-use",
    title: "Evaluating critical use of generative AI",
    description:
      "Explore how students verify claims, challenge suggestions and justify their decisions when AI is involved.",
    implementationIds: [
      "ai-output-auditing",
      "ai-feedback-verification",
      "assessment-twins-ml",
    ],
    editorialReview,
  },
  {
    id: "authentic-technical-problems",
    title: "Assessing authentic technical problem solving",
    description:
      "Use meaningful fictional technical problems to discuss diagnosis, testing, constraints and justified action.",
    implementationIds: [
      "failure-analysis-robotics",
      "process-trace-robotics",
      "unseen-transfer-ml",
    ],
    editorialReview,
  },
  {
    id: "semester-feedback",
    title: "Providing meaningful feedback during a semester",
    description:
      "Build on current feedback practice by examining timing, student action and opportunities for revision.",
    implementationIds: [
      "ai-feedback-verification",
      "process-trace-robotics",
      "collaborative-individual-ml",
    ],
    editorialReview,
  },
  {
    id: "knowledge-transfer",
    title: "Evaluating transfer to unfamiliar problems",
    description:
      "Explore related new constraints and independent explanations that sample application of taught knowledge.",
    implementationIds: [
      "unseen-transfer-ml",
      "assessment-twins-ml",
      "dialogic-defence-robotics",
    ],
    editorialReview,
  },
  {
    id: "quality-and-workload",
    title: "Balancing assessment quality and lecturer workload",
    description:
      "Compare bounded evidence samples and explicit time assumptions. No approach is assumed to save time or be suitable at every cohort size.",
    implementationIds: [
      "dialogic-defence-robotics",
      "process-trace-robotics",
      "collaborative-individual-ml",
    ],
    editorialReview,
  },
];
