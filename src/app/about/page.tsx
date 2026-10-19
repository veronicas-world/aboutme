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
        <figure style={{ maxWidth: 760, margin: "0 auto 48px" }}>
          <a
            href="https://en.wikipedia.org/wiki/The_City_Rises"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read about The City Rises on Wikipedia (opens in a new tab)"
            style={{ display: "block" }}
          >
            <img
              src="/the-city-rises.jpg"
              alt="Workers and horses amid a city under construction in Umberto Boccioni's The City Rises."
              width={1024}
              height={680}
              loading="eager"
              style={{ display: "block", width: "100%", height: "auto", borderRadius: 3 }}
            />
          </a>
          <figcaption
            style={{
              marginTop: 12,
              fontSize: 13,
              lineHeight: 1.5,
              color: "var(--sepia)",
              textAlign: "center",
            }}
          >
            The City Rises, 1910 · Umberto Boccioni
          </figcaption>
        </figure>
        <Article content={md} />
        <MountainGallery />

        <section
          id="contact"
          style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--line)" }}
        >
          <div
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--sepia-3)",
              marginBottom: 18,
            }}
          >
            Contact
          </div>
          <p className="article" style={{ fontSize: 17, margin: 0 }}>
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
        </section>
      </div>
    </main>
  );
}
