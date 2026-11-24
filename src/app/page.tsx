import HomeOpening from "@/components/HomeOpening";
import { site } from "@/content/site";

// Turns [text](url) in a bio paragraph into an external link.
function withLinks(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let index = 0;
  // Each word gets its own span so the opening can find where it belongs.
  const words = (value: string) => value.split(/(\s+)/).map((word) =>
    !word || /^\s+$/.test(word) ? word : <span key={index++} className="intro-word">{word}</span>
  );
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(...words(text.slice(last, m.index)));
    parts.push(
      <a
        key={`link-${m.index}`}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-inline-link"
      >
        {words(m[1])}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(...words(text.slice(last)));
  return parts;
}

export default function Home() {
  const heroParas = site.heroLead.split("\n\n");

  return (
    <HomeOpening>
      {heroParas.map((para, i) => (
        <p key={i}>{withLinks(para)}</p>
      ))}
    </HomeOpening>
  );
}
