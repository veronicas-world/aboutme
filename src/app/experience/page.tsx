import type { Metadata } from "next";
import BgSketch from "@/components/BgSketch";
import { experience, experienceIntro } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience · Veronica Agudelo",
  description: "Where Veronica Agudelo has spent her time.",
};

export default function ExperiencePage() {
  return (
    <main className="wrap" style={{ paddingTop: 70, paddingBottom: 30, position: "relative" }}>
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
            fontWeight: 300,
            fontSize: "clamp(32px,4.5vw,52px)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Where I&apos;ve spent my time
        </h1>
      </header>

      <div className="col">
        <p
          style={{
            fontWeight: 300,
            fontSize: 17,
            lineHeight: 1.62,
            color: "var(--ink-2)",
            maxWidth: 720,
            margin: "0 auto 56px",
          }}
        >
          {experienceIntro}
        </p>

        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ borderLeft: "1px solid rgba(21,17,13,.2)", paddingLeft: 34 }}>
            {experience.map((e, i) => (
              <div key={i} style={{ position: "relative", padding: "0 0 38px" }}>
                <span
                  style={{
                    position: "absolute",
                    left: -40,
                    top: 9,
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--ink)",
                  }}
                />
                <div
                  className="mono"
                  style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--sepia-2)" }}
                >
                  {e.year}
                </div>
                <div style={{ fontSize: 22, lineHeight: 1.3, marginTop: 4 }}>{e.role}</div>
                <div
                  className="mono"
                  style={{
                    fontSize: 11.5,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--sepia)",
                    marginTop: 4,
                  }}
                >
                  {e.org}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
