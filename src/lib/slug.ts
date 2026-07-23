// Turn heading text into a URL-safe anchor id. Used both by Article (to id each
// <h2>) and by extractToc (to build the sidebar links) so the two always agree.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
