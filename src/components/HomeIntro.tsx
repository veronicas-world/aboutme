"use client";

import { useEffect, useState } from "react";

// Pixel stars streak across the screen on the first home-page visit of a
// browser session, then the overlay fades to reveal the site.
//
// The inline script runs while the HTML is still parsing, before the overlay
// first paints, so returning visitors (and reduced-motion users) never see a
// flash of it. It records the state on <html data-intro>, which also
// survives client-side navigation back to the home page.
const KEY = "intro-seen";
const FADE_AT = 2800;
const GONE_AT = 3400;

const bootScript = `try{var d=document.documentElement;d.dataset.intro=(sessionStorage.getItem("${KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)?"seen":"playing"}catch(e){document.documentElement.dataset.intro="seen"}`;

const stars = [
  { src: "/intro/star-4.png", top: "18%", width: 345, delay: 0 },
  { src: "/intro/star-2.png", top: "38%", width: 213, delay: 160 },
  { src: "/intro/star-3.png", top: "58%", width: 279, delay: 60 },
  { src: "/intro/star-1.png", top: "76%", width: 147, delay: 240 },
];

export default function HomeIntro() {
  const [phase, setPhase] = useState<"play" | "fade" | "gone">("play");

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "playing") {
      setPhase("gone");
      return;
    }
    const finish = () => {
      root.dataset.intro = "seen";
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      window.dispatchEvent(new Event("intro-done"));
      setPhase("fade");
    };
    const fadeTimer = setTimeout(finish, FADE_AT);
    const goneTimer = setTimeout(() => setPhase("gone"), GONE_AT);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  const skip = () => {
    if (phase !== "play") return;
    const root = document.documentElement;
    root.dataset.intro = "seen";
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    window.dispatchEvent(new Event("intro-done"));
    setPhase("fade");
    setTimeout(() => setPhase("gone"), 500);
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      {phase !== "gone" && (
        <div
          className={`intro${phase === "fade" ? " intro-fade" : ""}`}
          aria-hidden="true"
          onClick={skip}
        >
          {stars.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              className="intro-star"
              src={s.src}
              alt=""
              draggable={false}
              style={{
                top: s.top,
                width: `min(${s.width * 1.6}px, ${(s.width / 345) * 80}vw)`,
                animationDelay: `${s.delay}ms`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
