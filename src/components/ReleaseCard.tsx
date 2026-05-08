'use client';

import { Release } from '@/lib/types';
import ImageWithFallback from './ImageWithFallback';
import SpotifyEmbed from './SpotifyEmbed';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ReleaseCardProps {
  release: Release;
}

const getCountdown = (releaseDate: string) => {
  const target = new Date(releaseDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (Number.isNaN(target) || diff <= 0) {
    return 'Releasing soon';
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export default function ReleaseCard({ release }: ReleaseCardProps) {
  const [showEmbed, setShowEmbed] = useState(false);
  const [countdown, setCountdown] = useState('');
  const isSpotifyUrl = release.listen_url.includes('spotify.com');
  const isUpcoming = release.is_upcoming;

  useEffect(() => {
    if (!isUpcoming || !release.release_date) {
      return;
    }

    setCountdown(getCountdown(release.release_date));
    const interval = setInterval(() => {
      setCountdown(getCountdown(release.release_date));
    }, 1000);

    return () => clearInterval(interval);
  }, [isUpcoming, release.release_date]);

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
      {isUpcoming ? (
        <>
          {/* Upcoming with Listen Link */}
          {release.listen_url ? (
            <Link href={release.listen_url} target="_blank" rel="noopener noreferrer">
              <div className="card group cursor-pointer relative">
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-block px-3 py-1 bg-blue-950/50 text-blue-200 text-xs rounded-full border border-blue-800 font-semibold backdrop-blur-sm">
                    Coming Soon
                  </span>
                  {release.is_featured && (
                    <span className="inline-block ml-2 px-3 py-1 bg-yellow-950/50 text-yellow-200 text-xs rounded-full border border-yellow-800 font-semibold backdrop-blur-sm">
                      Featured
                    </span>
                  )}
                </div>

                <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={release.cover_image_url}
                    alt={release.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-lg">Preview Now</span>
                    {countdown && (
                      <span className="text-gray-200 text-xs mt-2 font-mono">{countdown}</span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#f5f5f7] group-hover:text-[#e11d48] transition-colors">
                  {release.title}
                </h3>

                {release.subtitle && (
                  <p className="text-sm text-gray-400 mt-1">{release.subtitle}</p>
                )}

                {release.release_date && (
                  <p className="text-xs text-[#e11d48] font-semibold mt-2">
                    Releases {new Date(release.release_date).toLocaleDateString()}
                  </p>
                )}

                {countdown && (
                  <p className="text-xs text-gray-300 mt-1">{countdown}</p>
                )}

                <div className="mt-4 inline-block btn-primary text-sm group-hover:translate-x-1 transition-transform">
                  Listen Preview →
                </div>
              </div>
            </Link>
          ) : (
            /* Upcoming WITHOUT Listen Link */
            <div className="card group cursor-not-allowed opacity-85 hover:opacity-100 transition-opacity">
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                <ImageWithFallback
                  src={release.cover_image_url}
                  alt={release.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-xl">Coming Soon</span>
                  {countdown && (
                    <span className="text-gray-200 text-sm mt-2 font-mono">{countdown}</span>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#f5f5f7]">
                {release.title}
              </h3>

              {release.subtitle && (
                <p className="text-sm text-gray-400 mt-1">{release.subtitle}</p>
              )}

              {release.release_date && (
                <>
                  <p className="text-xs text-[#e11d48] font-semibold mt-2">
                    Releases {new Date(release.release_date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    {countdown}
                  </p>
                </>
              )}

              {/* Status Badge */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="inline-block px-3 py-1 bg-blue-950/50 text-blue-200 text-xs rounded-full border border-blue-800 font-semibold">
                  Coming Soon
                </span>
                {release.is_featured && (
                  <span className="inline-block px-3 py-1 bg-yellow-950/50 text-yellow-200 text-xs rounded-full border border-yellow-800 font-semibold">
                    Featured
                  </span>
                )}
              </div>

              <div className="mt-4 inline-block px-4 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm cursor-not-allowed">
                Not Available Yet
              </div>
            </div>
          )}

          {/* Pre-Save / Pre-Order Buttons for Upcoming */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {release.pre_save_url && (
              <a
                href={release.pre_save_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-fit px-3 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-white rounded-lg text-xs font-semibold transition-colors text-center"
              >
                ♥ Pre-Save
              </a>
            )}
            {release.pre_order_url && (
              <a
                href={release.pre_order_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-fit px-3 py-2 bg-[#e11d48] hover:bg-[#f21e56] text-white rounded-lg text-xs font-semibold transition-colors text-center"
              >
                🛒 Pre-Order
              </a>
            )}
          </div>
        </>
      ) : (
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
                Released {new Date(release.release_date).toLocaleDateString()}
              </p>
            )}

            {/* Status Badges for Released Music */}
            {release.is_featured && (
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-block px-3 py-1 bg-yellow-950/50 text-yellow-200 text-xs rounded-full border border-yellow-800 font-semibold">
                  Featured
                </span>
              </div>
            )}

            <div className="mt-4 inline-block btn-primary text-sm hover:translate-x-1 transition-transform">
              Listen →
            </div>
          </div>
        </Link>
      )}

      {isSpotifyUrl && !isUpcoming && (
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
