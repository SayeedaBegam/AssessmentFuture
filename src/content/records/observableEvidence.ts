import type { ObservableStudentEvidence } from "@/lib/types";

export const observableEvidenceRecords = [
  {
    id: "individual-coding-assignments-student-evidence",
    label: "Student evidence for individual coding assignments",
    description:
      "A functioning implementation, test cases, and an explanation of algorithmic choices.",
    competencyIds: ["coding", "reasoning"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "AI assisted code can obscure authorship. Consider a decision log and a short walkthrough of a selected function.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "collaborative-coding-assignments-student-evidence",
    label: "Student evidence for collaborative coding assignments",
    description:
      "A shared codebase, integration decisions, and individually explained contributions.",
    competencyIds: ["coding", "collaboration", "communication"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "Agree a shared AI use protocol and document which outputs were checked by whom.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "individual-research-projects-student-evidence",
    label: "Student evidence for individual research projects",
    description:
      "A question, documented method, results, and a discussion of uncertainty.",
    competencyIds: ["research", "experiments", "reasoning"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "Ask students to verify generated references and describe how AI influenced the research process.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "group-research-projects-student-evidence",
    label: "Student evidence for group research projects",
    description:
      "A shared protocol, documented analysis, and an account of individual decisions.",
    competencyIds: ["research", "collaboration", "experiments"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "Record AI use in shared methods and check that every member can explain the results.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "literature-reviews-student-evidence",
    label: "Student evidence for literature reviews",
    description:
      "Search strategy, inclusion decisions, synthesis, and source grounded argument.",
    competencyIds: ["research", "reasoning", "communication"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "Generated citations need verification; a source matrix can make the reading process visible.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "take-home-problem-solving-student-evidence",
    label: "Student evidence for take home problem solving",
    description:
      "Worked solutions, intermediate reasoning, and checks on the result.",
    competencyIds: ["reasoning", "reflection"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "Clarify permitted assistance and consider asking for a critique of an alternative solution.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "in-class-written-problem-solving-student-evidence",
    label: "Student evidence for in class written problem solving",
    description: "A bounded sample of independent solutions and explanations.",
    competencyIds: ["reasoning", "coding"],
    aiUseConditionIds: ["restricted"],
    interpretationLimits:
      "Specify which competencies require independent performance and what tools are permitted.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "quizzes-and-knowledge-checks-student-evidence",
    label: "Student evidence for quizzes & knowledge checks",
    description:
      "Responses to focused questions and explanations of selected answers.",
    competencyIds: ["reasoning", "reflection"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "For unsupervised quizzes, consider interpretation of responses rather than assuming unaided recall.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "peer-review-student-evidence",
    label: "Student evidence for peer review",
    description:
      "Criterion based feedback and a reasoned response to comments received.",
    competencyIds: ["reasoning", "communication", "reflection"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "Consider asking for evidence specific feedback and documenting any AI drafting support.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "topic-presentations-student-evidence",
    label: "Student evidence for topic presentations",
    description:
      "An audience aware argument and responses to follow up questions.",
    competencyIds: ["communication", "reasoning"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "Distinguish slide production from the competency to explain and defend content.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "research-paper-presentations-student-evidence",
    label: "Student evidence for research paper presentations",
    description:
      "Accurate explanation of a paper and justified responses to methodological questions.",
    competencyIds: ["research", "communication", "reasoning"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "Verify summaries against the original paper and distinguish the study’s claims from generated commentary.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "paper-critiques-and-summaries-student-evidence",
    label: "Student evidence for paper critiques & summaries",
    description:
      "A source grounded summary and a justified methodological critique.",
    competencyIds: ["research", "reasoning"],
    aiUseConditionIds: ["critical"],
    interpretationLimits:
      "Students can critically evaluate an AI summary while checking claims against source passages.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "public-facing-science-communication-student-evidence",
    label: "Student evidence for public facing science communication",
    description:
      "Audience analysis, accurate sourcing, and an accessible public facing artefact.",
    competencyIds: ["communication", "research", "ethics"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "Document generation and fact checking; review accessibility and representational bias.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "hackathons-student-evidence",
    label: "Student evidence for hackathons",
    description:
      "A prototype, design decisions, and an individual reflection on trade offs.",
    competencyIds: ["coding", "collaboration", "experiments"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "Make tool access equitable and distinguish generated functionality from explained understanding.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "oral-examinations-student-evidence",
    label: "Student evidence for oral examinations",
    description:
      "Spoken reasoning and responses to a consistent set of probing questions.",
    competencyIds: ["reasoning", "communication", "reflection"],
    aiUseConditionIds: ["restricted"],
    interpretationLimits:
      "Can explore how a student evaluated AI supported work without assuming that fluency proves authorship.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "problem-solving-competitions-student-evidence",
    label: "Student evidence for problem solving competitions",
    description:
      "Solutions and a post event explanation of strategy and limitations.",
    competencyIds: ["reasoning", "coding", "collaboration"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "State tool rules and ensure equal access; ranking alone cannot establish underlying understanding.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "practical-projects-student-evidence",
    label: "Student evidence for practical projects",
    description:
      "A working artefact, testing documentation, and a discussion of constraints.",
    competencyIds: ["experiments", "coding", "collaboration"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "Evaluate testing and professional judgment alongside the finished output.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "portfolios-and-staged-assessment-student-evidence",
    label: "Student evidence for portfolios & staged assessment",
    description:
      "Selected artefacts, revision history, and a reasoned account of learning.",
    competencyIds: ["reflection", "research", "communication"],
    aiUseConditionIds: ["documented"],
    interpretationLimits:
      "Record AI use across stages and explain the decisions behind revisions.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
] satisfies ObservableStudentEvidence[];
