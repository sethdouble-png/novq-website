'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1a1a2e] bg-[#050509]/50 mt-24">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between py-12">
          <div className="mb-8 md:mb-0">
            <p className="text-sm text-gray-500">
              © {currentYear} NovQ. All rights reserved.
            </p>
          </div>

          <div className="flex gap-8 text-sm">
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
