import BgSketch from "@/components/BgSketch";
import TypeName from "@/components/TypeName";
import HomeImage from "@/components/HomeImage";
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
      className="wrap"
      style={{
        minHeight: "82vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: 48,
        paddingBottom: 60,
        position: "relative",
      }}
    >
      <BgSketch name="interests" float={false} className="home-sk-left" style={{ width: 300, opacity: 0.45 }} />
      <BgSketch name="trajectory" float={false} className="home-sk-right" style={{ width: 210, opacity: 0.45 }} />

      <div className="tcenter" style={{ maxWidth: "var(--read)", margin: "0 auto" }}>
        <HomeImage />
        <h1
          className="home-name"
          style={{
            fontWeight: 300,
            fontSize: "clamp(30px,4.6vw,52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            margin: "0 0 38px",
          }}
        >
          <TypeName text="Veronica Agudelo" />
        </h1>
        <div style={{ textAlign: "left" }}>
          <p className="indent-p" style={heroParaStyle}>{withLinks(heroParas[0])}</p>
          {heroParas.slice(1).map((para, i) => (
            <p key={i} className="indent-p" style={heroParaStyle}>
              {withLinks(para)}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
