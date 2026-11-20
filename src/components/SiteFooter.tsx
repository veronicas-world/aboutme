import Link from "next/link";
import { nav, site } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link href="/" className="site-footer-name">
          {site.name}
        </Link>
        <nav className="site-footer-links" aria-label="Footer">
          {nav.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
      {/* Match the meadow image's center-bottom cover crop at every width. */}
      <svg
        className="site-footer-computer"
        viewBox="0 0 1751 898"
        preserveAspectRatio="xMidYMax slice"
      >
        <a
          className="site-footer-computer-link"
          href="https://en.wikipedia.org/wiki/Apple_I"
          aria-label="Read about the Apple I on Wikipedia"
        >
          <rect x="742" y="601" width="281" height="222" rx="10" />
        </a>
      </svg>
    </footer>
  );
}
