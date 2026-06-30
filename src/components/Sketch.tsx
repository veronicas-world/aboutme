/* Floating da Vinci / Cocteau line-art sketch, positioned absolutely
   inside a relatively-positioned section. */
export default function Sketch({
  name,
  style,
  float = false,
}: {
  name: "hero" | "about" | "trajectory" | "interests" | "contact";
  style?: React.CSSProperties;
  float?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/sketches/${name}.png`}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`sketch${float ? " float" : ""}`}
      style={style}
    />
  );
}
