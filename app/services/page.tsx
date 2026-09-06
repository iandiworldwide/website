import Link from "next/link";
import { servicesContent } from "@/lib/content";

export default function Services() {
  return (
    <article className="px-xs py-lg md:px-md">
      <section data-reveal className="grid gap-md md:grid-cols-4">
        <h1>{servicesContent.title}</h1>
        <div className="space-y-xs md:col-span-3 max-w-[64ch]">
          <p>{servicesContent.headline}</p>
          <p>{servicesContent.intro}</p>
        </div>
      </section>

      {servicesContent.services.map((service) => (
        <section key={service.title} data-reveal className="mt-lg grid gap-md md:grid-cols-4">
          <h2>{service.title}</h2>
          <div className="space-y-xs md:col-span-2">
            {service.description && <p>{service.description}</p>}
            <ul>
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section data-reveal className="mt-lg grid gap-md md:grid-cols-4">
        <h2>{servicesContent.ctaLabel}</h2>
        <p className="md:col-span-2">
          <Link href={servicesContent.ctaLink} className="cta">
            {servicesContent.cta}
          </Link>
        </p>
      </section>
    </article>
  );
}
