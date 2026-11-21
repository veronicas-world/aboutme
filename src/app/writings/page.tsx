import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import LocalMaximaSketch from "@/components/LocalMaximaSketch";
import WritingsList from "@/components/WritingsList";
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
      <Link href="/readings" style={{ borderBottom: "1px solid rgba(var(--ink-rgb), .4)" }}>
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

export default function WritingsPage() {
  const posts = getAllPostMeta();

  return (
    <main className="wrap" style={{ paddingTop: 70, paddingBottom: 30, position: "relative" }}>
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
        {localMaxima.intro.map((p, i) => (
          <Fragment key={i}>
            <p className="body-l indent-p" style={{ fontSize: 17, textAlign: "left" }}>
              {renderIntroParagraph(p)}
            </p>
            {i === 0 && <LocalMaximaSketch />}
          </Fragment>
        ))}
      </header>

      <div className="col">
        <WritingsList posts={posts} />
      </div>
    </main>
  );
}
