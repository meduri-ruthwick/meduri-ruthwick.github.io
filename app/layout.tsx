import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruthwick Meduri | Computational Genomics",
  description:
    "PhD researcher in computational genomics — CAGE-seq, regulatory element discovery, and deep learning for gene expression.",
  keywords: ["computational genomics", "CAGE-seq", "regulatory genomics", "deep learning", "bioinformatics"],
  authors: [{ name: "Ruthwick Meduri" }],
  openGraph: {
    title: "Ruthwick Meduri | Computational Genomics",
    description: "Decoding the language of gene regulation.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper text-ink">
        {/* Global SVG filter defs — watercolor-gentle used only in hero wash */}
        <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
          <defs>
            <filter id="wc-wash" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" seed="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
