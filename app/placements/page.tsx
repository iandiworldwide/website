import { placementsContent } from "@/lib/content";
import { jsonLd, pageMetadata, placementsGraph } from "@/lib/seo";
import PlacementsSection from "@/components/sections/PlacementsSection";

// The search engine description is its own field in the CMS, and falls back
// to the sentence beneath the heading.
const description = placementsContent.metaDescription || placementsContent.intro;

export const metadata = pageMetadata({
  title: placementsContent.metaTitle,
  description,
  path: "/placements",
});

export default function PlacementsPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(placementsGraph({ title: placementsContent.title, description })),
        }}
      />
      <PlacementsSection />
    </div>
  );
}
