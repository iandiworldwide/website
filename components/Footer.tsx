import { footerContent } from "@/lib/content";

// Sits at the foot of the document rather than pinned to the viewport, so it
// never floats over a full-height screen. Two columns, borderless, 63px.
export default function Footer() {
  return (
    <footer className="grid h-header grid-cols-2 items-center bg-transparent px-xs text-ink md:px-md">
      <p className="text-caption">{footerContent.copyright}</p>
      <ul className="flex justify-end gap-md text-caption">
        {footerContent.socials.map((social) => (
          <li key={social.name}>
            <a href={social.url} target="_blank" rel="noopener noreferrer" className="link-sweep">
              {social.name}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
