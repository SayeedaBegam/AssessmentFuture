"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Moon,
  Sun,
  X,
  ArrowRight,
  SlidersHorizontal,
  BookOpen,
} from "lucide-react";
import { Button } from "./ui/button";

const primary = [
  ["/", "Home"],
  ["/explore", "Existing Assessments"],
  ["/implementations", "New Ideas & Innovations"],
  ["/evidence-map", "Research to Implementation Map"],
  ["/research", "Research & Resources"],
];
const tools = [
  ["/compare", "Comparison Studio", "Compare approaches and their trade offs"],
  [
    "/playground",
    "Assessment Playground",
    "Build and download a design outline",
  ],
  ["/workload", "Workload Calculator", "Explore editable time assumptions"],
  [
    "/continuous-assessment",
    "Semester Timeline",
    "Plan checkpoints, feedback and revision",
  ],
  [
    "/ai-integration",
    "AI Use Spectrum",
    "Choose conditions that fit your outcomes",
  ],
  [
    "/knowledge-map",
    "Curated Knowledge Map",
    "Explore the original research connections",
  ],
];
const subscribe = (callback: () => void) => {
  window.addEventListener("themechange", callback);
  return () => window.removeEventListener("themechange", callback);
};
export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );
  const toggle = () => {
    const theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("af-theme", theme);
    } catch {}
    window.dispatchEvent(new Event("themechange"));
  };
  const current = (href: string) =>
    href === "/"
      ? pathname === "/"
      : href === "/research"
        ? pathname.startsWith("/research") || pathname.startsWith("/resources")
        : pathname.startsWith(href);
  const closeMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.closest("details")?.removeAttribute("open");
    setMenu(false);
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          const disclosure =
            event.currentTarget.querySelector<HTMLDetailsElement>(
              "details[open]",
            );
          if (disclosure) {
            disclosure.open = false;
            disclosure.querySelector("summary")?.focus();
          } else if (menu) {
            setMenu(false);
            event.currentTarget
              .querySelector<HTMLButtonElement>(".mobile-menu")
              ?.focus();
          }
        }}
      >
        <div className="header-inner">
          <Link
            href="/"
            className="brand"
            aria-label="Assessment Futures home"
            onClick={() => setMenu(false)}
          >
            <span className="brand-mark" aria-hidden="true">
              <BookOpen size={25} />
            </span>
            <span>
              Assessment
              <span className="brand-second">
                Futures<span className="brand-dot">.</span>
              </span>
            </span>
          </Link>
          <nav
            id="main-navigation"
            className={menu ? "main-nav open" : "main-nav"}
            aria-label="Main navigation"
          >
            {primary.map(([href, name]) => (
              <Link
                key={href}
                href={href}
                className={current(href) ? "active" : ""}
                aria-current={current(href) ? "page" : undefined}
                onClick={() => setMenu(false)}
              >
                {name}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button theme-button"
              onClick={toggle}
              aria-label={
                dark ? "Switch to light theme" : "Switch to dark theme"
              }
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="icon-button mobile-menu"
              onClick={() => setMenu(!menu)}
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              aria-controls="main-navigation"
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div className="planning-bar">
          <div className="section-wrap planning-bar-inner">
            <details className="tools-menu">
              <summary>
                <SlidersHorizontal size={16} /> Adapt &amp; Plan{" "}
                <ChevronDown size={16} />
              </summary>
              <nav className="tools-dropdown" aria-label="Adapt and plan tools">
                {tools.map(([href, name, desc]) => (
                  <Link key={href} href={href} onClick={closeMenu}>
                    <strong>{name}</strong>
                    <small>{desc}</small>
                  </Link>
                ))}
              </nav>
            </details>
            <Link href="/about" onClick={() => setMenu(false)}>
              About the project <ArrowUpRight size={14} />
            </Link>
            <span className="prototype-label">
              Independent academic prototype <span aria-hidden="true">·</span>{" "}
              KI-Tutorien Bayern
            </span>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="footer-top section-wrap">
          <div>
            <Link className="footer-brand" href="/">
              Assessment Futures<span>.</span>
            </Link>
            <p>
              Evidence to explore.
              <br />
              Ideas to adapt to your teaching.
            </p>
          </div>
          <div>
            <span className="eyebrow">Explore</span>
            <Link href="/explore">Existing Assessments</Link>
            <Link href="/implementations">New Ideas &amp; Innovations</Link>
            <Link href="/evidence-map">Research to Implementation Map</Link>
          </div>
          <div>
            <span className="eyebrow">Read and plan</span>
            <Link href="/research">Research Library</Link>
            <Link href="/resources">Resources Library</Link>
            <Link href="/playground">Assessment Playground</Link>
            <Link href="/programmes">Programme contexts</Link>
            <Link href="/about">Methodology &amp; safeguards</Link>
          </div>
          <div className="footer-note">
            <strong>Your teaching context comes first.</strong>
            <p>
              A local research prototype. Proposed designs need disciplinary and
              institutional review. No official UTN endorsement is claimed.
            </p>
          </div>
        </div>
        <div className="footer-bottom section-wrap">
          <span>Assessment Futures · 2026</span>
          <span>No student data collected. No external AI services.</span>
          <Link href="/about">
            Evidence, with context <ArrowUpRight size={15} />
          </Link>
        </div>
      </footer>
    </>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div className="eyebrow">
        <span className="tiny-square" />
        {eyebrow}
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  );
}
export function ExploreCTA() {
  return (
    <section className="invitation">
      <div>
        <span className="eyebrow">Adapt &amp; Plan</span>
        <h2>Make an idea work for your class.</h2>
        <p>
          Start with your learning outcomes, then work through evidence,
          feedback and feasibility.
        </p>
      </div>
      <Button asChild>
        <Link href="/playground">
          Open the design playground <ArrowRight size={18} />
        </Link>
      </Button>
    </section>
  );
}
