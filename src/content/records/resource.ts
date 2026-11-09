import type { ResourceTemplate } from "@/lib/types";

export const resourceRecords = [
  {
    id: "rubric",
    name: "Competency evidence rubric",
    status: "Illustrative template",
    content:
      "ILLUSTRATIVE TEMPLATE, adapt before use\n\nCompetency: [intended competency]\nEvidence: [observable student work]\nEmerging: explanation is incomplete or insufficiently supported.\nDeveloping: explanation is mostly supported, with some unresolved limitations.\nEstablished: decisions are justified with relevant evidence and limitations.\nFeedback: [specific next step]\n\nAgree disciplinary criteria, accommodations, weighting, and institutional requirements before use.",
  },
  {
    id: "ai-log",
    name: "AI use reflection template",
    status: "Illustrative template",
    content:
      "ILLUSTRATIVE TEMPLATE, no student data should be submitted to this platform\n\n1. Which tools did you use, and for what purpose?\n2. Which outputs did you retain, revise, or reject?\n3. How did you check accuracy and source validity?\n4. Which decisions are you prepared to explain independently?\n5. What limitations remain?\n\nUse only institution approved tools. Avoid including personal or confidential information.",
  },
  {
    id: "checklist",
    name: "Implementation checklist",
    status: "Illustrative template",
    content:
      "ILLUSTRATIVE IMPLEMENTATION CHECKLIST\n\n[ ] Define intended competency evidence\n[ ] Clarify AI use conditions and equitable access\n[ ] Publish accessible criteria and materials\n[ ] Plan feedback and revision opportunities\n[ ] Estimate preparation and marking time\n[ ] Agree individual contribution evidence\n[ ] Verify examination regulation compatibility\n[ ] Check privacy and approved tool use\n[ ] Review the design with disciplinary colleagues",
  },
] satisfies ResourceTemplate[];
