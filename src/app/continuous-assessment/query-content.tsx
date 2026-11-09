"use client";
import { useSearchParams } from "next/navigation";
import { Timeline } from "@/components/timeline";
import { catalogue } from "@/content/catalogue";

export default function QueryContent() {
  const searchParams = useSearchParams();
  const implementation = searchParams.get("implementation") ?? undefined;
  const p = catalogue.implementations.find(
    (p) =>
      p.id ===
      (Array.isArray(implementation) ? implementation[0] : implementation),
  );
  return (
    <>
      {p && (
        <div className="section-wrap notice" style={{ marginTop: "2rem" }}>
          Loaded the illustrative semester pathway for {p.title}. Edit the
          checkpoints and weighting before exporting.
        </div>
      )}
      <Timeline
        key={p?.id ?? "default"}
        initialStages={p?.activities.map((a, i) => ({
          id: i + 1,
          name: a.title,
          week: a.week,
          graded: a.purpose === "summative",
          weight: a.weight,
        }))}
      />
    </>
  );
}
