"use client";

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownDisplayProps {
  content: string;
  className?: string;
}

export default function MarkdownDisplay({ content, className }: MarkdownDisplayProps) {
  // 使用客戶端渲染策略，避免水合錯誤
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // 在客戶端渲染前返回一個佔位符
  if (!isMounted) {
    return <div className={`prose prose-sm sm:prose-base max-w-none dark:prose-invert ${className || ''}`} />;
  }
  
  return (
    <div suppressHydrationWarning>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className={`prose prose-sm sm:prose-base max-w-none dark:prose-invert ${className || ''}`}
        components={{
          // 自定義連結在新標籤頁打開
          a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />,
          // 為段落元素添加抑制水合警告
          p: ({node, ...props}) => <p suppressHydrationWarning {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
