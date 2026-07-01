"use client";

import { useState } from "react";

// Banner image centered at the top of the home page. Hides itself until
// /home-hero.jpg exists so nothing looks broken beforehand.
export default function HomeImage() {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/home-hero.jpg"
      alt=""
      aria-hidden="true"
      onError={() => setOk(false)}
      style={{
        display: "block",
        width: "100%",
        maxWidth: 680,
        height: "auto",
        margin: "0 auto 34px",
        borderRadius: 3,
      }}
    />
  );
}
