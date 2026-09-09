"use client";

import Script from "next/script";
import { useState } from "react";
import { subscribeContent } from "@/lib/content";

/*
  A screen of its own: the invitation on the left, the live Substack feeds on
  the right, and a link out. Each feed sits in a fold of its own, Latest and
  Most read, with one open at a time; clicking a name opens it and closes the
  other. The feeds are drawn by Supascribe, which loads after the page is
  interactive so it never holds up the first paint. Both feeds are in the
  page from the start, so the closed one is ready the moment it opens.
*/
export default function SubscribeSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="subscribe"
      aria-labelledby="subscribe-heading"
      className="section-full fold-screen px-xs md:px-md"
    >
      <div className="grid gap-lg md:grid-cols-2 md:gap-md">
        <div data-reveal className="max-w-[34ch]">
          <p className="text-caption">{subscribeContent.eyebrow}</p>
          <h2 id="subscribe-heading" className="mt-sm text-hero-sm">
            {subscribeContent.headline}
          </h2>
          <p className="mt-md">{subscribeContent.lede}</p>
          <p className="mt-lg">
            <a
              href={subscribeContent.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta"
            >
              {subscribeContent.cta}
            </a>
          </p>
        </div>

        <ul data-reveal>
          {subscribeContent.feeds.map((feed, index) => {
            const isOpen = open === index;
            const panel = `feed-${index}`;
            return (
              <li key={feed.embedId} className="fold" data-open={isOpen ? "" : undefined}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="fold-head"
                  >
                    <span>{feed.label}</span>
                    {/* The site's own mark for "and": a plus that turns to close. */}
                    <span aria-hidden="true" className="fold-mark">
                      +
                    </span>
                  </button>
                </h3>

                <div id={panel} className="fold-panel">
                  <div className="fold-body">
                    <div
                      className="pt-sm pb-md"
                      data-supascribe-embed-id={feed.embedId}
                      data-supascribe-feed=""
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <Script src={subscribeContent.feedScript} strategy="lazyOnload" />
    </section>
  );
}
