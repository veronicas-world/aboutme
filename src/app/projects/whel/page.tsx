import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import Article from "@/components/Article";
import BgSketch from "@/components/BgSketch";

export const metadata: Metadata = {
  title: "Whel — Projects · Veronica Agudelo",
  description:
    "Whel (Women's Health Evidence Lab) — a drug-repurposing platform for female biology.",
};

const links = [
  { label: "Visit whel.bio", href: "https://whel.bio/" },
  { label: "GitHub", href: "https://github.com/veronicas-world/WHEL" },
];

export default function WhelPage() {
  const md = fs.readFileSync(
    path.join(process.cwd(), "content", "whel.md"),
    "utf8"
  );

  return (
    <main className="wrap" style={{ paddingTop: 70, paddingBottom: 30, position: "relative" }}>
      <BgSketch name="hero" style={{ top: "10%", right: "-7%", width: 480 }} />
      <header className="col tcenter" style={{ margin: "0 auto 40px" }}>
        <Link
          href="/projects"
          className="mono"
          style={{
            display: "inline-block",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--sepia)",
            marginBottom: 22,
          }}
        >
          ← Projects
        </Link>
        <h1
          style={{
            fontWeight: 300,
            fontSize: "clamp(32px,4.5vw,52px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
          }}
        >
          Whel
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 24,
            marginTop: 26,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono"
              style={{
                fontSize: 11.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-2)",
                borderBottom: "1px solid rgba(21,17,13,.35)",
                paddingBottom: 3,
              }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </header>

      <div className="col">
        <Article content={md} />
      </div>
    </main>
  );
}
