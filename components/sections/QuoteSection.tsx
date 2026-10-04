import { aboutContent } from "@/lib/content";

/*
  A screen of its own on white. The colour that ran behind the founder screen
  now runs through the type itself.

  It runs the full width of the screen, held off the edges by the same
  padding every other section uses, so it lines up with them. Her portrait
  sits across the top edge, where the founder screen ends, placed like the
  diary pictures on the other screens.
*/
export default function QuoteSection() {
  return (
    <section id="quote" className="section-full seam-top px-xs md:px-md">
      <figure className="glimpse-seam">
        <div className="founder-photo">
          {/* Plain img: the file is already small, and the frame holds its shape. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={aboutContent.founderPhotos[0]} alt={aboutContent.founderName} />
        </div>
        <figcaption className="mt-xs text-caption">{aboutContent.founderName}</figcaption>
      </figure>
      <blockquote data-reveal>
        <p className="quote-flow text-hero">
          {"“"}
          {aboutContent.founderQuote}
          {"”"}
        </p>
        <footer className="mt-lg text-caption">{aboutContent.founderName}</footer>
      </blockquote>
    </section>
  );
}
