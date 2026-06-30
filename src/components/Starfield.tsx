"use client";

import { useMemo } from "react";

type Star = {
  kind: "sparkle" | "dot" | "plus" | "burst";
  size: number;
  x: number;
  y: number;
  rot: number;
  tw: boolean;
  twKind: "tw" | "tw2";
  dur: number;
  delay: number;
  baseOp: number;
};

// Deterministic PRNG so server & client render identically (no hydration drift).
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Starfield({
  count = 110,
  shooterCount = 5,
  className = "",
  seed = 20260628,
}: {
  count?: number;
  shooterCount?: number;
  className?: string;
  seed?: number;
}) {
  const { stars, shooters } = useMemo(() => {
    const rnd = mulberry32(seed);
    const range = (a: number, b: number) => a + rnd() * (b - a);
    const pick = <T,>(arr: T[]) => arr[Math.floor(rnd() * arr.length)];

    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      const kind = pick([
        "sparkle",
        "sparkle",
        "sparkle",
        "dot",
        "dot",
        "plus",
        "burst",
      ]) as Star["kind"];
      let size: number;
      if (kind === "dot") size = range(3.5, 8);
      else if (kind === "plus") size = range(8, 15);
      else if (kind === "burst") size = range(11, 20);
      else size = range(8, 24);
      stars.push({
        kind,
        size,
        x: range(1, 99),
        y: range(1, 99),
        rot: range(-32, 32),
        tw: rnd() < 0.72,
        twKind: rnd() < 0.5 ? "tw" : "tw2",
        dur: range(2.6, 6.8),
        delay: range(0, 7),
        baseOp: range(0.3, 0.85),
      });
    }
    const shooters = Array.from({ length: shooterCount }, (_, i) => ({
      left: range(-4, 10),
      top: range(3, 92),
      len: range(120, 205),
      dur: range(10, 17),
      delay: range(2, 11) + i * 1.8,
    }));
    return { stars, shooters };
  }, [count, shooterCount, seed]);

  return (
    <div className={`starfield ${className}`.trim()} aria-hidden="true">
      {stars.map((s, i) => {
        const common: React.CSSProperties = {
          left: `${s.x}%`,
          top: `${s.y}%`,
          opacity: s.baseOp,
          animation: s.tw
            ? `${s.twKind} ${s.dur}s ease-in-out ${s.delay}s infinite`
            : undefined,
          transform: `rotate(${s.rot}deg)`,
        };
        if (s.kind === "dot") {
          return (
            <span
              key={i}
              className="star"
              style={{
                ...common,
                width: s.size,
                height: s.size,
                borderRadius: "50%",
                background: "#15110D",
              }}
            />
          );
        }
        if (s.kind === "plus") {
          return (
            <svg
              key={i}
              className="star"
              width={s.size}
              height={s.size}
              viewBox="0 0 24 24"
              style={common}
            >
              <path
                d="M12 2v20M2 12h20"
                stroke="#15110D"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          );
        }
        if (s.kind === "burst") {
          return (
            <svg
              key={i}
              className="star"
              width={s.size}
              height={s.size}
              viewBox="0 0 24 24"
              style={common}
            >
              <g stroke="#15110D" strokeWidth="1.3" strokeLinecap="round">
                <path d="M12 1v22M1 12h22M4 4l16 16M20 4L4 20" />
              </g>
            </svg>
          );
        }
        // sparkle (4-point star)
        return (
          <svg
            key={i}
            className="star"
            width={s.size}
            height={s.size}
            viewBox="0 0 24 24"
            style={common}
          >
            <path
              d="M12 0C12.8 7 14 9.2 24 12 14 14.8 12.8 17 12 24 11.2 17 10 14.8 0 12 10 9.2 11.2 7 12 0Z"
              fill="#15110D"
            />
          </svg>
        );
      })}
      {shooters.map((sh, i) => (
        <span
          key={`sh-${i}`}
          className="shooter"
          style={{
            left: `${sh.left}%`,
            top: `${sh.top}%`,
            width: sh.len,
            animationDuration: `${sh.dur}s`,
            animationDelay: `${sh.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
