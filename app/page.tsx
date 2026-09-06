import Link from "next/link";
import ArtworkGrid from "@/components/ArtworkGrid";
import PlacementCaption from "@/components/PlacementCaption";
import { homeContent, placements, testimonials } from "@/lib/content";

export default function Home() {
  return (
    <div>
      {/* The logotype itself lives in the header, pinned top left on every page. */}
      <section data-reveal className="px-xs pt-lg pb-lg md:px-md">
        <h1>{homeContent.title}</h1>
        <p className="mt-sm">{homeContent.subtitle}</p>
      </section>

      {/* Edge-to-edge image grid carries the visual weight. */}
      <section className="pb-lg">
        <ArtworkGrid
          label={homeContent.gridLabel}
          items={placements
            .filter((work) => work.image)
            .slice(0, 8)
            .map((work) => ({
              id: work.id,
              image: work.image,
              alt: `${work.title} by ${work.artist}`,
              caption: <PlacementCaption work={work} />,
            }))}
        />
      </section>

      <section data-reveal className="grid gap-md px-xs py-lg md:grid-cols-4 md:px-md">
        <h2>{homeContent.testimonialsLabel}</h2>
        {testimonials.map((testimonial) => (
          <blockquote key={testimonial.author}>
            <p>“{testimonial.text}”</p>
            <footer className="mt-xs">{testimonial.author}</footer>
          </blockquote>
        ))}
      </section>

      <section data-reveal className="grid gap-md px-xs pb-lg md:grid-cols-4 md:px-md">
        <h2>{homeContent.ctaLabel}</h2>
        <p className="md:col-span-2">
          <Link href={homeContent.ctaLink} className="cta">
            {homeContent.cta}
          </Link>
        </p>
      </section>
    </div>
  );
}
