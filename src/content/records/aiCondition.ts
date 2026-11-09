import type { AIUseCondition } from "@/lib/types";

export const aiConditionRecords = [
  {
    id: "restricted",
    name: "Independent performance",
    label: "AI restricted",
    description:
      "Restrict AI for specified competencies when independent performance is the intended evidence.",
    example: "Illustration: explain an algorithm without automated assistance.",
    question:
      "Which competency requires unaided evidence, and how will access arrangements work?",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "support",
    name: "Learning support",
    label: "AI as support",
    description:
      "Explore AI for preparation, explanations, or practice, with assessment conditions stated separately.",
    example:
      "Illustration: use AI to generate practice questions, then evaluate them.",
    question:
      "How will students check the quality of the support they receive?",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "documented",
    name: "Transparent use",
    label: "Documented support",
    description:
      "Permit AI use with a clear account of the tool’s role, verification, and the student’s decisions.",
    example:
      "Illustration: attach an AI use reflection to a literature synthesis.",
    question: "What level of documentation is useful and proportionate?",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "collaborative",
    name: "Collaborative inquiry",
    label: "AI collaboration",
    description:
      "Explore human AI problem solving while keeping responsibility for decisions visible.",
    example:
      "Illustration: compare a team’s solution with an AI proposed alternative.",
    question: "What should each student be able to explain independently?",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "critical",
    name: "Critical evaluation",
    label: "Critical evaluation",
    description:
      "Make the evaluation of AI outputs part of the intended competency evidence.",
    example:
      "Illustration: identify unsupported claims and test generated code.",
    question:
      "Which criteria distinguish a strong critique from a superficial one?",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
  {
    id: "authentic",
    name: "Professional practice",
    label: "Authentic integration",
    description:
      "Explore approved AI use within a contextualized professional task, including ethical judgment.",
    example: "Illustration: develop and audit an AI supported workflow.",
    question:
      "Are professional expectations, tool access, and privacy conditions clear?",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
  },
] satisfies AIUseCondition[];
