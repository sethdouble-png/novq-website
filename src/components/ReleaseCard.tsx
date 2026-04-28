'use client';

import { Release } from '@/lib/types';
import ImageWithFallback from './ImageWithFallback';
import Link from 'next/link';

interface ReleaseCardProps {
  release: Release;
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <Link href={release.listen_url} target="_blank" rel="noopener noreferrer">
      <div className="card group cursor-pointer">
        <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
          <ImageWithFallback
            src={release.cover_image_url}
            alt={release.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <h3 className="text-lg font-bold text-[#f5f5f7] group-hover:text-[#e11d48] transition-colors">
          {release.title}
        </h3>

        {release.subtitle && (
          <p className="text-sm text-gray-400 mt-1">{release.subtitle}</p>
        )}

        {release.release_date && (
          <p className="text-xs text-gray-500 mt-2">
            {new Date(release.release_date).toLocaleDateString()}
          </p>
        )}

        <div className="mt-4 inline-block btn-primary text-sm">
          Listen →
        </div>
      </div>
    </Link>
  );
}
