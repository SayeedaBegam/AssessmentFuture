import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeading } from "@/components/shell";
export const metadata = { title: "Project background & methodology" };
export default function Page() {
  return (
    <div className="section-wrap page-body about-page">
      <PageHeading
        eyebrow="PURPOSE & METHODOLOGY"
        title="An invitation to explore, reflect, and adapt."
        description="Assessment Futures brings research, responsible AI questions, and practical design exploration into one shared space. Lecturer expertise and academic autonomy are at the center."
      />
      <div className="about-intro">
        <span className="eyebrow">ASSESSMENT FUTURES</span>
        <h2>
          Research informed assessment possibilities for higher education.
        </h2>
        <p>
          This independent application prototype was created for the KI-Tutorien
          Bayern project context at the University of Technology Nuremberg
          (UTN). It explores competency oriented, AI sensitive assessment in
          Artificial Intelligence and Robotics and Human and AI, with possible
          transfer to other disciplines.
        </p>
        <p>
          Neutral project branding is used. No institutional endorsement or logo
          permission is claimed.
        </p>
      </div>
      <div className="two-columns">
        <section className="soft-card">
          <span className="eyebrow">OUR STARTING POINT</span>
          <h3>Respect the expertise already in the room.</h3>
          <p>
            Lecturers bring disciplinary knowledge and professional judgment.
            This resource offers optional possibilities and transparent trade
            offs. It does not evaluate individual lecturers or prescribe course
            redesigns.
          </p>
        </section>
        <section className="soft-card">
          <span className="eyebrow">OUR CONTENT BOUNDARY</span>
          <h3>Programme level exploration.</h3>
          <p>
            All assessment examples are illustrative. There are no private
            assignments, identifiable teaching materials, real student
            submissions, grades, or lecturer profiles in this collection.
          </p>
        </section>
      </div>
      <section className="detail-section">
        <span className="eyebrow">HOW WE HANDLE EVIDENCE</span>
        <h2>Be clear about the source and its limits.</h2>
        <ol className="methodology-list">
          <li>
            <strong>Record the original source.</strong>
            <p>
              Every research record includes authors, date, venue, source URL,
              publication type, and verification scope.
            </p>
          </li>
          <li>
            <strong>Describe what was actually reviewed.</strong>
            <p>
              “Source verified” means the original publication page or abstract
              was checked. It does not mean the full text was appraised. Records
              marked metadata only remain pending full paper review; their
              findings must not be presented as verified.
            </p>
          </li>
          <li>
            <strong>Keep evidence types distinct.</strong>
            <p>
              A policy document, conceptual argument, and empirical document
              analysis answer different questions. The study design determines
              what can reasonably be concluded. Practical proposals must remain
              distinct from findings supported by the source.
            </p>
          </li>
          <li>
            <strong>Label our contribution.</strong>
            <p>
              Adaptations, competency relationships, and pathways are editorial
              proposals. Contextual research links do not establish direct
              validation. The library is a curated starting collection, not a
              systematic review.
            </p>
          </li>
          <li>
            <strong>Review before applying.</strong>
            <p>
              Each source record includes its verification date and scope.
              Verify original materials, local conditions, and current
              institutional guidance before implementation.
            </p>
          </li>
        </ol>
        <Link className="text-link" href="/research">
          Inspect the research collection <ArrowRight size={16} />
        </Link>
      </section>
      <section className="detail-section">
        <span className="eyebrow">TRANSPARENT TOOLS</span>
        <h2>Useful prompts. Visible assumptions.</h2>
        <p>
          The Interactive Design Playground uses deterministic rules; it is not
          an AI model. The workload simulator calculates from user entered
          assumptions and excludes administrative overhead, moderation, and
          resits. Neither tool produces validated pedagogical recommendations or
          measured UTN workload.
        </p>
        <p>
          The knowledge map displays labeled relationships stored in structured
          content. Proposed connections and pending evidence links are
          identified as such. Semester weights are illustrative and receive no
          institutional compliance determination.
        </p>
      </section>
      <section className="detail-section">
        <span className="eyebrow">RESPONSIBLE DEVELOPMENT</span>
        <h2>A considered foundation.</h2>
        <div className="three-columns">
          <div>
            <h3>Privacy</h3>
            <p>
              No accounts, student data collection, analytics, or external AI
              calls. Interactive designs stay in the browser session; only the
              theme preference is stored locally. Downloaded outlines are
              controlled by you.
            </p>
          </div>
          <div>
            <h3>Institutional review</h3>
            <p>
              ASPO compatibility, examination regulations, official branding,
              approved AI tools, data processing, and hosting require
              verification by the relevant institutional owners.
            </p>
          </div>
          <div>
            <h3>Accessibility & language</h3>
            <p>
              WCAG 2.2 AA is the target, with semantic structure, keyboard
              controls, reduced motion support, chart tables, and a map list
              view. Formal accessibility auditing remains necessary. English is
              initial; German content can be added through the typed content
              layer.
            </p>
          </div>
        </div>
      </section>
      <section className="detail-section">
        <h2>Built to grow thoughtfully.</h2>
        <p>
          A future version can connect an approved research database or CMS
          through the typed content interfaces, add authentication for editorial
          access, and introduce an approved retrieval based assistant with
          source attribution. German localization, access controls, retention
          policies, and institution approved hosting should be implemented and
          reviewed before those integrations launch.
        </p>
        <Link className="button button-primary" href="/explore">
          Explore the possibilities <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}
