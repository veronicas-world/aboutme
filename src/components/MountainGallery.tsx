"use client";

import { useState } from "react";

// Justified single row of mountain photos for the About page. Each image's
// flex-grow is its aspect ratio, so with flex-basis 0 they all render at the
// same height and the row fills the column edge-to-edge. Missing files hide
// themselves so nothing breaks.
const imgs = [
  { src: "/mountains/1.jpg", ar: 2.475 }, // Alps panorama
  { src: "/mountains/2.jpg", ar: 0.655 }, // Picos gorge (portrait)
  { src: "/mountains/3.jpg", ar: 1.333 }, // glacier hikers
  { src: "/mountains/4.jpg", ar: 2.188 }, // original mountain shot
];

export default function MountainGallery() {
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const visible = imgs.filter((i) => !failed[i.src]);
  if (visible.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        margin: "24px 0 8px",
        width: "100%",
      }}
    >
      {visible.map((i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i.src}
          src={i.src}
          alt="A mountain landscape photographed by Veronica."
          loading="lazy"
          onError={() => setFailed((f) => ({ ...f, [i.src]: true }))}
          style={{
            flexGrow: i.ar,
            flexBasis: 0,
            minWidth: 0,
            height: "auto",
            display: "block",
            borderRadius: 3,
          }}
        />
      ))}
    </div>
  );
}
