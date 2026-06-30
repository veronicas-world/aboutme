import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Article from "@/components/Article";
import BgSketch from "@/components/BgSketch";

export const metadata: Metadata = {
  title: "Readings · Veronica Agudelo",
  description:
    "The sources and media I keep returning to and continuously enjoy learning from.",
};

export default function ReadingsPage() {
  const md = fs.readFileSync(
    path.join(process.cwd(), "content", "readings.md"),
    "utf8"
  );

  return (
    <main className="wrap" style={{ paddingTop: 70, paddingBottom: 30, position: "relative" }}>
      <BgSketch name="contact" style={{ top: "10%", right: "-6%", width: 380 }} />
      <BgSketch name="trajectory" style={{ bottom: "6%", left: "-5%", width: 300 }} />
      <header className="col tcenter" style={{ margin: "0 auto 48px" }}>
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
          Readings
        </div>
        <h1
          style={{
            fontWeight: 300,
            fontSize: "clamp(23px,3vw,36px)",
            lineHeight: 1.18,
            letterSpacing: "-0.015em",
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          A running list of sources and media I have found useful, across essays,
          books, music, newsletters, and projects.
        </h1>
      </header>

      <div className="col readings">
        <Article content={md} />
      </div>
    </main>
  );
}
