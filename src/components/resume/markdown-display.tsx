"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownDisplayProps {
  content: string;
  className?: string;
}

export default function MarkdownDisplay({ content, className }: MarkdownDisplayProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={`prose prose-sm sm:prose-base max-w-none dark:prose-invert ${className}`}
      components={{
        // Example: Customizing links to open in a new tab
        a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
