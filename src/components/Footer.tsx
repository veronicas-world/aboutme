import { site, contact } from "@/content/site";

export default function Footer() {
  // Only show contact links that have a real destination set.
  const links = contact.filter((c) => c.href && c.href !== "#");

  return (
    <div className="footer-band">
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        {links.length > 0 && (
          <div className="footer-contact">
            {links.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {c.label}
                <span aria-hidden="true"> ↗</span>
              </a>
            ))}
          </div>
        )}
        <footer className="footer">
          <span>
            {site.name} · {site.location}
          </span>
          <span>{site.established}</span>
        </footer>
      </div>
    </div>
  );
}
