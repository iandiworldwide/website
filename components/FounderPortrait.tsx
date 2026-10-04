"use client";

import { useEffect, useRef } from "react";
import { aboutContent } from "@/lib/content";

/*
  Her portrait, small and fixed at the centre of the screen, behind the
  founder copy. The clipping layer it sits in keeps it to this section, so
  it stays put while the section scrolls past and the next one slides up
  over it (see .portrait-clip in globals.css).

  As the section scrolls, two things move with it. The picture drifts
  inside its frame. And it fades: solid as the section comes in, nearly
  gone by the time the section is centred and the copy lies over it, then
  solid again as the section leaves.

  Pressing her name in the copy (FounderName) sets data-clear on the
  section, which brings the portrait forward, solid and clear, until it is
  pressed again, the portrait is, or the section scrolls out of view.

  The photo is the first listed under founderPhotos in content/about.json.
*/

// Opacity at the section's edges, and at its centre.
const EDGE = 0.95;
const CENTRE = 0.08;

// Sends the portrait back behind the copy.
function release(section: HTMLElement) {
  if (!section.hasAttribute("data-clear")) return;
  section.removeAttribute("data-clear");
  section.querySelector(".mention")?.setAttribute("aria-pressed", "false");
}

export default function FounderPortrait() {
  const layer = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLSpanElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const photo = aboutContent.founderPhotos[0];

  useEffect(() => {
    const section = layer.current?.parentElement;
    if (!section) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pending = 0;

    const update = () => {
      pending = 0;
      const box = section.getBoundingClientRect();
      const view = window.innerHeight;
      // 0 as the section comes in at the bottom, 1 as it leaves at the top,
      // and 0.5 when its centre meets the screen's.
      if (box.bottom <= 0 || box.top >= view) release(section);
      const progress = Math.min(1, Math.max(0, (view - box.top) / (view + box.height)));
      // 1 at either edge, 0 at the centre, eased so it lingers faint.
      const distance = Math.abs(progress - 0.5) * 2;
      const eased = distance * distance * (3 - 2 * distance);
      if (frame.current) frame.current.style.opacity = String(CENTRE + (EDGE - CENTRE) * eased);
      if (!still && image.current) {
        image.current.style.transform = `translate3d(0, ${((0.5 - progress) * 22).toFixed(2)}%, 0)`;
      }
    };
    const onScroll = () => {
      if (!pending) pending = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(pending);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!photo) return null;

  return (
    <div ref={layer} aria-hidden="true" className="portrait-clip">
      <span
        ref={frame}
        className="portrait"
        onClick={() => layer.current?.parentElement && release(layer.current.parentElement)}
      >
        {/* Plain img: the file is already small and grey, and there is no layout to reserve. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={image} src={photo} alt="" />
      </span>
    </div>
  );
}
