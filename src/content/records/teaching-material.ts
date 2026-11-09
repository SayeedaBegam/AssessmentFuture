// Original fictional teaching materials. Values describe invented examples,
// not observations, published findings, institutional facts or student work.
export const teachingMaterialRecords = {
  "assessment-twins-ml": [
    {
      title: "Synthetic model comparison and diagnostic card",
      content:
        "Development task: create a reproducible binary classification experiment using a generated dataset of 200 rows and ten features. Choose and justify a split and an evaluation metric. Diagnostic card: a fictional report says that feature selection was performed on all 200 rows before the train/test split. The baseline scores 0.72 and the modified model 0.91 on the reported test. Explain why the comparison may be invalid, propose a corrected evaluation and state what cannot be concluded from these two numbers.",
      lecturerNote:
        "The scores are invented prompts, not experimental results. Look for recognition of information leakage and an appropriate correction, not a required exact score or an accusation of AI use. Test the generated development dataset and moderate the diagnostic difficulty before teaching.",
    },
  ],
  "process-trace-robotics": [
    {
      title: "Fictional navigation checkpoint pack",
      content:
        "Task: move a simulated robot to a goal while avoiding marked obstacles. Baseline synthetic tests: open corridor, success in 18 seconds; narrow corridor, two collisions in 25 seconds; moving obstacle, emergency stop. Select one failure to investigate. Compare a revised controller using the same scenarios and success conditions. Keep one decision note that states the observation, competing explanations, the chosen change and a test that could show the change was unhelpful.",
      lecturerNote:
        "These baseline values are fictional scenario inputs. Students must produce and label their own simulation results rather than claim these were observed. Provide the simulator configuration and an accessible paper analysis alternative after local testing. Do not require continuous activity logs.",
    },
  ],
  "ai-output-auditing": [
    {
      title: "Synthetic AI response and verification cards",
      content:
        "Fictional AI response, deliberately flawed: ‘Every student should take the campus shuttle. It always emits 92% less carbon than cycling, the north entrance is accessible because it has stairs, and a 90% prediction confidence means nine out of ten individual recommendations are guaranteed correct.’ Source card A, fictional campus map: the north entrance has six steps and no ramp; the south entrance has a level route. Source card B, task data: shuttle emissions and occupancy were not supplied, so the claimed percentage cannot be computed. Source card C, taught model concept: a confidence score alone does not establish calibration or guarantee an individual result. Identify unsupported claims, correct them with references to the cards and one appropriate publicly accessible technical source, and explain who could be affected.",
      lecturerNote:
        "This is original synthetic text in the style of an AI output; it was not captured from a live AI service. The campus and cards are invented, and the misleading claims are not platform advice. Supply and verify the external technical source pack before teaching. Credit justified uncertainty rather than expecting every sentence to be false.",
    },
  ],
  "unseen-transfer-ml": [
    {
      title: "Synthetic dataset shift challenge",
      content:
        "Prepared project: evaluate a classifier on a balanced synthetic dataset. New challenge: an unfamiliar deployment set has 95 negative cases and five positive cases; a model predicting negative for every case obtains 95% accuracy. Explain why that number is insufficient for the stated goal of identifying positive cases. Select an evaluation response, identify additional information you need, and compare assumptions with the prepared project. Do not claim that changing a metric alone improves the model.",
      lecturerNote:
        "These are invented counts chosen for transparent arithmetic. Several metric and investigation choices can be reasonable depending on the stated costs. Publish the intended outcome and taught concepts in advance; keep the exact assessed variation unfamiliar and moderate equivalent versions.",
    },
  ],
  "dialogic-defence-robotics": [
    {
      title: "Illustrative five minute question protocol",
      content:
        "Minute 0–1: point to one decision in your system and name the constraint it addresses. Minutes 1–3: explain why you selected it, what evidence informed it and one limitation. Minutes 3–5: consider this alternative prompt: ‘If the distance sensor intermittently reports an obstacle when the path is clear, how would you distinguish a sensor issue from a controller issue?’ Explain one discriminating test. The assessor may ask a clarification without changing the intended difficulty.",
      lecturerNote:
        "This is a proposed timing and question structure, not a validated optimum. Offer practice prompts and adjust for approved accommodations. Use criterion notes, comparable questions and moderation; do not assess accent, conversational confidence or speed as proxies for technical understanding.",
    },
  ],
  "ai-feedback-verification": [
    {
      title: "Synthetic draft and feedback decision exercise",
      content:
        "Fictional draft: ‘An AI advising service should be introduced because it gives fast answers. We have not checked accessibility, reliability or a way to question its decisions.’ Synthetic AI feedback, intentionally mixed: (1) ‘Explain how users can challenge an inaccurate answer.’ (2) ‘Delete all uncertainty statements because confident writing is always more scientific.’ (3) ‘Claim the service reduces staff workload by 40%, even though no workload data is available.’ Task criteria card: justify recommendations with evidence, consider affected users and state limits. Evaluate each suggestion, revise selectively and explain acceptance, modification or rejection. Find a suitable source for any new factual claim rather than inventing one.",
      lecturerNote:
        "The draft, feedback and percentage are fictional instructional material. The second and third suggestions deliberately need challenge. Use the same static sheet for everyone or review equivalent live feedback before use. A justified rejection should receive credit; general feedback theory does not validate this AI workflow.",
    },
  ],
  "failure-analysis-robotics": [
    {
      title: "Fictional doorway incident log",
      content:
        "Scenario: a simulated delivery robot stops at a doorway even though observers report a clear route. Synthetic log: 10:00:00 speed request 0.4 m/s, distance 1.8 m; 10:00:01 distance 0.08 m, stop flag true; 10:00:02 distance 1.7 m, stop flag remains true; 10:00:03 motor current normal, speed request 0.0 m/s. Propose at least two hypotheses, such as an intermittent sensor reading or a latched stop condition. Request a test that distinguishes them. Additional synthetic test result: replaying one short distance reading in an otherwise clear simulated scene sets a stop flag that does not reset. Explain which hypotheses this supports or leaves open, and propose a safe corrective test.",
      lecturerNote:
        "The system and all log values are invented. The extra result supports investigating reset logic but does not rule out every sensor fault. Do not imply an actual safety incident. Validate the simulation or paper pack, accept defensible alternative accounts and never ask students to create unsafe real world failures.",
    },
  ],
  "collaborative-individual-ml": [
    {
      title: "Team decision and individual explanation prompts",
      content:
        "Team task: compare two classifiers on public or generated data and agree a defensible evaluation. Planning card: record responsibilities for data checks, modelling, evaluation, reproducibility and coordination; rotate or share roles where appropriate. Checkpoint card: document one changed decision and whose evidence informed it. Individual prompt: ‘Explain one technical choice, a specific contribution you made, what you learned from a peer and a limitation that remains. Point to the relevant code, result or decision note.’ A peer concern is a prompt for review, not an automatic grade deduction.",
      lecturerNote:
        "These are proposed prompts, not actual student contributions. Make the individual and group criteria explicit and provide a confidential route for concerns. Do not use commit counts or peer popularity as measures of competence. Additional direct group assessment and accountability research remains needed.",
    },
  ],
} as const;
