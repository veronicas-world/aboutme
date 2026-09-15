import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Article from "@/components/Article";
import MountainGallery from "@/components/MountainGallery";
import BgSketch from "@/components/BgSketch";

export const metadata: Metadata = {
  title: "About · Veronica Agudelo",
  description: "More about Veronica Agudelo.",
};

export default function AboutPage() {
  const md = fs.readFileSync(
    path.join(process.cwd(), "content", "about.md"),
    "utf8"
  );

  return (
    <main className="wrap" style={{ paddingTop: 70, paddingBottom: 30, position: "relative" }}>
      <BgSketch name="about" style={{ top: "8%", right: "-5%", width: 340 }} />
      <BgSketch name="trajectory" style={{ top: "52%", left: "-6%", width: 300 }} />
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
          About
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
          More about me
        </h1>
      </header>

      <div className="col about">
        <Article content={md} />
        <MountainGallery />
      </div>
    </main>
  );
}
