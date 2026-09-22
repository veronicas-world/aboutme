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
        maxWidth: 380,
        margin: "0 auto 34px",
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src="/home-hero-hq.mp4"
        poster="/home-hero-poster-hq.jpg"
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
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 26,
          height: 26,
          padding: 0,
          border: "none",
          borderRadius: "50%",
          background: "rgba(21, 17, 13, 0.5)",
          color: "#f7f4ec",
          cursor: "pointer",
          backdropFilter: "blur(2px)",
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          {muted ? (
            <>
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          ) : (
            <>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
