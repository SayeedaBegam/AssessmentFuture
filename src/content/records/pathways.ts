import type { ImplementationPathway } from "@/lib/content-schema";
import { teachingMaterialRecords } from "./teaching-material";
import { innovationFrameworkRecords } from "./innovation-framework";
import { mapDecisionSupportRecords } from "./map-decision-support";

export const courseRecords = [
  {
    id: "machine-learning",
    name: "Machine Learning",
    description:
      "Fictional teaching context for adapting assessment ideas; not an official UTN module specification.",
  },
  {
    id: "robotics",
    name: "Robotics",
    description:
      "Illustrative engineering context using synthetic tests and fictional systems.",
  },
  {
    id: "human-and-ai",
    name: "Human and AI",
    description:
      "Illustrative context for examining AI outputs, decisions and feedback.",
  },
];
export const learningOutcomeRecords = [
  {
    id: "ml-evaluate-justify",
    courseId: "machine-learning",
    description:
      "Evaluate machine learning solutions and independently justify technical decisions.",
    competencyIds: ["reasoning", "experiments", "coding"],
  },
  {
    id: "robotics-iterate",
    courseId: "robotics",
    description:
      "Develop, test and justify a robotics solution through iterative engineering decisions.",
    competencyIds: ["coding", "experiments", "reflection"],
  },
  {
    id: "ai-critique",
    courseId: "human-and-ai",
    description:
      "Critically evaluate AI generated information and justify corrections.",
    competencyIds: ["reasoning", "research", "human-ai"],
  },
  {
    id: "ml-transfer",
    courseId: "machine-learning",
    description: "Transfer learned techniques to unfamiliar problems.",
    competencyIds: ["problem-solving", "algorithms", "reasoning"],
  },
  {
    id: "robotics-defend",
    courseId: "robotics",
    description: "Explain and defend technical design decisions.",
    competencyIds: ["communication", "reasoning", "coding"],
  },
  {
    id: "ai-feedback-judgement",
    courseId: "human-and-ai",
    description:
      "Evaluate feedback quality and use justified feedback to improve work.",
    competencyIds: ["reflection", "reasoning", "human-ai"],
  },
  {
    id: "robotics-diagnose",
    courseId: "robotics",
    description:
      "Diagnose technical failures and propose justified engineering responses.",
    competencyIds: ["problem-solving", "experiments", "ethics"],
  },
  {
    id: "ml-collaborate-explain",
    courseId: "machine-learning",
    description:
      "Collaboratively develop a solution while demonstrating individual understanding and contribution.",
    competencyIds: ["collaboration", "coding", "reflection"],
  },
];
const draft = {
  status: "draft" as const,
  note: "Proposed teaching example for lecturer discussion. No institutional approval or empirical effectiveness at UTN established.",
};
const pendingResearch = {
  status: "not-reviewed" as const,
  scope: "not-assessed" as const,
  note: "Source identities and limited summaries checked separately. This implementation has not been empirically evaluated or independently appraised.",
};
type Step = ImplementationPathway["activities"][number];
const step = (
  id: string,
  week: number,
  title: string,
  instructions: string,
  evidence: string,
  feedback: string,
  weight = 0,
): Step => ({
  id,
  week,
  title,
  instructions,
  evidence,
  feedback,
  purpose: weight ? "summative" : "formative",
  weight,
});
const rubric = (
  id: string,
  criterion: string,
  weight: number,
  strongEvidence: string,
  developingEvidence: string,
) => ({ id, criterion, weight, strongEvidence, developingEvidence });
const source = (
  id: string,
  paperId: string,
  relation: "contextually-related-to" | "theoretically-informed-by",
  relationship: string,
  checked = false,
): ImplementationPathway["researchConnections"][number] => ({
  id,
  relation,
  link: {
    id,
    paperId,
    relationship,
    directEvidence: false,
    verificationStatus: checked ? "source-checked" : "metadata-checked",
    reviewNote:
      "Link is an editorial interpretation. No direct effectiveness support claimed.",
  },
});
const shared = {
  editorialReview: draft,
  researchVerification: pendingResearch,
  resourceIds: ["utn-ai-manual", "utn-aspo"],
  institutionalConsiderations: {
    aspoReview: "Required before use" as const,
    note: "Check the current applicable examination regulations and module description. The supplied ASPO link returned 404. No compliance decision has been made.",
    questions: [
      "Are the assessment type, components, weighting and timing permitted and announced correctly?",
      "What accommodations, resit arrangements, moderation and student consultation are required?",
      "Which tools and data handling arrangements are approved locally?",
    ],
  },
};
export const implementationPathwayRecords: ImplementationPathway[] = [
  {
    ...shared,
    id: "assessment-twins-ml",
    decisionSupport: mapDecisionSupportRecords["assessment-twins-ml"],
    framework: innovationFrameworkRecords["assessment-twins-ml"],
    teachingMaterials: [...teachingMaterialRecords["assessment-twins-ml"]],
    slug: "assessment-twins-machine-learning",
    title: "Assessment Twins",
    courseId: "machine-learning",
    context:
      "An illustrative ML unit after students have practised model evaluation. Use a public or synthetic classification dataset with a short data description; no private course or student data is needed.",
    learningOutcomeIds: ["ml-evaluate-justify"],
    competencyIds: ["reasoning", "experiments", "coding"],
    assessmentIds: [
      "individual-coding-assignments",
      "in-class-written-problem-solving",
    ],
    catalogueClassification: "adaptation-combination",
    classificationNote:
      "Proposed combination of an existing coding assignment and independent problem solving. This does not establish whether UTN already uses the combination.",
    rationale:
      "A model shows what a student can produce with tools. A related diagnostic task adds evidence of their own evaluation and reasoning. These tasks provide complementary evidence, not a guarantee of detecting AI use.",
    suitableSituations: [
      "Students can already train and evaluate a baseline model.",
      "The lecturer wants to retain an established project while sampling independent judgement.",
    ],
    studentInstructions: [
      "Train a baseline and an improved model on the supplied public data. Explain the split, metric and comparison.",
      "Submit executable code, evaluation results and a short decision log. Identify relevant AI assistance and verify the code yourself.",
      "Complete a related diagnostic task independently under the announced conditions. Explain errors, performance differences and a correction.",
      "Read feedback on both parts and write one change you would make next time.",
    ],
    activities: [
      step(
        "frame",
        2,
        "Agree evaluation criteria",
        "Inspect the dataset and propose a metric and split.",
        "A half page evaluation plan.",
        "Lecturer comments on validity of the plan.",
      ),
      step(
        "develop",
        6,
        "Develop and test the model",
        "Compare a baseline with one justified modification. Record two meaningful decisions.",
        "Code, results and decision log.",
        "A peer checks whether results can be reproduced.",
      ),
      step(
        "model",
        10,
        "Submit the model evidence",
        "Submit the tested model and explanation of limitations.",
        "Individual project report.",
        "Lecturer provides rubric feedback.",
        60,
      ),
      step(
        "diagnose",
        11,
        "Independent diagnostic task",
        "Explain a fresh leakage error or misleading metric in a short controlled task.",
        "Independent annotated diagnosis and correction.",
        "Debrief after all students complete the task.",
        40,
      ),
      step(
        "reflect",
        13,
        "Compare the evidence",
        "Explain where the two tasks support or qualify your understanding.",
        "Ungraded reflection.",
        "Students identify a next learning step.",
      ),
    ],
    formativeComponents:
      "Plan review, reproducibility exchange and final reflection are ungraded opportunities to act on feedback.",
    summativeComponents:
      "Illustrative weighting: model evidence 60%, independent diagnostic task 40%. Assess the same intended outcomes across both components, using announced criteria.",
    feedback: {
      existingOpportunities: [
        "Project supervision and comments on evaluation results may already support this work.",
      ],
      possibleAdaptations: [
        "Add a short plan check and a reproducibility exchange before submission.",
      ],
      timing: "Weeks 2, 6, 10 and 11; reflection in week 13.",
      sources: "Lecturer, peer and student self review.",
      studentAction:
        "Revise the evaluation plan before submission and compare feedback from both tasks.",
      revisionRole:
        "Revisions before week 10 contribute to the project; the diagnostic response is judged as submitted.",
      workload:
        "Allow six additional feedback minutes per student for the counted submission; plan checks can use a whole class discussion.",
    },
    observableEvidenceIds: ["twins-individual-evidence"],
    individualEvidence:
      "Each student explains metric choice, tests a plausible error and justifies a correction. Differences between tasks prompt educational judgement, not an automatic misconduct finding.",
    rubric: [
      rubric(
        "evaluation",
        "Evaluation validity",
        35,
        "Justifies a leakage free comparison and interprets a suitable metric.",
        "Reports a score without explaining its validity.",
      ),
      rubric(
        "reasoning",
        "Independent diagnostic reasoning",
        40,
        "Identifies the methodological issue and explains a defensible correction.",
        "Names an issue but cannot connect it to the observed result.",
      ),
      rubric(
        "reproducibility",
        "Technical explanation and reproducibility",
        25,
        "Provides a runnable model and traceable decisions.",
        "Important choices or dependencies are unclear.",
      ),
    ],
    aiUse: {
      conditionId: "documented",
      permitted: [
        "AI support for code and model exploration in the development task, with verification and disclosure.",
      ],
      restricted: [
        "No generative AI assistance in the independent diagnostic task under the announced controlled conditions.",
      ],
      disclosure:
        "Describe tools, relevant uses and how outputs were checked; do not upload private records.",
      equitableAlternative:
        "Provide the same starter code and access to approved tools; offer a comparable non AI development route.",
    },
    workload: {
      students: 30,
      groups: 6,
      mode: "individual",
      submissions: 1,
      checkpoints: 1,
      minutes: 30,
      preparation: 5,
      feedback: 6,
      oral: 0,
      studentHours: 24,
      reusablePreparationHours: 3,
      assumptions:
        "30 grading minutes cover both components per student. Five preparation hours cover the paired task and calibration. Uncounted scheduling, moderation and accommodations need a local allowance.",
    },
    accessibility: [
      "Provide an accessible dataset description and keyboard usable development environment.",
      "Arrange equivalent conditions, breaks or additional diagnostic time where approved.",
    ],
    fairness: [
      "Share the rubric and a practice diagnostic example before assessment.",
      "Do not treat disagreement between task performances as proof of misconduct.",
    ],
    limitations: [
      "A narrow diagnostic sample may miss competencies demonstrated elsewhere.",
      "Making a genuinely related unfamiliar problem takes preparation and calibration.",
    ],
    researchConnections: [
      source(
        "twins-protocol",
        "assessment-twins",
        "theoretically-informed-by",
        "The conceptual protocol motivates complementary tasks. It does not empirically validate this ML design.",
        true,
      ),
    ],
  },
  {
    ...shared,
    id: "process-trace-robotics",
    decisionSupport: mapDecisionSupportRecords["process-trace-robotics"],
    framework: innovationFrameworkRecords["process-trace-robotics"],
    teachingMaterials: [...teachingMaterialRecords["process-trace-robotics"]],
    slug: "process-trace-robotics",
    title: "Process Trace Assessment",
    courseId: "robotics",
    context:
      "An illustrative robotics control project using a simulator or a shared laboratory robot. Supply synthetic test cases so hardware access is not the only way to participate.",
    learningOutcomeIds: ["robotics-iterate"],
    competencyIds: ["coding", "experiments", "reflection"],
    assessmentIds: ["practical-projects", "portfolios-and-staged-assessment"],
    catalogueClassification: "adaptation-combination",
    classificationNote:
      "Illustrative combination of a practical project and staged evidence, informed by process assessment and feedback principles.",
    rationale:
      "A small number of selected checkpoints can show how a student interpreted tests and changed a design. Require meaningful decisions and evidence, not exhaustive activity monitoring.",
    suitableSituations: [
      "Iterative engineering work already produces test results.",
      "Students have a safe simulation or equitable access to hardware.",
    ],
    studentInstructions: [
      "Define a measurable robotics task and initial control approach.",
      "Submit a baseline and a small set of interpretable test results.",
      "Select one meaningful design decision or failed test. Explain what the evidence changed in your thinking.",
      "Revise the solution after feedback and demonstrate the result. Submit a concise account of key trade offs.",
    ],
    activities: [
      step(
        "scope",
        2,
        "Define the task",
        "Set a measurable success condition and safe test boundary.",
        "Task statement and test plan.",
        "Lecturer checks scope and feasibility.",
      ),
      step(
        "baseline",
        4,
        "Baseline test",
        "Run the simplest viable controller on the supplied scenarios.",
        "Baseline code and selected test results.",
        "Peer asks one question about the test design.",
      ),
      step(
        "decision",
        7,
        "Selected failure analysis",
        "Explain one failed test and the design choice it motivates; keep a maximum two page record.",
        "Decision note with test evidence.",
        "Lecturer gives focused formative feedback.",
      ),
      step(
        "revise",
        10,
        "Revise and retest",
        "Compare the revised system with the baseline using the same criteria.",
        "Revision and comparison note.",
        "Lab debrief on interpreting differences.",
      ),
      step(
        "demonstrate",
        13,
        "Demonstrate and explain",
        "Demonstrate the solution and explain two decisions using selected evidence.",
        "System demonstration and individual process account.",
        "Rubric comments on the complete evidence bundle.",
        100,
      ),
    ],
    formativeComponents:
      "Baseline and decision reviews remain ungraded. Students can correct misconceptions before the final submission.",
    summativeComponents:
      "The final evidence bundle is assessed once. Earlier checkpoints supply context without repeatedly awarding points for the same work.",
    feedback: {
      existingOpportunities: [
        "Lab troubleshooting, test review and supervision may already provide formative feedback.",
      ],
      possibleAdaptations: [
        "Use one bounded decision note as the focus of feedback.",
      ],
      timing: "Weeks 4, 7 and 10 before final demonstration.",
      sources: "Lab tutor, lecturer, peers and self comparison of tests.",
      studentAction:
        "State which advice changed the controller or test design and why.",
      revisionRole: "Revisions are part of the final assessed bundle.",
      workload:
        "Budget eight minutes of additional feedback per student, using brief comments and a shared lab debrief.",
    },
    observableEvidenceIds: ["process-trace-evidence"],
    individualEvidence:
      "An individual explains a decision using baseline and revised tests. A commit count or hours online is not a measure of understanding.",
    rubric: [
      rubric(
        "tests",
        "Quality of testing",
        35,
        "Tests address the success condition and expose meaningful limits.",
        "Tests demonstrate operation without evaluating limitations.",
      ),
      rubric(
        "decisions",
        "Evidence based revision",
        40,
        "Connects a design change to a specific failure or result.",
        "Describes changes without evidence for their choice.",
      ),
      rubric(
        "explanation",
        "Technical explanation",
        25,
        "Explains the final controller and remaining trade offs.",
        "Reports functionality with little explanation of behaviour.",
      ),
    ],
    aiUse: {
      conditionId: "documented",
      permitted: [
        "Documented AI support for debugging, provided suggested changes are tested.",
      ],
      restricted: [
        "Do not fabricate test logs or replace your own account of decisions with an unverified generated narrative.",
      ],
      disclosure:
        "Record relevant assistance alongside the selected decision, without submitting complete chat histories.",
      equitableAlternative:
        "Provide debugging guidance and a simulator route without requiring a paid AI account.",
    },
    workload: {
      students: 30,
      groups: 6,
      mode: "individual",
      submissions: 1,
      checkpoints: 1,
      minutes: 25,
      preparation: 6,
      feedback: 8,
      oral: 0,
      studentHours: 30,
      reusablePreparationHours: 4,
      assumptions:
        "Final grading covers the bundle once; the feedback budget covers selected checkpoints in total. Laboratory staffing, hardware maintenance and safety supervision are additional.",
    },
    accessibility: [
      "Supply simulator access and accessible text equivalents for logs and diagrams.",
      "Accept an equivalent demonstration recording or supported lab arrangement where appropriate.",
    ],
    fairness: [
      "Assess interpretation rather than the volume of process records.",
      "Use comparable test conditions when hardware performance varies.",
    ],
    limitations: [
      "Too many checkpoints can consume development time and lecturer attention.",
      "Selected traces remain partial and may be reconstructed; they are not surveillance or authorship proof.",
    ],
    researchConnections: [
      source(
        "process-review",
        "crompton-burke-assessment",
        "contextually-related-to",
        "The review identifies process orientation as a theme; this particular sequence is our proposed combination.",
        true,
      ),
      source(
        "process-feedback",
        "feedback-self-regulation",
        "theoretically-informed-by",
        "General formative feedback framework, not direct evidence about robotics process traces.",
      ),
    ],
  },
  {
    ...shared,
    id: "ai-output-auditing",
    decisionSupport: mapDecisionSupportRecords["ai-output-auditing"],
    framework: innovationFrameworkRecords["ai-output-auditing"],
    teachingMaterials: [...teachingMaterialRecords["ai-output-auditing"]],
    slug: "ai-output-auditing",
    title: "AI Output Auditing",
    courseId: "human-and-ai",
    context:
      "A fictional campus travel recommendation contains unsupported claims about emissions, accessibility and model confidence. Supply a fixed synthetic output and a small public source pack; no live AI account is needed.",
    learningOutcomeIds: ["ai-critique"],
    competencyIds: ["reasoning", "research", "human-ai"],
    assessmentIds: [
      "paper-critiques-and-summaries",
      "take-home-problem-solving",
    ],
    catalogueClassification: "additional-emerging",
    classificationNote:
      "An additional worked possibility using established critique practices. This classification makes no claim of novelty or absence from UTN.",
    rationale:
      "Examining a fixed AI output lets students show how they check claims and explain consequences without rewarding fluent generated text alone.",
    suitableSituations: [
      "Students have practised source evaluation and basic AI limitations.",
      "A fixed output makes the task possible without personal AI subscriptions.",
    ],
    studentInstructions: [
      "Read the fictional recommendation and mark unsupported claims, errors, assumptions and omissions.",
      "Choose three consequential claims and verify them against traceable sources. Explain why the sources are suitable.",
      "Write an annotated correction report separating errors from uncertainties.",
      "Explain the likely consequences of relying on the original response for different users.",
    ],
    activities: [
      step(
        "orient",
        2,
        "Practise a claim check",
        "Work through a short invented claim with the supplied source pack.",
        "A practice annotation.",
        "Whole class discussion of evidence quality.",
      ),
      step(
        "identify",
        5,
        "Identify risks",
        "Classify claims as supported, unsupported, incorrect or uncertain.",
        "Initial claim table.",
        "Peer identifies an overlooked assumption.",
      ),
      step(
        "verify",
        8,
        "Verify selected claims",
        "Trace three claims and note uncertainty and conflicting sources.",
        "Source trail and draft corrections.",
        "Lecturer models a check of one disputed claim.",
      ),
      step(
        "report",
        11,
        "Submit the audit",
        "Submit the correction report and implications for affected users.",
        "Individual annotated audit.",
        "Rubric feedback followed by debrief.",
        100,
      ),
    ],
    formativeComponents:
      "Practice annotation and draft claim table are ungraded.",
    summativeComponents:
      "Assess the final audit for the quality of verification, corrections and justified consequences. Do not grade merely the number of errors found.",
    feedback: {
      existingOpportunities: [
        "Seminar discussion and comments on source use may already be present.",
      ],
      possibleAdaptations: [
        "Exchange one claim table before submission and require a response to the question received.",
      ],
      timing: "Weeks 2, 5 and 8, before the week 11 report.",
      sources: "Peer, lecturer and comparison with original sources.",
      studentAction: "Recheck an assumption and explain any resulting change.",
      revisionRole: "The revised audit is the summative submission.",
      workload:
        "Five minutes per student of focused feedback plus a shared discussion.",
    },
    observableEvidenceIds: ["audit-student-evidence"],
    individualEvidence:
      "A claim to source trail, defensible correction and explanation of uncertainty demonstrate an individual's judgement. The fixed output itself is a fictional teaching artefact.",
    rubric: [
      rubric(
        "verification",
        "Source verification",
        40,
        "Uses traceable appropriate sources and handles conflicting evidence.",
        "Relies on another AI response or an untraceable citation.",
      ),
      rubric(
        "correction",
        "Accuracy and reasoning",
        35,
        "Explains how evidence supports each correction and remaining uncertainty.",
        "Changes wording without resolving the substantive claim.",
      ),
      rubric(
        "consequences",
        "Implications for people",
        25,
        "Connects specific weaknesses to plausible consequences and limits.",
        "Lists generic risks without reference to the output.",
      ),
    ],
    aiUse: {
      conditionId: "critical",
      permitted: [
        "The provided synthetic AI output is the object of critique. Optional AI search suggestions must be independently checked.",
      ],
      restricted: [
        "An AI generated citation or answer is not accepted as verification. Do not upload personal data.",
      ],
      disclosure:
        "Identify any additional AI assistance and distinguish it from checked sources.",
      equitableAlternative:
        "All students receive the same output and source pack; no account is required.",
    },
    workload: {
      students: 30,
      groups: 6,
      mode: "individual",
      submissions: 1,
      checkpoints: 1,
      minutes: 20,
      preparation: 4,
      feedback: 5,
      oral: 0,
      studentHours: 12,
      reusablePreparationHours: 2,
      assumptions:
        "Preparation includes testing the fictional output against a source key. Refresh outdated sources each semester; estimated times are not measured institutional data.",
    },
    accessibility: [
      "Provide the output and source pack as accessible text with descriptive link names.",
      "Permit a structured table or equivalent narrated audit with a transcript.",
    ],
    fairness: [
      "Make source access possible without paid subscriptions.",
      "Accept justified uncertainty when reliable sources disagree.",
    ],
    limitations: [
      "A seeded example may cue students to expect every claim to be wrong.",
      "The review is contextual and does not directly validate this audit design.",
    ],
    researchConnections: [
      source(
        "audit-review",
        "xia-assessment-review",
        "contextually-related-to",
        "The review provides assessment context. Direct support for this fixed output auditing task remains unverified.",
        true,
      ),
    ],
  },
  {
    ...shared,
    id: "unseen-transfer-ml",
    decisionSupport: mapDecisionSupportRecords["unseen-transfer-ml"],
    framework: innovationFrameworkRecords["unseen-transfer-ml"],
    teachingMaterials: [...teachingMaterialRecords["unseen-transfer-ml"]],
    slug: "unseen-transfer-machine-learning",
    title: "Unseen Transfer Challenge",
    courseId: "machine-learning",
    context:
      "After an ML assignment, provide a short synthetic dataset shift, such as a changed class balance or a missing feature. Teach the concepts and offer a practice challenge before introducing the assessed variation.",
    learningOutcomeIds: ["ml-transfer"],
    competencyIds: ["problem-solving", "algorithms", "reasoning"],
    assessmentIds: [
      "individual-coding-assignments",
      "in-class-written-problem-solving",
    ],
    catalogueClassification: "adaptation-combination",
    classificationNote:
      "Proposed adaptation of coding and independent problem solving. Direct transfer assessment literature still needs to be added.",
    rationale:
      "A related new constraint can reveal whether students can select and justify a method beyond the prepared case. Unfamiliarity should concern application, not untaught content.",
    suitableSituations: [
      "The intended outcome explicitly includes transfer.",
      "A brief challenge can sample a meaningful change without requiring a complete new project.",
    ],
    studentInstructions: [
      "Complete the prepared project and explain the assumptions behind your method.",
      "For the new dataset shift, select a response and justify why it fits.",
      "Compare the new problem with your original task and identify one limit of your solution.",
    ],
    activities: [
      step(
        "practice",
        3,
        "Practise transfer",
        "Discuss a changed class balance in a low stakes example.",
        "A comparison of possible responses.",
        "Lecturer discusses reasonable alternatives.",
      ),
      step(
        "project",
        8,
        "Prepared project",
        "Submit a model and explanation of assumptions.",
        "Project report and code.",
        "Project feedback before the challenge.",
        60,
      ),
      step(
        "challenge",
        10,
        "Related unfamiliar constraint",
        "Choose and explain a response to an unseen but taught type of shift.",
        "Independent short solution and rationale.",
        "Shared debrief after completion.",
        40,
      ),
      step(
        "reflect",
        12,
        "Compare contexts",
        "Explain which assumptions held and which needed revision.",
        "Ungraded reflection.",
        "Self review with the rubric.",
      ),
    ],
    formativeComponents: "Practice challenge and reflection are ungraded.",
    summativeComponents:
      "Illustrative 60% prepared project and 40% challenge; the challenge prioritises justified selection over speed.",
    feedback: {
      existingOpportunities: [
        "Project feedback can identify assumptions students should examine.",
      ],
      possibleAdaptations: ["Use a practice shift and an after task debrief."],
      timing:
        "Practice in week 3; project feedback before week 10; reflection in week 12.",
      sources: "Lecturer and self review.",
      studentAction:
        "Use project feedback to prepare a strategy, then explain how it changes for the new case.",
      revisionRole:
        "Project revisions follow announced rules; the challenge is assessed as submitted.",
      workload:
        "Four additional feedback minutes per student, supplemented by a shared debrief.",
    },
    observableEvidenceIds: ["transfer-student-evidence"],
    individualEvidence:
      "An independent selection, explanation of changed assumptions and reasoned comparison provide a bounded sample of transfer.",
    rubric: [
      rubric(
        "selection",
        "Method selection",
        35,
        "Selects a feasible method that addresses the changed constraint.",
        "Repeats the old solution without considering the change.",
      ),
      rubric(
        "justification",
        "Justification and comparison",
        45,
        "Explains how assumptions differ and why the response fits.",
        "Makes a plausible choice with little supporting reasoning.",
      ),
      rubric(
        "limits",
        "Limits and checks",
        20,
        "Proposes a relevant check and acknowledges uncertainty.",
        "Claims success without a check or limitation.",
      ),
    ],
    aiUse: {
      conditionId: "documented",
      permitted: ["Documented AI support in the prepared project."],
      restricted: [
        "No generative AI in the independent challenge; permitted reference materials must be announced.",
      ],
      disclosure:
        "Describe relevant project tool use and independently check the result.",
      equitableAlternative:
        "Provide accessible reference sheets, practice conditions and approved accommodations.",
    },
    workload: {
      students: 30,
      groups: 6,
      mode: "individual",
      submissions: 1,
      checkpoints: 1,
      minutes: 25,
      preparation: 5,
      feedback: 4,
      oral: 0,
      studentHours: 22,
      reusablePreparationHours: 2,
      assumptions:
        "Grading budget covers both components. Creating and moderating equivalent challenge variants needs local planning beyond this simple estimate.",
    },
    accessibility: [
      "Use accessible small datasets and plain instructions.",
      "Arrange extra time or an equivalent mode where speed is not an intended competency.",
    ],
    fairness: [
      "Provide practice and assess only taught concepts.",
      "Moderate challenge variants for comparable difficulty.",
    ],
    limitations: [
      "One challenge cannot establish broad transfer across all contexts.",
      "Corbin and colleagues provide contextual reading; additional direct transfer assessment research is required.",
    ],
    researchConnections: [
      source(
        "transfer-context",
        "corbin-structural-assessment",
        "contextually-related-to",
        "Structural assessment discussion is contextual. It is not direct transfer evidence.",
      ),
    ],
  },
  {
    ...shared,
    id: "dialogic-defence-robotics",
    decisionSupport: mapDecisionSupportRecords["dialogic-defence-robotics"],
    framework: innovationFrameworkRecords["dialogic-defence-robotics"],
    teachingMaterials: [
      ...teachingMaterialRecords["dialogic-defence-robotics"],
    ],
    slug: "short-dialogic-defence-robotics",
    title: "Short Dialogic Defence",
    courseId: "robotics",
    context:
      "An individual discussion after a robotics project or group demonstration. Use a common question bank, criteria and equivalent alternative scenarios.",
    learningOutcomeIds: ["robotics-defend"],
    competencyIds: ["communication", "reasoning", "coding"],
    assessmentIds: ["practical-projects", "oral-examinations"],
    catalogueClassification: "adaptation-combination",
    classificationNote:
      "Illustrative combination of a project and focused individual discussion, not a claim of a new assessment method.",
    rationale:
      "A short discussion lets a student explain a technical choice and consider an alternative. Five minutes is a design assumption, not a proven optimal duration or a test of who used AI.",
    suitableSituations: [
      "A project supplies concrete decisions worth discussing.",
      "The cohort and available staffing allow equitable individual appointments.",
    ],
    studentInstructions: [
      "Select one design choice in your submitted system and prepare to explain it.",
      "In the discussion, explain your choice and respond to an alternative or failure scenario.",
      "Use sketches, the system or agreed communication supports to make your reasoning clear.",
    ],
    activities: [
      step(
        "brief",
        3,
        "Share criteria and practice questions",
        "Try a sample question with a peer.",
        "Practice explanation.",
        "Peer identifies a point needing clarification.",
      ),
      step(
        "submit",
        10,
        "Submit or demonstrate the system",
        "Provide the project artefact and identify a decision to discuss.",
        "System and decision note.",
        "Lecturer acknowledges the discussion focus.",
        70,
      ),
      step(
        "discuss",
        11,
        "Five minute individual discussion",
        "Spend one minute locating the decision, two explaining it, and two considering an alternative or failure. Adjust timings for approved accommodations.",
        "Lecturer criterion notes from the individual discussion.",
        "Brief feedback after the assessment decision.",
        30,
      ),
      step(
        "reflect",
        13,
        "Plan a next step",
        "Use comments to identify an explanation or test to improve.",
        "Ungraded action note.",
        "Self review.",
      ),
    ],
    formativeComponents: "Practice questions and a reflection are ungraded.",
    summativeComponents:
      "Illustrative project 70%, discussion 30%. Keep the discussion criteria visible and avoid unexpected shifts in difficulty.",
    feedback: {
      existingOpportunities: [
        "Project supervision and demonstration questions may already provide dialogue.",
      ],
      possibleAdaptations: [
        "Use a short common protocol and a criterion note for each student.",
      ],
      timing: "Practice in week 3, project in week 10, discussion in week 11.",
      sources: "Lecturer and peer practice partner.",
      studentAction:
        "Clarify the reasoning after practice and identify a future technical improvement.",
      revisionRole:
        "Practice informs the project; the summative discussion is judged as delivered under approved conditions.",
      workload:
        "The five minute meeting includes the response. Three additional feedback minutes per student are budgeted separately; transitions and scheduling are excluded.",
    },
    observableEvidenceIds: ["dialogue-student-evidence"],
    individualEvidence:
      "A student's explanation and response to an alternative show a sample of technical reasoning. Record criterion notes, not unnecessary audio or video.",
    rubric: [
      rubric(
        "reasoning",
        "Technical reasoning",
        45,
        "Explains why the choice fits the system and constraints.",
        "Describes the choice without a technical reason.",
      ),
      rubric(
        "alternative",
        "Response to an alternative",
        35,
        "Uses a relevant consequence or failure mode to compare options.",
        "Makes an unsupported assertion about the alternative.",
      ),
      rubric(
        "clarity",
        "Clarity of explanation",
        20,
        "Makes reasoning understandable with agreed supports.",
        "Leaves key steps unclear even after clarification; accent is not a criterion.",
      ),
    ],
    aiUse: {
      conditionId: "documented",
      permitted: [
        "Documented AI support during project development and practice.",
      ],
      restricted: [
        "No live generative AI responses in the independent discussion; accessibility tools remain subject to agreed arrangements.",
      ],
      disclosure:
        "Describe relevant project assistance; discussion records should focus on competency evidence.",
      equitableAlternative:
        "Offer approved communication supports or an equivalent assessment mode without lowering the intended competency.",
    },
    workload: {
      students: 30,
      groups: 6,
      mode: "group",
      submissions: 1,
      checkpoints: 1,
      minutes: 30,
      preparation: 2,
      feedback: 15,
      oral: 5,
      studentHours: 3,
      reusablePreparationHours: 1,
      assumptions:
        "Six group artefacts at 30 minutes each, plus 30 individual discussions. Oral time: 30 × 5 = 150 minutes, or 2.5 hours. Feedback is budgeted as 15 minutes per five student group, equivalent to three minutes per student, in the existing calculator. Student hours cover defence preparation only; the underlying project is additional. Scheduling, breaks, moderation and accommodations add time.",
    },
    accessibility: [
      "Share the structure and allow agreed communication aids and processing time.",
      "Offer accessible rooms and equivalent arrangements for disability related barriers.",
    ],
    fairness: [
      "Use comparable prompts and brief moderation of criterion notes.",
      "Assess technical reasoning rather than confidence, accent or speed of speech.",
    ],
    limitations: [
      "Five minutes samples only a small part of understanding.",
      "Cohort scheduling and anxiety may make this format unsuitable without adaptation.",
    ],
    researchConnections: [
      source(
        "dialogue-context",
        "crompton-burke-assessment",
        "contextually-related-to",
        "The review identifies oral and dialogic designs. It does not establish an optimal duration or validate this protocol.",
        true,
      ),
    ],
  },
  {
    ...shared,
    id: "ai-feedback-verification",
    decisionSupport: mapDecisionSupportRecords["ai-feedback-verification"],
    framework: innovationFrameworkRecords["ai-feedback-verification"],
    teachingMaterials: [...teachingMaterialRecords["ai-feedback-verification"]],
    slug: "ai-feedback-verification",
    title: "AI Feedback Verification",
    courseId: "human-and-ai",
    context:
      "Students write a short analysis of a fictional AI deployment decision. Provide a fixed synthetic feedback sheet containing useful and questionable advice, or use an approved tool with an equivalent offline option.",
    learningOutcomeIds: ["ai-feedback-judgement"],
    competencyIds: ["reflection", "reasoning", "human-ai"],
    assessmentIds: ["peer-review", "portfolios-and-staged-assessment"],
    catalogueClassification: "adaptation-combination",
    classificationNote:
      "Proposed adaptation of feedback and revision practice. Feedback culture already exists; AI changes the source and verification task, not its invention.",
    rationale:
      "Students should decide what feedback deserves action rather than accept suggestions because they sound confident. General formative feedback theory is not direct evidence of AI feedback effectiveness.",
    suitableSituations: [
      "There is time for a first response, feedback evaluation and revision.",
      "Students can access the same feedback or an equivalent offline version.",
    ],
    studentInstructions: [
      "Write an initial analysis and keep it as a baseline.",
      "Read the supplied AI feedback. Mark useful, inaccurate and unsupported suggestions, checking them against criteria and sources.",
      "Revise selectively. For at least three suggestions, explain why you accepted, modified or rejected them.",
      "Submit the initial work, feedback decision table and revised response as one bounded bundle.",
    ],
    activities: [
      step(
        "criteria",
        2,
        "Discuss useful feedback",
        "Compare a helpful comment with a plausible but unsupported suggestion.",
        "Practice evaluation.",
        "Lecturer models an evidence based decision.",
      ),
      step(
        "draft",
        5,
        "Initial response",
        "Write an analysis using the announced criteria.",
        "Baseline response.",
        "Fixed synthetic AI feedback supplied after the draft.",
      ),
      step(
        "verify",
        7,
        "Evaluate feedback",
        "Check three suggestions against the task and sources.",
        "Feedback decision table.",
        "Peer questions one accept or reject decision.",
      ),
      step(
        "revise",
        10,
        "Selective revision",
        "Submit the revised response and explain your decisions.",
        "Initial response, decision table and revision.",
        "Rubric feedback on judgement and improvement.",
        100,
      ),
    ],
    formativeComponents:
      "The initial response and peer question are ungraded opportunities to improve.",
    summativeComponents:
      "Assess the final bundle for justified feedback decisions and disciplinary quality, not the amount of AI feedback accepted.",
    feedback: {
      existingOpportunities: [
        "Comments on drafts and revision discussions may already be part of the course.",
      ],
      possibleAdaptations: [
        "Insert an explicit verification step before revision.",
      ],
      timing:
        "AI feedback after week 5, peer question in week 7, final comments after week 10.",
      sources:
        "Provided synthetic AI comments, peers, lecturer and student self review.",
      studentAction:
        "Accept, modify or reject advice with a task based explanation.",
      revisionRole:
        "Selective revision and its justification contribute to summative evidence.",
      workload:
        "Count six minutes per student for checking feedback decisions; preparing and validating the synthetic feedback is a separate setup task.",
    },
    observableEvidenceIds: ["feedback-verification-evidence"],
    individualEvidence:
      "The decision table connects specific suggestions to checks and resulting revisions, providing an individual account of evaluative judgement.",
    rubric: [
      rubric(
        "judgement",
        "Feedback judgement",
        40,
        "Explains accept, modify and reject decisions using criteria or sources.",
        "Accepts advice based on fluency or rejects it without reasons.",
      ),
      rubric(
        "revision",
        "Quality of revision",
        40,
        "Improves the substantive analysis while avoiding inaccurate advice.",
        "Makes surface changes while preserving substantive errors.",
      ),
      rubric(
        "reflection",
        "Traceable explanation",
        20,
        "Connects changes and retained decisions to evidence.",
        "Lists edits without explaining why they were appropriate.",
      ),
    ],
    aiUse: {
      conditionId: "critical",
      permitted: [
        "Use the supplied AI feedback as material to evaluate; approved optional tools may suggest alternatives.",
      ],
      restricted: [
        "Do not submit unverified generated revisions or upload private work to unapproved services.",
      ],
      disclosure:
        "Identify the feedback source and any additional assistance. Do not submit entire personal chat histories.",
      equitableAlternative:
        "Provide the same static synthetic feedback and source pack to all students without a paid account.",
    },
    workload: {
      students: 30,
      groups: 6,
      mode: "individual",
      submissions: 1,
      checkpoints: 1,
      minutes: 20,
      preparation: 4,
      feedback: 6,
      oral: 0,
      studentHours: 14,
      reusablePreparationHours: 2,
      assumptions:
        "Grading covers one bundle. Preparation includes independently checking the feedback. Real tool outputs vary and could increase review time.",
    },
    accessibility: [
      "Provide accessible drafts and feedback with clear references to passages.",
      "Allow an equivalent format for explaining decisions, with transcript where needed.",
    ],
    fairness: [
      "Reward justified rejection as well as justified acceptance.",
      "Keep access and the feedback material equivalent across students.",
    ],
    limitations: [
      "Students may reconstruct a decision narrative without actually engaging with feedback.",
      "General feedback theory and a scoping review do not establish effectiveness of this particular AI workflow.",
    ],
    researchConnections: [
      source(
        "feedback-ai-context",
        "xia-assessment-review",
        "contextually-related-to",
        "Context about AI and assessment, not direct support for this revision protocol.",
        true,
      ),
      source(
        "feedback-theory",
        "feedback-self-regulation",
        "theoretically-informed-by",
        "General formative feedback principles inform revision opportunities. This is not an AI effectiveness claim.",
      ),
    ],
  },
  {
    ...shared,
    id: "failure-analysis-robotics",
    decisionSupport: mapDecisionSupportRecords["failure-analysis-robotics"],
    framework: innovationFrameworkRecords["failure-analysis-robotics"],
    teachingMaterials: [
      ...teachingMaterialRecords["failure-analysis-robotics"],
    ],
    slug: "authentic-failure-analysis-robotics",
    title: "Authentic Failure Analysis Simulation",
    courseId: "robotics",
    context:
      "A fictional mobile robot stops inconsistently near a doorway. Provide synthetic timestamped sensor readings, a controller description and observations. No actual incident or identifiable organisation is described.",
    learningOutcomeIds: ["robotics-diagnose"],
    competencyIds: ["problem-solving", "experiments", "ethics"],
    assessmentIds: ["take-home-problem-solving", "practical-projects"],
    catalogueClassification: "additional-emerging",
    classificationNote:
      "An additional illustrative application of established authentic assessment principles. No novelty or institutional absence is asserted.",
    rationale:
      "A bounded failure scenario can make diagnosis, evidence use and safety trade offs visible without requiring access to a real unsafe system.",
    suitableSituations: [
      "Students understand the sensors and control concepts used in the scenario.",
      "Simulation is safer and more accessible than producing a real hardware failure.",
    ],
    studentInstructions: [
      "Read the fictional incident pack and distinguish observations from assumptions.",
      "Identify at least two plausible causes and propose tests that would distinguish them.",
      "Use the supplied additional test results to revise your diagnosis.",
      "Recommend a corrective action and explain performance, safety and feasibility trade offs.",
    ],
    activities: [
      step(
        "brief",
        3,
        "Inspect the fictional failure",
        "Annotate the provided logs and list information still needed.",
        "Observation and assumption table.",
        "Lecturer clarifies the pack, not the correct diagnosis.",
      ),
      step(
        "hypotheses",
        6,
        "Compare plausible causes",
        "Explain two causes and a discriminating test for each.",
        "Diagnostic plan.",
        "Peer checks whether the test could distinguish the causes.",
      ),
      step(
        "test",
        9,
        "Interpret additional results",
        "Use a common supplied test result to revise your causal account.",
        "Revised diagnosis.",
        "Seminar discussion of uncertainty.",
      ),
      step(
        "recommend",
        12,
        "Recommend action",
        "Submit a diagnosis and justified corrective plan with a safety check.",
        "Individual engineering report.",
        "Rubric comments and scenario debrief.",
        100,
      ),
    ],
    formativeComponents:
      "Observation table and diagnostic plan receive formative comments.",
    summativeComponents:
      "Assess the final report for reasoning and testing, including defensible uncertainty rather than only one expected diagnosis.",
    feedback: {
      existingOpportunities: [
        "Engineering labs often include discussion of test failures and troubleshooting.",
      ],
      possibleAdaptations: [
        "Provide a shared diagnostic pack and a peer challenge of the test plan.",
      ],
      timing: "Weeks 3 and 6 before additional results and the final report.",
      sources: "Lecturer, peer and comparison with supplied results.",
      studentAction:
        "Revise hypotheses and explain why a test changes confidence.",
      revisionRole:
        "The revised causal account forms part of the final evidence.",
      workload:
        "Five minutes per student for focused comments; a shared debrief can address recurring issues.",
    },
    observableEvidenceIds: ["failure-analysis-evidence"],
    individualEvidence:
      "An individual's observation table, competing hypotheses, discriminating tests and revised diagnosis show how the recommendation follows from evidence.",
    rubric: [
      rubric(
        "diagnosis",
        "Diagnostic reasoning",
        35,
        "Distinguishes evidence from assumptions and compares plausible causes.",
        "Selects one cause without considering alternatives.",
      ),
      rubric(
        "tests",
        "Test quality",
        35,
        "Proposes feasible tests and uses results to update the account.",
        "Proposes tests that cannot distinguish the competing causes.",
      ),
      rubric(
        "tradeoffs",
        "Safety and feasibility",
        30,
        "Justifies a corrective action and recognises safety and resource limits.",
        "Optimises performance without addressing safety or feasibility.",
      ),
    ],
    aiUse: {
      conditionId: "documented",
      permitted: [
        "Documented AI suggestions for hypotheses, independently checked against the pack.",
      ],
      restricted: [
        "Do not invent logs, treat AI output as observed evidence or test unsafe actions on real robots.",
      ],
      disclosure:
        "Identify assistance and explain which suggestions were verified or rejected.",
      equitableAlternative:
        "Provide a hypothesis worksheet and the same synthetic evidence without requiring AI access.",
    },
    workload: {
      students: 30,
      groups: 6,
      mode: "individual",
      submissions: 1,
      checkpoints: 1,
      minutes: 25,
      preparation: 6,
      feedback: 5,
      oral: 0,
      studentHours: 18,
      reusablePreparationHours: 4,
      assumptions:
        "Preparation includes making an internally consistent synthetic scenario and a moderation key. This is an estimate; producing a robust pack may take longer.",
    },
    accessibility: [
      "Provide text equivalents for plots, diagrams and logs.",
      "Use a simulation or paper route that does not require physical robot operation.",
    ],
    fairness: [
      "Give everyone the same scenario information and clarify queries publicly.",
      "Reward justified alternatives and uncertainty rather than guessing the author's intended cause.",
    ],
    limitations: [
      "A scripted scenario may simplify the ambiguity of real engineering failures.",
      "A broad authentic assessment review does not establish effectiveness of this robotics simulation.",
    ],
    researchConnections: [
      source(
        "failure-authenticity",
        "authentic-assessment-review",
        "theoretically-informed-by",
        "Authentic assessment principles are a theoretical starting point for this proposed scenario, not direct empirical support.",
      ),
    ],
  },
  {
    ...shared,
    id: "collaborative-individual-ml",
    decisionSupport: mapDecisionSupportRecords["collaborative-individual-ml"],
    framework: innovationFrameworkRecords["collaborative-individual-ml"],
    teachingMaterials: [
      ...teachingMaterialRecords["collaborative-individual-ml"],
    ],
    slug: "collaborative-project-individual-evidence",
    title: "Collaborative Project with Individual Evidence",
    courseId: "machine-learning",
    context:
      "Six teams of five students develop an ML solution using public data. The team artefact and individual explanation serve different criteria. Responsibilities can evolve and should not be reduced to commit counts.",
    learningOutcomeIds: ["ml-collaborate-explain"],
    competencyIds: ["collaboration", "coding", "reflection"],
    assessmentIds: [
      "collaborative-coding-assignments",
      "portfolios-and-staged-assessment",
    ],
    catalogueClassification: "adaptation-combination",
    classificationNote:
      "Proposed adaptation of a collaborative project with a proportionate individual evidence component. Additional group assessment and accountability research is needed.",
    rationale:
      "Team work can assess collaboration while a short individual explanation gives each student a route to demonstrate understanding. Transparent criteria help make their distinct purposes clear.",
    suitableSituations: [
      "Collaboration is an explicit learning outcome.",
      "Students have opportunities to understand more than their assigned task.",
    ],
    studentInstructions: [
      "Agree the team's project plan and provisional responsibilities. Update them when the work changes.",
      "Build and test the shared solution, documenting a few meaningful decisions and contributions.",
      "Submit the group artefact and a concise team account of decisions.",
      "Individually explain one technical decision, a contribution and what you learned from another team member. Use evidence and acknowledge limits.",
    ],
    activities: [
      step(
        "plan",
        2,
        "Agree roles and expectations",
        "Set communication and contribution expectations with a route to raise problems.",
        "Team plan.",
        "Lecturer checks feasibility and inclusion.",
      ),
      step(
        "checkpoint",
        6,
        "Review collaboration and tests",
        "Discuss progress and adjust roles using a short decision record.",
        "Team checkpoint note.",
        "Peer discussion and tutor support where needed.",
      ),
      step(
        "group",
        11,
        "Submit the shared solution",
        "Provide a reproducible model and team decision account.",
        "Group code, results and explanation.",
        "Group rubric comments.",
        60,
      ),
      step(
        "individual",
        12,
        "Explain individual understanding",
        "Submit a bounded individual explanation tied to a concrete decision and contribution.",
        "Individual explanation and reflection.",
        "Individual criterion feedback.",
        40,
      ),
    ],
    formativeComponents:
      "The team plan and checkpoint are ungraded opportunities to adjust responsibilities and request support.",
    summativeComponents:
      "Illustrative group component 60% and individual component 40%. Apply group criteria to the artefact and individual criteria to each student's own evidence.",
    feedback: {
      existingOpportunities: [
        "Team meetings, supervision and peer discussion can already support collaborative projects.",
      ],
      possibleAdaptations: [
        "Add a bounded individual explanation and an early route for contribution concerns.",
      ],
      timing:
        "Plan in week 2, checkpoint in week 6, group feedback in week 11 and individual feedback after week 12.",
      sources: "Team peers, lecturer and individual self reflection.",
      studentAction:
        "Update responsibilities, improve the shared solution and explain individual learning.",
      revisionRole:
        "Pre submission revisions contribute to the artefact. Do not change an individual's grade solely on unmoderated peer popularity scores.",
      workload:
        "Budget five additional feedback minutes per team; individual explanations are included separately in grading time.",
    },
    observableEvidenceIds: ["collaborative-individual-evidence"],
    individualEvidence:
      "Each student explains a concrete decision and its technical implications, acknowledges a contribution and discusses learning. Participation logs alone do not establish competence.",
    rubric: [
      rubric(
        "group-quality",
        "Group solution and evaluation",
        60,
        "The team artefact is reproducible and evaluated against agreed criteria.",
        "The shared artefact works incompletely or lacks a defensible evaluation.",
      ),
      rubric(
        "individual-understanding",
        "Individual technical understanding",
        25,
        "Explains a concrete choice and its consequences independently.",
        "Describes a contribution without demonstrating understanding.",
      ),
      rubric(
        "collaborative-reflection",
        "Individual collaborative reflection",
        15,
        "Uses specific examples to examine contribution, collaboration and next steps.",
        "Makes general claims about effort without examples or reflection.",
      ),
    ],
    aiUse: {
      conditionId: "collaborative",
      permitted: [
        "Agreed AI support in shared development, with team disclosure and independent checks.",
      ],
      restricted: [
        "Do not fabricate contributions, submit AI explanations you cannot defend or upload confidential peer information.",
      ],
      disclosure:
        "Explain relevant tool use and checks in the group account; make individual reasoning your own.",
      equitableAlternative:
        "Agree a common approved tool environment and a non AI route; no paid accounts required.",
    },
    workload: {
      students: 30,
      groups: 6,
      mode: "group",
      submissions: 1,
      checkpoints: 1,
      minutes: 80,
      preparation: 4,
      feedback: 5,
      oral: 0,
      studentHours: 30,
      reusablePreparationHours: 2,
      assumptions:
        "80 grading minutes per group bundle = 30 for the shared artefact plus 5 × 10 for individual explanations. Six bundles, with five feedback minutes per team. Conflict resolution, moderation and accommodations require extra time.",
    },
    accessibility: [
      "Offer flexible ways to contribute, accessible collaboration tools and clear meeting records.",
      "Allow an equivalent individual explanation format and address scheduling barriers early.",
    ],
    fairness: [
      "Publish the group and individual criteria separately before work starts.",
      "Provide a confidential route for contribution concerns and moderate evidence before decisions.",
    ],
    limitations: [
      "Individual explanations are a partial sample and can still be rehearsed.",
      "Unequal opportunities to contribute need teaching support, not only grade adjustments.",
    ],
    researchConnections: [
      source(
        "collaboration-context",
        "corbin-structural-assessment",
        "contextually-related-to",
        "A structural assessment reading is contextual; direct research on group assessment and individual accountability remains required.",
      ),
    ],
  },
];
export const pathwayEvidenceRecords = implementationPathwayRecords.flatMap(
  (p) =>
    p.observableEvidenceIds.map((id) => ({
      id,
      label: `${p.title}: individual evidence`,
      description: p.individualEvidence,
      competencyIds: p.competencyIds,
      aiUseConditionIds: [p.aiUse.conditionId],
      interpretationLimits: p.limitations.join(" "),
      editorialReview: p.editorialReview,
    })),
);
export const applicationEvidenceRecords = implementationPathwayRecords.flatMap(
  (p) =>
    p.framework.applications.map((a) => ({
      id: `${a.id}-evidence`,
      label: `${a.title}: student evidence`,
      description: a.observableEvidence,
      competencyIds: a.competencyIds,
      aiUseConditionIds: [],
      interpretationLimits:
        "Proposed evidence in an illustrative application. It is not observed student data or a validated measurement. AI conditions and local assessment criteria require review.",
      editorialReview: p.editorialReview,
    })),
);
