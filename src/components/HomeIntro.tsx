"use client";

import { useEffect, useRef, useState } from "react";
import {
  createHorseSprites,
  HORSE_INTRO_DURATION,
  paintHorseIntro,
  type HorseSprites,
} from "@/lib/horse-intro";

const KEY = "horse-intro-seen-v1";
const bootScript = `try{var d=document.documentElement;d.dataset.intro=(!matchMedia("(prefers-reduced-motion: reduce)").matches&&(new URLSearchParams(location.search).get("intro")==="horses"||!sessionStorage.getItem("${KEY}")))?"playing":"seen";if(d.dataset.intro==="playing")setTimeout(function(){if(d.dataset.intro==="playing"&&!document.querySelector(".horse-intro-canvas[data-painted]")){d.dataset.intro="seen";dispatchEvent(new Event("intro-done"))}},6000)}catch(e){document.documentElement.dataset.intro="seen"}`;

export default function HomeIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eligibleRef = useRef<boolean | null>(null);
  const [phase, setPhase] = useState<"play" | "gone">("play");

  useEffect(() => {
    const root = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (eligibleRef.current === null) eligibleRef.current = root.dataset.intro === "playing";
    if (motion.matches || !eligibleRef.current) {
      root.dataset.intro = "seen";
      setPhase("gone");
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      root.dataset.intro = "seen";
      window.dispatchEvent(new Event("intro-done"));
      setPhase("gone");
      return;
    }
    root.dataset.intro = "playing";
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    let sprites: HorseSprites | null = null;
    let frame = 0;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      root.dataset.intro = "seen";
      window.dispatchEvent(new Event("intro-done"));
      setPhase("gone");
    };
    const resize = () => {
      // One canvas pixel per CSS pixel: the sprites supply their own chunky grid.
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    let started = 0;
    const tick = (now: number) => {
      if (!sprites || finished) return;
      // The first RAF timestamp can predate this effect within the same
      // browser frame. Never use a negative sprite-frame index.
      const elapsed = Math.max(0, now - started);
      if (elapsed >= HORSE_INTRO_DURATION) {
        finish();
        return;
      }
      paintHorseIntro(ctx, sprites, canvas.width, canvas.height, elapsed);
      frame = requestAnimationFrame(tick);
    };
    ctx.fillStyle = "#f7f4ec";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    const motionChange = () => {
      if (motion.matches) finish();
    };
    // A backgrounded tab must not leave the visitor behind a frozen curtain.
    let fallback = window.setTimeout(finish, 6000);
    void createHorseSprites().then((loaded) => {
      if (finished) return;
      sprites = loaded;
      started = performance.now();
      paintHorseIntro(ctx, sprites, canvas.width, canvas.height, 0);
      canvas.dataset.painted = "true";
      window.clearTimeout(fallback);
      fallback = window.setTimeout(finish, HORSE_INTRO_DURATION + 200);
      frame = requestAnimationFrame(tick);
    }).catch(finish);
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", escape);
    motion.addEventListener("change", motionChange);
    return () => {
      finished = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", escape);
      motion.removeEventListener("change", motionChange);
      root.dataset.intro = "seen";
    };
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      {phase === "play" && (
        <div className="intro horse-intro">
          <canvas ref={canvasRef} className="horse-intro-canvas" aria-hidden="true" />
        </div>
      )}
    </>
  );
}
