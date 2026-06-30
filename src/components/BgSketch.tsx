/* A faint da Vinci / Cocteau sketch sitting BEHIND the page content
   (z-index -1), gently floating. Low opacity keeps text fully readable. */
export default function BgSketch({
  name,
  style,
  float = true,
  draw = false,
}: {
  name: "hero" | "about" | "trajectory" | "interests" | "contact";
  style?: React.CSSProperties;
  float?: boolean;
  draw?: boolean;
}) {
  const cls = draw ? "bg-sketch bg-draw" : `bg-sketch${float ? " bg-float" : ""}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/sketches/${name}.png`}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cls}
      style={style}
    />
  );
}
