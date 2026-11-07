export type XP = {
  year: string;
  role: string;
  org?: string;
  details?: string[];
  location?: string;
  logo?: string;
  logoWide?: boolean;
};

// Plain résumé rows: dates on the left, role and organization in the middle,
// logo on the right. Logos are decorative since the name is already in text.
export default function ExperienceList({ items }: { items: XP[] }) {
  return (
    <div className="xp-list">
      {items.map((e, idx) => {
        const meta = [...(e.details ?? []), e.location].filter(Boolean);
        return (
          <div className="xp-row" key={idx}>
            <div className="xp-when">{e.year}</div>
            <div>
              <div className="xp-role">{e.role}</div>
              {(e.org || meta.length > 0) && (
                <div className="xp-org">
                  {e.org}
                  {meta.length > 0 && (
                    <span className="xp-meta">
                      {e.org ? " · " : ""}
                      {meta.join(" · ")}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="xp-mark">
              {e.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={e.logoWide ? "wide" : "tall"}
                  src={e.logo}
                  alt=""
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
