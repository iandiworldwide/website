"use client";

import { useState } from "react";
import Link from "next/link";
import ArtworkGrid from "@/components/ArtworkGrid";
import PlacementCaption from "@/components/PlacementCaption";
import {
  placementCategories,
  placements,
  placementsContent,
  type PlacementCategory,
} from "@/lib/content";

export default function Placements() {
  const [selected, setSelected] = useState<PlacementCategory | "all">("all");

  const filtered =
    selected === "all" ? placements : placements.filter((work) => work.category === selected);

  return (
    <article className="py-lg">
      <section className="grid gap-md px-xs md:grid-cols-4 md:px-md">
        <h1>{placementsContent.title}</h1>
        <p className="md:col-span-2">{placementsContent.intro}</p>
      </section>

      {/* Filters are plain text; the active one is underlined. */}
      <ul
        aria-label={placementsContent.filterLabel}
        className="mt-lg flex flex-wrap gap-md px-xs md:px-md"
      >
        {placementCategories.map((category) => (
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

      <section className="mt-md">
        <ArtworkGrid
          label={placementsContent.gridLabel}
          items={filtered.map((work) => ({
            id: work.id,
            image: work.image,
            alt: `${work.title} by ${work.artist}`,
            caption: <PlacementCaption work={work} />,
          }))}
        />
      </section>

      <section data-reveal className="mt-lg grid gap-md px-xs md:grid-cols-4 md:px-md">
        <h2>{placementsContent.ctaLabel}</h2>
        <p className="md:col-span-2">
          <Link href={placementsContent.ctaLink} className="cta">
            {placementsContent.cta}
          </Link>
        </p>
      </section>
    </article>
  );
}
