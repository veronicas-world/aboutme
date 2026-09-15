import type { Metadata } from "next";
import BgSketch from "@/components/BgSketch";

export const metadata: Metadata = {
  title: "Contact · Veronica Agudelo",
  description: "Get in touch with Veronica Agudelo.",
};

export default function ContactPage() {
  return (
    <main
      className="wrap"
      style={{ paddingTop: 70, paddingBottom: 90, position: "relative" }}
    >
      <BgSketch name="hero" style={{ top: "12%", right: "-6%", width: 360 }} />
      <header className="col tcenter" style={{ margin: "0 auto 44px" }}>
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
          Contact
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
          Get in touch
        </h1>
      </header>

      <div className="col">
        <p className="article" style={{ fontSize: 19, lineHeight: 1.6, margin: 0 }}>
          I can be reached through my email,{" "}
          <a href="mailto:vla2117@columbia.edu">vla2117@columbia.edu</a>, or on{" "}
          <a
            href="https://www.linkedin.com/in/vlagudelo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
          messages. You can also find me on{" "}
          <a
            href="https://github.com/veronicas-world"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://x.com/deleuzetional"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
          .
        </p>
      </div>
    </main>
  );
}
