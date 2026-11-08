"use client";

import { useEffect, useRef, useState } from "react";

// Keep mobile downloads light and wait for the horse intro before playback.
// Captions are baked in; sound stays opt-in.
export default function HomeImage() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ok, setOk] = useState(true);
  const [muted, setMuted] = useState(true);
  const [needsPlay, setNeedsPlay] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!ok || !v) return;
    let active = true;
    let introDone = document.documentElement.dataset.intro !== "playing";
    let inView = false;
    const canPlay = () => introDone && inView && !document.hidden;
    const resume = () => {
      if (!canPlay()) {
        v.pause();
        return;
      }
      if (!v.paused) return;
      void v.play().catch(() => {
        if (active && canPlay() && v.paused) setNeedsPlay(true);
      });
    };
    const introFinished = () => {
      introDone = true;
      resume();
    };
    const playing = () => {
      if (!canPlay()) v.pause();
      else setNeedsPlay(false);
    };
    const paused = () => setNeedsPlay(canPlay());
    v.defaultMuted = true;
    v.muted = true;
    v.addEventListener("playing", playing);
    v.addEventListener("pause", paused);
    window.addEventListener("intro-done", introFinished);
    window.addEventListener("pageshow", resume);
    document.addEventListener("visibilitychange", resume);
    const observer = typeof IntersectionObserver === "undefined" ? null :
      new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        resume();
      });
    if (observer) observer.observe(v);
    else {
      inView = true;
      resume();
    }
    return () => {
      active = false;
      observer?.disconnect();
      v.removeEventListener("playing", playing);
      v.removeEventListener("pause", paused);
      window.removeEventListener("intro-done", introFinished);
      window.removeEventListener("pageshow", resume);
      document.removeEventListener("visibilitychange", resume);
      v.pause();
    };
  }, [ok]);

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
        poster="/home-hero-poster-hq.jpg"
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => setOk(false)}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          borderRadius: 3,
        }}
      >
        <source
          src="/home-hero-web.mp4"
          media="(max-width: 767px), (pointer: coarse)"
          type="video/mp4"
        />
        <source src="/home-hero-hq.mp4" type="video/mp4" />
      </video>
      {needsPlay && (
        <button
          type="button"
          onClick={() => {
            void ref.current?.play().catch(() => setNeedsPlay(true));
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "10px 16px",
            border: "none",
            borderRadius: 3,
            background: "rgba(21, 17, 13, 0.75)",
            color: "#f7f4ec",
            font: "inherit",
            cursor: "pointer",
          }}
        >
          Play video
        </button>
      )}
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
