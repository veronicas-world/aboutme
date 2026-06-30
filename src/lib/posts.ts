import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  category: string;
  excerpt?: string;
  substackUrl?: string;
  cover?: string;
  truncated?: boolean;
};

export type Post = PostMeta & { content: string };

// First markdown image in the body, used as the preview thumbnail.
function firstImage(content: string): string | undefined {
  const m = content.match(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/);
  return m ? m[1] : undefined;
}

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    subtitle: data.subtitle || undefined,
    date: data.date ?? "",
    category: data.category ?? "uncategorized",
    excerpt: data.excerpt || undefined,
    substackUrl: data.substackUrl || undefined,
    cover: data.cover || firstImage(content),
    truncated: data.truncated || false,
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostMeta(): PostMeta[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return getAllPosts().map(({ content, ...meta }) => meta);
}

export function getPost(slug: string): Post | undefined {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(POSTS_DIR, file))) return undefined;
  return readPost(file);
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
