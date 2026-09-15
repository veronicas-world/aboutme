"use client";

import { useEffect, useRef, useState } from "react";

// Looping banner video at the top of the home page. Browsers only allow
// autoplay when the video is muted, so it starts muted and loops on load;
// the button lets viewers turn the sound on. Captions are baked into the
// video. Hides itself if /home-hero.mp4 is missing so nothing looks broken.
export default function HomeImage() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ok, setOk] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, []);

  if (!ok) return null;

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) v.play().catch(() => {});
    setMuted(next);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 680,
        margin: "0 auto 34px",
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src="/home-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onError={() => setOk(false)}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          borderRadius: 3,
        }}
      />
      <button
        type="button"
        onClick={toggleSound}
        className="mono"
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          border: "1px solid rgba(247, 244, 236, 0.55)",
          background: "rgba(21, 17, 13, 0.55)",
          color: "#f7f4ec",
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "5px 10px",
          borderRadius: 999,
          cursor: "pointer",
          backdropFilter: "blur(2px)",
        }}
      >
        {muted ? "Sound on" : "Sound off"}
      </button>
    </div>
  );
}
