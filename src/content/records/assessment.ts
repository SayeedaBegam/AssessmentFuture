import type { AssessmentApproach } from "@/lib/types";
export const assessmentRecords = [
  {
    name: "Individual coding assignments",
    family: "Coding & making",
    description:
      "Ask students to submit working code, test it, and explain why they chose their approach.",
    competencyIds: ["coding", "reasoning"],
    mode: "Individual",
    duration: "1 to 3 weeks",
    evidence:
      "A functioning implementation, test cases, and an explanation of algorithmic choices.",
    strengths:
      "Creates space to connect conceptual understanding with a tangible implementation.",
    aiConsiderations:
      "AI assisted code can obscure authorship. Consider a decision log and a short walkthrough of a selected function.",
    scalability:
      "Automated checks can support consistency; reviewing reasoning still needs lecturer time.",
    accountability: "Individual code walkthrough and test explanation.",
    resources: "Computing environment",
    id: "individual-coding-assignments",
    slug: "individual-coding-assignments",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Individual",
    workload: "Moderate preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Sustained work across the assessment period",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "individual-coding-assignments-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "individual-coding-assignments-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "individual-coding-assignments-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "individual-coding-assignments-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "collaborative-coding-assignments",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["individual-coding-assignments-student-evidence"],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "individual-coding-assignments-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Collaborative coding assignments",
    family: "Coding & making",
    description:
      "Explore shared software development with visible roles, decisions, and individual contributions.",
    competencyIds: ["coding", "collaboration", "communication"],
    mode: "Collaborative",
    duration: "2 to 6 weeks",
    evidence:
      "A shared codebase, integration decisions, and individually explained contributions.",
    strengths:
      "Offers opportunities to work through integration and coordination challenges.",
    aiConsiderations:
      "Agree a shared AI use protocol and document which outputs were checked by whom.",
    scalability:
      "Fewer deliverables can reduce marking volume; contribution review adds coordination time.",
    accountability: "Individual contribution statement and code discussion.",
    resources: "Computing environment",
    id: "collaborative-coding-assignments",
    slug: "collaborative-coding-assignments",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Small groups",
    workload: "Moderate preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Sustained work across the assessment period",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "collaborative-coding-assignments-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the shared artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "collaborative-coding-assignments-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "collaborative-coding-assignments-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "collaborative-coding-assignments-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "individual-coding-assignments",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: [
      "collaborative-coding-assignments-student-evidence",
    ],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "collaborative-coding-assignments-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Individual research projects",
    family: "Research & inquiry",
    description:
      "Give students time to develop a research question, investigate it, and explain what they found.",
    competencyIds: ["research", "experiments", "reasoning"],
    mode: "Individual",
    duration: "6 to 12 weeks",
    evidence:
      "A question, documented method, results, and a discussion of uncertainty.",
    strengths:
      "Allows sustained independent inquiry and contextualized methodological decisions.",
    aiConsiderations:
      "Ask students to verify generated references and describe how AI influenced the research process.",
    scalability:
      "Supervision and individualized feedback require advance scheduling.",
    accountability: "Method justification and a brief individual discussion.",
    resources: "Library access",
    id: "individual-research-projects",
    slug: "individual-research-projects",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Individual",
    workload: "Higher preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Sustained work across the assessment period",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "individual-research-projects-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "individual-research-projects-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "individual-research-projects-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "individual-research-projects-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "group-research-projects",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["individual-research-projects-student-evidence"],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "individual-research-projects-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Group research projects",
    family: "Research & inquiry",
    description:
      "Investigate an open question through collaborative inquiry and a shared research artefact.",
    competencyIds: ["research", "collaboration", "experiments"],
    mode: "Collaborative",
    duration: "6 to 12 weeks",
    evidence:
      "A shared protocol, documented analysis, and an account of individual decisions.",
    strengths:
      "Supports division of inquiry while creating opportunities for methodological discussion.",
    aiConsiderations:
      "Record AI use in shared methods and check that every member can explain the results.",
    scalability:
      "Group supervision can consolidate meetings; equitable participation needs attention.",
    accountability: "Role log, individual reflection, and a group discussion.",
    resources: "Library access",
    id: "group-research-projects",
    slug: "group-research-projects",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Small groups",
    workload: "Higher preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Sustained work across the assessment period",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "group-research-projects-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the shared artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "group-research-projects-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "group-research-projects-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "group-research-projects-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "individual-research-projects",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["group-research-projects-student-evidence"],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "group-research-projects-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Literature reviews",
    family: "Research & inquiry",
    description:
      "Connect, evaluate, and synthesize a body of literature around a focused question.",
    competencyIds: ["research", "reasoning", "communication"],
    mode: "Either",
    duration: "3 to 6 weeks",
    evidence:
      "Search strategy, inclusion decisions, synthesis, and source grounded argument.",
    strengths: "Makes relationships and disagreements across sources explicit.",
    aiConsiderations:
      "Generated citations need verification; a source matrix can make the reading process visible.",
    scalability:
      "A focused scope and shared rubric can support consistent review.",
    accountability:
      "Source matrix and discussion of one contested interpretation.",
    resources: "Library access",
    id: "literature-reviews",
    slug: "literature-reviews",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Small groups",
    workload: "Moderate preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Sustained work across the assessment period",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "literature-reviews-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "literature-reviews-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "literature-reviews-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "literature-reviews-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "paper-critiques-and-summaries",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["literature-reviews-student-evidence"],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "literature-reviews-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Take home problem solving",
    family: "Problem solving",
    description:
      "Give students time to explore complex problems, document strategies, and justify their solutions.",
    competencyIds: ["reasoning", "reflection"],
    mode: "Individual",
    duration: "1 to 3 weeks",
    evidence:
      "Worked solutions, intermediate reasoning, and checks on the result.",
    strengths:
      "Allows sustained reasoning with access to relevant learning resources.",
    aiConsiderations:
      "Clarify permitted assistance and consider asking for a critique of an alternative solution.",
    scalability:
      "Common reasoning criteria can help; open ended responses take time to interpret.",
    accountability: "Annotated reasoning and a short follow up question.",
    resources: "Standard classroom",
    id: "take-home-problem-solving",
    slug: "take-home-problem-solving",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Individual",
    workload: "Moderate preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Sustained work across the assessment period",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "take-home-problem-solving-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "take-home-problem-solving-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "take-home-problem-solving-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "take-home-problem-solving-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "in-class-written-problem-solving",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["take-home-problem-solving-student-evidence"],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "take-home-problem-solving-workload",
      "equitable-participation",
    ],
  },
  {
    name: "In class written problem solving",
    family: "Problem solving",
    description:
      "Explore independent reasoning within defined, shared assessment conditions.",
    competencyIds: ["reasoning", "coding"],
    mode: "Individual",
    duration: "Single session",
    evidence: "A bounded sample of independent solutions and explanations.",
    strengths:
      "Offers a common time and resource context for interpreting individual work.",
    aiConsiderations:
      "Specify which competencies require independent performance and what tools are permitted.",
    scalability:
      "Common prompts support coordinated marking; accommodations need planning.",
    accountability: "Individual work under stated conditions.",
    resources: "Standard classroom",
    id: "in-class-written-problem-solving",
    slug: "in-class-written-problem-solving",
    uses: ["Summative"],
    aiLevel: "Restricted for specified competencies",
    groupSize: "Individual",
    workload: "Moderate preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Time bounded preparation and participation",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "in-class-written-problem-solving-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "in-class-written-problem-solving-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "in-class-written-problem-solving-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "in-class-written-problem-solving-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "take-home-problem-solving",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: [
      "in-class-written-problem-solving-student-evidence",
    ],
    aiUseConditionIds: ["restricted"],
    implementationConsiderationIds: [
      "in-class-written-problem-solving-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Quizzes & knowledge checks",
    family: "Problem solving",
    description:
      "Create frequent opportunities to retrieve knowledge and identify questions for further learning.",
    competencyIds: ["reasoning", "reflection"],
    mode: "Individual",
    duration: "Single session",
    evidence:
      "Responses to focused questions and explanations of selected answers.",
    strengths:
      "Can make gaps in understanding visible early enough to revisit them.",
    aiConsiderations:
      "For unsupervised quizzes, consider interpretation of responses rather than assuming unaided recall.",
    scalability:
      "Reusable item banks can reduce repeated preparation; feedback quality depends on item design.",
    accountability: "Explain a selected answer or revisit a question in class.",
    resources: "Learning platform",
    id: "quizzes-and-knowledge-checks",
    slug: "quizzes-and-knowledge-checks",
    uses: ["Formative"],
    aiLevel: "Documented support",
    groupSize: "Individual",
    workload: "Moderate preparation",
    feedback: "Automated & lecturer",
    studentEffort: "Time bounded preparation and participation",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "quizzes-and-knowledge-checks-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "quizzes-and-knowledge-checks-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "quizzes-and-knowledge-checks-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "quizzes-and-knowledge-checks-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "in-class-written-problem-solving",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["quizzes-and-knowledge-checks-student-evidence"],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "quizzes-and-knowledge-checks-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Peer review",
    family: "Dialogue & reflection",
    description:
      "Ask students to review someone else’s work, give specific feedback, and respond to the comments they receive.",
    competencyIds: ["reasoning", "communication", "reflection"],
    mode: "Either",
    duration: "1 to 3 weeks",
    evidence:
      "Criterion based feedback and a reasoned response to comments received.",
    strengths:
      "Invites students to articulate standards and encounter alternative approaches.",
    aiConsiderations:
      "Consider asking for evidence specific feedback and documenting any AI drafting support.",
    scalability:
      "Distributes feedback activity, while calibration and moderation still take time.",
    accountability: "A review rationale linked to specific evidence.",
    resources: "Learning platform",
    id: "peer-review",
    slug: "peer-review",
    uses: ["Formative"],
    aiLevel: "Documented support",
    groupSize: "Small groups",
    workload: "Moderate preparation",
    feedback: "Peer & lecturer",
    studentEffort: "Sustained work across the assessment period",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "peer-review-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "peer-review-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "peer-review-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "peer-review-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "portfolios-and-staged-assessment",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["peer-review-student-evidence"],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "peer-review-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Topic presentations",
    family: "Communication",
    description:
      "Make understanding visible through a structured explanation and audience dialogue.",
    competencyIds: ["communication", "reasoning"],
    mode: "Either",
    duration: "Single session",
    evidence:
      "An audience aware argument and responses to follow up questions.",
    strengths:
      "Brings explanation, prioritization, and live discussion together.",
    aiConsiderations:
      "Distinguish slide production from the competency to explain and defend content.",
    scalability:
      "Presentation slots create a time constraint; small parallel sessions require facilitators.",
    accountability: "Individual follow up questions.",
    resources: "Standard classroom",
    id: "topic-presentations",
    slug: "topic-presentations",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Small groups",
    workload: "Moderate preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Time bounded preparation and participation",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "topic-presentations-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "topic-presentations-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "topic-presentations-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "topic-presentations-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "research-paper-presentations",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["topic-presentations-student-evidence"],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "topic-presentations-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Research paper presentations",
    family: "Communication",
    description:
      "Explain a published study, its methodological choices, and its relevance to a research question.",
    competencyIds: ["research", "communication", "reasoning"],
    mode: "Either",
    duration: "1 to 3 weeks",
    evidence:
      "Accurate explanation of a paper and justified responses to methodological questions.",
    strengths:
      "Connects reading comprehension with communication and scholarly dialogue.",
    aiConsiderations:
      "Verify summaries against the original paper and distinguish the study’s claims from generated commentary.",
    scalability:
      "Rotate papers and discussants; allow time for checking source accuracy.",
    accountability: "Discuss a figure or method selected during the session.",
    resources: "Library access",
    id: "research-paper-presentations",
    slug: "research-paper-presentations",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Small groups",
    workload: "Moderate preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Sustained work across the assessment period",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "research-paper-presentations-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "research-paper-presentations-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "research-paper-presentations-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "research-paper-presentations-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "topic-presentations",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["research-paper-presentations-student-evidence"],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "research-paper-presentations-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Paper critiques & summaries",
    family: "Research & inquiry",
    description:
      "Separate a paper’s claims, evidence, and limitations in a focused scholarly response.",
    competencyIds: ["research", "reasoning"],
    mode: "Individual",
    duration: "1 to 3 weeks",
    evidence:
      "A source grounded summary and a justified methodological critique.",
    strengths:
      "Encourages precise distinctions between findings and interpretation.",
    aiConsiderations:
      "Students can critically evaluate an AI summary while checking claims against source passages.",
    scalability:
      "A concise structured response can help focus feedback on reasoning.",
    accountability:
      "Annotated source passages and an explanation of the critique.",
    resources: "Library access",
    id: "paper-critiques-and-summaries",
    slug: "paper-critiques-and-summaries",
    uses: ["Summative", "Formative"],
    aiLevel: "Critical evaluation",
    groupSize: "Individual",
    workload: "Moderate preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Sustained work across the assessment period",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "paper-critiques-and-summaries-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "paper-critiques-and-summaries-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "paper-critiques-and-summaries-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "paper-critiques-and-summaries-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "literature-reviews",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["paper-critiques-and-summaries-student-evidence"],
    aiUseConditionIds: ["critical"],
    implementationConsiderationIds: [
      "paper-critiques-and-summaries-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Public facing science communication",
    family: "Communication",
    description:
      "Translate a research idea into an accurate article or other artefact for a wider audience.",
    competencyIds: ["communication", "research", "ethics"],
    mode: "Either",
    duration: "2 to 6 weeks",
    evidence:
      "Audience analysis, accurate sourcing, and an accessible public facing artefact.",
    strengths:
      "Creates a context for balancing accessibility, precision, and public responsibility.",
    aiConsiderations:
      "Document generation and fact checking; review accessibility and representational bias.",
    scalability:
      "Editorial peer review may support revision; lecturer fact checking remains necessary.",
    accountability: "Editorial rationale and annotated fact check.",
    resources: "Library access",
    id: "public-facing-science-communication",
    slug: "public-facing-science-communication",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Small groups",
    workload: "Moderate preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Sustained work across the assessment period",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "public-facing-science-communication-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "public-facing-science-communication-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "public-facing-science-communication-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "public-facing-science-communication-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "topic-presentations",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: [
      "public-facing-science-communication-student-evidence",
    ],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "public-facing-science-communication-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Hackathons",
    family: "Coding & making",
    description:
      "Explore a bounded challenge through intensive teamwork, prototyping, and reflection.",
    competencyIds: ["coding", "collaboration", "experiments"],
    mode: "Collaborative",
    duration: "Single session",
    evidence:
      "A prototype, design decisions, and an individual reflection on trade offs.",
    strengths:
      "Brings rapid iteration and collaborative decision making into a shared setting.",
    aiConsiderations:
      "Make tool access equitable and distinguish generated functionality from explained understanding.",
    scalability:
      "Needs facilitation, technical support, and accessible participation options.",
    accountability: "Individual prototype explanation and role reflection.",
    resources: "Computing environment",
    id: "hackathons",
    slug: "hackathons",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Small groups",
    workload: "Moderate preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Time bounded preparation and participation",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "hackathons-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the shared artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "hackathons-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "hackathons-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "hackathons-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "practical-projects",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["hackathons-student-evidence"],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "hackathons-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Oral examinations",
    family: "Dialogue & reflection",
    description:
      "Explore student understanding through responsive questions and a structured academic conversation.",
    competencyIds: ["reasoning", "communication", "reflection"],
    mode: "Individual",
    duration: "Single session",
    evidence:
      "Spoken reasoning and responses to a consistent set of probing questions.",
    strengths:
      "Allows immediate clarification and follow up on individual understanding.",
    aiConsiderations:
      "Can explore how a student evaluated AI supported work without assuming that fluency proves authorship.",
    scalability:
      "Time grows with cohort size; structured prompts and moderation need preparation.",
    accountability: "Direct individual explanation with documented criteria.",
    resources: "Standard classroom",
    id: "oral-examinations",
    slug: "oral-examinations",
    uses: ["Summative"],
    aiLevel: "Restricted for specified competencies",
    groupSize: "Individual",
    workload: "Moderate preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Time bounded preparation and participation",
    accessibility:
      "Agree communication accommodations and provide transparent prompts and criteria.",
    adaptations: [
      {
        id: "oral-examinations-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "oral-examinations-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "oral-examinations-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "oral-examinations-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "in-class-written-problem-solving",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["oral-examinations-student-evidence"],
    aiUseConditionIds: ["restricted"],
    implementationConsiderationIds: [
      "oral-examinations-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Problem solving competitions",
    family: "Problem solving",
    description:
      "Explore time bounded challenges with attention to strategy, reasoning, and participation.",
    competencyIds: ["reasoning", "coding", "collaboration"],
    mode: "Either",
    duration: "Single session",
    evidence:
      "Solutions and a post event explanation of strategy and limitations.",
    strengths:
      "Can provide a shared focus for trying and comparing solution strategies.",
    aiConsiderations:
      "State tool rules and ensure equal access; ranking alone cannot establish underlying understanding.",
    scalability:
      "Automated result checking may help; accessibility and meaningful feedback require planning.",
    accountability: "Post challenge strategy explanation.",
    resources: "Computing environment",
    id: "problem-solving-competitions",
    slug: "problem-solving-competitions",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Small groups",
    workload: "Moderate preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Time bounded preparation and participation",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "problem-solving-competitions-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "problem-solving-competitions-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "problem-solving-competitions-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "problem-solving-competitions-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "take-home-problem-solving",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["problem-solving-competitions-student-evidence"],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "problem-solving-competitions-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Practical projects",
    family: "Coding & making",
    description:
      "Bring disciplinary knowledge into a tangible solution to a contextualized problem.",
    competencyIds: ["experiments", "coding", "collaboration"],
    mode: "Either",
    duration: "6 to 12 weeks",
    evidence:
      "A working artefact, testing documentation, and a discussion of constraints.",
    strengths: "Connects decisions to the performance of a concrete artefact.",
    aiConsiderations:
      "Evaluate testing and professional judgment alongside the finished output.",
    scalability:
      "Equipment access and supervision can limit parallel participation.",
    accountability: "Practical demonstration and individual explanation.",
    resources: "Specialist equipment",
    id: "practical-projects",
    slug: "practical-projects",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Small groups",
    workload: "Higher preparation",
    feedback: "Lecturer feedback",
    studentEffort: "Sustained work across the assessment period",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "practical-projects-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "practical-projects-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "practical-projects-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "practical-projects-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "hackathons",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: ["practical-projects-student-evidence"],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "practical-projects-workload",
      "equitable-participation",
    ],
  },
  {
    name: "Portfolios & staged assessment",
    family: "Dialogue & reflection",
    description:
      "Bring together examples of a student’s work so they can explain what changed and what they learned along the way.",
    competencyIds: ["reflection", "research", "communication"],
    mode: "Either",
    duration: "6 to 12 weeks",
    evidence:
      "Selected artefacts, revision history, and a reasoned account of learning.",
    strengths:
      "Provides space to consider development across tasks and versions.",
    aiConsiderations:
      "Record AI use across stages and explain the decisions behind revisions.",
    scalability:
      "Selective sampling and bounded reflection prompts may help manage review time.",
    accountability:
      "An individual selection rationale and reflective discussion.",
    resources: "Learning platform",
    id: "portfolios-and-staged-assessment",
    slug: "portfolios-and-staged-assessment",
    uses: ["Summative", "Formative"],
    aiLevel: "Documented support",
    groupSize: "Small groups",
    workload: "Higher preparation",
    feedback: "Peer & lecturer",
    studentEffort: "Sustained work across the assessment period",
    accessibility:
      "Provide accessible materials, clear criteria, and equivalent routes to demonstrate the intended competencies.",
    adaptations: [
      {
        id: "portfolios-and-staged-assessment-process",
        title: "Ask about the decisions behind the work",
        description:
          "Invite a short explanation alongside the submitted artefact, focused on the decisions most relevant to your learning objectives.",
        validated: false,
      },
      {
        id: "portfolios-and-staged-assessment-revision",
        title: "Offer feedback before the final submission",
        description:
          "You could give feedback on one draft before students submit the final work. Consider leaving it ungraded so students can focus on what to improve.",
        validated: false,
      },
    ],
    evidenceLinks: [
      {
        paperId: "unesco-genai",
        relationship:
          "Context for responsible AI use; does not validate this format.",
        directEvidence: false,
        verificationStatus: "source-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "portfolios-and-staged-assessment-source-unesco-genai",
      },
      {
        paperId: "feedback-self-regulation",
        relationship:
          "Candidate conceptual reading on formative feedback; full text digest pending.",
        directEvidence: false,
        verificationStatus: "metadata-checked",
        reviewNote:
          "Contextual reading only. This link does not establish effectiveness of the assessment or its adaptations.",
        id: "portfolios-and-staged-assessment-source-feedback-self-regulation",
      },
    ],
    catalogueClassification: "programme-inventory",
    classificationNote:
      "Included in the programme level inventory supplied for this project. This is not a verified statement of institutional usage or a complete list of approaches used at UTN.",
    editorialReview: {
      status: "draft",
      note: "Editorial migration of the existing illustrative content. Subject review has not been completed.",
    },
    researchVerification: {
      status: "not-reviewed",
      scope: "not-assessed",
      note: "Contextual readings are linked. A format specific research review has not been completed.",
    },
    relatedApproaches: [
      {
        approachId: "peer-review",
        relation: "related-to",
        rationale:
          "An editorial connection for comparison and exploration. It is not evidence of equivalent learning outcomes.",
      },
    ],
    observableEvidenceIds: [
      "portfolios-and-staged-assessment-student-evidence",
    ],
    aiUseConditionIds: ["documented"],
    implementationConsiderationIds: [
      "portfolios-and-staged-assessment-workload",
      "equitable-participation",
    ],
  },
] satisfies AssessmentApproach[];
