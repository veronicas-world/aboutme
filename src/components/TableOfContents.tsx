"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/posts";

// A slim, fixed table of contents shown in the left margin on wide screens
// only (see .post-toc in globals.css — it is display:none below 1240px, so it
// never crowds the article on laptops, tablets, or phones). Clicking a section
// smooth-scrolls to it; the section you are reading is highlighted.
export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const onscreen = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (onscreen[0]) setActive(onscreen[0].target.id);
      },
      // Trigger when a heading passes into the top third of the viewport.
      { rootMargin: "-90px 0px -66% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="post-toc" aria-label="Table of contents">
      <div className="post-toc-title">Contents</div>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={active === it.id ? "active" : ""}
              onClick={(e) => go(e, it.id)}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
