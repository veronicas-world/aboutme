"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/posts";
import { categories } from "@/content/site";

function fmt(iso: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

const labelFor = (id: string) =>
  categories.find((c) => c.id === id)?.label ?? id;

export default function WritingsList({
  posts,
  initialCategory = "all",
}: {
  posts: PostMeta[];
  initialCategory?: string;
}) {
  const valid = categories.some((c) => c.id === initialCategory)
    ? initialCategory
    : "all";
  const [active, setActive] = useState(valid);

  const present = new Set(posts.map((p) => p.category));
  const visibleCats = categories.filter((c) => c.id === "all" || present.has(c.id));

  const filtered =
    active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, margin: "0 0 44px" }}>
        {visibleCats.map((c) => (
          <button
            key={c.id}
            className={`chip${active === c.id ? " active" : ""}`}
            onClick={() => setActive(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {filtered.map((p) => (
          <a
            key={p.slug}
            href={p.substackUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="post-card"
          >
            {p.cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="post-card-thumb" src={p.cover} alt="" loading="lazy" />
            )}
            <div className="post-card-body">
              <div
                className="mono"
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--sepia-3)",
                  marginBottom: 9,
                }}
              >
                {labelFor(p.category)} · {fmt(p.date)}
              </div>
              <div style={{ fontSize: 22, lineHeight: 1.25, marginBottom: 8 }}>
                {p.title}
              </div>
              {p.excerpt && (
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.5,
                    color: "var(--ink-3)",
                    margin: "0 0 12px",
                  }}
                >
                  {p.excerpt}
                </p>
              )}
              <span
                className="mono post-card-cta"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--sepia)",
                }}
              >
                Read on Substack ↗
              </span>
            </div>
          </a>
        ))}
        {filtered.length === 0 && (
          <p style={{ color: "var(--sepia)", fontSize: 19 }}>
            Nothing here yet — more soon.
          </p>
        )}
      </div>
    </>
  );
}
