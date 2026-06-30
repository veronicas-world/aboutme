/* An original notebook-style sketch of local vs. global extrema,
   drawn in the site's parchment/ink aesthetic. */
const mono = "var(--font-mono), monospace";

function Spark({ x, y, s = 13 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x - s / 2} ${y - s / 2}) scale(${s / 24})`}
      d="M12 0C12.8 7 14 9.2 24 12 14 14.8 12.8 17 12 24 11.2 17 10 14.8 0 12 10 9.2 11.2 7 12 0Z"
      fill="#15110D"
    />
  );
}

export default function LocalMaximaSketch() {
  const ink = "#15110D";
  const sepia = "#6b6155";
  const faint = "#a89d8c";
  const labelBase = {
    fontFamily: mono,
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
  };

  return (
    <figure style={{ margin: "30px auto 34px", maxWidth: 560 }}>
      <svg
        viewBox="0 0 680 330"
        role="img"
        aria-label="A sketch of a curve marking its local maximum, global maximum, local minimum, and global minimum."
        style={{ width: "100%", height: "auto", display: "block", mixBlendMode: "multiply" }}
      >
        {/* axes */}
        <g stroke={sepia} strokeWidth="1" opacity="0.5" fill="none" strokeLinecap="round">
          <path d="M52 26 L52 288" />
          <path d="M52 288 L642 288" />
          <path d="M52 26 l-5 10 M52 26 l5 10" />
          <path d="M642 288 l-11 -5 M642 288 l-11 5" />
        </g>

        {/* leader lines */}
        <g stroke={faint} strokeWidth="1" fill="none">
          <path d="M122 56 L122 40" />
          <path d="M238 250 L238 266" />
          <path d="M406 122 L406 108" />
          <path d="M526 198 L526 214" />
        </g>

        {/* the curve */}
        <path
          d="M58 98 C 80 52 104 50 122 60 C 156 80 182 252 238 250 C 300 248 360 128 406 124 C 452 120 496 198 526 198 C 564 198 604 170 630 152"
          fill="none"
          stroke={ink}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* extrema markers */}
        <Spark x={122} y={60} />
        <Spark x={238} y={250} />
        <Spark x={406} y={124} />
        <Spark x={526} y={198} />

        {/* labels — global in ink, local in sepia */}
        <text x={122} y={32} textAnchor="middle" style={{ ...labelBase, fontWeight: 500 }} fill={ink}>
          Global maximum
        </text>
        <text x={238} y={282} textAnchor="middle" style={{ ...labelBase, fontWeight: 500 }} fill={ink}>
          Global minimum
        </text>
        <text x={406} y={100} textAnchor="middle" style={labelBase} fill={sepia}>
          Local maximum
        </text>
        <text x={526} y={232} textAnchor="middle" style={labelBase} fill={sepia}>
          Local minimum
        </text>
      </svg>
    </figure>
  );
}
