import SubscribeForm from "@/components/SubscribeForm";
import { contactContent } from "@/lib/content";

// A band of its own beneath the contact form on every page, with air
// above and below: a heading in one column and the one-field form
// stretched across the next two, on the same grid as contact.
export default function NewsletterSection() {
  const { newsletter } = contactContent;
  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="section section-band px-xs md:px-md"
    >
      <div data-reveal className="grid gap-md md:grid-cols-4">
        <h2 id="newsletter-heading">{newsletter.title}</h2>
        <div className="md:col-span-2">
          <SubscribeForm />
        </div>
      </div>
    </section>
  );
}
