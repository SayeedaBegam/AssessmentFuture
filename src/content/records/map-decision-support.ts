import type { ImplementationPathway } from "@/lib/content-schema";
export const mapDecisionSupportRecords: Record<
  string,
  ImplementationPathway["decisionSupport"]
> = {
  "assessment-twins-ml": {
    existingStructure:
      "A coding assignment can already combine a working solution, tests and a technical explanation.",
    existingFeedback:
      "Plan discussions, code reviews and comments on evaluation results may already support the assignment. The actual opportunities depend on the course.",
    existingEvidence:
      "Submitted code, tests, evaluation results and explanations provide evidence of technical choices and performance under the stated conditions.",
    proposedChanges:
      "Deliberately pair the tool permitted assignment with a related independent diagnostic task addressing the same outcome.",
    introducedCheckpoints:
      "Align a plan review, project submission and independent diagnostic response; give students a practice diagnostic before assessment.",
    additionalEvidence:
      "An individual explanation of an unfamiliar error adds a complementary sample of judgement. Differences between tasks are not automatic evidence of misconduct.",
    additionalEffort:
      "Prepare and moderate a related diagnostic, coordinate the timing, mark both components and arrange equivalent access. Existing project marking is retained in the worked example budget, not assumed to disappear.",
    scalability:
      "A short written diagnostic can be scheduled for a cohort, but comparable variants and moderation take preparation. Larger classes may need parallel marking and additional accommodations.",
    dataProtectionQuestions: [
      "Can the development task use public or generated data instead of private material?",
      "Which code or data may be shared with approved AI tools, and who can view the decision log?",
    ],
  },
  "process-trace-robotics": {
    existingStructure:
      "A practical project can already include development, testing, lab discussion and a final demonstration.",
    existingFeedback:
      "Supervision, troubleshooting and reviews of test results may already provide feedback during development.",
    existingEvidence:
      "The system, test results, lab notes and explanations may already reveal parts of the development process when they are collected.",
    proposedChanges:
      "Select a few bounded decision and test records explicitly, rather than increasing the volume of monitoring.",
    introducedCheckpoints:
      "Review a baseline, one meaningful failure or design decision, and a revised comparison before the final evidence bundle.",
    additionalEvidence:
      "A student connects a revision to test evidence and explains why an alternative was rejected.",
    additionalEffort:
      "Plan focused checkpoint feedback and assess the final bundle once. Remove records that do not inform judgement; lab staffing and hardware maintenance are additional to marking estimates.",
    scalability:
      "A bounded note and shared debrief can limit repeated comments, but feedback and supervision still scale with students or teams. Documentation limits need to be explicit.",
    dataProtectionQuestions: [
      "Which selected traces are necessary, and when should they be deleted?",
      "Can decision notes avoid complete chat histories, continuous activity logs and information about other students?",
    ],
  },
  "ai-output-auditing": {
    existingStructure:
      "A critique or problem solving assignment can already ask students to evaluate claims and justify conclusions.",
    existingFeedback:
      "Seminar discussion, peer questions and comments on source selection may already be available.",
    existingEvidence:
      "Annotations, references and a reasoned report can already show how students evaluate an argument.",
    proposedChanges:
      "Use a shared fictional AI output as the object of critique and require a traceable check of consequential claims.",
    introducedCheckpoints:
      "Practise one claim check, review a draft claim table, then submit an annotated correction and its implications.",
    additionalEvidence:
      "A claim to source trail makes it possible to examine the student's verification decisions and justified uncertainty.",
    additionalEffort:
      "Prepare and independently check the synthetic output and source key. Mark the quality of verification rather than the number of errors found; sources may need updating each semester.",
    scalability:
      "A common output and source pack can be reused after review. Larger cohorts may need calibrated marking examples and shared feedback on recurring source issues.",
    dataProtectionQuestions: [
      "Can the provided output and source pack be entirely fictional or public?",
      "Do optional AI or search services receive student work, personal information or confidential material?",
    ],
  },
  "unseen-transfer-ml": {
    existingStructure:
      "An assignment can already include varied problems, feedback and opportunities to apply a method.",
    existingFeedback:
      "Project comments and practice problems may already help students reconsider their assumptions.",
    existingEvidence:
      "The prepared solution and its rationale show application under the original task conditions.",
    proposedChanges:
      "Add a related unfamiliar constraint that samples transfer of taught concepts and asks for an explicit comparison with the original task.",
    introducedCheckpoints:
      "Provide a low stakes practice variation, give project feedback before the challenge, and debrief afterwards.",
    additionalEvidence:
      "The student independently selects a response, explains changed assumptions and states what further checks are needed.",
    additionalEffort:
      "Develop and moderate equivalent challenge variants, provide access arrangements and mark the reasoning. One challenge remains only a limited sample of transfer.",
    scalability:
      "A short cohort task may be feasible, but variant equivalence, additional time and resit design need planning. Do not assume that novelty or time pressure improves validity.",
    dataProtectionQuestions: [
      "Can new constraints use synthetic or public data without revealing private course information?",
      "How will diagnostic responses and any tool disclosure be stored, accessed and retained?",
    ],
  },
  "dialogic-defence-robotics": {
    existingStructure:
      "A project demonstration can already include technical questions and individual explanations.",
    existingFeedback:
      "Supervision, practice presentations and demonstration questions may already provide dialogue and feedback.",
    existingEvidence:
      "The submitted system, demonstration and explanations already offer evidence of design choices.",
    proposedChanges:
      "Make a bounded individual discussion explicit, with comparable questions, criteria and agreed communication supports.",
    introducedCheckpoints:
      "Share practice questions, identify a decision after submission, and ask about that decision plus an alternative or failure scenario.",
    additionalEvidence:
      "Criterion notes capture an individual's explanation and response to an alternative, rather than using conversational confidence as a proxy for understanding.",
    additionalEffort:
      "The illustrative five minute discussion for 30 students takes 150 minutes, or 2.5 oral hours. Preparation, grading, feedback, transitions, breaks and moderation must also be planned. Five minutes is not a proven optimum.",
    scalability:
      "Individual oral time grows with student numbers. Larger cohorts may require multiple assessors, calibration and more scheduling time; approved alternative modes may be needed.",
    dataProtectionQuestions: [
      "Are brief criterion notes sufficient without audio or video recording?",
      "Who may view discussion notes, how long are they retained, and how are approved communication supports handled?",
    ],
  },
  "ai-feedback-verification": {
    existingStructure:
      "Drafting, feedback and revision are established assessment practices and may already be central to the course.",
    existingFeedback:
      "Lecturer comments, peer discussion and self review may already guide revisions.",
    existingEvidence:
      "Initial and revised work, plus an explanation of changes, can already show development of understanding.",
    proposedChanges:
      "Insert an explicit check of AI suggestions before revision and ask students to justify acceptance, modification or rejection.",
    introducedCheckpoints:
      "Keep the initial response, provide checked feedback, question a decision before revision, then assess the bounded final bundle.",
    additionalEvidence:
      "A decision table connects feedback, disciplinary checks and revisions, including justified rejection of confident but unsound advice.",
    additionalEffort:
      "Prepare and verify the feedback material, support equitable access, and review students' decisions. General feedback theory does not establish that this AI workflow is effective or saves time.",
    scalability:
      "Static feedback sheets support equivalent access, while live tool outputs may increase variation and checking time. A shared debrief can supplement, but does not replace, individual judgement.",
    dataProtectionQuestions: [
      "Can feedback be supplied as a synthetic sheet without uploading student work?",
      "If an approved tool is used, what text is sent, who processes it and what retention arrangements apply?",
    ],
  },
  "failure-analysis-robotics": {
    existingStructure:
      "A technical problem or practical project can already involve realistic diagnosis and engineering trade offs.",
    existingFeedback:
      "Lab troubleshooting, case discussion and feedback on a diagnostic plan may already be available.",
    existingEvidence:
      "A proposed solution, tests and a justification can already show how students apply technical knowledge.",
    proposedChanges:
      "Use an internally consistent fictional failure pack with competing hypotheses and a staged additional evidence card.",
    introducedCheckpoints:
      "Distinguish observations from assumptions, review discriminating tests, then update the diagnosis before recommending action.",
    additionalEvidence:
      "An individual causal account shows how a student uses a test to revise confidence and weighs safety, feasibility and remaining uncertainty.",
    additionalEffort:
      "Create and check synthetic logs, moderate plausible alternatives and assess diagnostic reasoning. Broad authentic assessment literature does not validate this particular simulation.",
    scalability:
      "A common case pack can be reused after checking, but realistic scenarios and marking keys take preparation. Large cohorts may benefit from shared feedback while retaining individual evidence.",
    dataProtectionQuestions: [
      "Can the failure pack avoid real incidents, organisations, logs and credentials?",
      "Are students clearly instructed not to upload private system information or test unsafe actions on real systems?",
    ],
  },
  "collaborative-individual-ml": {
    existingStructure:
      "A collaborative project can already combine a group artefact, team meetings and individual contribution or understanding evidence.",
    existingFeedback:
      "Team supervision, peer discussion and lecturer support may already address progress and participation.",
    existingEvidence:
      "The shared solution, selected decisions and individual explanations can already show different aspects of learning when collected.",
    proposedChanges:
      "Make the distinct purposes of group and individual evidence explicit, with proportionate criteria and an early route for contribution concerns.",
    introducedCheckpoints:
      "Agree flexible responsibilities, review one team decision, then collect the shared artefact and bounded individual explanations.",
    additionalEvidence:
      "Each student connects a concrete contribution and technical decision to learning, rather than relying on activity counts or peer popularity.",
    additionalEffort:
      "Budget group marking and every individual explanation. The original example's 80 minute group budget includes 30 minutes for the shared artefact and five individual explanations at ten minutes each.",
    scalability:
      "Group artefacts reduce the number of shared submissions but individual evidence review still scales with students. Conflict resolution, moderation and equitable opportunities require additional support.",
    dataProtectionQuestions: [
      "How can contribution concerns be raised confidentially and reviewed fairly?",
      "Can records avoid unnecessary peer personal information, complete chat histories and public contribution rankings?",
    ],
  },
};
