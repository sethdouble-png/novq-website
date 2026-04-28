'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  fallback?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  className = '',
  fallback = '🎵',
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`bg-[#0f0f15] border border-[#1a1a2e] flex items-center justify-center text-4xl ${className}`}
        style={
          width && height && !fill
            ? { width: `${width}px`, height: `${height}px` }
            : {}
        }
      >
        {fallback}
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={className}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      onError={() => setError(true)}
    />
  );
}
