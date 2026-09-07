import type { Metadata } from "next";
import PlacementsSection from "@/components/sections/PlacementsSection";

export const metadata: Metadata = { title: "Placements — I&I Worldwide" };

export default function PlacementsPage() {
  return (
    <div>
      <PlacementsSection />
    </div>
  );
}
