"use client";

import { useState } from "react";
import ArtworkGrid from "@/components/ArtworkGrid";
import PlacementCaption from "@/components/PlacementCaption";
import {
  placementCategories,
  placements,
  placementsContent,
  type PlacementCategory,
} from "@/lib/content";

// Only offer a filter that has work behind it, so removing the last piece in
// a category quietly drops its filter and adding one brings it back.
const available = placementCategories.filter(
  (category) =>
    category.value === "all" || placements.some((work) => work.category === category.value),
);

export default function PlacementsSection() {
  const [selected, setSelected] = useState<PlacementCategory | "all">("all");

  const filtered =
    selected === "all" ? placements : placements.filter((work) => work.category === selected);

  return (
    <section id="placements" aria-labelledby="placements-heading" className="section">
      <div data-reveal className="grid gap-md px-xs md:grid-cols-4 md:px-md">
        <h2 id="placements-heading">{placementsContent.title}</h2>
        <p className="md:col-span-2">{placementsContent.intro}</p>
      </div>

      {/* Filters are plain text; the active one keeps its rule. */}
      <ul
        aria-label={placementsContent.filterLabel}
        className="mt-lg flex flex-wrap gap-md px-xs md:px-md"
      >
        {available.map((category) => (
          <li key={category.value}>
            <button
              type="button"
              aria-pressed={selected === category.value}
              onClick={() => setSelected(category.value)}
              className="link-sweep"
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-md">
        <ArtworkGrid
          label={placementsContent.gridLabel}
          items={filtered.map((work) => ({
            id: work.id,
            image: work.image,
            alt: `${work.title} by ${work.artist}`,
            caption: <PlacementCaption work={work} />,
          }))}
        />
      </div>
    </section>
  );
}
