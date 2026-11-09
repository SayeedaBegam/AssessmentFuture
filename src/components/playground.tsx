"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Download,
  Check,
  RotateCcw,
  ArrowUpRight,
} from "lucide-react";
import {
  assessments,
  competencies,
  resourceTemplates,
} from "@/content/assessments";
import { papers } from "@/content/research";
import { aiSpectrum, createDesign, type DesignInputs } from "@/lib/logic";
import { PageHeading } from "./shell";
import { Button } from "./ui/button";
import { playgroundAssessment } from "@/lib/catalogue-selectors";
export function Playground({
  initialFormat,
  initialAi,
}: {
  initialFormat?: string;
  initialAi?: string;
}) {
  const startingFormat = playgroundAssessment(assessments, initialFormat);
  const initial: DesignInputs = {
    assessmentId: startingFormat.id,
    competencies: startingFormat.competencyIds.map(
      (id) => competencies.find((c) => c.id === id)!.name,
    ),
    students: 30,
    mode:
      startingFormat.mode === "Collaborative" ? "Collaborative" : "Individual",
    ai:
      aiSpectrum.find((s) => s.id === initialAi)?.label ?? "Documented support",
    feedback: "Lecturer feedback",
    hours: 10,
    resources: "Computing environment",
  };
  const [input, setInput] = useState(initial);
  const [result, setResult] = useState<DesignInputs | null>(null);
  const update = <K extends keyof DesignInputs>(
    key: K,
    value: DesignInputs[K],
  ) => setInput((p) => ({ ...p, [key]: value }));
  const a = assessments.find(
    (a) => a.id === (result?.assessmentId ?? input.assessmentId),
  )!;
  const outline = result ? createDesign(a, result) : [];
  const exportText = `INTERACTIVE DESIGN PLAYGROUND\nIllustrative, rule based outline, not pedagogically validated.\n\n${outline.map((s) => `${s.title}\n${s.text}`).join("\n\n")}\n\nContextual research:\n${a.evidenceLinks.map((e) => papers.find((p) => p.id === e.paperId)?.url).join("\n")}`;
  return (
    <div className="section-wrap page-body">
      <PageHeading
        eyebrow="INTERACTIVE DESIGN PLAYGROUND"
        title="What could your assessment become?"
        description="Think of a course you teach. Choose a format, the skills you want students to demonstrate, and the time you have available. Then work through a possible design."
      />
      <div className="notice">
        <Compass size={22} />
        <div>
          <strong>A planning tool, with you making the decisions.</strong>
          <p>
            Your choices are matched with a fixed set of design prompts. This
            tool does not use an AI model. The outline is a starting point for
            planning, and has not been tested as an assessment design.
          </p>
        </div>
      </div>
      <div className="workspace-grid">
        <form
          className="control-panel"
          onSubmit={(e) => {
            e.preventDefault();
            setResult({ ...input });
            setTimeout(
              () => document.getElementById("design-result")?.focus(),
              0,
            );
          }}
        >
          <div className="panel-heading">
            <span className="eyebrow">01 / YOUR CONTEXT</span>
            <button
              className="icon-button"
              aria-label="Reset playground"
              type="button"
              onClick={() => {
                setInput(initial);
                setResult(null);
              }}
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <label className="field">
            <span>Assessment format</span>
            <select
              value={input.assessmentId}
              onChange={(e) => update("assessmentId", e.target.value)}
            >
              {assessments.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="competency-picker">
            <legend>Intended competencies</legend>
            <div>
              {competencies.map((c) => (
                <label
                  className={
                    input.competencies.includes(c.name) ? "selected" : ""
                  }
                  key={c.id}
                >
                  <input
                    type="checkbox"
                    checked={input.competencies.includes(c.name)}
                    onChange={() =>
                      update(
                        "competencies",
                        input.competencies.includes(c.name)
                          ? input.competencies.filter((x) => x !== c.name)
                          : [...input.competencies, c.name],
                      )
                    }
                  />
                  {input.competencies.includes(c.name) && <Check size={12} />}{" "}
                  {c.name}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="field-row">
            <label className="field">
              <span>Number of students</span>
              <input
                required
                type="number"
                min={1}
                max={1000}
                value={input.students}
                onChange={(e) => update("students", Number(e.target.value))}
              />
            </label>
            <label className="field">
              <span>Working arrangement</span>
              <select
                value={input.mode}
                onChange={(e) => update("mode", e.target.value)}
              >
                <option>Individual</option>
                <option>Collaborative</option>
              </select>
            </label>
          </div>
          <label className="field">
            <span>Desired AI integration</span>
            <select
              value={input.ai}
              onChange={(e) => update("ai", e.target.value)}
            >
              {aiSpectrum.map((s) => (
                <option key={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Feedback approach</span>
            <select
              value={input.feedback}
              onChange={(e) => update("feedback", e.target.value)}
            >
              {[
                "Lecturer feedback",
                "Peer feedback",
                "Peer & lecturer feedback",
                "Final feedback only",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>
              Available marking time{" "}
              <small>hours, for one final submission</small>
            </span>
            <input
              required
              type="number"
              min={0}
              max={1000}
              value={input.hours}
              onChange={(e) => update("hours", Number(e.target.value))}
            />
          </label>
          <label className="field">
            <span>Available teaching resources</span>
            <select
              value={input.resources}
              onChange={(e) => update("resources", e.target.value)}
            >
              {[
                "Standard classroom",
                "Computing environment",
                "Library access",
                "Learning platform",
                "Specialist equipment",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <Button type="submit">
            Explore this possibility <ArrowRight size={17} />
          </Button>
          <p className="micro-copy">
            Your selections stay on this page. Download the outline before
            leaving.
          </p>
        </form>
        <div className="output-panel" id="design-result" tabIndex={-1}>
          {!result ? (
            <div className="playground-empty">
              <div className="empty-orbit">
                <Compass size={36} />
              </div>
              <span className="eyebrow">02 / A POSSIBILITY TAKES SHAPE</span>
              <h2>
                Start with what
                <br />
                matters to you.
              </h2>
              <p>
                Select a format and your priorities.
                <br />
                Your exploration outline will appear here.
              </p>
              <div className="outline-preview">
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : (
            <>
              <div className="panel-heading">
                <span className="eyebrow">02 / YOUR EXPLORATION OUTLINE</span>
                <a
                  className="icon-button"
                  download="assessment-exploration.txt"
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(exportText)}`}
                  aria-label="Download exploration outline"
                >
                  <Download size={18} />
                </a>
              </div>
              <span className="status-tag">
                Illustrative · rule based · unvalidated
              </span>
              <h2>{a.name}</h2>
              {JSON.stringify(input) !== JSON.stringify(result) && (
                <div className="notice">
                  Your inputs have changed. Explore again to update this
                  outline.
                </div>
              )}
              <div className="outline-sections">
                {outline.map((s, i) => (
                  <section key={s.title}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </section>
                ))}
              </div>
              <section className="outline-research">
                <h3>Contextual reading, with limits</h3>
                {a.evidenceLinks.map((e) => {
                  const p = papers.find((p) => p.id === e.paperId)!;
                  return (
                    <Link key={e.id} href={`/research/${p.slug}`}>
                      {p.title}
                      <ArrowUpRight size={15} />
                    </Link>
                  );
                })}
                <p>
                  These sources do not validate the outline. Review their scope
                  and limitations.
                </p>
              </section>
              <Link href="/workload" className="text-link">
                Explore the time assumptions <ArrowRight size={16} />
              </Link>
              <a
                className="text-link"
                download="implementation-checklist.txt"
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(resourceTemplates[2].content)}`}
              >
                Download an implementation checklist <Download size={15} />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
