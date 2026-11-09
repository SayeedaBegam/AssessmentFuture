import type { Competency } from "@/lib/types";

export const competencyRecords = [
  {
    id: "reasoning",
    name: "Critical reasoning",
    description: "Develop and defend a reasoned position.",
  },
  {
    id: "coding",
    name: "Coding & implementation",
    description: "Build, test, and explain working software.",
  },
  {
    id: "research",
    name: "Research competence",
    description: "Frame questions and evaluate sources and methods.",
  },
  {
    id: "communication",
    name: "Communication",
    description: "Translate ideas for a defined audience.",
  },
  {
    id: "collaboration",
    name: "Collaboration",
    description: "Coordinate work and make contributions visible.",
  },
  {
    id: "reflection",
    name: "Reflective judgment",
    description: "Evaluate decisions and identify next steps.",
  },
  {
    id: "ethics",
    name: "Ethical analysis",
    description: "Consider values, affected people, and consequences.",
  },
  {
    id: "experiments",
    name: "Experimental design",
    description: "Design and interpret a reproducible investigation.",
  },
  {
    id: "algorithms",
    name: "Algorithmic reasoning",
    description: "Explain a computational strategy and its constraints.",
  },
  {
    id: "mathematics",
    name: "Mathematical understanding",
    description: "Develop and justify mathematical models and arguments.",
  },
  {
    id: "problem-solving",
    name: "Problem solving",
    description:
      "Frame a problem, compare strategies, and evaluate a solution.",
  },
  {
    id: "human-ai",
    name: "Human AI interaction",
    description: "Examine how people interact with and interpret AI systems.",
  },
  {
    id: "design",
    name: "Human centered design",
    description:
      "Develop design responses grounded in people’s needs and perspectives.",
  },
] satisfies Competency[];
