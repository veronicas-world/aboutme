"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { startIntroFlow } from "@/components/intro/flow";
import { site } from "@/content/site";

const skips = ["pointerdown", "keydown", "wheel", "touchmove", "scroll", "resize"] as const;

export default function HomeOpening({ children }: { children: ReactNode }) {
  const intro = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const flow = intro.current && canvas.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? startIntroFlow(intro.current, canvas.current)
      : null;
    if (!flow) {
      setSettled(true);
      return;
    }
    // Finishing, not cancelling, keeps the paragraph visible until React swaps the canvas out.
    const skip = () => flow.finish();
    void flow.finished.then(() => setSettled(true), () => {});
    skips.forEach((name) => window.addEventListener(name, skip, { passive: true }));
    return () => {
      skips.forEach((name) => window.removeEventListener(name, skip));
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
