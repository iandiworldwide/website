import { servicesContent } from "@/lib/content";

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="section-full px-xs md:px-md">
      <div data-reveal>
        <h2 id="services-heading">{servicesContent.title}</h2>
      </div>

      <div className="mt-lg grid gap-lg md:grid-cols-2 md:gap-md">
        {servicesContent.services.map((service) => (
          <div key={service.title} data-reveal className="space-y-xs">
            <h3>{service.title}</h3>
            <ul className="max-w-[46ch]">
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
