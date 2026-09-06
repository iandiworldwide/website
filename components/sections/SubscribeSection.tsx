import { subscribeContent } from "@/lib/content";

// A screen of its own, almost entirely empty, with a link out to the Substack.
export default function SubscribeSection() {
  return (
    <section
      id="subscribe"
      aria-labelledby="subscribe-heading"
      className="section-full px-xs md:px-md"
    >
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
    </section>
  );
}
