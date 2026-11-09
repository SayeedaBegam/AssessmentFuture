"use client";
import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Plus,
  Trash2,
  Download,
  Route,
  RotateCcw,
} from "lucide-react";
import { PageHeading } from "./shell";
import { Button } from "./ui/button";
export type Stage = {
  id: number;
  name: string;
  week: number;
  graded: boolean;
  weight: number;
};
const stageNames = [
  "Problem formulation",
  "Initial submission",
  "Formative feedback",
  "Revision",
  "Peer review",
  "Practical demonstration",
  "Individual verification",
  "Final deliverable",
  "Reflection",
];
const starter: Stage[] = [
  { id: 1, name: "Problem formulation", week: 2, graded: false, weight: 0 },
  { id: 2, name: "Initial submission", week: 4, graded: false, weight: 0 },
  { id: 3, name: "Peer review", week: 6, graded: false, weight: 0 },
  { id: 4, name: "Revision", week: 8, graded: false, weight: 0 },
  {
    id: 5,
    name: "Practical demonstration",
    week: 11,
    graded: true,
    weight: 30,
  },
  { id: 6, name: "Final deliverable", week: 13, graded: true, weight: 70 },
  { id: 7, name: "Reflection", week: 14, graded: false, weight: 0 },
];
export function Timeline({ initialStages }: { initialStages?: Stage[] }) {
  const [stages, setStages] = useState<Stage[]>(initialStages ?? starter);
  const availableStageNames = [
    ...new Set([...stageNames, ...(initialStages ?? []).map((s) => s.name)]),
  ];
  const [newName, setNewName] = useState("Formative feedback");
  const update = (id: number, data: Partial<Stage>) =>
    setStages((s) => s.map((x) => (x.id === id ? { ...x, ...data } : x)));
  const weight = stages
    .filter((s) => s.graded)
    .reduce((n, s) => n + s.weight, 0);
  const formative = stages.filter((s) => !s.graded).length;
  const move = (index: number, direction: number) =>
    setStages((prev) => {
      const all = [...prev];
      [all[index], all[index + direction]] = [
        all[index + direction],
        all[index],
      ];
      return all;
    });
  const text = `ILLUSTRATIVE SEMESTER PATHWAY\nNot institutionally approved. Verify weighting and examination regulations.\n\n${stages.map((s) => `Week ${s.week}: ${s.name}, ${s.graded ? `graded, ${s.weight}%` : "formative, ungraded"}`).join("\n")}\n\nTotal illustrative graded weighting: ${weight}%`;
  return (
    <div className="section-wrap page-body">
      <PageHeading
        eyebrow="CONTINUOUS ASSESSMENT EXPLORER"
        title="Learning has a timeline."
        description="Assemble a possible semester pathway. Create room for feedback and revision, and decide which stages need summative grading."
      />
      <div className="notice">
        <Route size={23} />
        <p>
          An illustrative 14 week pathway. Checkpoints do not need to carry
          points. Weighting and compatibility with examination regulations
          require institutional review.
        </p>
      </div>
      <div className="timeline-summary">
        <div>
          <strong>{stages.length}</strong>
          <span>stages in your pathway</span>
        </div>
        <div>
          <strong>{formative}</strong>
          <span>ungraded opportunities</span>
        </div>
        <div>
          <strong>{stages.length - formative}</strong>
          <span>graded stages</span>
        </div>
        <div>
          <strong>{weight}%</strong>
          <span>
            {weight === 100
              ? "illustrative graded weighting"
              : "weighting to review"}
          </span>
        </div>
      </div>
      <div className="semester-map">
        <div className="semester-label">
          <span className="eyebrow">YOUR SEMESTER, AT A GLANCE</span>
          <span>
            <i className="formative-dot" /> Formative{" "}
            <i className="graded-dot" /> Graded
          </span>
        </div>
        <div className="semester-track">
          {Array.from({ length: 14 }, (_, i) => (
            <div className="week-column" key={i}>
              <span>W{i + 1}</span>
              {stages
                .filter((s) => s.week === i + 1)
                .map((s) => (
                  <a
                    key={s.id}
                    href={`#stage-${s.id}`}
                    title={s.name}
                    className={s.graded ? "week-event graded" : "week-event"}
                  >
                    {s.name}
                  </a>
                ))}
            </div>
          ))}
        </div>
      </div>
      <div className="panel-heading timeline-editor-heading">
        <div>
          <span className="eyebrow">ASSEMBLE YOUR PATHWAY</span>
          <p>Move stages, choose weeks, and separate feedback from grading.</p>
        </div>
        <button
          className="button button-ghost"
          onClick={() => setStages(initialStages ?? starter)}
        >
          <RotateCcw size={15} /> Reset example
        </button>
      </div>
      <div className="timeline-editor">
        {stages.map((s, i) => {
          const controlName =
            stages.filter((stage) => stage.name === s.name).length > 1
              ? `${s.name}, stage ${i + 1}`
              : s.name;
          return (
            <div className="timeline-stage" key={s.id} id={`stage-${s.id}`}>
              <span
                className={s.graded ? "stage-number graded" : "stage-number"}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <label className="field stage-name">
                <span>Stage</span>
                <select
                  aria-label={`Stage ${i + 1} name`}
                  value={s.name}
                  onChange={(e) => update(s.id, { name: e.target.value })}
                >
                  {availableStageNames.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
              <label className="field week-input">
                <span>Week</span>
                <input
                  aria-label={`Week for ${controlName}`}
                  type="number"
                  min={1}
                  max={14}
                  value={s.week}
                  onChange={(e) =>
                    update(s.id, {
                      week: Math.max(
                        1,
                        Math.min(14, Math.floor(Number(e.target.value)) || 1),
                      ),
                    })
                  }
                />
              </label>
              <label className="field stage-purpose">
                <span>Purpose</span>
                <select
                  aria-label={`Purpose for ${controlName}`}
                  value={s.graded ? "graded" : "formative"}
                  onChange={(e) =>
                    update(s.id, {
                      graded: e.target.value === "graded",
                      weight: 0,
                    })
                  }
                >
                  <option value="formative">Formative · ungraded</option>
                  <option value="graded">Summative · graded</option>
                </select>
              </label>
              <label className="field weight-input">
                <span>Weight %</span>
                <input
                  aria-label={`Weight for ${controlName}`}
                  type="number"
                  min={0}
                  max={100}
                  disabled={!s.graded}
                  value={s.graded ? s.weight : 0}
                  onChange={(e) =>
                    update(s.id, {
                      weight: Math.min(
                        100,
                        Math.max(0, Number(e.target.value)),
                      ),
                    })
                  }
                />
              </label>
              <div className="stage-controls">
                <button
                  className="icon-button"
                  disabled={i === 0}
                  aria-label={`Move ${controlName} earlier in list`}
                  onClick={() => move(i, -1)}
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  className="icon-button"
                  disabled={i === stages.length - 1}
                  aria-label={`Move ${controlName} later in list`}
                  onClick={() => move(i, 1)}
                >
                  <ArrowDown size={16} />
                </button>
                <button
                  className="icon-button danger"
                  aria-label={`Remove ${controlName}`}
                  onClick={() =>
                    setStages((all) => all.filter((x) => x.id !== s.id))
                  }
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {!stages.length && (
        <div className="empty-state">
          <h3>An open semester.</h3>
          <p>Add a stage to begin a new pathway.</p>
        </div>
      )}
      <div className="timeline-add">
        <label className="field">
          <span className="sr-only">Stage to add</span>
          <select value={newName} onChange={(e) => setNewName(e.target.value)}>
            {availableStageNames.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <Button
          variant="outline"
          disabled={stages.length >= 20}
          onClick={() =>
            setStages((s) => [
              ...s,
              {
                id: Math.max(0, ...s.map((x) => x.id)) + 1,
                name: newName,
                week: Math.min(14, (s.at(-1)?.week ?? 0) + 1),
                graded: false,
                weight: 0,
              },
            ])
          }
        >
          <Plus size={16} /> Add stage
        </Button>
        <Button asChild>
          <a
            download="semester-pathway.txt"
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(text)}`}
          >
            <Download size={16} /> Export pathway
          </a>
        </Button>
      </div>
      <div className="timeline-messages" aria-live="polite">
        <p className="micro-copy">
          This pathway stays on this page. Export it before leaving or
          reloading.
        </p>
        {weight !== 100 && (
          <p className="notice">
            Your graded stages total {weight}%. This is a design prompt to
            review; the tool does not normalize or approve your weighting.
          </p>
        )}
        {stages.some((s, i) => i > 0 && s.week < stages[i - 1].week) && (
          <p className="notice">
            The list order differs from the week order. The semester overview
            uses the weeks you entered; moving a stage changes list order only.
          </p>
        )}
      </div>
      <div className="two-columns">
        <section className="soft-card">
          <span className="formative-dot" />
          <h3>Feedback is an opportunity to act.</h3>
          <p>
            An ungraded draft, dialogue, or peer review can create space for
            revision. Consider how students can use the feedback before the
            final deliverable.
          </p>
        </section>
        <section className="soft-card">
          <span className="graded-dot" />
          <h3>Grading makes a summative judgment.</h3>
          <p>
            Decide which stages contribute to a final judgment and why. More
            graded checkpoints can also increase marking load and assessment
            pressure.
          </p>
        </section>
      </div>
    </div>
  );
}
