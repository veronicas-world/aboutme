import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { slugify } from "./slug";

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
  archived?: boolean;
  full?: boolean;
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
    archived: data.archived || false,
    full: data.full || false,
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .filter((p) => !p.archived)
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

export type TocItem = { id: string; text: string };

// Pull the `## ` (h2) section headings out of a markdown body for the on-page
// table of contents. Ids are the same slugs Article assigns to each <h2>, so
// the sidebar links line up with the rendered headings.
export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  for (const line of markdown.split("\n")) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[1].trim();
    items.push({ id: slugify(text), text });
  }
  return items;
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
