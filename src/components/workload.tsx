"use client";
import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Calculator, Copy, ArrowRight, RotateCcw, X } from "lucide-react";
import { calculateWorkload, defaultScenario } from "@/lib/logic";
import type { WorkloadScenario } from "@/lib/types";
import { PageHeading } from "./shell";
import { Button } from "./ui/button";

export function Workload({
  initialScenario,
}: {
  initialScenario?: WorkloadScenario;
}) {
  const [scenario, setScenario] = useState<WorkloadScenario>(
    initialScenario ?? defaultScenario,
  );
  const [saved, setSaved] = useState<WorkloadScenario[]>([]);
  const [snapshotNumber, setSnapshotNumber] = useState(1);
  const update = <K extends keyof WorkloadScenario>(
    k: K,
    v: WorkloadScenario[K],
  ) => setScenario((s) => ({ ...s, [k]: v }));
  const total = calculateWorkload(scenario);
  const series = [...saved, scenario].map((s) => {
    const r = calculateWorkload(s);
    return {
      name: s.name,
      Grading: r.grading,
      Preparation: r.preparation,
      Feedback: r.feedback,
      "Oral verification": r.verification,
    };
  });
  const fields: {
    key:
      | "students"
      | "groups"
      | "submissions"
      | "minutes"
      | "checkpoints"
      | "preparation"
      | "feedback"
      | "oral";
    label: string;
    unit: string;
    max: number;
  }[] = [
    {
      key: "students",
      label: "Number of students",
      unit: "students",
      max: 2000,
    },
    {
      key: "groups",
      label: "Number of groups",
      unit: "groups",
      max: scenario.students,
    },
    {
      key: "submissions",
      label: "Submissions per assessment unit",
      unit: "per checkpoint",
      max: 20,
    },
    {
      key: "minutes",
      label: "Grading time per submission",
      unit: "minutes",
      max: 480,
    },
    {
      key: "checkpoints",
      label: "Marked assessment checkpoints",
      unit: "checkpoints",
      max: 30,
    },
    {
      key: "preparation",
      label: "Preparation time",
      unit: "hours in total",
      max: 1000,
    },
    {
      key: "feedback",
      label: "Additional feedback per submission",
      unit: "minutes",
      max: 480,
    },
    {
      key: "oral",
      label: "Oral verification per student",
      unit: "minutes · 0 to omit",
      max: 120,
    },
  ];
  return (
    <div className="section-wrap page-body">
      <PageHeading
        eyebrow="WORKLOAD & SCALABILITY SIMULATOR"
        title="Make the assumptions visible."
        description="Explore how cohort size, submission design, and feedback time interact. Compare scenarios using your own time estimates."
      />
      <div className="notice">
        <Calculator size={22} />
        <p>
          Planning estimates, not measured data. The 30 student starting
          scenario is an illustrative reference context, not actual UTN
          workload.
        </p>
      </div>
      <div className="workspace-grid workload-layout">
        <div className="control-panel">
          <div className="panel-heading">
            <span className="eyebrow">YOUR ASSUMPTIONS</span>
            <button
              className="icon-button"
              onClick={() => setScenario(initialScenario ?? defaultScenario)}
              aria-label="Reset workload assumptions"
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <div className="preset-row">
            {[15, 30, 60, 100, 200].map((n) => (
              <button
                aria-pressed={scenario.students === n}
                className={scenario.students === n ? "selected" : ""}
                key={n}
                onClick={() =>
                  setScenario((s) => ({
                    ...s,
                    students: n,
                    groups: Math.ceil(n / 5),
                  }))
                }
              >
                {n}
              </button>
            ))}
          </div>
          <label className="field">
            <span>Marking unit</span>
            <select
              value={scenario.mode}
              onChange={(e) =>
                update("mode", e.target.value as WorkloadScenario["mode"])
              }
            >
              <option value="individual">Individual submissions</option>
              <option value="group">Group submissions</option>
            </select>
          </label>
          <div className="field-row">
            {fields.map((f) => (
              <label className="field" key={f.key}>
                <span>{f.label}</span>
                <div className="number-input">
                  <input
                    type="number"
                    aria-label={f.label}
                    min={f.key === "students" || f.key === "groups" ? 1 : 0}
                    max={f.max}
                    step={f.key === "preparation" ? 0.5 : 1}
                    disabled={f.key === "groups" && scenario.mode !== "group"}
                    value={scenario[f.key]}
                    onChange={(e) => {
                      const entered = Number(e.target.value);
                      const v = [
                        "students",
                        "groups",
                        "submissions",
                        "checkpoints",
                      ].includes(f.key)
                        ? Math.floor(entered)
                        : entered;
                      const val = Number.isFinite(v)
                        ? Math.max(
                            f.key === "students" || f.key === "groups" ? 1 : 0,
                            Math.min(f.max, v),
                          )
                        : 0;
                      setScenario((s) => ({
                        ...s,
                        [f.key]: val,
                        ...(f.key === "students"
                          ? { groups: Math.min(s.groups, val) }
                          : {}),
                      }));
                    }}
                  />
                </div>
                <small>{f.unit}</small>
              </label>
            ))}
          </div>
          <Button
            variant="outline"
            disabled={saved.length >= 2}
            onClick={() => {
              setSaved((s) => [
                ...s,
                { ...scenario, name: `Scenario ${snapshotNumber}` },
              ]);
              setSnapshotNumber((n) => n + 1);
            }}
          >
            <Copy size={16} />{" "}
            {saved.length >= 2
              ? "Two scenarios saved"
              : "Keep scenario for comparison"}
          </Button>
          <p className="micro-copy">
            Snapshots stay on this page and are cleared when you leave or
            reload. Change inputs to compare a new scenario.
          </p>
        </div>
        <div className="workload-results">
          <div className="total-card" aria-live="polite" aria-atomic="true">
            <span className="eyebrow">ESTIMATED TOTAL WORKLOAD</span>
            <div className="total-number">
              {total.total.toFixed(1)}
              <span>hours</span>
            </div>
            <p>
              Across {total.totalSubmissions} submissions · {scenario.students}{" "}
              students
            </p>
            <div className="total-breakdown">
              {[
                ["Direct grading", total.grading],
                ["Preparation", total.preparation],
                ["Feedback", total.feedback],
                ["Oral verification", total.verification],
              ].map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{Number(value).toFixed(1)} h</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-card">
            <div className="panel-heading">
              <span className="eyebrow">TIME, SIDE BY SIDE</span>
              <span className="micro-copy">Hours · entered assumptions</span>
            </div>
            <div
              className="workload-chart"
              role="img"
              aria-label={`Workload chart. ${series.map((s) => `${s.name}: ${(s.Grading + s.Preparation + s.Feedback + s["Oral verification"]).toFixed(1)} hours`).join(". ")}`}
            >
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={series}
                  margin={{ top: 20, right: 10, bottom: 0, left: -20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 5"
                    vertical={false}
                    stroke="var(--line)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "var(--muted)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--muted)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(v) => `${Number(v).toFixed(1)} h`}
                    contentStyle={{
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      borderRadius: 12,
                      color: "var(--ink)",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 14 }} />
                  {[
                    ["Grading", "var(--chart-grading)"],
                    ["Preparation", "var(--chart-preparation)"],
                    ["Feedback", "var(--chart-feedback)"],
                    ["Oral verification", "var(--chart-oral)"],
                  ].map(([key, color]) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      stackId="work"
                      fill={color}
                      maxBarSize={88}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div
              className="data-table-scroll"
              role="region"
              aria-label="Workload data table"
              tabIndex={0}
            >
              <table className="compact-table">
                <caption className="sr-only">
                  Accessible chart data, in hours
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Scenario</th>
                    <th scope="col">Grading</th>
                    <th scope="col">Prep.</th>
                    <th scope="col">Feedback</th>
                    <th scope="col">Oral</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[...saved, scenario].map((s, i) => {
                    const r = calculateWorkload(s);
                    return (
                      <tr key={i}>
                        <th scope="row">{s.name}</th>
                        {[
                          r.grading,
                          r.preparation,
                          r.feedback,
                          r.verification,
                          r.total,
                        ].map((v, j) => (
                          <td key={j}>{v.toFixed(1)}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {saved.length > 0 && (
              <div className="saved-scenarios">
                {saved.map((s, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setSaved((all) => all.filter((_, j) => j !== i))
                    }
                  >
                    Remove {s.name}
                    <X size={13} />
                  </button>
                ))}
              </div>
            )}
          </div>
          <details className="formula-card">
            <summary>
              See how the estimate is calculated <ArrowRight size={16} />
            </summary>
            <div>
              <p>
                <b>Assessment units:</b>{" "}
                {scenario.mode === "group"
                  ? "number of groups"
                  : "number of students"}{" "}
                ({total.units}).
              </p>
              <p>
                <b>Submissions:</b> units × submissions per unit per checkpoint
                × marked checkpoints.
              </p>
              <p>
                <b>Grading:</b> total submissions × grading minutes ÷ 60.
              </p>
              <p>
                <b>Feedback:</b> total submissions × additional feedback minutes
                ÷ 60.
              </p>
              <p>
                <b>Oral verification:</b> all students × oral minutes ÷ 60, once
                in the scenario.
              </p>
              <p>
                <b>Total:</b> grading + preparation hours + additional feedback
                + oral verification.
              </p>
              <p>
                Ungraded feedback events are not separately modeled; include
                their time in preparation or adjust a scenario. Administrative
                work, moderation, resits, and scheduling overhead are excluded.
                Inputs represent planning assumptions.
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
