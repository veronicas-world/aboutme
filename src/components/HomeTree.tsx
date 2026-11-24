const trunk = "M28 50 C28 43 27 37 28 32 C29 26 27 21 27 15";

// Each limb ends at the edge of the crown, where smaller forks continue it.
const limbs = [
  { path: "M28 36 Q22 30 15 29 Q10 29 6 25", tip: [6, 25, 190] },
  { path: "M19 30 Q12 33 7 32", tip: [7, 32, 166] },
  { path: "M19 30 Q15 23 10 19", tip: [10, 19, 224] },
  { path: "M24 32 Q20 25 20 19 Q19 16 16 13", tip: [16, 13, 229] },
  { path: "M20 21 Q23 17 22 11", tip: [22, 11, 255] },
  { path: trunk, tip: [27, 15, 267] },
  { path: "M28 27 Q33 22 33 12", tip: [33, 12, 284] },
  { path: "M28 34 Q34 32 37 25 Q40 20 39 15", tip: [39, 15, 298] },
  { path: "M36 27 Q42 25 45 19", tip: [45, 19, 317] },
  { path: "M32 32 Q38 32 42 30 Q46 27 50 26", tip: [50, 26, 342] },
  { path: "M40 31 Q44 34 49 34", tip: [49, 34, 12] },
];

function fork(x: number, y: number, angle: number, length: number, depth: number): string {
  if (!depth) return "";
  return [-31, 27].map((spread, side) => {
    const direction = angle + spread;
    const radians = direction * Math.PI / 180;
    const size = length * (side ? 0.86 : 1);
    const tipX = x + size * Math.cos(radians);
    const tipY = y + size * Math.sin(radians);
    return `M${x.toFixed(2)} ${y.toFixed(2)}L${tipX.toFixed(2)} ${tipY.toFixed(2)}`
      + fork(tipX, tipY, direction, size * 0.58, depth - 1);
  }).join("");
}

const twigs = limbs.map(({ tip: [x, y, angle] }, i) =>
  fork(x, y, angle, 3.4 + (i % 4) * 0.45, 3),
).join("");

export default function HomeTree() {
  return (
    <svg className="home-tree" viewBox="0 0 56 52" fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <g className="home-tree-sway">
        <path className="home-tree-trunk" d={trunk} pathLength="1" strokeWidth="1.55" />
        <g className="home-tree-limbs" strokeWidth="1.1">
          {limbs.filter(({ path }) => path !== trunk).map(({ path }) => (
            <path key={path} d={path} pathLength="1" />
          ))}
        </g>
        <path className="home-tree-twigs" d={twigs} strokeWidth="0.82" />
      </g>
    </svg>
  );
}
