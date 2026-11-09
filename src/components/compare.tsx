"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Columns3, Plus, X } from "lucide-react";
import { assessments, competencies } from "@/content/assessments";
import { PageHeading } from "./shell";
import { ApproachIcon } from "./cards";
import type { AssessmentApproach } from "@/lib/types";
import { comparisonAssessments } from "@/lib/catalogue-selectors";
import {
  evidenceAvailability,
  researchVerificationLabels,
} from "@/lib/content-labels";
export function Compare({ initialIds = [] }: { initialIds?: string[] }) {
  const [ids, setIds] = useState<string[]>(
    comparisonAssessments(assessments, initialIds).map((a) => a.id),
  );
  const selected = ids
    .filter(Boolean)
    .map((id) => assessments.find((a) => a.id === id)!);
  const rows: { label: string; read: (a: AssessmentApproach) => string }[] = [
    {
      label: "Competencies supported",
      read: (a) =>
        a.competencyIds
          .map((id) => competencies.find((c) => c.id === id)?.name)
          .join(", "),
    },
    { label: "Competency evidence", read: (a) => a.evidence },
    { label: "AI integration possibilities", read: (a) => a.aiConsiderations },
    { label: "Individual accountability", read: (a) => a.accountability },
    {
      label: "Lecturer preparation",
      read: (a) => `${a.workload}. Agree scope, criteria, and examples.`,
    },
    { label: "Grading workload & scalability", read: (a) => a.scalability },
    {
      label: "Student workload",
      read: (a) => `${a.duration}. ${a.studentEffort}.`,
    },
    { label: "Accessibility & fairness", read: (a) => a.accessibility },
    {
      label: "Feedback opportunities",
      read: (a) =>
        `${a.feedback}. An optional ungraded checkpoint can create room for revision.`,
    },
    { label: "Resource requirements", read: (a) => a.resources },
    {
      label: "Research evidence",
      read: (a) =>
        `${evidenceAvailability(a)}. ${researchVerificationLabels[a.researchVerification.status]}. ${a.researchVerification.note}`,
    },
  ];
  return (
    <div className="section-wrap page-body">
      <PageHeading
        eyebrow="ASSESSMENT COMPARISON STUDIO"
        title="How do the options compare?"
        description="Choose two or three formats to compare the evidence students could provide, the feedback they might receive, and the work involved for you."
      />
      <div className="comparison-selectors">
        {[0, 1, 2].map((i) => (
          <div className="comparison-selector" key={i}>
            <label className="field">
              <span>
                APPROACH {String(i + 1).padStart(2, "0")}
                {i === 2 ? " · OPTIONAL" : ""}
              </span>
              <select
                value={ids[i] ?? ""}
                onChange={(e) =>
                  setIds((old) => {
                    const next = [...old];
                    next[i] = e.target.value;
                    return next;
                  })
                }
              >
                <option value="">Select an approach</option>
                {assessments
                  .filter((a) => !ids.includes(a.id) || ids[i] === a.id)
                  .map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
              </select>
            </label>
            {ids[i] && (
              <button
                className="icon-button"
                onClick={() =>
                  setIds((x) => x.map((id, j) => (j === i ? "" : id)))
                }
                aria-label={`Remove approach ${i + 1}`}
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
      {selected.length < 2 ? (
        <div className="empty-state comparison-empty">
          <Columns3 size={42} />
          <h2>Possibilities are easier to see together.</h2>
          <p>
            Select at least two approaches to explore the practical differences.
          </p>
          <button
            className="button button-outline"
            onClick={() =>
              setIds([
                "individual-coding-assignments",
                "portfolios-and-staged-assessment",
              ])
            }
          >
            <Plus size={16} /> Try coding assignments & portfolios
          </button>
        </div>
      ) : (
        <>
          <div
            className="comparison-scroll"
            tabIndex={0}
            role="region"
            aria-label="Assessment comparison table"
          >
            <table className="comparison-table">
              <caption className="sr-only">
                Qualitative comparison of{" "}
                {selected.map((a) => a.name).join(" and ")}
              </caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="eyebrow">CONSIDER THE FIT</span>
                    <strong>
                      Your context
                      <br />
                      makes the difference.
                    </strong>
                  </th>
                  {selected.map((a) => (
                    <th scope="col" key={a.id}>
                      <span className="approach-icon">
                        <ApproachIcon family={a.family} />
                      </span>
                      <Link href={`/explore/${a.slug}`}>
                        {a.name}
                        <ArrowUpRight size={17} />
                      </Link>
                      <small>{a.mode}</small>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {selected.map((a) => (
                      <td key={a.id}>{row.read(a)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="notice">
            <Columns3 size={22} />
            <p>
              These are editorial design considerations, not measured
              performance ratings. Use the{" "}
              <Link href="/workload">workload simulator</Link> to compare your
              own time assumptions.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
