"use client";

import { useId } from "react";

// Irregular wax-blob outline (drawn once, fixed so server and client markup match).
const WAX =
  "M22.00 3.60 C24.92 3.53 28.29 3.80 30.88 5.07 C33.48 6.35 35.98 8.81 37.55 11.26 C39.13 13.71 39.85 16.82 40.34 19.77 C40.83 22.73 41.44 26.26 40.49 29.01 C39.54 31.76 36.95 34.32 34.63 36.26 C32.32 38.20 29.47 39.95 26.60 40.67 C23.73 41.39 20.30 41.31 17.42 40.59 C14.53 39.87 11.47 38.32 9.30 36.34 C7.12 34.35 5.36 31.45 4.37 28.68 C3.39 25.92 3.13 22.70 3.39 19.74 C3.64 16.78 4.26 13.27 5.92 10.90 C7.58 8.53 10.66 6.72 13.34 5.51 C16.02 4.29 19.08 3.67 22.00 3.60Z";

const MOON = "M28.6 25.2A8 8 0 0 1 18.8 15.4a8 8 0 1 0 9.8 9.8Z";
const SUN_RAYS =
  "M22 11.6v2.2M22 30.2v2.2M11.6 22h2.2M30.2 22h2.2M14.6 14.6l1.6 1.6M27.8 27.8l1.6 1.6M14.6 29.4l1.6-1.6M27.8 16.2l1.6-1.6";

export default function ThemeToggle() {
  const id = useId().replace(/:/g, "");
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Switch light or dark theme">
      <svg className="seal" width="42" height="42" viewBox="0 0 44 44" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-sheen`} cx="34%" cy="28%" r="78%">
            <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.32" />
          </radialGradient>
        </defs>
        <path className="seal-wax" d={WAX} />
        <path d={WAX} fill={`url(#${id}-sheen)`} />
        {/* pressed rim: a dark groove with a light lip just inside it */}
        <circle cx="22" cy="22" r="13.6" fill="none" stroke="#000" strokeOpacity="0.3" strokeWidth="1.4" />
        <circle cx="22.4" cy="22.6" r="12.5" fill="none" stroke="#fff" strokeOpacity="0.16" strokeWidth="0.9" />
        <g className="seal-mark" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <g className="icon-moon">
            <path d={MOON} transform="translate(0.5 0.6)" stroke="#000" strokeOpacity="0.35" />
            <path d={MOON} />
          </g>
          <g className="icon-sun">
            <g transform="translate(0.5 0.6)" stroke="#000" strokeOpacity="0.35">
              <circle cx="22" cy="22" r="4.4" />
              <path d={SUN_RAYS} />
            </g>
            <circle cx="22" cy="22" r="4.4" />
            <path d={SUN_RAYS} />
          </g>
        </g>
      </svg>
    </button>
  );
}
