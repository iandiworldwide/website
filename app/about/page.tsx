import Link from "next/link";
import TreeOfLife from "@/components/TreeOfLife";
import { aboutContent } from "@/lib/content";

export default function About() {
  return (
    <>
      <TreeOfLife />
      <article className="relative z-10 px-xs py-lg md:px-md">
        {/* Two main columns: the practice on the left, the founder on the right.
            Labels sit above their own copy; on mobile the columns stack. */}
        <div className="grid gap-lg md:grid-cols-2 md:gap-md">
          {/* Left column */}
          <div className="space-y-lg">
            <section data-reveal className="space-y-xs">
              <h1>{aboutContent.title}</h1>
              <p>{aboutContent.headline}</p>
            </section>

            <section data-reveal className="space-y-xs">
              <h2>{aboutContent.practiceLabel}</h2>
              <p>{aboutContent.intro}</p>
              <p>{aboutContent.approach}</p>
              <p>{aboutContent.closing}</p>
            </section>

            <section data-reveal className="space-y-xs">
              <h2>{aboutContent.servicesLabel}</h2>
              <ul>
                {aboutContent.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-lg">
            <section data-reveal className="space-y-xs">
              <h2>
                {aboutContent.founderTitle}
                <br />
                {aboutContent.founderName}
              </h2>
              <p>{aboutContent.founderBio}</p>
              <blockquote>
                <p>“{aboutContent.founderQuote}”</p>
              </blockquote>
              <p>{aboutContent.founderApproach}</p>
              <p>{aboutContent.founderClosure}</p>
            </section>

            <section data-reveal className="space-y-xs">
              <h2>{aboutContent.ctaLabel}</h2>
              <p>
                <Link href={aboutContent.ctaLink} className="cta">
                  {aboutContent.cta}
                </Link>
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
