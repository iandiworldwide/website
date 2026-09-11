"use client";

import { useEffect, useRef } from "react";
import { homeContent, testimonials } from "@/lib/content";

// How quickly the slide catches up with the scroll. Smaller is smoother.
const EASE = 0.08;
const SETTLED = 0.0005;
// How much scrolling each testimonial gets, as a share of the screen's
// height. It is the runway the screen holds for while the words pass.
const PER_SLIDE = 0.8;
// Within each step from one testimonial to the next, the share of the
// scrolling spent standing still on the first before the slide begins, and
// again on the second once it has arrived.
const HOLD = 0.3;

// Eases a step from 0 to 1 with a pause at either end, so a testimonial sits
// centred and readable before the next slides in.
function dwell(u: number) {
  const moving = Math.min(1, Math.max(0, (u - HOLD) / (1 - 2 * HOLD)));
  return moving * moving * (3 - 2 * moving);
}

/*
  What clients have said, one at a time, set in the same colour the founder
  quote runs in. The screen holds still while you keep scrolling, and that
  scrolling walks the words across: each testimonial arrives, sits centred
  long enough to be read, then slides on as the next one fades in. The slide
  eases after the scroll rather than tracking it exactly, so it moves like
  something with a little weight. Once the last has been read the page
  carries on down.

  Under prefers-reduced-motion nothing holds or slides; the testimonials
  simply sit one beneath the other.
*/
export default function TestimonialsSection() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const last = testimonials.length - 1;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const outer = section.current;
    const row = track.current;
    if (!outer || !row) return;

    const items = Array.from(row.children) as HTMLElement[];
    if (last < 1) return;

    let target = 0; // where the scroll says we should be, in slides
    let shown = 0; // where we actually are
    let frame = 0;

    const read = () => {
      // How far the page has scrolled while the screen is held.
      const runway = outer.offsetHeight - window.innerHeight;
      if (runway <= 0) return;
      const travelled = -outer.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, travelled / runway));
      // Which step we are on, and how far through it, with a pause at each end.
      const step = Math.min(last - 1, Math.floor(progress * last));
      target = step + dwell(progress * last - step);
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
  }, [last]);

  if (!testimonials.length) return null;

  return (
    <section
      ref={section}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-track"
      style={{ "--runway": `${100 + PER_SLIDE * 100 * last}vh` } as React.CSSProperties}
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
