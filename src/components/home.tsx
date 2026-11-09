import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Layers,
  Network,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";
import { catalogue } from "@/content/catalogue";
import { AssessmentCard } from "./cards";
import { Button } from "./ui/button";
import { ExploreCTA } from "./shell";
import {
  featuredAssessmentIds,
  requireAssessment,
} from "@/lib/catalogue-selectors";
export function Home() {
  const twins = catalogue.implementations.find(
    (p) => p.id === "assessment-twins-ml",
  )!;
  const source = catalogue.papers.find((p) => p.id === "assessment-twins")!;
  return (
    <div className="motion-surface academic-home">
      <section className="academic-hero section-wrap">
        <div className="hero-intro">
          <span className="eyebrow">
            Research to practice · Higher education
          </span>
          <h1>Rethinking Assessment in the Age of AI</h1>
          <p>
            Explore research-informed assessment ideas, understand the evidence
            behind them, and discover practical ways to adapt assessments across
            technical disciplines.
          </p>
          <div className="hero-buttons">
            <Button asChild>
              <Link href="/implementations">
                Explore New Ideas <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/evidence-map">
                View Research Map <Network size={18} />
              </Link>
            </Button>
          </div>
          <p className="hero-assurance">
            <CheckCircle2 size={17} /> Grounded in sources. Open to your
            professional judgement.
          </p>
        </div>
        <aside className="hero-feature">
          <div className="feature-topline">
            <span className="eyebrow">Featured idea</span>
            <span className="tag">Proposed framework</span>
          </div>
          <span className="feature-symbol">
            <Layers size={32} />
          </span>
          <h2>Assessment Twins</h2>
          <p>
            Combining AI-supported work with independent competency evidence.
          </p>
          <div className="twin-components">
            <div>
              <span>01</span>
              <strong>Work with tools</strong>
              <p>Develop, test and document a solution.</p>
            </div>
            <div>
              <span>02</span>
              <strong>Explain independently</strong>
              <p>Show judgement in a related diagnostic task.</p>
            </div>
          </div>
          <Link className="text-link" href={`/implementations/${twins.slug}`}>
            Explore Assessment Twins <ArrowUpRight size={18} />
          </Link>
          <p className="content-note">
            Complementary evidence, with research and feasibility limits made
            clear.
          </p>
        </aside>
      </section>
      <div className="home-facts section-wrap">
        <div>
          <strong>{catalogue.assessments.length}</strong>
          <span>existing assessment approaches</span>
        </div>
        <div>
          <strong>{catalogue.implementations.length}</strong>
          <span>adaptable innovation frameworks</span>
        </div>
        <div>
          <strong>{catalogue.papers.length}</strong>
          <span>research records with review status</span>
        </div>
        <Link href="/about">
          An independent research prototype <ArrowUpRight size={16} />
        </Link>
      </div>
      <section className="section-wrap home-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Choose your starting point</span>
            <h2>Explore, understand, adapt.</h2>
          </div>
          <p>
            Build on what already works in your teaching.
            <br />
            Use the evidence and your context to decide what comes next.
          </p>
        </div>
        <div className="entry-grid">
          {[
            {
              href: "/explore",
              title: "Existing Assessment Approaches",
              text: "Explore the programme inventory, strengths, competency evidence and practical considerations.",
              Icon: BookOpen,
            },
            {
              href: "/implementations",
              title: "New Ideas & Innovations",
              text: "Eight proposed frameworks connect familiar approaches with different ways to gather evidence.",
              Icon: Layers,
            },
            {
              href: "/evidence-map",
              title: "Research to Practice Connections",
              text: "Follow explicit links from publications and interpretations to designs and student evidence.",
              Icon: Network,
            },
            {
              href: "/implementations#pathways",
              title: "Adaptable Implementation Pathways",
              text: "See worked examples across technical disciplines, then edit the planning assumptions.",
              Icon: SlidersHorizontal,
            },
          ].map(({ href, title, text, Icon }) => (
            <Link className="entry-card" key={href} href={href}>
              <Icon size={25} />
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="text-link">
                Start exploring <ArrowRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-map-band">
        <div className="section-wrap home-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Make the connection</span>
              <h2>See how an idea reaches the classroom.</h2>
            </div>
            <Link
              className="text-link"
              href="/evidence-map?focus=implementation-pathway:assessment-twins-ml"
            >
              Explore the research map <ArrowRight size={18} />
            </Link>
          </div>
          <ol className="home-pathway">
            {[
              {
                label: "Research",
                title: "Assessment Twins protocol",
                href: `/research/${source.slug}`,
                note: "Conceptual source",
              },
              {
                label: "Interpretation",
                title: "Complementary evidence",
                href: "/evidence-map?focus=implementation-pathway:assessment-twins-ml",
                note: "Proposed design rationale",
              },
              {
                label: "Innovation",
                title: "Assessment Twins",
                href: `/implementations/${twins.slug}`,
                note: "Adaptable framework",
              },
              {
                label: "Implementation",
                title: "Model + diagnostic task",
                href: `/implementations/${twins.slug}#worked-example`,
                note: "Illustrative worked example",
              },
              {
                label: "Evidence",
                title: "Independent reasoning",
                href: `/implementations/${twins.slug}#practice-4`,
                note: "Observable student work",
              },
              {
                label: "Adaptation",
                title: "Plan for your cohort",
                href: "/workload?implementation=assessment-twins-ml",
                note: "Editable assumptions",
              },
            ].map((s, i) => (
              <li key={s.label}>
                <span className="eyebrow">
                  {String(i + 1).padStart(2, "0")} / {s.label}
                </span>
                <Link href={s.href}>
                  {s.title}
                  <ArrowUpRight size={16} />
                </Link>
                <p>{s.note}</p>
              </li>
            ))}
          </ol>
          <p className="content-note">
            Connections show how a proposed design is informed. They do not
            establish effectiveness or institutional approval.
          </p>
        </div>
      </section>
      <section className="section-wrap home-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Build on established practice</span>
            <h2>Start with an approach you know.</h2>
          </div>
          <Link className="text-link" href="/explore">
            Explore assessment approaches <ArrowRight size={18} />
          </Link>
        </div>
        <div className="assessment-grid">
          {featuredAssessmentIds.slice(0, 3).map((id) => (
            <AssessmentCard
              key={id}
              assessment={requireAssessment(catalogue.assessments, id)}
            />
          ))}
        </div>
        <p className="content-note">
          Inventory membership describes the supplied collection. It does not
          verify current practice in a particular UTN course.
        </p>
      </section>
      <div className="section-wrap">
        <ExploreCTA />
      </div>
    </div>
  );
}
