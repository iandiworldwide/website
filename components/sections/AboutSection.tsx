import Link from "next/link";
import { aboutContent, homeContent, testimonials } from "@/lib/content";

// Two columns: the practice on the left, the founder on the right.
export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section px-xs md:px-md">
      <div className="grid gap-lg md:grid-cols-2 md:gap-md">
        <div className="space-y-lg">
          {/* The headline that used to open this section is now the page's
              opening statement, so the section goes straight into the practice. */}
          <div data-reveal className="space-y-xs">
            <h2 id="about-heading">{aboutContent.title}</h2>
            <p>{aboutContent.intro}</p>
            <p>{aboutContent.approach}</p>
            <p>{aboutContent.closing}</p>
          </div>

          <div data-reveal className="space-y-xs">
            <h3>{aboutContent.servicesLabel}</h3>
            <ul>
              {aboutContent.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-lg">
          <div data-reveal className="space-y-xs">
            <h3>
              {aboutContent.founderTitle}
              <br />
              {aboutContent.founderName}
            </h3>
            <p>{aboutContent.founderBio}</p>
            <blockquote>
              <p>“{aboutContent.founderQuote}”</p>
            </blockquote>
            <p>{aboutContent.founderApproach}</p>
            <p>{aboutContent.founderClosure}</p>
          </div>

          <div data-reveal className="space-y-xs">
            <h3>{homeContent.testimonialsLabel}</h3>
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.author}>
                <p>“{testimonial.text}”</p>
                <footer className="text-caption">{testimonial.author}</footer>
              </blockquote>
            ))}
          </div>

          <div data-reveal className="space-y-xs">
            <h3>{aboutContent.ctaLabel}</h3>
            <p>
              <Link href={aboutContent.ctaLink} className="cta">
                {aboutContent.cta}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
