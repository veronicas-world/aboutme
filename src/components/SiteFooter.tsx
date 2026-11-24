import Link from "next/link";
import WaveBand from "@/components/WaveBand";
import { site } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wave-band">
        <WaveBand />
        <Link href="/#top" className="wave-home-link" aria-label={`${site.name}, home`}>
          <svg viewBox="0 0 264 54" aria-hidden="true">
            <defs>
              <path id="footer-name-curve" d="M3 36C48 39 83 25 133 28S221 44 261 32" />
            </defs>
            <path className="wave-home-underline" d="M24 43C66 44 90 32 132 35S205 51 240 43" />
            <text textAnchor="middle">
              <textPath href="#footer-name-curve" startOffset="50%">{site.name}</textPath>
            </text>
          </svg>
        </Link>
      </div>
    </footer>
  );
}
