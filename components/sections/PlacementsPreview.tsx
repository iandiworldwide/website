import PlacementsGallery, { type GalleryWork } from "@/components/PlacementsGallery";
import { placements, placementsContent } from "@/lib/content";
import { getImageSize } from "@/lib/imageSize";

// Reads each image's true size at build time so the wall can hang every work
// at its own proportions rather than a single crop.
const WORKS: GalleryWork[] = placements
  .filter((work) => work.image)
  .slice(0, placementsContent.previewCount)
  .map((work) => {
    const size = getImageSize(work.image!) ?? { width: 4, height: 5 };
    return {
      id: work.id,
      image: work.image!,
      artist: work.artist,
      title: work.title,
      year: work.year,
      width: size.width,
      height: size.height,
    };
  });

export default function PlacementsPreview() {
  return (
    <PlacementsGallery
      works={WORKS}
      title={placementsContent.title}
      intro={placementsContent.intro}
      label={placementsContent.gridLabel}
      cta={placementsContent.previewCta}
      ctaLink={placementsContent.previewCtaLink}
    />
  );
}
