"use client";

import { useEffect, useRef, useState } from "react";
import { aboutContent } from "@/lib/content";
import { findArtwork, toTerm, type Artwork } from "@/lib/artworkSearch";

// Split on whitespace but keep it, so the quote reflows exactly as written.
const TOKENS = aboutContent.founderQuote.split(/(\s+)/);

/*
  A screen of its own on white. The colour that ran behind the founder screen
  now runs through the type itself.

  Hovering a word brings up a work from the Art Institute of Chicago whose
  title carries that word, behind the text. A different one each time, since
  it picks at random from everything that matched.
*/
export default function QuoteSection() {
  const [art, setArt] = useState<Artwork | null>(null);
  const request = useRef<AbortController | null>(null);
  const latest = useRef(0);

  // Drop any request still in flight when the screen goes away.
  useEffect(() => () => request.current?.abort(), []);

  const show = (word: string) => {
    const term = toTerm(word);
    if (!term) return;

    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const ticket = ++latest.current;

    findArtwork(term, controller.signal).then((found) => {
      // Ignore anything that comes back after a newer hover.
      if (ticket === latest.current && found) setArt(found);
    });
  };

  const clear = () => {
    request.current?.abort();
    latest.current++;
    setArt(null);
  };

  return (
    <section id="quote" className="section-full px-xs md:px-md">
      <div
        aria-hidden="true"
        className="quote-art"
        data-on={art ? "" : undefined}
        style={art ? { backgroundImage: `url("${art.image}")` } : undefined}
      />

      {/* Runs the full width of the screen, held off the edges by the same
          padding every other section uses, so it lines up with them. */}
      <blockquote data-reveal className="relative z-10" onMouseLeave={clear}>
        <p className="quote-flow text-hero">
          {"“"}
          {TOKENS.map((token, index) =>
            toTerm(token) ? (
              <span
                key={index}
                className="quote-word"
                onMouseEnter={() => show(token)}
              >
                {token}
              </span>
            ) : (
              token
            ),
          )}
          {"”"}
        </p>
        <footer className="mt-lg text-caption">{aboutContent.founderName}</footer>
      </blockquote>

      {/* Credit for whatever is showing, as the collection asks. */}
      <p className="quote-credit text-caption" data-on={art ? "" : undefined} aria-hidden="true">
        {art ? `${art.title} — ${art.artist}` : ""}
      </p>
    </section>
  );
}
