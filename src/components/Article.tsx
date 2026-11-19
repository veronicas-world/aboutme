import ReactMarkdown from "react-markdown";
import type { ReactNode } from "react";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/slug";

/* Renders a Markdown essay body with the parchment article styling.
   Images use plain <img> (remote Substack CDN urls) — fine for this use.
   Each <h2> gets a slug id so the table of contents can link to it. */

function nodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (typeof node === "object" && "props" in node) {
    return nodeText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

export default function Article({
  content,
  dropCap = false,
}: {
  content: string;
  dropCap?: boolean;
}) {
  // Only a real opening paragraph gets the drop cap: skip image-only, italic
  // notes, and one-line "read on Substack" stubs.
  let dropped = !dropCap;
  return (
    <div className="article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          img: ({ node, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img loading="lazy" {...props} alt={props.alt || ""} />
          ),
          a: ({ node, ...props }) => (
            <a target="_blank" rel="noopener noreferrer" {...props} />
          ),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          p: ({ node, children, ...props }) => {
            const first = Array.isArray(children) ? children[0] : children;
            if (
              !dropped &&
              typeof first === "string" &&
              /^[A-Za-z]/.test(first) &&
              nodeText(children).length > 160
            ) {
              dropped = true;
              return (
                <p className="dropcap" {...props}>
                  {children}
                </p>
              );
            }
            return <p {...props}>{children}</p>;
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          h2: ({ node, children, ...props }) => (
            <h2 id={slugify(nodeText(children))} {...props}>
              {children}
            </h2>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
