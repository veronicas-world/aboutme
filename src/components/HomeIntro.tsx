"use client";

import { useEffect, useState } from "react";

// Pixel stars streak across the screen on the first home-page visit of a
// browser session, and the page is wiped in behind them from left to right.
//
// The inline script runs while the HTML is still parsing, before the overlay
// first paints, so returning visitors (and reduced-motion users) never see a
// flash of it. It records the state on <html data-intro>, which also
// survives client-side navigation back to the home page.
const KEY = "intro-seen";
// Start typing the name once the wipe has uncovered the middle of the page.
const TYPE_AT = 1700;
const GONE_AT = 3700;

const bootScript = `try{var d=document.documentElement;d.dataset.intro=(sessionStorage.getItem("${KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)?"seen":"playing"}catch(e){document.documentElement.dataset.intro="seen"}`;

// Sprite widths at half the source size; the four sprites differ only in
// trail length. Positions and delays are fixed so server and client markup
// match.
const SPRITES = [73, 106, 140, 172];
const stars = [
  { s: 4, top: 9, delay: 0 },
  { s: 1, top: 17, delay: 260 },
  { s: 3, top: 25, delay: 120 },
  { s: 2, top: 33, delay: 430 },
  { s: 4, top: 41, delay: 60 },
  { s: 1, top: 48, delay: 340 },
  { s: 3, top: 56, delay: 190 },
  { s: 2, top: 63, delay: 510 },
  { s: 4, top: 71, delay: 140 },
  { s: 1, top: 78, delay: 390 },
  { s: 3, top: 85, delay: 240 },
  { s: 2, top: 92, delay: 580 },
];

export default function HomeIntro() {
  const [phase, setPhase] = useState<"play" | "skip" | "gone">("play");

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "playing") {
      setPhase("gone");
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    // "revealing" keeps the overlay up while the page types; "seen" hides it.
    const typeTimer = setTimeout(() => {
      root.dataset.intro = "revealing";
      window.dispatchEvent(new Event("intro-done"));
    }, TYPE_AT);
    const goneTimer = setTimeout(() => setPhase("gone"), GONE_AT);
    return () => {
      clearTimeout(typeTimer);
      clearTimeout(goneTimer);
      root.dataset.intro = "seen";
    };
  }, []);

  const skip = () => {
    if (phase !== "play") return;
    document.documentElement.dataset.intro = "seen";
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    window.dispatchEvent(new Event("intro-done"));
    setPhase("skip");
    setTimeout(() => setPhase("gone"), 400);
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      {phase !== "gone" && (
        <div
          className={`intro${phase === "skip" ? " intro-skip" : ""}`}
          aria-hidden="true"
          onClick={skip}
        >
          <div className="intro-curtain" />
          {stars.map((st, i) => {
            const w = SPRITES[st.s - 1];
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                className="intro-star"
                src={`/intro/star-${st.s}.png`}
                alt=""
                draggable={false}
                style={{
                  top: `${st.top}%`,
                  width: `min(${w}px, ${(w / 172) * 40}vw)`,
                  animationDelay: `${st.delay}ms`,
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
