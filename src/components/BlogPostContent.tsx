"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface Props {
  content: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-display text-3xl font-bold text-text-primary mt-10 mb-4 pb-3 border-b border-border">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display text-2xl font-bold text-text-primary mt-10 mb-4 pb-2 border-b border-border/60">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-xl font-semibold text-text-primary mt-8 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-display text-base font-semibold text-text-primary mt-6 mb-2 uppercase tracking-wide">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-text-secondary leading-relaxed mb-5">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-indigo hover:text-accent-cyan underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-4 space-y-2 list-none">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-5 space-y-2 list-decimal text-text-secondary">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-text-secondary flex gap-2 items-start">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-indigo shrink-0" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent-indigo pl-5 my-6 bg-accent-indigo/5 py-3 pr-4 rounded-r-lg">
      <div className="text-text-secondary italic">{children}</div>
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="font-mono text-sm text-accent-cyan bg-bg-secondary/80 border border-border px-1.5 py-0.5 rounded"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className="font-mono text-sm" {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-6 rounded-xl bg-bg-secondary border border-border overflow-x-auto">
      <div className="flex items-center gap-1.5 px-4 pt-3 pb-2 border-b border-border/50">
        <span className="w-3 h-3 rounded-full bg-red-500/60" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <span className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="p-5 text-text-secondary text-sm leading-relaxed">
        {children}
      </div>
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm text-text-secondary">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-bg-secondary text-text-primary text-xs uppercase tracking-wider">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 border-t border-border/50">{children}</td>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-bg-glass transition-colors">{children}</tr>
  ),
  hr: () => (
    <hr className="my-8 border-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-text-secondary">{children}</em>
  ),
};

export default function BlogPostContent({ content }: Props) {
  return (
    <div className="prose-custom">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
