'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050509]/80 backdrop-blur-md border-b border-[#1a1a2e]">
      <nav className="section-container flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold text-[#e11d48]">
          NovQ
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span
            className={`w-6 h-0.5 bg-[#f5f5f7] transition-all ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#f5f5f7] transition-all ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#f5f5f7] transition-all ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#music" className="btn-ghost">
            Music
          </Link>
          <Link href="/#about" className="btn-ghost">
            About
          </Link>
          <Link href="/#press" className="btn-ghost">
            Press
          </Link>
          <Link href="/#links" className="btn-ghost">
            Links
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#1a1a2e] px-4 py-4">
          <Link href="/#music" className="block py-2 btn-ghost">
            Music
          </Link>
          <Link href="/#about" className="block py-2 btn-ghost">
            About
          </Link>
          <Link href="/#press" className="block py-2 btn-ghost">
            Press
          </Link>
          <Link href="/#links" className="block py-2 btn-ghost">
            Links
          </Link>
        </div>
      )}
    </header>
  );
}
