import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* Renders a Markdown essay body with the parchment article styling.
   Images use plain <img> (remote Substack CDN urls) — fine for this use. */
export default function Article({ content }: { content: string }) {
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
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
