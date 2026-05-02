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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#050509]">
      {/* Background Video - Responsive */}
      {backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
          }}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#1a1a2e] via-[#0a0a0f] to-[#050509]" />
      )}

      {/* Overlay - Responsive Darkness */}
      <div className="absolute inset-0 w-full h-full bg-black/30 md:bg-black/40 lg:bg-black/50" />

      {/* Content - Fully Responsive */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 text-center max-w-4xl mx-auto">
        {/* Heading - Mobile First Sizing */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black leading-tight text-[#f5f5f7] mb-4 sm:mb-6 md:mb-8 animate-fade-in">
          {heading}
        </h1>

        {/* Subheading - Responsive Typography */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-300 mb-8 sm:mb-10 md:mb-12 lg:mb-16 font-light tracking-wide">
          {subheading}
        </p>

        {/* CTA Buttons - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center sm:items-stretch">
          <Link
            href="/#music"
            className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-4 text-sm sm:text-base md:text-lg font-semibold bg-[#e11d48] text-white rounded-lg hover:bg-[#fb7185] transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Listen Now
          </Link>
          <Link
            href="/#press"
            className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-4 text-sm sm:text-base md:text-lg font-semibold border-2 border-[#1a1a2e] text-[#f5f5f7] rounded-lg hover:bg-[#1a1a2e] hover:border-[#e11d48] transition-all duration-200"
          >
            Explore EPK
          </Link>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on Very Small Screens */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
