"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeTree from "@/components/HomeTree";
import { nav } from "@/content/site";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  return (
    <header
      className="site-nav"
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <nav id="site-navigation" className="site-nav-inner" aria-label="Main" tabIndex={-1}>
        <Link
          href="/#top"
          prefetch={false}
          className="site-nav-home"
          aria-current={isHome ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          <HomeTree />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="site-nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav-links"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <div id="site-nav-links" className="site-nav-links">
          {nav.map(({ href, label }) => {
            const current = pathname === href;
            const active = current || pathname?.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={active ? "active" : undefined}
                aria-current={current ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
