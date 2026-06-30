"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

// Justified row of mountain photos for the About page. Each image's
// flex-grow is its aspect ratio (passed via the --ar CSS variable), so with
// flex-basis 0 they all render at the same height and the row fills the
// column edge-to-edge. On phones it wraps into a 2-up grid instead (see
// .mtn-row / .mtn-img in globals.css) so the photos stay a readable size.
// Missing files hide themselves so nothing breaks.
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
    <div className="mtn-row">
      {visible.map((i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i.src}
          src={i.src}
          alt="A mountain landscape photographed by Veronica."
          loading="lazy"
          onError={() => setFailed((f) => ({ ...f, [i.src]: true }))}
          className="mtn-img"
          style={{ "--ar": i.ar } as CSSProperties}
        />
      ))}
    </div>
  );
}
