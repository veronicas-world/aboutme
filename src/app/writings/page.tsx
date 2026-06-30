import type { Metadata } from "next";
import Link from "next/link";
import WritingsList from "@/components/WritingsList";
import LocalMaximaSketch from "@/components/LocalMaximaSketch";
import BgSketch from "@/components/BgSketch";
import { getAllPostMeta } from "@/lib/posts";
import { localMaxima } from "@/content/site";

// Renders an intro paragraph, turning a literal "{{readings}}" token into a
// link to the Readings page (the link text itself reads "here").
function renderIntroParagraph(text: string) {
  const token = "{{readings}}";
  const idx = text.indexOf(token);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <Link href="/readings" style={{ borderBottom: "1px solid rgba(21,17,13,.4)" }}>
        here
      </Link>
      {text.slice(idx + token.length)}
    </>
  );
}

export const metadata: Metadata = {
  title: "Local Maxima — Writings · Veronica Agudelo",
  description: localMaxima.tagline,
};

export default function WritingsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const posts = getAllPostMeta();
  const initialCategory = searchParams?.category ?? "all";

  return (
    <main className="wrap" style={{ paddingTop: 70, paddingBottom: 30, position: "relative" }}>
      <BgSketch name="interests" style={{ top: "12%", left: "-6%", width: 340 }} />
      <BgSketch name="contact" style={{ bottom: "5%", right: "-6%", width: 360 }} />
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
          Writings / Blog
        </div>
        <h1
          style={{
            fontWeight: 300,
            fontSize: "clamp(32px,4.5vw,52px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            margin: "0 0 26px",
          }}
        >
          <span className="italic">{localMaxima.title}</span>
        </h1>
        <p className="body-l" style={{ fontSize: 17, textAlign: "left" }}>
          {localMaxima.intro[0]}
        </p>
        <LocalMaximaSketch />
        {localMaxima.intro.slice(1).map((p, i) => (
          <p key={i} className="body-l" style={{ fontSize: 17, textAlign: "left" }}>
            {renderIntroParagraph(p)}
          </p>
        ))}
        <a
          href={localMaxima.substackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mono"
          style={{
            display: "inline-block",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--sepia-3)",
            borderBottom: "1px solid rgba(21,17,13,.25)",
            paddingBottom: 2,
          }}
        >
          Subscribe on Substack →
        </a>
      </header>

      <div className="col">
        <WritingsList posts={posts} initialCategory={initialCategory} />
      </div>
    </main>
  );
}
