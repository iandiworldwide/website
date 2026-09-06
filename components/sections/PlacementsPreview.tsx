"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PlacementCaption from "@/components/PlacementCaption";
import { placements, placementsContent } from "@/lib/content";

const SHOWN = placements
  .filter((work) => work.image)
  .slice(0, placementsContent.previewCount);

/*
  Four works sit in view and the rest wait off to the right. The screen holds
  still while you keep scrolling, and that scrolling walks the row sideways
  until the last work arrives, then the page carries on down.

  Under prefers-reduced-motion the screen does not hold and the row becomes an
  ordinary sideways scroller, so every work is still reachable.
*/
export default function PlacementsPreview() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const draw = () => {
      frame = 0;
      const outer = section.current;
      const row = track.current;
      if (!outer || !row) return;

      // How far the row has to travel to bring the last work into view.
      const overflow = Math.max(0, row.scrollWidth - row.clientWidth);
      // How far the page scrolls while the screen is held.
      const runway = outer.offsetHeight - window.innerHeight;
      if (overflow === 0 || runway <= 0) {
        row.style.transform = "";
        return;
      }

      const travelled = -outer.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, travelled / runway));
      row.style.transform = `translate3d(${-progress * overflow}px, 0, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={section}
      id="placements"
      aria-labelledby="placements-preview-heading"
      className="section-track"
    >
      <div className="section-track-inner">
        <div data-reveal className="grid gap-md px-xs md:grid-cols-4 md:px-md">
          <h2 id="placements-preview-heading">{placementsContent.title}</h2>
          <p className="md:col-span-2">{placementsContent.intro}</p>
        </div>

        <div className="row-view mt-lg px-xs md:px-md">
          <ul ref={track} aria-label={placementsContent.gridLabel} className="row-track">
            {SHOWN.map((work) => (
              <li key={work.id} className="group">
                <figure className="lift">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={work.image!}
                      alt={`${work.title} by ${work.artist}`}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="mt-xs text-caption">
                    <PlacementCaption work={work} />
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-lg px-xs text-caption md:px-md">
          <Link href={placementsContent.previewCtaLink} className="cta">
            {placementsContent.previewCta}
          </Link>
        </p>
      </div>
    </section>
  );
}
