"use client";

import { useEffect, useRef } from "react";
import { homeContent, testimonials } from "@/lib/content";

// How quickly the slide catches up with the scroll. Smaller is smoother.
const EASE = 0.08;
const SETTLED = 0.0005;

/*
  What clients have said, one at a time, set in the same colour the founder
  quote runs in. The screen holds still while the page keeps scrolling, and
  that scrolling slides the words across, each one fading in as it arrives
  and out as it leaves. The slide eases after the scroll rather than tracking
  it exactly, so it moves like something with a little weight.

  Under prefers-reduced-motion the screen does not hold and the testimonials
  simply sit one beneath the other.
*/
export default function TestimonialsSection() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const outer = section.current;
    const row = track.current;
    if (!outer || !row) return;

    const items = Array.from(row.children) as HTMLElement[];
    const last = items.length - 1;
    if (last < 1) return;

    let target = 0; // where the scroll says we should be, in slides
    let shown = 0; // where we actually are
    let frame = 0;

    const read = () => {
      const runway = outer.offsetHeight - window.innerHeight;
      if (runway <= 0) {
        target = 0;
        return;
      }
      const travelled = -outer.getBoundingClientRect().top;
      target = Math.min(1, Math.max(0, travelled / runway)) * last;
    };

    const paint = () => {
      row.style.transform = `translate3d(${-shown * 100}%, 0, 0)`;
      items.forEach((item, index) => {
        // Fully there at its own slot, gone by the next; smoothed in between.
        const near = 1 - Math.min(1, Math.abs(index - shown));
        item.style.opacity = String(near * near * (3 - 2 * near));
      });
    };

    const tick = () => {
      shown += (target - shown) * EASE;
      if (Math.abs(target - shown) < SETTLED) {
        shown = target;
        frame = 0;
      } else {
        frame = window.requestAnimationFrame(tick);
      }
      paint();
    };

    const onScroll = () => {
      read();
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    read();
    shown = target;
    paint();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!testimonials.length) return null;

  return (
    <section
      ref={section}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-track"
    >
      <div className="section-track-inner px-xs md:px-md">
        <h2 id="testimonials-heading" data-reveal>
          {homeContent.testimonialsLabel}
        </h2>

        <div className="slide-view mt-lg">
          <ul ref={track} className="slide-track">
            {testimonials.map((testimonial) => (
              <li key={testimonial.text}>
                <blockquote>
                  <p className="quote-flow max-w-[28ch] text-hero-sm">
                    {"“"}
                    {testimonial.text}
                    {"”"}
                  </p>
                  <footer className="mt-md text-caption">{testimonial.author}</footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
