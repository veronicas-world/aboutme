"use client";

import { useState } from "react";
import Link from "next/link";
import GoldenRecord from "./GoldenRecord";
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
          {imgOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/golden-record.png"
              alt="Voyager Golden Record"
              width={55}
              height={55}
              className="record-spin"
              style={{ width: 55, height: 55, borderRadius: "50%", objectFit: "cover", display: "block" }}
              onError={() => setImgOk(false)}
            />
          ) : (
            <GoldenRecord />
          )}
        </Link>
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
