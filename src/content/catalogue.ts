import { parseCatalogue } from "@/lib/content-validation";
import { buildCompetencyEvidenceGraph } from "@/lib/competency-evidence-graph";
import { assessmentRecords } from "./records/assessment";
import { competencyRecords } from "./records/competency";
import { researchRecords } from "./records/research";
import { programmeRecords } from "./records/programme";
import { resourceRecords } from "./records/resource";
import { observableEvidenceRecords } from "./records/observableEvidence";
import { aiConditionRecords } from "./records/aiCondition";
import { implementationRecords } from "./records/implementation";
import { additionalRelationshipRecords } from "./records/relationships";
import { institutionalResourceRecords } from "./records/institutional-resource";
import { assessmentChallengeRecords } from "./records/assessment-challenge";
import {
  courseRecords,
  learningOutcomeRecords,
  implementationPathwayRecords,
  pathwayEvidenceRecords,
  applicationEvidenceRecords,
} from "./records/pathways";

export const catalogue = parseCatalogue({
  schemaVersion: 1,
  assessments: assessmentRecords,
  competencies: competencyRecords,
  papers: researchRecords,
  programmes: programmeRecords,
  resourceTemplates: resourceRecords,
  observableEvidence: [
    ...observableEvidenceRecords,
    ...pathwayEvidenceRecords,
    ...applicationEvidenceRecords,
  ],
  aiUseConditions: aiConditionRecords,
  implementationConsiderations: implementationRecords,
  additionalRelationships: additionalRelationshipRecords,
  institutionalResources: institutionalResourceRecords,
  courses: courseRecords,
  learningOutcomes: learningOutcomeRecords,
  implementations: implementationPathwayRecords,
  assessmentChallenges: assessmentChallengeRecords,
});
// Validate the complete projection, including collisions between additional
// authored relationships and the relationships declared in the records.
export const competencyEvidenceGraph = buildCompetencyEvidenceGraph(catalogue);
