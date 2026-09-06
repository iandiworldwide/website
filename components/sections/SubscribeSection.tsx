import { blogPosts, subscribeContent } from "@/lib/content";

const LATEST = blogPosts.slice(0, subscribeContent.latestCount);

// A screen of its own: the invitation on the left, the most recent letters
// on the right, and a link out to the Substack.
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
          <ul className="mt-md space-y-md">
            {LATEST.map((post) => (
              <li key={post.id}>
                <p className="text-caption">{post.date}</p>
                {post.url ? (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-sweep"
                  >
                    {post.title}
                  </a>
                ) : (
                  post.title
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
