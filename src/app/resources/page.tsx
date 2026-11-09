import { catalogue } from "@/content/catalogue";
import { PageHeading } from "@/components/shell";
import Link from "next/link";
export const metadata = { title: "Resources library" };
export default function Page() {
  return (
    <div className="section-wrap page-body">
      <PageHeading
        eyebrow="RESOURCES LIBRARY"
        title="Guidance for your teaching context."
        description="Institutional pointers, practitioner readings and service information. These sources have different purposes and are kept separate from research evidence."
      />
      <nav className="library-tabs" aria-label="Research and resources">
        <Link href="/research">Research Library</Link>
        <Link href="/resources" aria-current="page">
          Resources Library
        </Link>
      </nav>
      <p className="notice">
        Links do not establish institutional approval. Restricted contents are
        not copied here. The supplied ASPO link needs replacement before a
        regulatory review.
      </p>
      <div className="research-grid">
        {catalogue.institutionalResources.map((r) => (
          <article className="reading-panel" key={r.id} id={r.id}>
            <span className="eyebrow">{r.sourceType}</span>
            <h2>{r.title}</h2>
            <p>{r.description}</p>
            <p>
              <strong>{r.access}</strong>
            </p>
            <p>{r.verificationNote}</p>
            <p className="content-note">
              Checked {r.checkedOn}. Editorial review:{" "}
              {r.editorialReview.status}.
            </p>
            <a
              className="text-link"
              href={r.url}
              target="_blank"
              rel="noreferrer"
            >
              Open source ↗
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
