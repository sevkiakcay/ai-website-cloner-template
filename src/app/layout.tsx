import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://akcaypalet.com";
const siteName = "Akçay Palet";
const title = "Akçay Palet — Ahşap Palet Üreticisi | Salihli, Manisa";
const description =
  "Akçay Orman Ürünleri İnşaat Sanayi ve Ticaret A.Ş. Isıl işlemli ve işlem görmemiş ahşap palet üretimi. EPAL, TURPAL, ihracat ve özel ölçü palet çözümleri. Salihli, Manisa.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Akçay Palet",
  },
  description,
  keywords: [
    "ahşap palet",
    "palet üreticisi",
    "Salihli palet",
    "Manisa palet",
    "ihracat paleti",
    "ısıl işlemli palet",
    "özel ölçü palet",
    "EPAL palet",
    "TURPAL palet",
  ],
  authors: [{ name: siteName }],
  applicationName: siteName,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName,
    title,
    description,
    images: [
      {
        url: "/seo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Akçay Palet — Ahşap Palet Üreticisi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/seo/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Akçay Orman Ürünleri İnşaat Sanayi ve Ticaret A.Ş.",
  alternateName: "Akçay Palet",
  url: siteUrl,
  description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Salihli",
    addressRegion: "Manisa",
    addressCountry: "TR",
  },
  areaServed: "TR",
  knowsAbout: [
    "Ahşap palet üretimi",
    "EPAL paletler",
    "TURPAL paletler",
    "ISPM-15 ısıl işlem",
    "İhracat ambalajı",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background">
        {children}
      </body>
    </html>
  );
}
