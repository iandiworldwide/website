import Link from "next/link";
import ArtworkGrid from "@/components/ArtworkGrid";
import PlacementCaption from "@/components/PlacementCaption";
import { placements, placementsContent } from "@/lib/content";

// Four works on the home page, then a quiet link through to the full page.
export default function PlacementsPreview() {
  const shown = placements
    .filter((work) => work.image)
    .slice(0, placementsContent.previewCount);

  return (
    <section id="placements" aria-labelledby="placements-preview-heading" className="section-full">
      <div data-reveal className="grid gap-md px-xs md:grid-cols-4 md:px-md">
        <h2 id="placements-preview-heading">{placementsContent.title}</h2>
        <p className="md:col-span-2">{placementsContent.intro}</p>
      </div>

      <div className="mt-lg">
        <ArtworkGrid
          label={placementsContent.gridLabel}
          items={shown.map((work) => ({
            id: work.id,
            image: work.image,
            alt: `${work.title} by ${work.artist}`,
            caption: <PlacementCaption work={work} />,
          }))}
        />
      </div>

      <p data-reveal className="mt-lg px-xs text-caption md:px-md">
        <Link href={placementsContent.previewCtaLink} className="cta">
          {placementsContent.previewCta}
        </Link>
      </p>
    </section>
  );
}
