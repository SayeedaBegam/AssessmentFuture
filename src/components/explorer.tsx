"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  X,
  RotateCcw,
} from "lucide-react";
import { assessments, competencies } from "@/content/assessments";
import { filterAssessments, type AssessmentFilters } from "@/lib/logic";
import {
  catalogueClassifications,
  editorialReviewLabels,
  researchVerificationLabels,
  evidenceAvailability,
} from "@/lib/content-labels";
import { PageHeading } from "./shell";
import { AssessmentCard } from "./cards";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

export function Explorer({ initialFamily = "" }: { initialFamily?: string }) {
  const [filters, setFilters] = useState<AssessmentFilters>({
    family: initialFamily,
  });
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const results = useMemo(
    () => filterAssessments(assessments, filters),
    [filters],
  );
  const update = (key: keyof AssessmentFilters, value: string) =>
    setFilters((f) => ({ ...f, [key]: value }));
  const count = Object.entries(filters).filter(
    ([k, v]) => k !== "query" && v && v !== "All",
  ).length;
  const properties: {
    key: keyof AssessmentFilters;
    name: string;
    options: string[];
  }[] = [
    {
      key: "classification",
      name: "Catalogue classification",
      options: catalogueClassifications.map((c) => c.id),
    },
    {
      key: "editorialStatus",
      name: "Editorial review",
      options: Object.keys(editorialReviewLabels),
    },
    {
      key: "researchStatus",
      name: "Research verification",
      options: Object.keys(researchVerificationLabels),
    },
    {
      key: "evidenceStatus",
      name: "Evidence availability",
      options: [...new Set(assessments.map(evidenceAvailability))],
    },
    {
      key: "mode",
      name: "Working arrangement",
      options: ["Individual", "Collaborative"],
    },
    {
      key: "use",
      name: "Assessment purpose",
      options: ["Formative", "Summative"],
    },
    {
      key: "competency",
      name: "Competency",
      options: competencies.map((c) => c.id),
    },
    ...(
      [
        ["aiLevel", "AI integration"],
        ["groupSize", "Student group size"],
        ["workload", "Lecturer preparation"],
        ["feedback", "Feedback approach"],
        ["duration", "Assessment duration"],
        ["resources", "Technical resources"],
      ] as const
    ).map(([key, name]) => ({
      key,
      name,
      options: [...new Set(assessments.map((a) => a[key]))],
    })),
  ];
  function optionLabel(key: keyof AssessmentFilters, value: string) {
    if (key === "classification")
      return (
        catalogueClassifications.find((c) => c.id === value)?.label ?? value
      );
    if (key === "editorialStatus")
      return (
        editorialReviewLabels[value as keyof typeof editorialReviewLabels] ??
        value
      );
    if (key === "researchStatus")
      return (
        researchVerificationLabels[
          value as keyof typeof researchVerificationLabels
        ] ?? value
      );
    if (key === "competency")
      return competencies.find((c) => c.id === value)?.name ?? value;
    return value;
  }
  return (
    <div className="section-wrap page-body">
      <PageHeading
        eyebrow="EXISTING ASSESSMENTS · ASSESSMENT EXPLORER"
        title="Established approaches. Thoughtful adaptations."
        description="Explore the 18 approaches in the supplied programme inventory. Search by competency, consider strengths and limitations, or compare formats for your teaching context."
      />
      <p className="inventory-note">
        Inventory membership does not verify current practice in an individual
        UTN course.{" "}
        <Link className="text-link" href="/implementations">
          Explore the separate innovation frameworks →
        </Link>
      </p>
      <div className="search-toolbar">
        <label className="search-field">
          <Search size={19} />
          <input
            aria-label="Search assessment approaches"
            placeholder="Search approaches, competencies, or keywords…"
            value={filters.query ?? ""}
            onChange={(e) => update("query", e.target.value)}
          />
        </label>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal size={16} /> Filters{" "}
              {count > 0 && <span className="count-badge">{count}</span>}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="dialog-title">
              A closer fit for your context.
            </DialogTitle>
            <DialogDescription>
              These descriptive filters narrow possibilities; they do not rank
              educational quality.
            </DialogDescription>
            <div className="filter-grid">
              {properties.map((p) => (
                <label className="field" key={p.key}>
                  <span>{p.name}</span>
                  <select
                    value={filters[p.key] ?? ""}
                    onChange={(e) => update(p.key, e.target.value)}
                  >
                    <option value="">All</option>
                    {p.options.map((o) => (
                      <option key={o} value={o}>
                        {optionLabel(p.key, o)}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <div className="dialog-actions">
              <Button variant="ghost" onClick={() => setFilters({})}>
                <RotateCcw size={15} /> Reset filters
              </Button>
              <Button onClick={() => setOpen(false)}>
                Show {results.length} approaches <ArrowRight size={16} />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="filter-chips" aria-label="Assessment families">
        {["", ...new Set(assessments.map((a) => a.family))].map((f) => (
          <button
            key={f}
            className={
              filters.family === f || (!filters.family && !f)
                ? "filter-chip selected"
                : "filter-chip"
            }
            aria-pressed={filters.family === f || (!filters.family && !f)}
            onClick={() => update("family", f)}
          >
            {f || "All approaches"}
          </button>
        ))}
      </div>
      <div className="result-bar">
        <span aria-live="polite">
          <b>{results.length}</b>{" "}
          {results.length === 1 ? "approach" : "approaches"} to explore
        </span>
        <span>Select up to 3 to compare</span>
      </div>
      {count > 0 && (
        <div className="active-filters">
          {Object.entries(filters)
            .filter(([k, v]) => k !== "query" && v)
            .map(([k, v]) => (
              <button
                key={k}
                onClick={() => update(k as keyof AssessmentFilters, "")}
              >
                {optionLabel(k as keyof AssessmentFilters, v!)}
                <X size={13} />
                <span className="sr-only">Remove filter</span>
              </button>
            ))}
        </div>
      )}
      <div className="cards-grid catalogue-grid">
        {results.map((a, i) => (
          <AssessmentCard
            key={a.id}
            assessment={a}
            index={i}
            selected={selected.includes(a.id)}
            compareFull={selected.length === 3}
            onCompare={() =>
              setSelected((s) =>
                s.includes(a.id)
                  ? s.filter((id) => id !== a.id)
                  : s.length < 3
                    ? [...s, a.id]
                    : s,
              )
            }
          />
        ))}
      </div>
      {!results.length && (
        <div className="empty-state">
          <Search size={30} />
          <h2>A different combination?</h2>
          <p>No approaches match these filters. Try a broader search.</p>
          {filters.classification &&
            !assessments.some(
              (a) => a.catalogueClassification === filters.classification,
            ) && (
              <p>
                No records have been added to this catalogue classification yet.
                This does not mean these approaches are absent from UTN or
                another institution.
              </p>
            )}
          <Button variant="outline" onClick={() => setFilters({})}>
            Reset search & filters
          </Button>
        </div>
      )}
      <p className="content-note">
        All assessment descriptions are editorial examples. Linked contextual
        sources do not validate the proposed adaptations. No course or lecturer
        is evaluated.
      </p>
      <p className="content-note">
        Catalogue classifications distinguish the supplied programme inventory,
        adaptations and combinations, and additional or emerging possibilities.
        They describe this collection, not a complete inventory of institutional
        practice. Editorial review and research verification are tracked
        separately.
      </p>
      {selected.length > 0 && (
        <div className="compare-dock">
          <div>
            <strong>{selected.length} of 3 selected</strong>
            <small>
              {selected.length < 2
                ? "Choose one more approach to compare."
                : "Ready to explore the trade offs?"}
            </small>
          </div>
          <button className="text-link" onClick={() => setSelected([])}>
            Clear
          </button>
          {selected.length >= 2 ? (
            <Button asChild>
              <Link href={`/compare?ids=${selected.join(",")}`}>
                Compare approaches <ArrowRight size={16} />
              </Link>
            </Button>
          ) : (
            <Button disabled>Compare approaches</Button>
          )}
        </div>
      )}
    </div>
  );
}
