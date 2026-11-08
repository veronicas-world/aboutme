import type { Metadata } from "next";
import Link from "next/link";
import { categories, site } from "@/content/site";
import { formatDate, getAllPostMeta, type PostMeta } from "@/lib/posts";
import styles from "./design-preview.module.css";

export const metadata: Metadata = {
  title: "Local Design Preview · Veronica Agudelo",
  description: "A private, unlinked preview of optional design details.",
  robots: { index: false, follow: false },
};

const topics = [
  { label: "APPLIED AI", className: styles.appliedAi },
  { label: "WORLD MODELS", className: styles.worldModels },
  { label: "ROBOTICS", className: styles.robotics },
  { label: "DRUG DISCOVERY", className: styles.drugDiscovery },
  { label: "SPACE ECONOMY", className: styles.spaceEconomy },
  { label: "CYBERSECURITY", className: styles.cybersecurity },
];

function NoteContent({ post }: { post: PostMeta }) {
  const category =
    categories.find((item) => item.id === post.category)?.label ?? post.category;

  return (
    <>
      <span className={styles.noteStar} aria-hidden="true" />
      <span className={styles.noteBody}>
        <span className={styles.noteMeta}>
          {category} <span aria-hidden="true">·</span> {formatDate(post.date)}
        </span>
        <span className={styles.noteTitle}>{post.title}</span>
        {post.subtitle && (
          <span className={styles.noteSubtitle}>{post.subtitle}</span>
        )}
      </span>
      <span className={styles.noteArrow} aria-hidden="true">
        ↗
      </span>
    </>
  );
}

function NoteRow({ post }: { post: PostMeta }) {
  if (post.full) {
    return (
      <Link href={`/writings/${post.slug}`} className={styles.note}>
        <NoteContent post={post} />
      </Link>
    );
  }

  if (post.substackUrl) {
    return (
      <a
        href={post.substackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.note}
      >
        <NoteContent post={post} />
      </a>
    );
  }

  return (
    <div className={styles.note}>
      <NoteContent post={post} />
    </div>
  );
}

export default function DesignPreviewPage() {
  const paragraphs = site.heroLead.split("\n\n");
  const recentPosts = getAllPostMeta().slice(0, 3);

  return (
    <main className={`wrap ${styles.preview}`}>
      <header className={styles.previewHeader}>
        <p className={styles.kicker}>LOCAL PREVIEW · NOT IN THE NAV</p>
        <h1>A few small details, in context.</h1>
        <p className={styles.introCopy}>
          This page uses your existing site shell, palette, type, and copy. It
          previews optional accents in the places they could naturally live.
          Your homepage and shared styles are unchanged.
        </p>
        <Link href="/" className={styles.backLink}>
          ← Back to the current homepage
        </Link>
      </header>

      <section className={styles.homeSample} aria-labelledby="home-sample-title">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionKicker}>01 / HOMEPAGE · CURRENT COPY</p>
          <h2 id="home-sample-title">{site.name}</h2>
        </div>
        <div className={styles.bio}>
          {paragraphs.slice(0, 2).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.interestBlock}>
          <div className={styles.interestHeading}>
            <span className={styles.interestKicker}>OPTIONAL QUICK INDEX</span>
            <span className={styles.interestCaption}>
              A visual echo of the paragraph, not a replacement for it
            </span>
          </div>
          <div
            className={styles.constellation}
            role="img"
            aria-label="A small constellation diagram of six technology interests"
          >
            <svg
              className={styles.connections}
              viewBox="0 0 1000 240"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="500" y1="120" x2="500" y2="22" />
              <line x1="500" y1="120" x2="825" y2="65" />
              <line x1="500" y1="120" x2="825" y2="175" />
              <line x1="500" y1="120" x2="500" y2="220" />
              <line x1="500" y1="120" x2="175" y2="175" />
              <line x1="500" y1="120" x2="175" y2="65" />
            </svg>
            <span className={styles.mapCenter}>TECH INTERESTS</span>
            {topics.map((topic) => (
              <span
                key={topic.label}
                className={`${styles.mapTopic} ${topic.className}`}
              >
                {topic.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.writingSample}
        aria-labelledby="writing-sample-title"
      >
        <div className={styles.sectionHeading}>
          <p className={styles.sectionKicker}>02 / WRITINGS · OPTIONAL TREATMENT</p>
          <h2 id="writing-sample-title">Field notes</h2>
          <p className={styles.sectionDescription}>
            The existing writing list, using real titles and dates. Just a
            quieter index: fine rules, small metadata, and one pixel accent.
          </p>
        </div>
        <div className={styles.starRule} aria-hidden="true">
          <span />
        </div>
        <div className={styles.noteList}>
          {recentPosts.map((post) => (
            <NoteRow key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <aside className={styles.keepNote}>
        <span className={styles.noteDot} aria-hidden="true" />
        <p>
          The active-page sparkle is already in your navigation. This preview
          keeps that existing detail and focuses on the optional content
          treatments above.
        </p>
      </aside>
    </main>
  );
}
