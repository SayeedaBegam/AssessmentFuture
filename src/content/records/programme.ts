import type { ProgrammeContext } from "@/lib/types";

export const programmeRecords = [
  {
    id: "ai-robotics",
    name: "Artificial Intelligence and Robotics",
    description:
      "Explore how implementation, experimental work, and technical explanation can make competencies visible.",
    competencyIds: [
      "algorithms",
      "coding",
      "mathematics",
      "experiments",
      "research",
      "communication",
      "problem-solving",
      "reasoning",
    ],
    example:
      "Illustrative pathway: prototype an algorithm, document tests, compare results, and explain one design decision.",
  },
  {
    id: "human-ai",
    name: "Human and AI",
    description:
      "Explore human centered inquiry, ethical judgment, and responsible interaction with AI systems.",
    competencyIds: [
      "human-ai",
      "reasoning",
      "ethics",
      "research",
      "design",
      "communication",
      "reflection",
    ],
    example:
      "Illustrative pathway: investigate an interaction scenario, critique assumptions, develop a design response, and reflect on affected stakeholders.",
  },
] satisfies ProgrammeContext[];
