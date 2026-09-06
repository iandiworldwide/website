import { aboutContent } from "@/lib/content";

// The practice. Deliberately sparse: a heading in one column and the copy
// in a narrow measure beside it, with the rest of the screen left empty.
export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-full px-xs md:px-md">
      <div data-reveal className="grid gap-md md:grid-cols-4">
        <h2 id="about-heading">{aboutContent.title}</h2>
        <div className="space-y-md md:col-span-2 max-w-[52ch]">
          <p>{aboutContent.intro}</p>
          <p>{aboutContent.approach}</p>
          <p>{aboutContent.closing}</p>
        </div>
      </div>
    </section>
  );
}
