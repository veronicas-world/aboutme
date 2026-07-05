import type { Metadata } from "next";
import Link from "next/link";
import BgSketch from "@/components/BgSketch";

export const metadata: Metadata = {
  title: "Projects · Veronica Agudelo",
  description:
    "Projects — including Whel (Women's Health Evidence Lab), a drug-repurposing platform for female biology.",
};

const projects = [
  {
    slug: "whel",
    title: "Whel",
    meta: "Women's Health Evidence Lab",
    excerpt:
      "A drug-repurposing knowledge graph for female biology that surfaces approved drugs for under-researched women's health conditions and scores the evidence behind each one.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="wrap" style={{ paddingTop: 70, paddingBottom: 30, position: "relative" }}>
      <BgSketch name="hero" style={{ top: "10%", right: "-7%", width: 480 }} />
      <header className="col tcenter" style={{ margin: "0 auto 56px" }}>
        <div
          className="mono"
          style={{
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--sepia)",
            marginBottom: 22,
          }}
        >
          Projects
        </div>
        <h1
          style={{
            fontWeight: 300,
            fontSize: "clamp(32px,4.5vw,52px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Projects
        </h1>
      </header>

      <div className="col">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="post-card">
              <div className="post-card-body">
                <div
                  className="mono"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--sepia-3)",
                    marginBottom: 9,
                  }}
                >
                  {p.meta}
                </div>
                <div style={{ fontSize: 22, lineHeight: 1.25, marginBottom: 8 }}>
                  {p.title}
                </div>
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.5,
                    color: "var(--ink-3)",
                    margin: "0 0 12px",
                  }}
                >
                  {p.excerpt}
                </p>
                <span
                  className="mono post-card-cta"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--sepia)",
                  }}
                >
                  View project →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
