"use client";

import { useEffect, useRef } from "react";

// A fluid field of colour that moves behind a full-height screen.
// CSS does the moving: seven blurred radial blooms on a lavender ground,
// each travelling its own closed loop, all of them carried round by a slow
// counter-swirl so the field never settles. The one piece of script here
// stops the animation while the screen is out of view, so the two fields
// on the home page never both run at once. It holds still under
// prefers-reduced-motion, and it is decorative so it is hidden from
// screen readers.
export default function FluidBackground() {
  const field = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = field.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => element.toggleAttribute("data-still", !entry.isIntersecting),
      { rootMargin: "20% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={field} aria-hidden="true" className="fluid">
      <div className="fluid-swirl">
        <span className="fluid-bloom fluid-bloom-1" />
        <span className="fluid-bloom fluid-bloom-2" />
        <span className="fluid-bloom fluid-bloom-3" />
        <span className="fluid-bloom fluid-bloom-4" />
        <span className="fluid-bloom fluid-bloom-5" />
        <span className="fluid-bloom fluid-bloom-6" />
        <span className="fluid-bloom fluid-bloom-7" />
      </div>
    </div>
  );
}
