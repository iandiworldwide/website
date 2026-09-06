import type { Metadata } from "next";
import Link from "next/link";
import PlacementsSection from "@/components/sections/PlacementsSection";
import { placementsContent } from "@/lib/content";

export const metadata: Metadata = { title: "Placements — I&I Worldwide" };

export default function PlacementsPage() {
  return (
    <div className="pt-header">
      <PlacementsSection />
      <section className="section px-xs md:px-md">
        <div data-reveal className="grid gap-md md:grid-cols-4">
          <h2>{placementsContent.ctaLabel}</h2>
          <p className="md:col-span-2">
            <Link href={placementsContent.ctaLink} className="cta">
              {placementsContent.cta}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
