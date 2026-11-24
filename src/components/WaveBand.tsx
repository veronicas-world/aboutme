"use client";

import { useEffect, useRef } from "react";
import { startWaveBand } from "@/components/waves";

export default function WaveBand() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => (ref.current ? startWaveBand(ref.current) : undefined), []);
  return <canvas ref={ref} aria-hidden="true" />;
}
