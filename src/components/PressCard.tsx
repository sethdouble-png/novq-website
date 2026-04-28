'use client';

import { PressItem } from '@/lib/types';
import ImageWithFallback from './ImageWithFallback';
import Link from 'next/link';

interface PressCardProps {
  item: PressItem;
}

export default function PressCard({ item }: PressCardProps) {
  return (
    <div className="card group">
      {item.image_url && (
        <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-lg">
          <ImageWithFallback
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <h3 className="text-lg font-bold text-[#f5f5f7] mb-2">{item.title}</h3>

      {item.description && (
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">
          {item.description}
        </p>
      )}

      {item.link_url && (
        <Link
          href={item.link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e11d48] hover:text-[#fb7185] text-sm font-semibold transition-colors"
        >
          Read More →
        </Link>
      )}
    </div>
  );
}
