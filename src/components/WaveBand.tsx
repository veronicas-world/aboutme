"use client";

import { useEffect, useRef } from "react";

export default function WaveBand() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let active = true;
    let stop: (() => void) | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void import("@/components/waves").then(({ startWaveBand }) => {
        if (active) stop = startWaveBand(canvas);
      }).catch(() => {});
    }, { rootMargin: "160px" });
    observer.observe(canvas);
    return () => {
      active = false;
      observer.disconnect();
      stop?.();
    };
  }, []);
  return <canvas ref={ref} aria-hidden="true" />;
}
