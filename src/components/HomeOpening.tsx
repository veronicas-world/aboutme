"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { startIntroFlow } from "@/components/intro/flow";
import { site } from "@/content/site";

const skips = ["pointerdown", "keydown", "wheel", "touchmove", "resize"] as const;

export default function HomeOpening({ children }: { children: ReactNode }) {
  const intro = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const positionedAt = useRef<number>();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const root = intro.current;
    const copy = root?.querySelector(".home-bio-copy");
    // Respect explicit anchors (including the footer's home link) and restored scroll.
    const startAtBio = !window.location.hash && (window.scrollY < 1 || window.scrollY === positionedAt.current);
    if (startAtBio && copy) {
      const navHeight = root?.closest(".page")?.querySelector(".site-nav")?.getBoundingClientRect().height ?? 0;
      // Move before the canvas measures the words' landing positions.
      window.scrollTo({ top: copy.getBoundingClientRect().top + window.scrollY - navHeight - 20, behavior: "instant" });
      positionedAt.current = window.scrollY;
    }

    const startY = window.scrollY;
    const flow = startAtBio && root && canvas.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? startIntroFlow(root, canvas.current)
      : null;
    if (!flow) {
      setSettled(true);
      return;
    }
    // Finishing, not cancelling, keeps the paragraph visible until React swaps the canvas out.
    const skip = () => flow.finish();
    const skipOnScroll = () => {
      if (Math.abs(window.scrollY - startY) > 1) skip();
    };
    void flow.finished.then(() => setSettled(true), () => {});
    skips.forEach((name) => window.addEventListener(name, skip, { passive: true }));
    window.addEventListener("scroll", skipOnScroll, { passive: true });
    return () => {
      skips.forEach((name) => window.removeEventListener(name, skip));
      window.removeEventListener("scroll", skipOnScroll);
      flow.cancel();
    };
  }, []);

  return (
    <main id="top" className="wrap home-main">
      <h1 className="home-name">{site.name}</h1>
      <div ref={intro} className="home-intro" data-settled={settled || undefined}>
        {!settled && <canvas ref={canvas} className="intro-flow" aria-hidden="true" />}
        <noscript>
          <style>{".home-bio,.home-name,.site-nav,.site-ending{opacity:1!important;visibility:visible!important;animation:none!important}"}</style>
        </noscript>
        <div className="home-bio">{children}</div>
      </div>
    </main>
  );
}
