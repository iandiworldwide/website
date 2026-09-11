"use client";

import { useState, type PointerEvent } from "react";
import { servicesContent } from "@/lib/content";

/*
  Only the names of the services show. Resting the pointer on one drops its
  points down; clicking holds it open until it is clicked again. The two are
  kept apart so a service opened by a click stays open when the pointer
  moves on, and a touch, which has no hover, is a plain click.
*/
export default function ServicesSection() {
  const [pinned, setPinned] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const hover = (index: number | null) => (event: PointerEvent) => {
    if (event.pointerType === "mouse") setHovered(index);
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-full fold-screen px-xs md:px-md"
    >
      <div data-reveal className="grid gap-md md:grid-cols-4">
        <h2 id="services-heading">{servicesContent.title}</h2>

        <ul className="max-w-[52ch] md:col-span-2">
          {servicesContent.services.map((service, index) => {
            const open = pinned === index || hovered === index;
            const panel = `service-${index}`;
            return (
              <li
                key={service.title}
                className="fold"
                data-open={open ? "" : undefined}
                onPointerEnter={hover(index)}
                onPointerLeave={hover(null)}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panel}
                    onClick={() => setPinned(pinned === index ? null : index)}
                    className="fold-head"
                  >
                    <span>{service.title}</span>
                    {/* The site's own mark for "and": a plus that turns to close. */}
                    <span aria-hidden="true" className="fold-mark">
                      +
                    </span>
                  </button>
                </h3>

                <div id={panel} className="fold-panel">
                  <div className="fold-body">
                    <div className="space-y-xs pb-sm">
                      {service.description && <p>{service.description}</p>}
                      <ul role="list" className="list-plus">
                        {service.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* The way in, under the offer: an anchor to the form at the foot. */}
        <p className="mt-sm md:col-start-2 md:col-span-2">
          <a href={servicesContent.ctaLink} className="cta">
            {servicesContent.cta}
          </a>
        </p>
      </div>
    </section>
  );
}
