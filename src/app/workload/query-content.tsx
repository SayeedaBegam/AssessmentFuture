"use client";
import { useSearchParams } from "next/navigation";
import { Workload } from "@/components/workload";
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
          Loaded illustrative assumptions from {p.title}.{" "}
          {p.workload.assumptions}
        </div>
      )}
      <Workload
        key={p?.id ?? "default"}
        initialScenario={p ? { ...p.workload, name: p.title } : undefined}
      />
    </>
  );
}
