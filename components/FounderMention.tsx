"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { aboutContent } from "@/lib/content";

/*
  Every mention of the founder in a run of copy, her name or "her", is
  marked and underlined. Resting the pointer on one, or tapping it, puts a
  photograph of her somewhere on the screen at random: black and white,
  grained, and usually beneath the words. It leaves when the pointer does.

  "Beneath the words" is done with multiply blending rather than layering:
  the photo sits over everything, but ink multiplied by anything stays ink,
  so the type reads as though it were printed on top. One time in four the
  photo comes in front instead, and covers what it lands on.

  The photos are listed in content/about.json under founderPhotos, and
  live in public/founder. Add a file there and a line to the list.
*/

const MENTION = /\b(Talia(?: Pockhai)?(?:'s|’s)?|[Hh]er)\b/g;

interface Peek {
  src: string;
  left: number;
  top: number;
  size: number;
  tilt: number;
  front: boolean;
}

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

function place(): Peek | null {
  const photos = aboutContent.founderPhotos;
  if (!photos.length) return null;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const size = Math.round(Math.min(vw, vh) * (0.28 + Math.random() * 0.16));
  const margin = 12;
  return {
    src: pick(photos),
    size,
    left: Math.round(margin + Math.random() * Math.max(0, vw - size - margin * 2)),
    top: Math.round(margin + Math.random() * Math.max(0, vh - size - margin * 2)),
    tilt: Math.round((Math.random() * 2 - 1) * 6 * 10) / 10,
    front: Math.random() < 0.25,
  };
}

export default function FounderMention({ children }: { children: string }) {
  const [peek, setPeek] = useState<Peek | null>(null);
  const timer = useRef(0);

  const show = () => {
    window.clearTimeout(timer.current);
    setPeek(place());
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setPeek(null);
  };
  // A tap has no pointer to leave with, so it shows for a moment and goes.
  const tap = () => {
    show();
    timer.current = window.setTimeout(hide, 2600);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const parts = children.split(MENTION);

  return (
    <>
      {parts.map((part, index) =>
        // split() with a capture group puts the matches at the odd indexes.
        index % 2 === 1 ? (
          <span
            key={index}
            className="mention"
            onPointerEnter={(e) => e.pointerType === "mouse" && show()}
            onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
            onClick={tap}
          >
            {part}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
      {peek &&
        createPortal(
          <span
            aria-hidden="true"
            className="peek"
            data-front={peek.front || undefined}
            style={{
              left: peek.left,
              top: peek.top,
              width: peek.size,
              height: peek.size,
              transform: `rotate(${peek.tilt}deg)`,
            }}
          >
            {/* Plain img: the file is already small and grey, and there is no layout to reserve. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={peek.src} alt="" width={peek.size} height={peek.size} />
          </span>,
          document.body,
        )}
    </>
  );
}
