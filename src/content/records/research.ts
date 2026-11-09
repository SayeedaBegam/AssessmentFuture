import type { ResearchPaper } from "@/lib/types";
import { researchExpansionRecords } from "./research-expansion";

export const researchRecords = [
  ...researchExpansionRecords,
  {
    id: "unesco-genai",
    editorialReview: {
      status: "draft",
      note: "Source summary scope is recorded separately. Independent editorial approval is not recorded.",
    },
    slug: "guidance-generative-ai",
    title: "Guidance for generative AI in education and research",
    authors: "Fengchun Miao & Wayne Holmes",
    year: 2023,
    venue: "UNESCO",
    url: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research?hub=66973",
    doi: "10.54675/EWZM9535",
    type: "Policy guidance",
    verification: "Source verified",
    reviewStatus: "Source summary reviewed",
    verifiedOn: "2026-11-03",
    evidenceStrength:
      "Normative guidance; not causal evidence of assessment effectiveness.",
    digest: {
      overview:
        "UNESCO asks how education can use generative AI while protecting privacy, including different learners, and keeping people in control of decisions.",
      question:
        "How can education and research respond responsibly to generative AI?",
      design: "Policy guidance; summary based on UNESCO’s publication page.",
      context: "International education and research; no trial participants.",
      findings:
        "The source describes regulatory gaps and proposes privacy protection and ethical validation of educational tools.",
      quantitative: "No assessment effect sizes reported on the reviewed page.",
      interpretation:
        "UNESCO advocates human agency and meaningful, equitable use.",
      application:
        "Our proposal: discuss approved tools, equitable access, and documentation when defining assessment conditions.",
      limitations:
        "Policy guidance does not establish which assessment format improves learning. Full publication appraisal is still needed.",
      aiRelevance:
        "Directly addresses generative AI governance and educational use.",
      openQuestions:
        "Which local conditions and approvals would be needed for your context?",
    },
    verificationScope: "publication-page",
    verificationNote:
      "Policy guidance; summary based on UNESCO’s publication page.",
  },
  {
    id: "institutional-policies",
    editorialReview: {
      status: "draft",
      note: "Source summary scope is recorded separately. Independent editorial approval is not recorded.",
    },
    slug: "institutional-ai-policies",
    title:
      "Generative Artificial Intelligence in Higher Education: Evidence from an Analysis of Institutional Policies and Guidelines",
    authors: "Nora McDonald, Aditya Johri, Areej Ali & Aayushi Hingle",
    year: 2024,
    venue: "arXiv:2402.01659 (preprint)",
    url: "https://arxiv.org/abs/2402.01659",
    doi: "10.48550/arXiv.2402.01659",
    type: "Empirical document analysis",
    verification: "Source verified",
    reviewStatus: "Source summary reviewed",
    verifiedOn: "2026-11-03",
    evidenceStrength:
      "Descriptive preprint; abstract verified. No causal claims about learning outcomes.",
    digest: {
      overview:
        "An analysis of guidance from 116 US R1 universities reports varied approaches to AI use and cautions about burdens on faculty.",
      question:
        "What AI advice do research intensive US universities give their stakeholders?",
      design:
        "Institutional document analysis; this digest covers the authors’ abstract, not a full methods appraisal.",
      context:
        "Documents from 116 US R1 universities; not a student intervention study.",
      findings:
        "The authors report that most sampled universities encouraged GenAI use; guidance often emphasized writing.",
      quantitative:
        "73 of 116 institutions (63%) encouraged GenAI use, as reported in the abstract.",
      interpretation:
        "The authors caution that suggested pedagogical revisions may burden faculty.",
      application:
        "Our proposal: discuss disciplinary fit and implementation time alongside local AI guidance.",
      limitations:
        "A US policy sample cannot establish German institutional rules or assessment effectiveness. Preprint status; full text review pending.",
      aiRelevance: "Direct examination of institutional GenAI guidance.",
      openQuestions:
        "How do these patterns transfer to other institutions and disciplines?",
    },
    verificationScope: "abstract",
    verificationNote:
      "Institutional document analysis; this digest covers the authors’ abstract, not a full methods appraisal.",
  },
  {
    id: "feedback-self-regulation",
    editorialReview: {
      status: "draft",
      note: "Bibliographic record retained. Full appraisal and independent editorial review pending.",
    },
    slug: "feedback-and-self-regulation",
    title:
      "Formative assessment and self-regulated learning: a model and seven principles of good feedback practice",
    authors: "David J. Nicol & Debra Macfarlane-Dick",
    year: 2006,
    venue: "Studies in Higher Education, 31(2), 199–218",
    url: "https://doi.org/10.1080/03075070600572090",
    doi: "10.1080/03075070600572090",
    type: "Conceptual paper",
    verification: "Metadata verified · full text pending",
    reviewStatus: "Pending verification",
    verifiedOn: "2026-11-03",
    evidenceStrength:
      "Pending full text appraisal; not presented as established support for our adaptations.",
    digest: {
      overview:
        "This paper looks at feedback and how students guide their own learning. We have checked the publication details, but still need to review the full paper before summarizing it.",
      question: "Pending full text verification.",
      design: "Conceptual paper; full text appraisal pending.",
      context: "Higher education; not an intervention trial.",
      findings: "No findings are summarized here before full text review.",
      quantitative: "No quantitative claims imported.",
      interpretation:
        "We have not drawn conclusions from the title or publication details alone.",
      application:
        "Candidate reading for exploring feedback checkpoints; no format specific recommendation is established here.",
      limitations: "Full text review and extraction have not been completed.",
      aiRelevance:
        "Predates contemporary generative AI. Any AI application would be a new interpretation.",
      openQuestions:
        "How might the concepts transfer to a specific discipline and AI use context?",
    },
    verificationScope: "metadata-only",
    verificationNote: "Conceptual paper; full text appraisal pending.",
  },
  {
    id: "long-term-learning",
    editorialReview: {
      status: "draft",
      note: "Bibliographic record retained. Full appraisal and independent editorial review pending.",
    },
    slug: "assessment-long-term-learning",
    title: "Aligning assessment with long-term learning",
    authors: "David Boud & Nancy Falchikov",
    year: 2006,
    venue: "Assessment & Evaluation in Higher Education, 31(4), 399–413",
    url: "https://doi.org/10.1080/02602930600679050",
    doi: "10.1080/02602930600679050",
    type: "Conceptual paper",
    verification: "Metadata verified · full text pending",
    reviewStatus: "Pending verification",
    verifiedOn: "2026-11-03",
    evidenceStrength:
      "Pending full text appraisal; no format specific effectiveness claim.",
    digest: {
      overview:
        "A candidate conceptual reading on assessment and longer term learning. Metadata is verified; full text review is pending.",
      question: "Pending full text verification.",
      design: "Conceptual paper; full text appraisal pending.",
      context: "Higher education; not an intervention trial.",
      findings: "No findings are summarized here before full text review.",
      quantitative: "No quantitative claims imported.",
      interpretation:
        "We have not drawn conclusions from the title or publication details alone.",
      application:
        "Candidate reading for exploring feedback checkpoints; no format specific recommendation is established here.",
      limitations: "Full text review and extraction have not been completed.",
      aiRelevance:
        "Predates contemporary generative AI. Any AI application would be a new interpretation.",
      openQuestions:
        "How might the concepts transfer to a specific discipline and AI use context?",
    },
    verificationScope: "metadata-only",
    verificationNote: "Conceptual paper; full text appraisal pending.",
  },
] satisfies ResearchPaper[];
