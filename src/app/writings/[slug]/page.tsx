import { redirect, notFound } from "next/navigation";
import { getPost } from "@/lib/posts";

// Writings link out to Substack. Any old per-post URL redirects there.
// Dynamic (not prerendered) so the redirect emits a real 307 Location header.
export const dynamic = "force-dynamic";

export default function PostRedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();
  if (post.substackUrl) redirect(post.substackUrl);
  redirect("/writings");
}
