'use client';

interface SpotifyEmbedProps {
  spotifyUrl: string;
  height?: number;
}

export default function SpotifyEmbed({ spotifyUrl, height = 352 }: SpotifyEmbedProps) {
  // Extract track ID from Spotify URL
  const trackId = spotifyUrl.match(/track\/(\w+)/)?.[1];

  if (!trackId) {
    return (
      <div className="bg-[#1a1a2e] rounded-lg p-8 text-center text-gray-400">
        Invalid Spotify URL
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg">
      <iframe
        style={{ borderRadius: '12px' }}
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
        width="100%"
        height={height}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
