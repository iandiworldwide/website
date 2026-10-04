"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

  It scrolls in with the page until it reaches its place on the screen,
  then holds there while the rest of the section scrolls on, and the next
  section slides up over it. The holding is a transform that offsets the
  scroll; the section clips its overflow, which is what lets the next one
  appear to cover it. Its place is where it sits once the section's top
  meets the screen's, or, in a section taller than the screen, as low as
  it can go with the whole picture still showing.

  Only on wider screens. A phone scrolls the page itself, ahead of any
  script, so a held picture lags and jitters there; and with the picture
  at the foot of its section, the next one covers the caption almost as
  soon as it holds. On phones the pictures simply scroll with the page.
*/

// Room left beneath a picture held low on the screen.
const MARGIN = 24;

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

export default function DiaryGlimpse({ className = "" }: { className?: string }) {
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const figure = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntry(draw()));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const element = figure.current;
    const section = element?.closest("section");
    if (!element || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wide = window.matchMedia("(min-width: 48rem)");
    let held = 0;
    let pending = 0;

    const update = () => {
      pending = 0;
      if (!wide.matches) {
        held = 0;
        element.style.transform = "";
        return;
      }
      const box = element.getBoundingClientRect();
      const top = section.getBoundingClientRect().top;
      // Where the picture would be without holding, within the section and on screen.
      const natural = box.top - held;
      const offset = natural - top;
      const place = Math.min(offset, window.innerHeight - box.height - MARGIN);
      held = Math.max(0, place - natural);
      element.style.transform = held ? `translate3d(0, ${held}px, 0)` : "";
    };
    const onScroll = () => {
      if (!pending) pending = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    wide.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(pending);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      wide.removeEventListener("change", onScroll);
    };
  }, []);

  if (entries.length === 0) return null;
  const caption = entry?.caption || entry?.alt;

  return (
    <Link href="/visual-diary" className={`block ${className}`}>
      <figure ref={figure} className="dim">
        <div className="relative aspect-[4/5] bg-alice">
          {entry && (
            <Image
              src={entry.image}
              // The caption beneath already says what it shows.
              alt={entry.caption ? entry.alt : ""}
              fill
              sizes="(min-width: 768px) 20vw, 50vw"
              className="glimpse-in object-cover"
            />
          )}
        </div>
        <figcaption className="mt-xs min-h-[1lh] text-caption">{caption}</figcaption>
      </figure>
    </Link>
  );
}
