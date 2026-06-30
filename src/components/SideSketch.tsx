/* A faint da Vinci / Cocteau sketch placed in the page's side margin.
   Fixed to the viewport edge and hidden on narrower screens, so it never
   overlaps the centered text column. */
export default function SideSketch({
  name,
  side,
  top,
  opacity = 0.3,
}: {
  name: "hero" | "about" | "trajectory" | "interests" | "contact";
  side: "left" | "right";
  top: string;
  opacity?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/sketches/${name}.png`}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="side-sketch"
      style={{ top, [side]: "clamp(8px, 2.5vw, 52px)", opacity } as React.CSSProperties}
    />
  );
}
