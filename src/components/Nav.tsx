"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import NavTintin from "./NavTintin";
import { nav } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  // if the photo fails (flaky mobile/in-app browsers), retry with a
  // cache-busting URL instead of falling back to a drawing
  const [retry, setRetry] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  // an image that failed before React hydrated never fires onError, so check
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setRetry((n) => n + 1);
  }, [retry]);
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link
          href="/"
          className="nav-brand"
          aria-label="Veronica Agudelo, home"
          onClick={() => setOpen(false)}
        >
          <span
            className="record-spin"
            style={{
              position: "relative",
              display: "grid",
              placeItems: "center",
              width: 55,
              height: 55,
              flexShrink: 0,
              borderRadius: "50%",
              // dark-gold disc shown only for the instant before the photo paints
              background: "radial-gradient(circle at 40% 35%, #8a6a2a 0%, #3a2a10 55%, #1a1208 100%)",
            }}
          >
            {retry < 3 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={retry}
                ref={imgRef}
                src={retry === 0 ? "/golden-record-nav.png" : `/golden-record-nav.png?r=${retry}`}
                alt="Voyager Golden Record"
                width={55}
                height={55}
                loading="eager"
                fetchPriority="high"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: 55,
                  height: 55,
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={() => setRetry((n) => n + 1)}
              />
            )}
          </span>
        </Link>
        <NavTintin />
        <button
          className="nav-toggle mono"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span style={{ fontSize: 12, letterSpacing: "0.12em" }}>
            {open ? "CLOSE" : "MENU"}
          </span>
        </button>
        <nav className={`nav-links${open ? " open" : ""}`}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
