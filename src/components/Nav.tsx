"use client";

import { useState } from "react";
import Link from "next/link";
import GoldenRecord from "./GoldenRecord";
import NavTintin from "./NavTintin";
import { nav } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [imgOk, setImgOk] = useState(true);
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
            }}
          >
            <GoldenRecord />
            {imgOk && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/golden-record-nav.png"
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
                onError={() => setImgOk(false)}
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
