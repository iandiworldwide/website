"use client";

import { useEffect, useState } from "react";
import { buildSequence, orderedSequence } from "@/lib/marks";

/*
  A few words inside a line that flicker through every other way of writing
  "i and i", the same variations as the opening screen, and land back on the
  real words once each pass.

  Every variation is in the markup, stacked in one grid cell with only the
  current one visible, so the space it takes is the width of the widest and
  the line around it never moves or collides. The real words are the only
  thing in the accessibility tree. Under prefers-reduced-motion it simply
  sits on the real words.
*/
export default function MarkFlicker({ children }: { children: string }) {
  // Every variation is in the markup, so it starts in the written order to
  // match the server, and is shuffled once mounted.
  const [sequence, setSequence] = useState(() => orderedSequence(children));
  // Index 0 is the real words, which is where it starts and ends each pass.
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setSequence(buildSequence(children));
  }, [children]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const tick = () => {
      setFrame((current) => (current + 1) % sequence.length);
      timer = window.setTimeout(tick, 150 + Math.random() * 210);
    };
    timer = window.setTimeout(tick, 420);
    return () => window.clearTimeout(timer);
  }, [sequence.length]);

  return (
    <span className="mark-flicker">
      {sequence.map((variant, index) => (
        <span
          key={variant}
          aria-hidden="true"
          className="mark-flicker-frame"
          data-on={index === frame || undefined}
        >
          {variant}
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </span>
  );
}
