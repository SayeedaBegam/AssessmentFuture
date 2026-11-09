"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Layers, Search, ArrowRight } from "lucide-react";
import { catalogue } from "@/content/catalogue";
import { PageHeading } from "./shell";
export function InnovationLibrary() {
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState("");
  const disciplines = [
    ...new Set(
      catalogue.implementations.flatMap((p) =>
        p.framework.applications.map((a) => a.discipline),
      ),
    ),
  ].sort();
  const results = catalogue.implementations.filter(
    (p) =>
      (!discipline ||
        p.framework.applications.some((a) => a.discipline === discipline)) &&
      `${p.title} ${p.framework.summary} ${p.framework.applications.map((a) => `${a.title} ${a.discipline} ${a.outcome}`).join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div className="section-wrap page-body innovations-page" id="pathways">
      <PageHeading
        eyebrow="New Ideas & Innovations"
        title="Build on established practice. Explore a different possibility."
        description="Eight research informed frameworks connect familiar assessments with new ways to gather evidence. Explore applications across technical disciplines, then adapt a worked example to your own teaching."
      />
      <p className="notice">
        These are proposed adaptations and exploratory possibilities. Inclusion
        does not establish novelty, effectiveness or absence from UTN. Research
        verification and editorial review remain visible and separate.
      </p>
      <div className="search-toolbar">
        <label className="search-field">
          <Search size={20} />
          <input
            aria-label="Search innovation frameworks"
            placeholder="Search ideas, outcomes or disciplines"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="field inline-field">
          Technical discipline
          <select
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          >
            <option value="">All technical disciplines</option>
            {disciplines.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="result-bar">
        <span role="status">{results.length} innovation frameworks</span>
        <span>
          {catalogue.implementations.reduce(
            (n, p) => n + p.framework.applications.length,
            0,
          )}{" "}
          illustrative discipline applications
        </span>
      </div>
      <div className="innovation-grid">
        {results.map((p) => (
          <article className="innovation-card" key={p.id}>
            <div className="innovation-card-top">
              <span className="approach-icon">
                <Layers size={24} />
              </span>
              <span className="tag">Proposed framework</span>
            </div>
            <h2>
              <Link href={`/implementations/${p.slug}`}>
                {p.title}
                <ArrowUpRight size={20} />
              </Link>
            </h2>
            <p>{p.framework.summary}</p>
            <div className="innovation-disciplines">
              {p.framework.applications.map((a) => (
                <Link
                  key={a.id}
                  href={`/implementations/${p.slug}#application-${a.id}`}
                >
                  {a.discipline}
                </Link>
              ))}
            </div>
            <div className="innovation-card-footer">
              <p>Editorial draft · Research review pending</p>
              <Link className="text-link" href={`/implementations/${p.slug}`}>
                Explore framework <ArrowRight size={17} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      {!results.length && (
        <div className="empty-state">
          <h2>No frameworks match these filters.</h2>
          <p>Try another discipline or a broader search.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setQuery("");
              setDiscipline("");
            }}
          >
            Reset innovation filters
          </button>
        </div>
      )}
    </div>
  );
}
