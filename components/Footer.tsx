import { footerContent } from "@/lib/content";

// Fixed, transparent, 63px, two columns, two links. pointer-events are
// disabled on the bar so it never blocks content scrolling beneath it.
export default function Footer() {
  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-40 grid h-header grid-cols-2 items-center bg-transparent px-xs text-ink md:px-md">
      <p>{footerContent.copyright}</p>
      <ul className="flex justify-end gap-md">
        {footerContent.socials.map((social) => (
          <li key={social.name}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto"
            >
              {social.name}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
