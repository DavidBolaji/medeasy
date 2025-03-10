'use client';
import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';

export default function SafeHTML({ content }: { content: HTMLElement }) {
  const sanitizedContent = useMemo(
    () => ({
      __html: DOMPurify.sanitize(content),
    }),
    [content]
  );

  return (
    <div
      dangerouslySetInnerHTML={sanitizedContent}
      className="content font-instrument"
    />
  );
}
