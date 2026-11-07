import type { Metadata } from "next";
import BgSketch from "@/components/BgSketch";
import ExperienceList from "@/components/ExperienceList";
import { experience, educationTimeline } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience · Veronica Agudelo",
  description: "Where Veronica Agudelo has spent her time.",
};

export default function ExperiencePage() {
  return (
    <main
      className="wrap page-serif"
      style={{ paddingTop: 70, paddingBottom: 90, position: "relative" }}
    >
      <BgSketch name="trajectory" style={{ top: "14%", right: "-4%", width: 320 }} />
      <BgSketch name="hero" style={{ bottom: "6%", left: "-6%", width: 380 }} />

      <div className="col xp-page">
        <h1 className="xp-title">Experience</h1>

        <h2 className="xp-section">Education</h2>
        <ExperienceList items={educationTimeline} />

        <h2 className="xp-section">Work</h2>
        <ExperienceList items={experience} />
      </div>
    </main>
  );
}
