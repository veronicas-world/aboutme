import { redirect } from "next/navigation";

// Individual project pages are retired; send to Writings.
export const dynamic = "force-dynamic";

export default function ProjectRedirectPage() {
  redirect("/writings");
}
