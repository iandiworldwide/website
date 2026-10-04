"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { DiaryEntry } from "@/lib/content";

/*
  The browser half of DiaryGlimpse: draws a picture from the diary at
  random, from a deck shuffled once per page load, so no two places on the
  page show the same one until the diary runs out. The draw happens after
  the page has arrived, so the static page stays the same for everyone.

  The picture keeps its own proportions, uncropped. The caption is the
  entry's caption, or its description when it has none.
*/

export interface SizedEntry extends DiaryEntry {
  width: number;
  height: number;
}

let deck: SizedEntry[] | null = null;
let drawn = 0;

function draw(entries: SizedEntry[]) {
  if (!deck) {
    deck = [...entries];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }
  return deck[drawn++ % deck.length];
}

export default function DiaryGlimpsePicture({ entries }: { entries: SizedEntry[] }) {
  const [entry, setEntry] = useState<SizedEntry | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntry(draw(entries)));
    return () => cancelAnimationFrame(frame);
  }, [entries]);

  const caption = entry?.caption || entry?.alt;

  return (
    <Link href="/visual-diary" className="glimpse-seam">
      <figure className="dim">
        {entry && (
          <Image
            src={entry.image}
            // The caption beneath already says what it shows.
            alt={entry.caption ? entry.alt : ""}
            width={entry.width}
            height={entry.height}
            sizes="(min-width: 768px) 16vw, 50vw"
            className="glimpse-in h-auto w-full"
          />
        )}
        <figcaption className="mt-xs text-caption">{caption}</figcaption>
      </figure>
    </Link>
  );
}
