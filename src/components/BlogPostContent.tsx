import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Typography comes from the shared `.article` styles in globals.css,
// so markdown posts and Medium posts read exactly the same.
export default function BlogPostContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
