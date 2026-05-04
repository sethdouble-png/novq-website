import type { Metadata } from "next";
import Head from 'next/head';
import "./globals.css";

export const metadata: Metadata = {
  title: "NovQ - Music Producer & Artist",
  description: "Discover the cinematic soundscapes of NovQ, an innovative music producer and artist.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "@id": "https://www.novq.org/#artist",
  "name": "NovQ",
  "alternateName": ["NovQ Music", "Nuwamanya Seth"],
  "url": "https://www.novq.org",
  "image": "https://amuuotezgxojzolhsauy.supabase.co/storage/v1/object/public/novq-media/images/cb0a2496-b9cc-4854-be10-1b0b8d561379-WhatsApp%20Image%202026-04-29%20at%203.32.15%20PM.jpeg",
  "description": "NovQ (born Nuwamanya Seth, September 24, 2003) is a Dubai-based artist and producer blending cinematic soundscapes with emotional storytelling. His music explores themes of healing, identity, and inner conflict, delivered through atmospheric production and raw, vulnerable vocals.",
  "genre": ["Alternative Pop", "R&B", "Cinematic", "Digital Soul"],
  "foundingLocation": "Dubai, UAE",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.novq.org"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.novq.org/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "sameAs": [
    "https://www.tiktok.com/@novqmusicofficial",
    "https://youtube.com/@novqmusicofficial",
    "https://open.spotify.com/artist/0tTUax3QAKEjkSzwwAAD0F",
    "https://music.apple.com/ae/artist/novq/1875003962"
  ],
  "member": {
    "@type": "Person",
    "@id": "https://www.novq.org/#person",
    "name": "Nuwamanya Seth",
    "birthDate": "2003-09-24",
    "birthPlace": {
      "@type": "Place",
      "name": "Mbarara, Uganda"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "United Arab Emirates"
    },
    "sameAs": [
      "https://www.tiktok.com/@novqmusicofficial",
      "https://youtube.com/@novqmusicofficial",
      "https://open.spotify.com/artist/0tTUax3QAKEjkSzwwAAD0F",
      "https://music.apple.com/ae/artist/novq/1875003962"
    ]
  },
  "album": [
    {
      "@type": "MusicRecording",
      "name": "Before the Clocks All Chimed",
      "url": "https://www.novq.org",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "NovQ"
      }
    },
    {
      "@type": "MusicRecording",
      "name": "Pavement Secrets",
      "url": "https://www.novq.org",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "NovQ"
      }
    },
    {
      "@type": "MusicRecording",
      "name": "Not Good at Letting Go",
      "url": "https://www.novq.org",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "NovQ"
      }
    }
  ],
  "parentOrganization": {
    "@type": "Organization",
    "name": "NovQ Music",
    "url": "https://www.novq.org",
    "logo": "https://www.novq.org/logo.png"
  }
})
          }}
        />
      </Head>
      <body className="bg-[#050509] text-[#f5f5f7] min-h-full">{children}</body>
    </html>
  );
}
