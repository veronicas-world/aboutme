import { site } from "@/content/site";

// Turns [text](url) in a bio paragraph into an external link.
function withLinks(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a
        key={m.index}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-inline-link"
      >
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function Home() {
  const heroParas = site.heroLead.split("\n\n");
  const heroParaStyle = {
    fontWeight: 300,
    fontSize: 17,
    lineHeight: 1.62,
    color: "var(--ink-2)",
    margin: 0,
  } as const;

  return (
    <main
      id="top"
      className="wrap home-main"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: 48,
        paddingBottom: 24,
        position: "relative",
      }}
    >
      <h1 className="sr-only">Introduction</h1>
      <div className="col" style={{ width: "100%" }}>
        <div>
          <p style={heroParaStyle}>{withLinks(heroParas[0])}</p>
          {heroParas.slice(1).map((para, i) => (
            <p key={i} style={{ ...heroParaStyle, marginTop: 18 }}>
              {withLinks(para)}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
