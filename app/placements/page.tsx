import type { Metadata } from "next";
import { placementsContent } from "@/lib/content";
import PlacementsSection from "@/components/sections/PlacementsSection";

export const metadata: Metadata = { title: placementsContent.metaTitle };

export default function PlacementsPage() {
  return (
    <div>
      <PlacementsSection />
    </div>
  );
}
