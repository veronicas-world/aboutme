/* Original line-art sketch of the Voyager Golden Record (public-domain NASA
   design), drawn in the site's ink aesthetic. Used as the nav brand mark. */
export default function GoldenRecord({ size = 36 }: { size?: number }) {
  const ink = "#15110D";
  const cx = 32;
  const cy = 32;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={ink}
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* disc edge */}
      <circle cx={cx} cy={cy} r="29" />
      {/* segmented rotation ring */}
      <circle cx={cx} cy={cy} r="25.5" strokeWidth="1.5" strokeDasharray="1.3 3.7" />
      {/* grooves */}
      <circle cx={cx} cy={cy} r="19.5" strokeWidth="1.1" opacity="0.65" />
      <circle cx={cx} cy={cy} r="12.5" strokeWidth="1.1" opacity="0.65" />
      {/* spindle */}
      <circle cx={cx} cy={cy} r="5.4" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="1.6" fill={ink} stroke="none" />
      {/* stylus arm, echoing the cover's playback diagram */}
      <path d="M55 13 L42 24" strokeWidth="1.5" />
      <rect
        x="51.4"
        y="9.2"
        width="6.2"
        height="5.2"
        rx="1"
        transform="rotate(22 54.5 11.8)"
        strokeWidth="1.3"
      />
    </svg>
  );
}
