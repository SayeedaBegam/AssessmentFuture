import Link from "next/link";
export default function NotFound() {
  return (
    <div className="section-wrap empty-state">
      <span className="eyebrow">A DIFFERENT PATH</span>
      <h1>This page isn’t in the collection.</h1>
      <p>Continue exploring the assessment approaches or research library.</p>
      <Link className="button button-primary" href="/explore">
        Open assessment explorer
      </Link>
    </div>
  );
}
