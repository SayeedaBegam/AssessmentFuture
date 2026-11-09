import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Users,
  FlaskConical,
  Layers,
  MessageCircle,
  BookOpen,
  Check,
  Plus,
} from "lucide-react";
import { competencies } from "@/content/assessments";
import { catalogue } from "@/content/catalogue";
import type { AssessmentApproach, ResearchPaper } from "@/lib/types";
import {
  classificationLabel,
  evidenceAvailability,
} from "@/lib/content-labels";
export function ApproachIcon({
  family,
  size = 24,
}: {
  family: string;
  size?: number;
}) {
  const Icon =
    family === "Coding & making"
      ? Code2
      : family === "Research & inquiry"
        ? FlaskConical
        : family === "Dialogue & reflection"
          ? Layers
          : family === "Communication"
            ? MessageCircle
            : BookOpen;
  return <Icon size={size} />;
}
export function AssessmentCard({
  assessment: a,
  index = 0,
  selected,
  onCompare,
  compareFull = false,
}: {
  assessment: AssessmentApproach;
  index?: number;
  selected?: boolean;
  onCompare?: () => void;
  compareFull?: boolean;
}) {
  return (
    <article className={`assessment-card card-tone-${index % 4}`}>
      <div className="card-top">
        <span className="approach-icon">
          <ApproachIcon family={a.family} />
        </span>
        <span className="subtle-label">
          {a.mode === "Either" ? "Individual / group" : a.mode}
        </span>
      </div>
      <Link href={`/explore/${a.slug}`} className="card-main-link">
        <span className="eyebrow">{a.family}</span>
        <h3>
          {a.name}
          <ArrowUpRight size={19} />
        </h3>
        <p>{a.description}</p>
      </Link>
      <div className="tag-list">
        <span className="tag">
          {classificationLabel(a.catalogueClassification)}
        </span>
        {a.competencyIds.slice(0, 2).map((id) => (
          <span className="tag" key={id}>
            {competencies.find((c) => c.id === id)?.name}
          </span>
        ))}
      </div>
      <div className="card-detail">
        <span>AI consideration</span>
        <p>{a.aiConsiderations}</p>
        <span>Scalability and limits</span>
        <p>{a.scalability}</p>
      </div>
      <details className="card-considerations">
        <summary>Strengths, feedback and access</summary>
        <dl>
          <dt>Existing strengths</dt>
          <dd>{a.strengths}</dd>
          <dt>Feedback approach</dt>
          <dd>{a.feedback}</dd>
          <dt>Accessibility considerations</dt>
          <dd>{a.accessibility}</dd>
        </dl>
        {catalogue.implementations.some((p) =>
          p.assessmentIds.includes(a.id),
        ) && (
          <>
            <p>Possible innovation frameworks</p>
            <ul>
              {catalogue.implementations
                .filter((p) => p.assessmentIds.includes(a.id))
                .map((p) => (
                  <li key={p.id}>
                    <Link href={`/implementations/${p.slug}`}>{p.title} ↗</Link>
                  </li>
                ))}
            </ul>
          </>
        )}
      </details>
      <div className="card-bottom">
        <span>
          <i className="evidence-dot" /> {evidenceAvailability(a)}
        </span>
        {onCompare ? (
          <button
            className="compare-add"
            onClick={onCompare}
            aria-pressed={selected}
            aria-label={`Compare ${a.name}`}
            disabled={compareFull && !selected}
            title={
              compareFull && !selected
                ? "Remove a selected approach to compare another"
                : undefined
            }
          >
            {selected ? <Check size={14} /> : <Plus size={14} />} Compare
          </button>
        ) : (
          <Link href={`/explore/${a.slug}`} aria-label={`Explore ${a.name}`}>
            <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </article>
  );
}
export function PaperCard({ paper: p }: { paper: ResearchPaper }) {
  const connections = catalogue.implementations.flatMap((i) =>
    i.researchConnections.filter((c) => c.link.paperId === p.id),
  );
  const roles = [
    ...new Set(
      connections.map((c) =>
        c.link.directEvidence
          ? "Direct research link"
          : c.relation === "theoretically-informed-by"
            ? "Theoretical interpretation"
            : "Contextual reading",
      ),
    ),
  ];
  return (
    <Link href={`/research/${p.slug}`} className="paper-card">
      <div className="paper-meta">
        <span>{p.type}</span>
        <span>
          {p.year} <ArrowUpRight size={16} />
        </span>
      </div>
      <h3>{p.title}</h3>
      <p>{p.digest.overview}</p>
      <div className="paper-authors">{p.authors}</div>
      <p className="paper-citation">
        {p.venue} · {p.year}
        {p.doi ? ` · DOI ${p.doi}` : ""}
      </p>
      <div className="tag-list paper-review-labels">
        <span className="tag">
          {p.verificationScope === "metadata-only"
            ? "Metadata checked; appraisal pending"
            : `${p.verificationScope.replaceAll("-", " ")} checked`}
        </span>
        <span className="tag">Editorial: {p.editorialReview.status}</span>
        {roles.map((r) => (
          <span key={r} className="tag">
            {r}
          </span>
        ))}
      </div>
      <div className="paper-bottom">
        <BookOpen size={15} />
        <span>
          {p.verification === "Source verified"
            ? "Source summary · limitations included"
            : "Publication details · full paper review pending"}
        </span>
        <ArrowRight size={16} />
      </div>
    </Link>
  );
}
export function ModeLabel({ mode }: { mode: string }) {
  return (
    <span className="inline-icon">
      <Users size={15} />
      {mode}
    </span>
  );
}
