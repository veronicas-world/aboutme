"use client";

import { useState, type ReactNode } from "react";

export type XP = {
  year: string;
  role: string;
  org?: string;
  location?: string;
  note?: string;
  bullets?: string[];
};

// Render inline markdown links [text](url) inside an otherwise plain string.
function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a
        key={key++}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="xp-link"
      >
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function ExperienceTimeline({
  items,
  animate = true,
}: {
  items: XP[];
  animate?: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const current = active !== null ? items[active] : null;
  const hasContent = !!(
    current && ((current.bullets && current.bullets.length) || current.note)
  );

  // Duplicate the list only when animating, so the marquee can loop seamlessly.
  const loop = animate ? [...items, ...items] : items;

  // The animated (professional experience) timeline reveals its card ABOVE the
  // row; the static (education) timeline reveals its card BELOW.
  const detail = (
    <div
      className={`xp-detail${animate ? " xp-detail-above" : ""}`}
      aria-live="polite"
    >
      {hasContent && current && (
        <div key={active} className="xp-card">
          <div className="xp-card-head mono">
            {current.role}
            {current.org ? ` · ${current.org}` : ""}
            {current.location ? (
              <span className="xp-card-loc"> · {current.location}</span>
            ) : null}
          </div>
          {current.bullets && current.bullets.length > 0 ? (
            <ul className="xp-bullets">
              {current.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          ) : (
            current.note
              ?.split("\n\n")
              .map((p, k) => (
                <p key={k} className="xp-note">
                  {renderInline(p)}
                </p>
              ))
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="xp" onMouseLeave={() => setActive(null)}>
      {animate && detail}
      <div className={`xp-marquee${animate ? "" : " xp-static"}`}>
        <div className={`xp-track${animate ? "" : " xp-static"}`}>
          {loop.map((e, i) => {
            const idx = i % items.length;
            return (
              <button
                key={i}
                className={`xp-chip${active === idx ? " active" : ""}`}
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                aria-label={`${e.role}, ${e.org ?? ""}`}
              >
                <span className="xp-dot" />
                <span className="xp-year mono">{e.year}</span>
                <span className="xp-role">{e.role}</span>
                {e.org && <span className="xp-org mono">{e.org}</span>}
              </button>
            );
          })}
        </div>
      </div>
      {!animate && detail}
    </div>
  );
}
