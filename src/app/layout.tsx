import type { Metadata } from "next";
import { Inter, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

// Typography Variant B candidate — restrained, technical display face for
// headings only; body stays on Inter. Weights kept minimal (500/600/700 —
// only what headings actually use) to avoid a heavy performance penalty.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Akçay Palet | Ahşap Palet Üretimi",
  description:
    "Akçay Palet — EUR/EPAL ölçü standardında ahşap palet üretimi. İhracat paletleri ISPM-15 uyumlu ısıl işlem sürecinden geçer, standart ve özel ölçülerde üretim yapılır.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          İçeriğe geç
        </a>
        {children}
      </body>
    </html>
  );
}
