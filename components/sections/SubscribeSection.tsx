import Script from "next/script";
import { subscribeContent } from "@/lib/content";

// A screen of its own: the invitation on the left, the live Substack feed on
// the right, and a link out. The feed is drawn by Supascribe, which loads
// after the page is interactive so it never holds up the first paint.
export default function SubscribeSection() {
  return (
    <section
      id="subscribe"
      aria-labelledby="subscribe-heading"
      className="section-full px-xs md:px-md"
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

        <div data-reveal>
          <h3 className="text-caption">{subscribeContent.latestLabel}</h3>
          <div
            className="mt-md"
            data-supascribe-embed-id={subscribeContent.feedEmbedId}
            data-supascribe-feed=""
          />
        </div>
      </div>

      <Script src={subscribeContent.feedScript} strategy="lazyOnload" />
    </section>
  );
}
