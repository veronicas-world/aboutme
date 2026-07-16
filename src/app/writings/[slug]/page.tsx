import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Article from "@/components/Article";
import { getPost, formatDate } from "@/lib/posts";
import { categories } from "@/content/site";

// Posts flagged `full: true` are hosted on-site; everything else links out to
// Substack (any such per-post URL redirects there).
export const dynamic = "force-dynamic";

const labelFor = (id: string) =>
  categories.find((c) => c.id === id)?.label ?? id;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || !post.full) return { title: "Veronica Agudelo" };
  return {
    title: `${post.title} · Veronica Agudelo`,
    description: post.subtitle || post.excerpt || post.title,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  if (!post.full) {
    if (post.substackUrl) redirect(post.substackUrl);
    redirect("/writings");
  }

  return (
    <main className="wrap" style={{ paddingTop: 46, paddingBottom: 48 }}>
      <Link
        href="/writings"
        className="mono"
        style={{
          display: "inline-block",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--sepia)",
          marginBottom: 30,
        }}
      >
        ← Writings
      </Link>

      <div className="col post-full" style={{ maxWidth: 720, margin: "0 auto" }}>
        <div
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--sepia-3)",
            marginBottom: 16,
          }}
        >
          {labelFor(post.category)} · {formatDate(post.date)}
        </div>
        <h1
          style={{
            fontWeight: 300,
            fontSize: "clamp(30px,4.4vw,48px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: "0 0 14px",
          }}
        >
          {post.title}
        </h1>
        {post.subtitle && (
          <p
            style={{
              fontSize: 21,
              lineHeight: 1.4,
              color: "var(--sepia)",
              margin: "0 0 34px",
            }}
          >
            {post.subtitle}
          </p>
        )}
        <Article content={post.content} />
      </div>
    </main>
  );
}
