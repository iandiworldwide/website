import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/sections/ContactSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import Intro from "@/components/Intro";
import RevealObserver from "@/components/RevealObserver";
import { siteConfig } from "@/lib/content";
import { jsonLd, siteGraph } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// Body: ABC Favorit (Dinamo) is licensed and not bundled. Instrument Sans is
// the closest free stand-in — a plain grotesque at the same weight — and is
// self-hosted by next/font.
const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Headings and wordmark: ABC Camera (Dinamo) is licensed and not bundled.
// Bricolage Grotesque is the closest free stand-in — a grotesque with real
// ink traps, echoing ABC Camera's light traps. 700 is used by the wordmark only.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

/*
  What search engines and social cards read on the home page, and what every
  other page inherits unless it says otherwise. The site address makes the
  canonical link, the card address and the sitemap absolute. The card image
  is app/opengraph-image.tsx and the icons are the files beside it.
*/
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    url: "/",
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large" } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} ${bricolage.variable}`}>
      {/* Bottom padding clears the fixed navigation bar. */}
      <body className="min-h-screen bg-surface pb-header font-body text-body text-ink">
        {/* The practice, its founder and the site, for search engines. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteGraph()) }}
        />
        <Intro />
        <RevealObserver />
        <Header />
        <main>{children}</main>
        {/* The way in, at the foot of every page, and beneath it the list. */}
        <ContactSection />
        <NewsletterSection />
        <Footer />
      </body>
    </html>
  );
}
