import BgSketch from "@/components/BgSketch";
import TypeName from "@/components/TypeName";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main
      id="top"
      className="wrap"
      style={{
        minHeight: "82vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 70,
        paddingBottom: 60,
        position: "relative",
      }}
    >
      <BgSketch name="hero" draw style={{ top: "5%", right: "-6%", width: 540, opacity: 0.31 }} />
      <BgSketch name="interests" draw style={{ bottom: "3%", left: "-5%", width: 300, opacity: 0.31 }} />
      <BgSketch name="about" draw style={{ top: "3%", left: "30%", width: 105, opacity: 0.31 }} />
      <BgSketch name="trajectory" draw style={{ bottom: "0%", right: "-1%", width: 155, opacity: 0.31 }} />

      <div className="tcenter" style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1
          style={{
            fontWeight: 300,
            fontSize: "clamp(30px,4.6vw,52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            margin: "0 0 30px",
          }}
        >
          <TypeName text="Veronica Agudelo" />
        </h1>
        <p
          style={{
            fontWeight: 300,
            fontSize: 17,
            lineHeight: 1.62,
            color: "var(--ink-2)",
            textAlign: "left",
            margin: 0,
          }}
        >
          {site.heroLead}
        </p>
      </div>
    </main>
  );
}
