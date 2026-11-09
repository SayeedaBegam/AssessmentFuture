import type { ResearchPaper } from "@/lib/types";

// These are bibliographic/source checks, not completed scholarly appraisals.
const pending =
  "Full paper appraisal pending. No effectiveness finding is asserted here.";
const editorialReview = {
  status: "draft" as const,
  note: "Source checks are recorded separately. Independent scholarly and editorial approval pending.",
};
export const researchExpansionRecords: ResearchPaper[] = [
  {
    editorialReview,
    id: "crompton-burke-assessment",
    slug: "higher-education-assessments-genai",
    title:
      "Higher education assessments in the age of GenAI: a systematic review",
    authors: "Helen Crompton and Diane Burke",
    year: 2026,
    venue:
      "International Journal of Educational Technology in Higher Education",
    doi: "10.1186/s41239-026-00627-4",
    url: "https://link.springer.com/article/10.1186/s41239-026-00627-4",
    type: "Systematic review",
    publishedOn: "2026-10-16",
    verification: "Source verified",
    verificationScope: "abstract",
    reviewStatus: "Source summary reviewed",
    verifiedOn: "2026-11-03",
    verificationNote:
      "Publisher abstract and bibliographic record checked. Full paper appraisal pending.",
    evidenceStrength:
      "Research synthesis, not a trial of the proposed robotics examples.",
    digest: {
      overview:
        "The review describes process, authentic and dialogic assessment designs in recent GenAI research.",
      question: "How is GenAI changing assessment practice?",
      design:
        "The abstract reports a PRISMA review of 72 studies from 2024 to 2026.",
      context:
        "The abstract describes 24 countries and 20 disciplines; no UTN sample is claimed.",
      findings:
        "The authors identify three design themes: process, authenticity and dialogue.",
      quantitative:
        "72 included studies is a review count, not an effect size.",
      interpretation:
        "The synthesis describes approaches; it does not establish that any local design works.",
      application:
        "Proposed interpretation: select a few meaningful development checkpoints or a focused discussion.",
      limitations:
        "Abstract bounded summary. Study quality, effect estimates and individual designs still need appraisal.",
      aiRelevance:
        "Relevant background for considering several kinds of competency evidence.",
      openQuestions:
        "What resources and accommodations would a local pilot require?",
    },
  },
  {
    editorialReview,
    id: "xia-assessment-review",
    slug: "genai-assessment-scoping-review",
    title:
      "A scoping review on how generative artificial intelligence transforms assessment in higher education",
    authors:
      "Qi Xia, Xiaojing Weng, Fan Ouyang, Tzung Jin Lin and Thomas K. F. Chiu",
    year: 2024,
    venue:
      "International Journal of Educational Technology in Higher Education",
    type: "Scoping review",
    doi: "10.1186/s41239-024-00468-z",
    url: "https://link.springer.com/article/10.1186/s41239-024-00468-z",
    publishedOn: "2024-05-24",
    verification: "Source verified",
    verificationScope: "abstract",
    reviewStatus: "Source summary reviewed",
    verifiedOn: "2026-11-03",
    verificationNote:
      "Publisher abstract, author list and methods section checked. Not a full appraisal.",
    evidenceStrength:
      "Scoping synthesis; no direct validation of our audit or feedback workflow.",
    digest: {
      overview:
        "This review maps opportunities and difficulties for students, teachers and institutions using GenAI in assessment.",
      question: "How does GenAI affect assessment at these three levels?",
      design:
        "PRISMA scoping review; 32 empirical studies selected from 969 retrieved records.",
      context:
        "The included work was largely published in 2023. A study count is not a student sample.",
      findings:
        "The review discusses self regulation, responsible learning and integrity, alongside the need for teacher development and policy review.",
      quantitative: "32 studies; no pooled effect is claimed here.",
      interpretation:
        "The authors discuss assessment transformation rather than a single proven format.",
      application:
        "Proposed interpretation: ask students to verify AI suggestions before using them.",
      limitations:
        "Early and heterogeneous studies. This source does not directly test our Human and AI examples.",
      aiRelevance: "Context for examining outputs and feedback critically.",
      openQuestions:
        "Does this particular verification task improve disciplinary judgement?",
    },
  },
  {
    editorialReview,
    id: "assessment-twins",
    slug: "assessment-twins-protocol",
    title:
      "Assessment Twins: A Protocol for AI-Vulnerable Summative Assessment",
    authors: "Jasper Roe, Mike Perkins and Louie Giray",
    year: 2025,
    venue: "arXiv",
    type: "Conceptual preprint",
    doi: "10.48550/arXiv.2510.02929",
    url: "https://arxiv.org/abs/2510.02929",
    publishedOn: "2025-10-03",
    verification: "Source verified",
    verificationScope: "abstract",
    reviewStatus: "Source summary reviewed",
    verifiedOn: "2026-11-03",
    verificationNote:
      "arXiv abstract and version 1 metadata checked. The record also lists a related 2026 journal version, which has not been appraised here.",
    evidenceStrength:
      "Proposed validity framework, not evidence of effectiveness at UTN.",
    digest: {
      overview:
        "The authors propose pairing two tasks that address the same outcomes through complementary evidence.",
      question:
        "How could linked tasks address assessment validity concerns around GenAI?",
      design:
        "Conceptual protocol drawing on Messick's validity framework, as described in the abstract.",
      context: "No intervention sample is reported in the abstract.",
      findings:
        "This is a proposal; no empirical learning or detection effect is reported here.",
      quantitative: "No verified effect estimate.",
      interpretation:
        "Complementary evidence may support judgement; it cannot guarantee detection of AI use.",
      application:
        "Proposed adaptation: pair model development with an independent diagnostic problem.",
      limitations:
        "Empirical validation, resource demands and equity need consideration. Only the abstract was reviewed.",
      aiRelevance:
        "Allows some tasks to permit AI while another task supplies different evidence.",
      openQuestions: "How should evidence from the pair be combined fairly?",
    },
  },
  ...[
    {
      id: "authentic-assessment-review",
      slug: "authentic-assessment-higher-education",
      title:
        "A systematic literature review on authentic assessment in higher education: Best practices for the development of 21st century skills, and policy considerations",
      authors: "Dimitrios Vlachopoulos and Agoritsa Makri",
      year: 2024,
      venue: "Studies in Educational Evaluation",
      type: "Systematic review",
      doi: "10.1016/j.stueduc.2024.101425",
      url: "https://pure.eur.nl/en/publications/a-systematic-literature-review-on-authentic-assessment-in-higher-/",
      note: "Author institution repository metadata and abstract checked. Publisher page could not be fetched. The proposed robotics simulation is our interpretation.",
    },
    {
      id: "corbin-structural-assessment",
      slug: "structural-assessment-changes-genai",
      title:
        "Talk is cheap: why structural assessment changes are needed for a time of GenAI",
      authors: "Thomas Corbin, Phillip Dawson and Danny Liu",
      year: 2025,
      venue: "Assessment & Evaluation in Higher Education",
      type: "Position article",
      doi: "10.1080/02602938.2025.2503964",
      url: "https://www.tandfonline.com/doi/pdf/10.1080/02602938.2025.2503964",
      note: "Publisher indexed PDF citation verified. Direct page access returned 403. Additional direct transfer and group accountability research is still required.",
    },
    {
      id: "aias-pilot",
      slug: "ai-assessment-scale-pilot",
      title:
        "The AI Assessment Scale (AIAS) in action: A pilot implementation of GenAI-supported assessment",
      authors: "Leon Furze, Mike Perkins, Jasper Roe and Jason MacVaugh",
      year: 2024,
      venue: "Australasian Journal of Educational Technology",
      type: "Published pilot study",
      doi: "10.14742/ajet.9434",
      url: "https://ajet.org.au/index.php/AJET/article/view/9434",
      note: "Publisher metadata checked. Pilot at British University Vietnam; not UTN. Sample, design and reported outcomes require full appraisal before reuse.",
    },
    {
      id: "aias-practice-2025",
      slug: "how-not-to-use-ai-assessment-scale",
      title: "How (not) to use the AI Assessment Scale",
      authors: "Mike Perkins, Jasper Roe and Leon Furze",
      year: 2025,
      venue: "Journal of Applied Learning & Teaching",
      type: "Commentary",
      doi: "10.37074/jalt.2025.8.2.15",
      url: "https://jalt.open-publishing.org/index.php/jalt/article/download/3535/1017/10147",
      note: "Publisher PDF metadata checked. Selected as a matching 2025 Perkins, Roe and Furze AIAS publication; the brief did not specify a title. Not an empirical effectiveness study.",
    },
    {
      id: "alkouk-khlaif-workshops",
      slug: "ai-resistant-assessment-workshops",
      title:
        "AI-resistant assessments in higher education: practical insights from faculty training workshops",
      authors: "Wejdan Awadallah Alkouk and Zuheir N. Khlaif",
      year: 2024,
      venue: "Frontiers in Education",
      type: "Perspective",
      doi: "10.3389/feduc.2024.1499495",
      url: "https://doi.org/10.3389/feduc.2024.1499495",
      note: "Publisher bibliographic record checked. The phrase AI resistant is part of the publication title, not a guarantee made by this platform.",
    },
    {
      id: "evangelista-integrity",
      slug: "academic-integrity-chatgpt-assessment",
      title:
        "Ensuring academic integrity in the age of ChatGPT: Rethinking exam design, assessment strategies, and ethical AI policies in higher education",
      authors: "Edmund De Leon Evangelista",
      year: 2025,
      venue: "Contemporary Educational Technology",
      type: "Article; method appraisal pending",
      doi: "10.30935/cedtech/15775",
      url: "https://www.cedtech.net/article/ensuring-academic-integrity-in-the-age-of-chatgpt-rethinking-exam-design-assessment-strategies-and-15775",
      note: "Publisher citation checked. Methodology, sample and findings remain pending.",
    },
    {
      id: "garcia-assessment-strategies",
      slug: "rethinking-assessment-generative-ai",
      title:
        "Rethinking Educational Assessment in the Age of Generative AI: Actionable Strategies to Mitigate Academic Dishonesty",
      authors:
        "Manuel B. Garcia, Joanna Rosak-Szyrocka, Ramazan Yılmaz, Ahmed Hosny Saleh Metwally, Dharel P. Acut, Kingsley Ofosu-Ampong, Fatih Erdoğdu, Chorng Yuan Fung and Aras Bozkurt",
      year: 2025,
      venue:
        "Pitfalls of AI Integration in Education: Skill Obsolescence, Misuse, and Bias",
      type: "Book chapter",
      doi: "10.4018/979-8-3373-0122-8.ch001",
      url: "https://manuelgarcia.info/media/full_paper/ai-academic-dishonesty.pdf",
      note: "Author hosted manuscript title page checked. This matches the author/year topic in the brief; final publisher version and method appraisal remain pending. No manuscript text is reproduced.",
    },
    {
      id: "peters-angelov-aicai",
      slug: "creativity-integrity-assessment-aicai",
      title:
        "Redefining assessment tasks to promote students’ creativity and integrity in the age of generative artificial intelligence",
      authors: "Martine Peters and Dimitar Angelov",
      year: 2025,
      venue: "International Journal for Educational Integrity",
      type: "Conceptual model",
      doi: "10.1007/s40979-025-00201-x",
      url: "https://link.springer.com/article/10.1007/s40979-025-00201-x",
      note: "Publisher bibliographic record checked. The proposed AICAI model needs full appraisal before claims about outcomes are made.",
    },
  ].map((p): ResearchPaper => ({
    editorialReview,
    id: p.id,
    slug: p.slug,
    title: p.title,
    authors: p.authors,
    year: p.year,
    venue: p.venue,
    type: p.type,
    doi: p.doi,
    url: p.url,
    verification: "Metadata verified · full text pending",
    verificationScope: "metadata-only",
    reviewStatus: "Pending verification",
    verifiedOn: "2026-11-03",
    verificationNote: p.note,
    evidenceStrength:
      "Bibliographic record only. No effectiveness rating or completed research appraisal.",
    digest: {
      overview: `A candidate reading for research to practice discussion. ${p.note}`,
      question: pending,
      design: pending,
      context: "Method and sample not yet appraised; do not infer a UTN study.",
      findings: "Pending verification. No findings summary is published.",
      quantitative: "No verified effect estimate published here.",
      interpretation: pending,
      application:
        "Proposed use: consult the source when reviewing assessment design. A link is not validation of an implementation.",
      limitations: pending,
      aiRelevance:
        "A reading candidate for examining assessment conditions and student evidence.",
      openQuestions:
        "Which claims are supported by the study design and applicable to this teaching context?",
    },
  })),
];
