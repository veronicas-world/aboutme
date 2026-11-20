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
    </footer>
  );
}
