import Link from "next/link";
import BgSketch from "@/components/BgSketch";
import TypeName from "@/components/TypeName";
import HomeImage from "@/components/HomeImage";
import { site } from "@/content/site";

export default function Home() {
  const heroParas = site.heroLead.split("\n\n");
  const heroParaStyle = {
    fontWeight: 300,
    fontSize: 17,
    lineHeight: 1.62,
    color: "var(--ink-2)",
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
      <BgSketch name="interests" float={false} style={{ bottom: "3%", left: "-9%", width: 300, opacity: 0.55 }} />
      <BgSketch name="trajectory" float={false} style={{ bottom: "12%", right: "-1%", width: 210, opacity: 0.55 }} />

      <div className="tcenter" style={{ maxWidth: 720, margin: "0 auto" }}>
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
          <p style={{ ...heroParaStyle, margin: "0 0 16px" }}>{heroParas[0]}</p>
          <p style={{ ...heroParaStyle, margin: "0 0 16px" }}>
            {site.heroInterests.before}
            <Link href={site.heroInterests.href} className="hero-inline-link">
              {site.heroInterests.linkText}
            </Link>
            {site.heroInterests.after}
          </p>
          {heroParas.slice(1).map((para, i, arr) => (
            <p
              key={i}
              style={{
                ...heroParaStyle,
                margin: i === arr.length - 1 ? 0 : "0 0 16px",
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
