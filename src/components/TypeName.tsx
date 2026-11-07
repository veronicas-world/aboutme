"use client";

import { useEffect, useState } from "react";

// Types `text` out character by character, with a blinking caret.
// Respects prefers-reduced-motion (shows the full name immediately).
export default function TypeName({
  text,
  speed = 105,
}: {
  text: string;
  speed?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      id = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(id);
      }, speed);
    };
    // Hold the typing until the home intro overlay (HomeIntro) clears.
    if (document.documentElement.dataset.intro === "playing") {
      window.addEventListener("intro-done", start, { once: true });
    } else {
      start();
    }
    return () => {
      window.removeEventListener("intro-done", start);
      clearInterval(id);
    };
  }, [text, speed]);

  return (
    <>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="type-caret" />
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}
