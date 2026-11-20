"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [retry, setRetry] = useState(0);
  const recordRef = useRef<HTMLImageElement>(null);

  // Retry if the image failed before hydration and React missed the error.
  useEffect(() => {
    const img = recordRef.current;
    if (img?.complete && img.naturalWidth === 0) setRetry((n) => n + 1);
  }, [retry]);

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
      <div className="site-nav-inner">
        <Link
          href="/"
          className="site-nav-brand"
          aria-label={`${site.name}, home`}
          onClick={() => setOpen(false)}
        >
          <span className="golden-record">
            {retry < 3 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={retry}
                ref={recordRef}
                src={retry === 0 ? "/golden-record-nav.png" : `/golden-record-nav.png?r=${retry}`}
                alt=""
                width={55}
                height={55}
                onError={() => setRetry((n) => n + 1)}
              />
            )}
          </span>
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
        <nav id="site-nav-links" className="site-nav-links" aria-label="Main">
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
        </nav>
      </div>
    </header>
  );
}
