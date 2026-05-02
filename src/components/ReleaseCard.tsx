'use client';

import { Release } from '@/lib/types';
import ImageWithFallback from './ImageWithFallback';
import SpotifyEmbed from './SpotifyEmbed';
import Link from 'next/link';
import { useState } from 'react';

interface ReleaseCardProps {
  release: Release;
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  const [showEmbed, setShowEmbed] = useState(false);
  const isSpotifyUrl = release.listen_url.includes('spotify.com');

  if (isSpotifyUrl && showEmbed) {
    return (
      <div className="card">
        <button
          onClick={() => setShowEmbed(false)}
          className="mb-4 text-sm text-gray-400 hover:text-[#e11d48] transition-colors"
        >
          ← Back
        </button>
        <SpotifyEmbed spotifyUrl={release.listen_url} />
      </div>
    );
  }

  return (
    <div>
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

      {isSpotifyUrl && (
        <button
          onClick={() => setShowEmbed(true)}
          className="mt-3 w-full py-2 text-sm bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg transition-colors font-semibold"
        >
          Play on Spotify
        </button>
      )}
    </div>
  );
}
