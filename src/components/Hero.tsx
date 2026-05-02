'use client';

import Link from 'next/link';

interface HeroProps {
  heading?: string;
  subheading?: string;
  backgroundImage?: string | null;
  backgroundVideo?: string | null;
}

export default function Hero({
  heading = 'NovQ',
  subheading = 'Music Producer & Artist',
  backgroundImage,
  backgroundVideo,
}: HeroProps) {
  return (
    <section className="relative w-full h-screen max-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Video */}
      {backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: 'fixed',
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#050509]" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="mb-6 font-black leading-tight text-[#f5f5f7] animate-fade-in">
          {heading}
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">
          {subheading}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#music"
            className="btn-primary"
          >
            Listen Now
          </Link>
          <Link
            href="/#press"
            className="btn-secondary"
          >
            Explore EPK
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
