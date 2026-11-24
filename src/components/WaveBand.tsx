"use client";

import { useEffect, useRef } from "react";
import { startWaveBand } from "@/components/waves";

export default function WaveBand() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => (ref.current ? startWaveBand(ref.current) : undefined), []);
  return (
    <div className="wave-band" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
