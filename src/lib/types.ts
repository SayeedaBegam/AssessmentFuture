// Content types are inferred from the runtime schemas, so both stay aligned.
export type {
  CatalogueClassification,
  EditorialReview,
  ResearchVerification,
  EvidenceLink,
  AssessmentApproach,
  Competency,
  ProgrammeContext,
  ResourceTemplate,
  Adaptation,
  ResearchPaper,
  ResearchDigest,
  AIUseCondition,
  ObservableStudentEvidence,
  ImplementationConsideration,
  EvidenceGraphRelationship,
  GraphNodeReference,
  CatalogueContent,
  ImplementationPathway,
  Course,
  LearningOutcome,
  InstitutionalResource,
  InnovationFramework,
  AssessmentChallenge,
} from "./content-schema";
// Existing research digest labels describe source review, not assessment approval.
export type ReviewStatus =
  "Editorial prototype" | "Source summary reviewed" | "Pending verification";
export type VerificationStatus =
  "Source verified" | "Metadata verified · full text pending";
export interface WorkloadScenario {
  name: string;
  students: number;
  groups: number;
  mode: "individual" | "group";
  submissions: number;
  minutes: number;
  checkpoints: number;
  preparation: number;
  feedback: number;
  oral: number;
}
