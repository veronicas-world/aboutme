"use client";

import { useEffect, useRef, useState } from "react";

const COMPACT = "/home-hero-web.mp4";
const FULL_SIZE = "/home-hero-hq.mp4";
const POSTER = "/home-hero-poster-hq.jpg";
const COMPACT_MEDIA = "(max-width: 767px), (pointer: coarse)";

// Keep mobile downloads light and keep playing when scrolled out of view.
// Captions are baked in; sound stays opt-in.
export default function SaganVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [sources, setSources] = useState<[string, string]>();
  const [attempt, setAttempt] = useState(0);
  const [muted, setMuted] = useState(true);
  const [needsPlay, setNeedsPlay] = useState(false);
  const src = sources?.[attempt];

  useEffect(() => {
    const v = ref.current;
    if (v) {
      v.defaultMuted = true;
      v.muted = true;
    }
    // The poster is available immediately. Set the source once React can
    // catch a media error and try the other file.
    setSources(window.matchMedia(COMPACT_MEDIA).matches ? [COMPACT, FULL_SIZE] : [FULL_SIZE, COMPACT]);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!src || !v) return;
    let active = true;
    const canPlay = () => !document.hidden;
    const resume = () => {
      if (!canPlay()) {
        v.pause();
        return;
      }
      if (!v.paused) return;
      void v.play().catch(() => {
        if (active && canPlay() && v.paused && !v.error) setNeedsPlay(true);
      });
    };
    const playing = () => {
      if (!canPlay()) v.pause();
      else setNeedsPlay(false);
    };
    const paused = () => setNeedsPlay(canPlay());
    v.addEventListener("playing", playing);
    v.addEventListener("pause", paused);
    window.addEventListener("pageshow", resume);
    document.addEventListener("visibilitychange", resume);
    resume();
    return () => {
      active = false;
      v.removeEventListener("playing", playing);
      v.removeEventListener("pause", paused);
      window.removeEventListener("pageshow", resume);
      document.removeEventListener("visibilitychange", resume);
      v.pause();
    };
  }, [src]);

  if (sources && !src) {
    return (
      <div className="sagan-video">
        <img src={POSTER} alt="Carl Sagan in the video" width={960} height={744} />
        <p className="sagan-video-fallback">
          The video couldn&apos;t load. <a href={COMPACT}>Open the video directly</a>.
        </p>
      </div>
    );
  }

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) v.play().catch(() => {});
    setMuted(next);
  };

  return (
    <div className="sagan-video">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src={src}
        poster={POSTER}
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => {
          setNeedsPlay(false);
          setAttempt(attempt + 1);
        }}
      />
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
