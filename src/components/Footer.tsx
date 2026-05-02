'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1a1a2e] bg-[#050509]/50 mt-12 sm:mt-16 md:mt-24">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between py-6 sm:py-8 md:py-12 gap-6 md:gap-0">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
              © {currentYear} NovQ. All rights reserved.
            </p>
          </div>

          <div className="flex gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm">
            <Link href="/privacy" className="btn-ghost">
              Privacy
            </Link>
            <Link href="/terms" className="btn-ghost">
              Terms
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
