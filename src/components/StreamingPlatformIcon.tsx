'use client';

interface PlatformIconProps {
  url: string;
  className?: string;
}

const getPlatformInfo = (url: string) => {
  const urlLower = url.toLowerCase();

  if (urlLower.includes('spotify')) {
    return {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-12.009-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.059 10.561 18.42 12.84c.361.21.599.659.301 1.1zm.179-3.48c-3.9-2.3-10.319-2.519-14.02-.9-.479.12-1.02-.179-1.14-.659-.12-.48.179-1.02.659-1.14 4.101-1.739 11.1-1.5 15.501 1.039.479.299.899.981.601 1.58-.301.419-.901.599-1.401.3z" />
        </svg>
      ),
      label: 'Spotify',
    };
  }

  if (urlLower.includes('apple') || urlLower.includes('music.apple')) {
    return {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M16.365 1.43c-.077.07-1.706.739-3.059-.183-.986-.626-1.915-.61-2.33-.61-1.925 0-3.92 1.254-4.974 3.18-2.132 3.755-.554 9.332 1.523 12.397.904 1.432 1.975 3.045 3.374 2.984 1.37-.061 1.89-.896 3.548-.896 1.657 0 2.154.896 3.577.869 1.45-.028 2.373-1.459 3.283-2.9 1.142-1.85 1.617-3.646 1.636-3.74-.035-.015-3.146-1.207-3.157-4.783.008-2.05 1.367-3.807 3.053-4.745-.811-1.18-2.052-1.534-2.4-1.648z" />
        </svg>
      ),
      label: 'Apple Music',
    };
  }

  if (urlLower.includes('tiktok')) {
    return {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M15.2 0h-3.5v8.2a3.2 3.2 0 1 1-3.2 3.2H7.5a5.7 5.7 0 1 0 5.7-5.7V0zm3.9 7.6v3.1h2.5V7.6h-2.5z" />
        </svg>
      ),
      label: 'TikTok',
    };
  }

  if (urlLower.includes('audiomack')) {
    return {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.31 12.37c0 2.39-1.93 4.32-4.31 4.32-2.38 0-4.31-1.93-4.31-4.32 0-2.39 1.93-4.32 4.31-4.32h1.17c2.38 0 4.31 1.93 4.31 4.32z" />
        </svg>
      ),
      label: 'Audiomack',
    };
  }

  if (urlLower.includes('soundcloud')) {
    return {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M19.36 10.28a4.01 4.01 0 0 0-1.78.44 5.45 5.45 0 0 0-10.74 0A3.8 3.8 0 0 0 4 15.5c0 2.1 1.69 3.8 3.78 3.8h10.75c1.99 0 3.62-1.63 3.62-3.62 0-1.76-1.33-3.21-3.79-3.42z" />
        </svg>
      ),
      label: 'SoundCloud',
    };
  }

  if (urlLower.includes('youtube')) {
    return {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M21.8 7.2a2.72 2.72 0 0 0-1.92-1.92C17.2 5 12 5 12 5s-5.2 0-7.88.28A2.72 2.72 0 0 0 2.2 7.2 28.1 28.1 0 0 0 2 12a28.1 28.1 0 0 0 .2 4.8 2.72 2.72 0 0 0 1.92 1.92C6.8 19 12 19 12 19s5.2 0 7.88-.28a2.72 2.72 0 0 0 1.92-1.92A28.1 28.1 0 0 0 22 12a28.1 28.1 0 0 0-.2-4.8zM10 15.5V8.5l5 3-5 4z" />
        </svg>
      ),
      label: 'YouTube',
    };
  }

  if (urlLower.includes('instagram')) {
    return {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M17.5 2H6.5A4.5 4.5 0 0 0 2 6.5v11A4.5 4.5 0 0 0 6.5 22h11a4.5 4.5 0 0 0 4.5-4.5v-11A4.5 4.5 0 0 0 17.5 2zm-5.5 4.75a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm5.75-.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
      ),
      label: 'Instagram',
    };
  }

  // Default icon for unknown platforms
  return {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    label: 'Link',
  };
};

export default function StreamingPlatformIcon({ url, className = '' }: PlatformIconProps) {
  const { icon } = getPlatformInfo(url);

  return (
    <div className={`text-[#f5f5f7] group-hover:text-[#e11d48] transition-colors ${className}`}>
      {icon}
    </div>
  );
}
