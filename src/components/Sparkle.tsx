export default function Sparkle({
  size = 12,
  color = "#15110D",
  opacity = 1,
  style,
}: {
  size?: number;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ flex: "none", opacity, ...style }}
      aria-hidden="true"
    >
      <path
        d="M12 0C12.8 7 14 9.2 24 12 14 14.8 12.8 17 12 24 11.2 17 10 14.8 0 12 10 9.2 11.2 7 12 0Z"
        fill={color}
      />
    </svg>
  );
}
