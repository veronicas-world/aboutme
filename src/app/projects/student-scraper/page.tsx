import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import Article from "@/components/Article";
import BgSketch from "@/components/BgSketch";

export const metadata: Metadata = {
  title: "Veronica's Student Scraper — Projects · Veronica Agudelo",
  description:
    "Veronica's Student Scraper — a talent-intelligence system for finding undergraduate and graduate builders.",
};

export default function StudentScraperPage() {
  const md = fs.readFileSync(
    path.join(process.cwd(), "content", "student-scraper.md"),
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
            fontSize: "clamp(30px,4.4vw,50px)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
          }}
        >
          Veronica&apos;s Student Scraper
        </h1>
        <p
          className="mono"
          style={{
            fontSize: 11.5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--sepia)",
            margin: 0,
          }}
        >
          Private project
        </p>
      </header>

      <div className="col">
        <Article content={md} />
      </div>
    </main>
  );
}
