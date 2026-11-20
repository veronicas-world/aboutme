import type { Metadata } from "next";
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
