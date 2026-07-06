import type { Metadata } from "next";
import type { CSSProperties } from "react";
import BgSketch from "@/components/BgSketch";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { experience, experienceIntro, educationTimeline } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience · Veronica Agudelo",
  description: "Where Veronica Agudelo has spent her time.",
};

const sectionLabel: CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--sepia)",
  marginBottom: 8,
};

export default function ExperiencePage() {
  return (
    <main
      className="wrap page-serif"
      style={{ paddingTop: 70, paddingBottom: 90, position: "relative" }}
    >
      <BgSketch name="trajectory" style={{ top: "14%", right: "-4%", width: 320 }} />
      <BgSketch name="hero" style={{ bottom: "6%", left: "-6%", width: 380 }} />
      <header className="col tcenter" style={{ margin: "0 auto 40px" }}>
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
          Experience
        </div>
        <h1
          style={{
            fontWeight: 400,
            fontSize: "clamp(32px,4.5vw,52px)",
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          Where I&apos;ve spent my time
        </h1>
      </header>

      <div className="col">
        <div style={{ maxWidth: 720, margin: "0 auto 56px" }}>
          {experienceIntro.split("\n\n").map((para, i) => (
            <p
              key={i}
              style={{
                fontWeight: 400,
                fontSize: 17,
                lineHeight: 1.62,
                color: "var(--ink-2)",
                margin: i === 0 ? "0 0 18px" : 0,
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Education (static) */}
        <div className="mono tcenter" style={sectionLabel}>
          Education
        </div>
        <p className="xp-hint">Hover or tap to read more</p>
        <ExperienceTimeline items={educationTimeline} animate={false} />

        {/* Professional experience (rotating) */}
        <div
          style={{
            borderTop: "1px solid var(--line-soft)",
            marginTop: 56,
            paddingTop: 56,
          }}
        >
          <div className="mono tcenter" style={sectionLabel}>
            Professional Experience
          </div>
          <p className="xp-hint">Hover or tap to read more</p>
          <ExperienceTimeline items={[...experience].reverse()} />
        </div>
      </div>
    </main>
  );
}
