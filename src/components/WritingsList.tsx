import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function fmt(iso: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function WritingsList({ posts }: { posts: PostMeta[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {posts.map((p) => {
        const inner = (
          <>
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
                {fmt(p.date)}
              </div>
              <div style={{ fontSize: 22, lineHeight: 1.25, marginBottom: 8 }}>
                {p.title}
              </div>
              {p.subtitle && (
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.5,
                    color: "var(--ink-3)",
                    margin: "0 0 12px",
                  }}
                >
                  {p.subtitle}
                </p>
              )}
            </div>
          </>
        );

        return p.full ? (
          <Link key={p.slug} href={`/writings/${p.slug}`} className="post-card">
            {inner}
          </Link>
        ) : (
          <a
            key={p.slug}
            href={p.substackUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="post-card"
          >
            {inner}
          </a>
        );
      })}
      {posts.length === 0 && (
        <p style={{ color: "var(--sepia)", fontSize: 19 }}>
          Nothing here yet — more soon.
        </p>
      )}
    </div>
  );
}
