import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GenerativeTree from "@/components/GenerativeTree";
import RevealObserver from "@/components/RevealObserver";
import { siteConfig } from "@/lib/content";
import "./globals.css";

// Body: Editorial New Regular is the system face. Fraunces at 400 is the
// open substitute named in DESIGN.md; it is self-hosted by next/font.
const fraunces = Fraunces({
  variable: "--font-fraunces",
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
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${bricolage.variable}`}>
      <body className="min-h-screen bg-surface font-editorial text-body text-ink">
        <RevealObserver />
        <Header />
        {/* Bottom padding clears the fixed 63px footer. */}
        <main className="pb-header">{children}</main>
        {/* Small looping tree pinned above the footer, bottom right. */}
        <GenerativeTree />
        <Footer />
      </body>
    </html>
  );
}
