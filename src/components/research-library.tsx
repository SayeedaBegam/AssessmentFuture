"use client";
import { useState } from "react";
import { Search, ExternalLink, BookOpen, Clock3, FileText } from "lucide-react";
import Link from "next/link";
import { papers } from "@/content/research";
import { assessments } from "@/content/assessments";
import { catalogue } from "@/content/catalogue";
import type { ResearchPaper } from "@/lib/types";
import { PageHeading } from "./shell";
import { PaperCard } from "./cards";
export function ResearchLibrary() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [verified, setVerified] = useState(false);
  const summaryCount = papers.filter(
    (p) => p.verificationScope !== "metadata-only",
  ).length;
  const pendingCount = papers.length - summaryCount;
  const results = papers.filter(
    (p) =>
      (!type || p.type === type) &&
      (!verified || p.verification === "Source verified") &&
      `${p.title} ${p.authors} ${p.digest.overview} ${p.year}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <div className="section-wrap page-body">
      <PageHeading
        eyebrow="THE RESEARCH LIBRARY"
        title="Evidence worth exploring."
        description="Find a paper, read the summary, and follow the link to the original source. Each entry explains what we checked and where the evidence is limited."
      />
      <nav className="library-tabs" aria-label="Research and resources">
        <Link href="/research" aria-current="page">
          Research Library
        </Link>
        <Link href="/resources">Resources Library</Link>
      </nav>
      <div className="notice">
        <BookOpen size={21} />
        <div>
          <strong>We are starting with a small reading collection.</strong>
          <p>
            {summaryCount} source summaries and {pendingCount} candidate
            readings awaiting full paper review. This is not a systematic
            evidence review.
          </p>
        </div>
      </div>
      <div className="search-toolbar">
        <label className="search-field">
          <Search size={19} />
          <input
            aria-label="Search research"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, authors, year, or ideas…"
          />
        </label>
        <label className="field inline-field">
          <span className="sr-only">Publication type</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All publication types</option>
            {[...new Set(papers.map((p) => p.type))].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="result-bar">
        <span aria-live="polite">
          <b>{results.length}</b> sources
        </span>
        <label className="check-label">
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => setVerified(e.target.checked)}
          />{" "}
          Source summaries available
        </label>
      </div>
      <div className="research-grid">
        {results.map((p) => (
          <PaperCard paper={p} key={p.id} />
        ))}
      </div>
      {!results.length && (
        <div className="empty-state">
          <h2>No sources found.</h2>
          <p>Try a broader term or another publication type.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setQuery("");
              setType("");
              setVerified(false);
            }}
          >
            Reset search
          </button>
        </div>
      )}
      <p className="content-note">
        Verification records what was checked, not a quality endorsement. Always
        consult the original source before adapting a claim to your context.
      </p>
    </div>
  );
}
export function ResearchDigestView({ paper: p }: { paper: ResearchPaper }) {
  const [level, setLevel] = useState(0);
  const d = p.digest;
  const blocks = [
    ["Research question", d.question],
    ["Study design & verification scope", d.design],
    ["Participants & context", d.context],
    ["Reported findings", d.findings],
    ["Quantitative results", d.quantitative],
    ["Authors’ interpretation", d.interpretation],
    ["Our proposed practical application", d.application],
    ["Limitations", d.limitations],
    ["Relevance to AI enabled education", d.aiRelevance],
    ["Open questions", d.openQuestions],
  ];
  const related = assessments.filter((a) =>
    a.evidenceLinks.some((e) => e.paperId === p.id),
  );
  return (
    <div className="section-wrap page-body digest-page">
      <Link className="back-link" href="/research">
        ← Research library
      </Link>
      <PageHeading
        eyebrow={`${p.type.toUpperCase()} · ${p.year}`}
        title={p.title}
        description={`${p.authors} · ${p.venue}`}
      />
      <div className="digest-meta">
        <span
          className={`status-tag ${p.verification === "Source verified" ? "verified" : "pending"}`}
        >
          {p.verification}
        </span>
        <span>Checked {p.verifiedOn}</span>
        <span>Editorial review: {p.editorialReview.status}</span>
        <span title={p.verificationNote}>
          Review scope: {p.verificationScope.replaceAll("-", " ")}
        </span>
        <a href={p.url} target="_blank" rel="noreferrer">
          Read original source <ExternalLink size={14} />
        </a>
      </div>
      <div className="research-source-actions">
        <Link
          className="button button-outline"
          href={`/evidence-map?focus=research-paper:${p.id}`}
        >
          View this source in the research map →
        </Link>
        <Link className="text-link" href="/implementations">
          Explore related innovation frameworks →
        </Link>
      </div>
      <div className="reading-tabs" role="tablist" aria-label="Reading depth">
        {[
          ["30 second overview", Clock3],
          ["2 minute explanation", BookOpen],
          ["Detailed research digest", FileText],
        ].map(([name, Icon], i) => {
          const TabIcon = Icon as typeof Clock3;
          return (
            <button
              key={i}
              id={`reading-tab-${i}`}
              role="tab"
              aria-selected={level === i}
              aria-controls="reading-panel"
              className={level === i ? "selected" : ""}
              onClick={() => setLevel(i)}
              onKeyDown={(e) => {
                if (
                  ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  const n =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 2
                        : (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                  setLevel(n);
                  document.getElementById(`reading-tab-${n}`)?.focus();
                }
              }}
              tabIndex={level === i ? 0 : -1}
            >
              <TabIcon size={17} />
              {name as string}
            </button>
          );
        })}
      </div>
      <article
        className="reading-panel"
        id="reading-panel"
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`reading-tab-${level}`}
      >
        <span className="eyebrow">
          {p.reviewStatus === "Pending verification"
            ? "PENDING FULL TEXT VERIFICATION"
            : "SOURCE BOUNDED SUMMARY"}
        </span>
        <h2>
          {level === 0
            ? "The central idea"
            : level === 1
              ? "The study, in context"
              : "A closer reading"}
        </h2>
        <p className="digest-lead">{d.overview}</p>
        <p className="content-note">
          {p.verificationNote}
          {p.publishedOn
            ? ` Published ${p.publishedOn}.`
            : " Exact publication date not recorded here."}{" "}
          {p.editorialReview.note}
        </p>
        {level > 0 && (
          <div className="digest-blocks">
            {(level === 1
              ? [blocks[0], blocks[1], blocks[3], blocks[6], blocks[7]]
              : blocks
            ).map(([title, text]) => (
              <section key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </section>
            ))}
          </div>
        )}
        <aside className="evidence-note">
          <strong>Evidence strength & rationale</strong>
          <p>{p.evidenceStrength}</p>
        </aside>
        <a className="text-link" href={p.url} target="_blank" rel="noreferrer">
          {p.doi ? `DOI: ${p.doi}` : "Open verified source"}
          <ExternalLink size={15} />
        </a>
      </article>
      <section className="detail-section">
        <span className="eyebrow">SOURCE → PRACTICE</span>
        <h2>Connected assessment explorations</h2>
        <p>
          Links indicate contextual relevance or candidate reading, rather than
          direct evidence of effectiveness.
        </p>
        {related.length ? (
          <div className="related-links">
            {related.slice(0, 6).map((a) => (
              <Link href={`/explore/${a.slug}`} key={a.id}>
                {a.name}
                <span>Contextual link ↗</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="notice">
            No format specific evidence links have been established for this
            source.
          </p>
        )}
      </section>
      <section className="detail-section">
        <h2>Research to practice interpretations</h2>
        <p>
          These are proposed teaching applications. A conceptual or contextual
          connection does not establish effectiveness.
        </p>
        <div className="related-links">
          {catalogue.implementations
            .filter((i) =>
              i.researchConnections.some((c) => c.link.paperId === p.id),
            )
            .map((i) => (
              <Link key={i.id} href={`/implementations/${i.slug}`}>
                {i.title}
                <span>Proposed interpretation ↗</span>
              </Link>
            ))}
        </div>
        {!catalogue.implementations.some((i) =>
          i.researchConnections.some((c) => c.link.paperId === p.id),
        ) && (
          <p>
            No implementation connection has been authored for this reading yet.
          </p>
        )}
      </section>
    </div>
  );
}
