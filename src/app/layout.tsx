import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovQ - Music Producer & Artist",
  description: "Discover the cinematic soundscapes of NovQ, an innovative music producer and artist.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#050509] text-[#f5f5f7] min-h-full">{children}</body>
    </html>
  );
}
