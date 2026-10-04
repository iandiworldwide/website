"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { diaryEntries, type DiaryEntry } from "@/lib/content";

/*
  One picture from the Visual Diary, set into the empty space of a home
  screen, with its caption beneath and a link through to the diary.

  Which picture is drawn at random on each visit, from a deck shuffled once
  per page load, so no two places on the page show the same one until the
  diary runs out. The draw happens in the browser, after the page has
  arrived, so the static page stays the same for everyone; the frame is a
  fixed shape, held empty until then, so nothing around it moves.

  The caption is the entry's caption, or its description when it has none.

  It sits across the top edge of its section, centred on the page, the
  middle of the picture on the line where the section above ends. The
  section leaves room beneath it: see .glimpse-seam and .seam-top in
  globals.css. It must be the section's own child.
*/

const entries = diaryEntries.filter((entry) => entry.image);

let deck: DiaryEntry[] | null = null;
let drawn = 0;

function draw() {
  if (!deck) {
    deck = [...entries];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }
  return deck[drawn++ % deck.length];
}

export default function DiaryGlimpse() {
  const [entry, setEntry] = useState<DiaryEntry | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntry(draw()));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (entries.length === 0) return null;
  const caption = entry?.caption || entry?.alt;

  return (
    <Link href="/visual-diary" className="glimpse-seam">
      <figure className="dim">
        <div className="relative aspect-[4/5] bg-alice">
          {entry && (
            <Image
              src={entry.image}
              // The caption beneath already says what it shows.
              alt={entry.caption ? entry.alt : ""}
              fill
              sizes="(min-width: 768px) 16vw, 50vw"
              className="glimpse-in object-cover"
            />
          )}
        </div>
        <figcaption className="mt-xs min-h-[1lh] text-caption">{caption}</figcaption>
      </figure>
    </Link>
  );
}
