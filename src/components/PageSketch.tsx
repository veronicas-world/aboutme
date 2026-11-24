const sketches = {
  "cocteau-trumpet": {
    file: "cocteau-trumpet.webp",
    width: 688,
    height: 736,
    alt: "Jean Cocteau sketch of a flame-haired figure blowing a red trumpet.",
  },
  "cocteau-lyre": {
    file: "cocteau-lyre.webp",
    width: 626,
    height: 798,
    alt: "Jean Cocteau sketch of a figure with a lyre and flowing drapery.",
  },
  "cocteau-winged-profile": {
    file: "cocteau-winged-profile.webp",
    width: 456,
    height: 536,
    alt: "Jean Cocteau line drawing of a winged profile with a star.",
  },
  "mechanical-study": { file: "hero.png", width: 676, height: 384, alt: "" },
  "conversation": { file: "contact.png", width: 592, height: 708, alt: "" },
} as const;

export default function PageSketch({
  name,
  className,
  eager = false,
}: {
  name: keyof typeof sketches;
  className: string;
  eager?: boolean;
}) {
  const { file, ...image } = sketches[name];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...image}
      src={`/sketches/${file}`}
      className={`page-sketch ${className}`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
