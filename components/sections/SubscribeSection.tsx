import DiaryGlimpse from "@/components/DiaryGlimpse";
import SubstackFeeds from "@/components/SubstackFeeds";
import { subscribeContent } from "@/lib/content";
import { getSubstackPosts, type FeedSort } from "@/lib/substack";

/*
  The invitation on the left with a picture from the diary beside it, the
  Substack feeds on the right, and a link out. It takes only the height it
  needs rather than a screen of its own, since three posts and a headline
  would leave most of a screen empty. The
  feeds, Latest and Most read, are read from Substack on the server and
  kept for an hour, so the page carries no third-party script and only
  small cover images.
*/
export default async function SubscribeSection() {
  const feeds = await Promise.all(
    subscribeContent.feeds.map(async (feed) => ({
      label: feed.label,
      posts: await getSubstackPosts(feed.sort as FeedSort),
    })),
  );

  return (
    <section
      id="subscribe"
      aria-labelledby="subscribe-heading"
      className="section overflow-clip px-xs md:px-md"
    >
      <div className="grid gap-lg md:grid-cols-2 md:gap-md">
        <div data-reveal className="md:flex md:items-start md:justify-between md:gap-md">
          <div className="max-w-[34ch]">
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
          <DiaryGlimpse className="ml-auto mt-lg w-1/2 md:mr-[8%] md:mt-[calc(var(--space-lg)*2)] md:w-[13vw] md:shrink-0" />
        </div>

        <div data-reveal>
          <SubstackFeeds
            label={subscribeContent.eyebrow}
            feeds={feeds}
            fallbackHref={subscribeContent.ctaLink}
            fallbackLabel={subscribeContent.cta}
          />
        </div>
      </div>
    </section>
  );
}
