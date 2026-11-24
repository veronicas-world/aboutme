"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { startIntroFlow } from "@/components/intro/flow";
import { site } from "@/content/site";

const skips = ["pointerdown", "keydown", "wheel", "touchmove"] as const;

export default function HomeOpening({ children }: { children: ReactNode }) {
  const intro = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ready" | "playing" | "settled">("ready");

  useEffect(() => {
    const root = intro.current;
    const copy = root?.querySelector(".home-bio-copy");
    const layer = canvas.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let flow: Animation | null = null;
    let disposed = false;
    let skipped = false;

    const finish = () => {
      skipped = true;
      if (flow) flow.finish();
      else setPhase("settled");
    };
    const start = () => {
      if (skipped || flow || document.hidden) return;
      // Explicit anchors, including Home tree navigation, are jumps, not new visits.
      if (!root || !copy || !layer || location.hash) {
        finish();
        return;
      }
      const navHeight = root.closest(".page")?.querySelector(".site-nav")?.getBoundingClientRect().height ?? 0;
      // Scroll before measuring, even when a reload restores a nonzero scroll position.
      window.scrollTo({ top: copy.getBoundingClientRect().top + window.scrollY - navHeight - 20, behavior: "instant" });
      if (motion.matches) {
        finish();
        return;
      }
      try {
        flow = startIntroFlow(root, layer);
      } catch {
        // Canvas can be unavailable or fail to initialize. Leave the page readable.
        root.querySelector(".intro-color")?.remove();
      }
      if (!flow) {
        finish();
        return;
      }
      setPhase("playing");
      void flow.finished.then(() => {
        if (!disposed) setPhase("settled");
      }, () => {});
    };
    const reduce = () => {
      if (motion.matches) finish();
    };
    skips.forEach((name) => window.addEventListener(name, finish, { passive: true }));
    document.addEventListener("visibilitychange", start);
    motion.addEventListener("change", reduce);
    start();
    return () => {
      disposed = true;
      skips.forEach((name) => window.removeEventListener(name, finish));
      document.removeEventListener("visibilitychange", start);
      motion.removeEventListener("change", reduce);
      flow?.cancel();
    };
  }, []);

  return (
    <main id="top" className="wrap home-main">
      <h1 className="home-name">{site.name}</h1>
      <div ref={intro} className="home-intro" data-playing={phase === "playing" || undefined}
        data-settled={phase === "settled" || undefined}>
        {phase !== "settled" && <canvas ref={canvas} className="intro-flow" aria-hidden="true" />}
        <div className="home-bio">{children}</div>
      </div>
    </main>
  );
}
