import { servicesContent } from "@/lib/content";

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="section px-xs md:px-md">
      <div data-reveal className="grid gap-md md:grid-cols-4">
        <h2 id="services-heading">{servicesContent.title}</h2>
        <div className="space-y-xs md:col-span-3 max-w-[64ch]">
          <p>{servicesContent.headline}</p>
          <p>{servicesContent.intro}</p>
        </div>
      </div>

      {servicesContent.services.map((service) => (
        <div key={service.title} data-reveal className="mt-lg grid gap-md md:grid-cols-4">
          <h3>{service.title}</h3>
          <div className="space-y-xs md:col-span-2">
            {service.description && <p>{service.description}</p>}
            <ul>
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}
