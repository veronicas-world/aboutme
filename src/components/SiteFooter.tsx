import Link from "next/link";
import { nav, site } from "@/content/site";
import SpinningGoldenRecord from "@/components/SpinningGoldenRecord";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link href="/" className="site-footer-name">
            {site.name}
          </Link>
          <SpinningGoldenRecord />
        </div>
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
