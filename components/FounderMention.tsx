"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { aboutContent } from "@/lib/content";

/*
  The founder's full name in a run of copy is marked and underlined.
  Resting the pointer on it, or tapping it, brings a photograph of her in
  down the right-hand third of the screen, the full height of it: black and
  white, grained, and beneath the words. It leaves when the pointer does.

  "Beneath the words" is done with multiply blending rather than layering:
  the photo sits over everything, but ink multiplied by anything stays ink,
  so the type reads as though it were printed on top.

  The photos are listed in content/about.json under founderPhotos, and
  live in public/founder. One is picked at random each time. Add a file
  there and a line to the list.
*/

const MENTION = /\b(Talia Pockhai)\b/g;

const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export default function FounderMention({ children }: { children: string }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const timer = useRef(0);

  const show = () => {
    window.clearTimeout(timer.current);
    setPhoto(pick(aboutContent.founderPhotos) ?? null);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setPhoto(null);
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
      {photo &&
        createPortal(
          <span aria-hidden="true" className="peek">
            {/* Plain img: the file is already small and grey, and there is no layout to reserve. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="" />
          </span>,
          document.body,
        )}
    </>
  );
}
