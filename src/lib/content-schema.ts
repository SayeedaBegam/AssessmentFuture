import { z } from "zod";

const text = z.string().trim().min(1);
const identifier = text.regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  "Use an explicit lowercase identifier with optional hyphens",
);
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00Z`);
    return (
      !Number.isNaN(parsed.valueOf()) &&
      parsed.toISOString().slice(0, 10) === value
    );
  }, "Use a real calendar date in YYYY-MM-DD format");
const uniqueIds = z
  .array(identifier)
  .refine(
    (ids) => new Set(ids).size === ids.length,
    "Duplicate references are not allowed",
  );
export const catalogueClassificationSchema = z.enum([
  "programme-inventory",
  "adaptation-combination",
  "additional-emerging",
]);
export const editorialReviewSchema = z
  .object({
    status: z.enum(["draft", "in-review", "reviewed"]),
    note: text,
    reviewedBy: text.optional(),
    reviewedOn: date.optional(),
  })
  .strict()
  .superRefine((review, ctx) => {
    if (
      review.status === "reviewed" &&
      (!review.reviewedBy || !review.reviewedOn)
    )
      ctx.addIssue({
        code: "custom",
        message: "Reviewed editorial content needs a reviewer and review date",
      });
  });
export const researchVerificationSchema = z
  .object({
    status: z.enum(["not-reviewed", "in-progress", "reviewed"]),
    scope: z.enum([
      "not-assessed",
      "contextual-sources",
      "format-specific-evidence",
    ]),
    note: text,
    reviewedBy: text.optional(),
    reviewedOn: date.optional(),
  })
  .strict()
  .superRefine((review, ctx) => {
    if (
      review.status === "reviewed" &&
      (!review.reviewedBy ||
        !review.reviewedOn ||
        review.scope === "not-assessed")
    )
      ctx.addIssue({
        code: "custom",
        message:
          "A completed research verification needs a scope, reviewer, and review date",
      });
  });
export const evidenceLinkSchema = z
  .object({
    id: identifier,
    paperId: identifier,
    relationship: text,
    directEvidence: z.boolean(),
    verificationStatus: z.enum([
      "unverified",
      "metadata-checked",
      "source-checked",
      "full-text-reviewed",
    ]),
    reviewNote: text,
    supportingClaim: text.optional(),
    sourceLocator: text.optional(),
    limitations: text.optional(),
    reviewedBy: text.optional(),
    reviewedOn: date.optional(),
  })
  .strict()
  .superRefine((link, ctx) => {
    if (
      link.directEvidence &&
      (link.verificationStatus !== "full-text-reviewed" ||
        !link.supportingClaim ||
        !link.sourceLocator ||
        !link.limitations ||
        !link.reviewedBy ||
        !link.reviewedOn)
    )
      ctx.addIssue({
        code: "custom",
        message:
          "Direct evidence needs full text review, a specific supported claim, a source locator, limitations, a reviewer, and a review date",
      });
  });
export const competencySchema = z
  .object({ id: identifier, name: text, description: text })
  .strict();
export const programmeContextSchema = z
  .object({
    id: identifier,
    name: text,
    description: text,
    competencyIds: uniqueIds,
    example: text,
  })
  .strict();
export const resourceTemplateSchema = z
  .object({
    id: identifier,
    name: text,
    content: text,
    status: z.literal("Illustrative template"),
  })
  .strict();
export const adaptationSchema = z
  .object({
    id: identifier,
    title: text,
    description: text,
    validated: z.boolean(),
    validationNote: text.optional(),
    validationEvidence: z.array(evidenceLinkSchema).optional(),
  })
  .strict()
  .superRefine((adaptation, ctx) => {
    if (
      adaptation.validated &&
      (!adaptation.validationNote ||
        !adaptation.validationEvidence?.some((e) => e.directEvidence))
    )
      ctx.addIssue({
        code: "custom",
        message:
          "A validated adaptation needs a contextual validation note and direct supporting evidence",
      });
  });
export const relatedApproachSchema = z
  .object({
    approachId: identifier,
    relation: z.enum([
      "related-to",
      "alternative-to",
      "adaptation-of",
      "combines",
    ]),
    rationale: text,
  })
  .strict();
export const assessmentApproachSchema = z
  .object({
    id: identifier,
    slug: identifier,
    name: text,
    family: text,
    description: text,
    catalogueClassification: catalogueClassificationSchema,
    classificationNote: text,
    editorialReview: editorialReviewSchema,
    researchVerification: researchVerificationSchema,
    competencyIds: uniqueIds.min(1),
    relatedApproaches: z.array(relatedApproachSchema),
    observableEvidenceIds: uniqueIds.min(1),
    aiUseConditionIds: uniqueIds.min(1),
    implementationConsiderationIds: uniqueIds.min(1),
    mode: z.enum(["Individual", "Collaborative", "Either"]),
    uses: z
      .array(z.enum(["Formative", "Summative"]))
      .min(1)
      .refine(
        (values) => new Set(values).size === values.length,
        "Duplicate assessment purposes",
      ),
    aiLevel: text,
    groupSize: text,
    workload: text,
    feedback: text,
    duration: text,
    resources: text,
    strengths: text,
    evidence: text,
    aiConsiderations: text,
    scalability: text,
    accountability: text,
    studentEffort: text,
    accessibility: text,
    adaptations: z.array(adaptationSchema),
    evidenceLinks: z.array(evidenceLinkSchema),
  })
  .strict();
export const researchDigestSchema = z
  .object({
    overview: text,
    question: text,
    design: text,
    context: text,
    findings: text,
    quantitative: text,
    interpretation: text,
    application: text,
    limitations: text,
    aiRelevance: text,
    openQuestions: text,
  })
  .strict();
export const researchPaperSchema = z
  .object({
    id: identifier,
    editorialReview: editorialReviewSchema,
    slug: identifier,
    title: text,
    authors: text,
    year: z.number().int().min(1).max(9999),
    publishedOn: date.optional(),
    venue: text,
    url: z
      .string()
      .url()
      .refine((value) => {
        try {
          return new URL(value).protocol === "https:";
        } catch {
          return false;
        }
      }, "Original sources must use HTTPS")
      .refine((value) => {
        try {
          const url = new URL(value);
          return !url.username && !url.password;
        } catch {
          return false;
        }
      }, "Source URLs must not contain credentials"),
    doi: z
      .string()
      .regex(/^10\.\d{4,9}\/\S+$/, "Invalid DOI syntax")
      .optional(),
    type: text,
    verification: z.enum([
      "Source verified",
      "Metadata verified · full text pending",
    ]),
    verificationScope: z.enum([
      "metadata-only",
      "publication-page",
      "abstract",
      "full-text",
    ]),
    verificationNote: text,
    reviewStatus: z.enum([
      "Editorial prototype",
      "Source summary reviewed",
      "Pending verification",
    ]),
    verifiedOn: date,
    reviewedBy: text.optional(),
    evidenceStrength: text,
    digest: researchDigestSchema,
  })
  .strict()
  .superRefine((paper, ctx) => {
    if (
      paper.verificationScope === "metadata-only" &&
      (paper.verification !== "Metadata verified · full text pending" ||
        paper.reviewStatus !== "Pending verification")
    )
      ctx.addIssue({
        code: "custom",
        message:
          "Metadata-only sources must keep their full text review pending",
      });
    if (
      paper.verificationScope !== "metadata-only" &&
      (paper.verification !== "Source verified" ||
        paper.reviewStatus !== "Source summary reviewed")
    )
      ctx.addIssue({
        code: "custom",
        message:
          "The displayed source status must agree with the recorded review scope",
      });
    if (paper.verificationScope === "full-text" && !paper.reviewedBy)
      ctx.addIssue({
        code: "custom",
        message: "Full text review must name the responsible reviewer",
      });
  });
export const aiUseConditionSchema = z
  .object({
    id: identifier,
    name: text,
    label: text,
    description: text,
    example: text,
    question: text,
    editorialReview: editorialReviewSchema,
  })
  .strict();
export const observableStudentEvidenceSchema = z
  .object({
    id: identifier,
    label: text,
    description: text,
    competencyIds: uniqueIds.min(1),
    aiUseConditionIds: uniqueIds,
    interpretationLimits: text,
    editorialReview: editorialReviewSchema,
  })
  .strict();
export const implementationConsiderationSchema = z
  .object({
    id: identifier,
    label: text,
    category: z.enum([
      "workload",
      "resources",
      "accessibility",
      "feedback",
      "fairness",
      "operations",
    ]),
    description: text,
    editorialReview: editorialReviewSchema,
  })
  .strict();
export const graphNodeKindSchema = z.enum([
  "competency",
  "assessment",
  "observable-evidence",
  "ai-use-condition",
  "research-paper",
  "implementation-consideration",
  "course",
  "learning-outcome",
  "implementation-pathway",
  "institutional-resource",
  "innovation",
  "research-insight",
  "implementation-application",
  "lecturer-adaptation",
]);
export const graphNodeReferenceSchema = z
  .object({ kind: graphNodeKindSchema, id: identifier })
  .strict();
export const evidenceGraphRelationshipSchema = z
  .object({
    id: text,
    from: graphNodeReferenceSchema,
    to: graphNodeReferenceSchema,
    relation: z.enum([
      "targets-competency",
      "elicits-evidence",
      "may-demonstrate",
      "considers-ai-condition",
      "has-implementation-consideration",
      "related-approach",
      "has-contextual-source",
      "has-direct-source",
      "ai-affects-evidence-interpretation",
      "research-informs-evidence",
      "research-informs-ai-condition",
      "research-informs-implementation",
      "course-has-outcome",
      "outcome-targets-competency",
      "assesses-competency",
      "produces-student-evidence",
      "implements-approach",
      "implementation-addresses-outcome",
      "directly-investigated-by",
      "theoretically-informed-by",
      "contextually-related-to",
      "informed-by-guidance",
      "source-informs-interpretation",
      "interpretation-informs-innovation",
      "innovation-has-worked-example",
      "innovation-has-application",
      "application-produces-evidence",
      "application-targets-competency",
      "evidence-guides-adaptation",
    ]),
    basis: z.enum([
      "editorial-proposal",
      "contextual-source",
      "direct-research-evidence",
    ]),
    explanation: text,
    editorialReview: editorialReviewSchema,
    evidenceLinks: z.array(evidenceLinkSchema),
    provenance: text,
  })
  .strict();
export const institutionalResourceSchema = z
  .object({
    id: identifier,
    title: text,
    url: z
      .string()
      .url()
      .refine((v) => {
        const u = new URL(v);
        return u.protocol === "https:" && !u.username && !u.password;
      }),
    sourceType: z.enum([
      "Institutional guidance",
      "Workshop",
      "Teaching community",
      "Practitioner commentary",
      "Service provider",
    ]),
    access: z.enum([
      "Public page checked",
      "Public document checked",
      "Access not verified",
      "Supplied link returned 404",
    ]),
    description: text,
    verificationNote: text,
    checkedOn: date,
    editorialReview: editorialReviewSchema,
  })
  .strict();
export const courseSchema = z
  .object({ id: identifier, name: text, description: text })
  .strict();
export const learningOutcomeSchema = z
  .object({
    id: identifier,
    courseId: identifier,
    description: text,
    competencyIds: uniqueIds.min(1),
  })
  .strict();
export const innovationApplicationSchema = z
  .object({
    id: identifier,
    discipline: text,
    title: text,
    outcome: text,
    competencyIds: uniqueIds.min(1),
    activities: z.array(text).min(3),
    observableEvidence: text,
    feedback: text,
    aiConditions: text,
    feasibility: text,
  })
  .strict();
export const innovationFrameworkSchema = z
  .object({
    summary: text,
    meaningfulDifference: text,
    lecturerSteps: z.array(text).min(4),
    applications: z.array(innovationApplicationSchema).min(3),
  })
  .strict()
  .superRefine((f, ctx) => {
    if (new Set(f.applications.map((a) => a.id)).size !== f.applications.length)
      ctx.addIssue({ code: "custom", message: "Duplicate application ID" });
    if (new Set(f.applications.map((a) => a.discipline)).size < 3)
      ctx.addIssue({
        code: "custom",
        message: "Provide at least three distinct illustrative disciplines",
      });
  });
export const implementationPathwaySchema = z
  .object({
    id: identifier,
    slug: identifier,
    title: text,
    framework: innovationFrameworkSchema,
    decisionSupport: z
      .object({
        existingStructure: text,
        existingFeedback: text,
        existingEvidence: text,
        proposedChanges: text,
        introducedCheckpoints: text,
        additionalEvidence: text,
        additionalEffort: text,
        scalability: text,
        dataProtectionQuestions: z.array(text).min(2),
      })
      .strict(),
    courseId: identifier,
    context: text,
    learningOutcomeIds: uniqueIds.min(1),
    competencyIds: uniqueIds.min(1),
    assessmentIds: uniqueIds.min(1),
    catalogueClassification: catalogueClassificationSchema,
    classificationNote: text,
    editorialReview: editorialReviewSchema,
    researchVerification: researchVerificationSchema,
    rationale: text,
    suitableSituations: z.array(text).min(1),
    studentInstructions: z.array(text).min(3),
    teachingMaterials: z
      .array(
        z.object({ title: text, content: text, lecturerNote: text }).strict(),
      )
      .min(1),
    activities: z
      .array(
        z
          .object({
            id: identifier,
            week: z.number().int().min(1).max(14),
            title: text,
            instructions: text,
            evidence: text,
            feedback: text,
            purpose: z.enum(["formative", "summative"]),
            weight: z.number().min(0).max(100),
          })
          .strict(),
      )
      .min(3),
    formativeComponents: text,
    summativeComponents: text,
    feedback: z
      .object({
        existingOpportunities: z.array(text).min(1),
        possibleAdaptations: z.array(text).min(1),
        timing: text,
        sources: text,
        studentAction: text,
        revisionRole: text,
        workload: text,
      })
      .strict(),
    observableEvidenceIds: uniqueIds.min(1),
    individualEvidence: text,
    rubric: z
      .array(
        z
          .object({
            id: identifier,
            criterion: text,
            weight: z.number().min(0).max(100),
            strongEvidence: text,
            developingEvidence: text,
          })
          .strict(),
      )
      .min(3),
    aiUse: z
      .object({
        conditionId: identifier,
        permitted: z.array(text).min(1),
        restricted: z.array(text).min(1),
        disclosure: text,
        equitableAlternative: text,
      })
      .strict(),
    workload: z
      .object({
        students: z.number().int().min(1).max(2000),
        groups: z.number().int().min(1),
        mode: z.enum(["individual", "group"]),
        submissions: z.number().int().min(1),
        checkpoints: z.number().int().min(1),
        minutes: z.number().min(0),
        preparation: z.number().min(0),
        feedback: z.number().min(0),
        oral: z.number().min(0),
        studentHours: z.number().min(0),
        reusablePreparationHours: z.number().min(0),
        assumptions: text,
      })
      .strict(),
    accessibility: z.array(text).min(2),
    fairness: z.array(text).min(2),
    limitations: z.array(text).min(2),
    researchConnections: z
      .array(
        z
          .object({
            id: identifier,
            relation: z.enum([
              "directly-investigated-by",
              "theoretically-informed-by",
              "contextually-related-to",
            ]),
            link: evidenceLinkSchema,
          })
          .strict(),
      )
      .min(1),
    resourceIds: uniqueIds.min(1),
    institutionalConsiderations: z
      .object({
        aspoReview: z.literal("Required before use"),
        note: text,
        questions: z.array(text).min(2),
      })
      .strict(),
  })
  .strict()
  .superRefine((p, ctx) => {
    if (p.rubric.reduce((sum, r) => sum + r.weight, 0) !== 100)
      ctx.addIssue({
        code: "custom",
        message: "Illustrative rubric weights must total 100",
      });
    if (p.activities.reduce((sum, a) => sum + a.weight, 0) !== 100)
      ctx.addIssue({
        code: "custom",
        message: "Illustrative summative activity weights must total 100",
      });
    if (p.activities.some((a) => a.purpose === "formative" && a.weight !== 0))
      ctx.addIssue({
        code: "custom",
        message: "Ungraded formative activities must have zero weight",
      });
    if (
      new Set(p.activities.map((a) => a.id)).size !== p.activities.length ||
      new Set(p.rubric.map((r) => r.id)).size !== p.rubric.length
    )
      ctx.addIssue({
        code: "custom",
        message: "Duplicate activity or rubric ID",
      });
    if (
      p.workload.reusablePreparationHours > p.workload.preparation ||
      p.workload.groups > p.workload.students
    )
      ctx.addIssue({ code: "custom", message: "Invalid workload assumptions" });
  });
export const assessmentChallengeSchema = z
  .object({
    id: identifier,
    title: text,
    description: text,
    implementationIds: uniqueIds.min(1),
    editorialReview: editorialReviewSchema,
  })
  .strict();
export const catalogueSchema = z
  .object({
    schemaVersion: z.literal(1),
    assessments: z.array(assessmentApproachSchema),
    competencies: z.array(competencySchema),
    papers: z.array(researchPaperSchema),
    programmes: z.array(programmeContextSchema),
    resourceTemplates: z.array(resourceTemplateSchema),
    observableEvidence: z.array(observableStudentEvidenceSchema),
    aiUseConditions: z.array(aiUseConditionSchema),
    implementationConsiderations: z.array(implementationConsiderationSchema),
    additionalRelationships: z.array(evidenceGraphRelationshipSchema),
    institutionalResources: z.array(institutionalResourceSchema).default([]),
    courses: z.array(courseSchema).default([]),
    learningOutcomes: z.array(learningOutcomeSchema).default([]),
    implementations: z.array(implementationPathwaySchema).default([]),
    assessmentChallenges: z.array(assessmentChallengeSchema).default([]),
  })
  .strict();
export type CatalogueClassification = z.infer<
  typeof catalogueClassificationSchema
>;
export type EditorialReview = z.infer<typeof editorialReviewSchema>;
export type ResearchVerification = z.infer<typeof researchVerificationSchema>;
export type EvidenceLink = z.infer<typeof evidenceLinkSchema>;
export type AssessmentApproach = z.infer<typeof assessmentApproachSchema>;
export type Competency = z.infer<typeof competencySchema>;
export type ProgrammeContext = z.infer<typeof programmeContextSchema>;
export type ResourceTemplate = z.infer<typeof resourceTemplateSchema>;
export type Adaptation = z.infer<typeof adaptationSchema>;
export type ResearchPaper = z.infer<typeof researchPaperSchema>;
export type ResearchDigest = z.infer<typeof researchDigestSchema>;
export type AIUseCondition = z.infer<typeof aiUseConditionSchema>;
export type ObservableStudentEvidence = z.infer<
  typeof observableStudentEvidenceSchema
>;
export type ImplementationConsideration = z.infer<
  typeof implementationConsiderationSchema
>;
export type EvidenceGraphRelationship = z.infer<
  typeof evidenceGraphRelationshipSchema
>;
export type GraphNodeReference = z.infer<typeof graphNodeReferenceSchema>;
export type CatalogueContent = z.infer<typeof catalogueSchema>;
export type ImplementationPathway = z.infer<typeof implementationPathwaySchema>;
export type Course = z.infer<typeof courseSchema>;
export type LearningOutcome = z.infer<typeof learningOutcomeSchema>;
export type InstitutionalResource = z.infer<typeof institutionalResourceSchema>;
export type InnovationFramework = z.infer<typeof innovationFrameworkSchema>;
export type AssessmentChallenge = z.infer<typeof assessmentChallengeSchema>;
