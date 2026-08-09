"use client";

import { useState, type ReactNode } from "react";

export type XP = {
  year: string;
  role: string;
  org?: string;
  location?: string;
  logo?: string;
  logoTile?: boolean;
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

// Vertical, LinkedIn-style timeline. Each role sits on a continuous rail;
// hovering (or tapping) a role expands its detail card inline beneath it.
export default function ExperienceTimeline({ items }: { items: XP[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="xpv" onMouseLeave={() => setActive(null)}>
      {items.map((e, idx) => {
        const isActive = active === idx;
        const hasContent = !!(
          (e.bullets && e.bullets.length) || e.note
        );
        return (
          <div className={`xpv-item${isActive ? " active" : ""}`} key={idx}>
            <span className="xpv-dot" />
            <div className="xpv-body">
              <button
                type="button"
                className="xpv-head"
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                onClick={() => setActive((a) => (a === idx ? null : idx))}
                aria-expanded={isActive}
                aria-label={`${e.role}${e.org ? `, ${e.org}` : ""}`}
              >
                <span className="xp-year mono">{e.year}</span>
                <span className="xp-role">{e.role}</span>
                {e.org && <span className="xp-org mono">{e.org}</span>}
                {e.location && <span className="xp-loc mono">{e.location}</span>}
              </button>

              {isActive && hasContent && (
                <div className="xp-card xpv-card">
                  {e.logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className={`xp-card-logo${e.logoTile ? " xp-card-logo-tile" : ""}`}
                      src={e.logo}
                      alt={e.org ?? e.role}
                    />
                  )}
                  <div className="xp-card-head mono">
                    {e.role}
                    {e.org ? ` · ${e.org}` : ""}
                  </div>
                  {e.bullets && e.bullets.length > 0 ? (
                    <ul className="xp-bullets">
                      {e.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    e.note
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
          </div>
        );
      })}
    </div>
  );
}
