import FooterMark from "@/components/FooterMark";
import { footerContent } from "@/lib/content";

/*
  Sits at the foot of the document rather than pinned to the viewport, so it
  never floats over a full-height screen. The mark first, drifting through
  the palette as the logotype does but more faded, and bending under the
  pointer, then one borderless row: copyright and company details left,
  links right.
*/
export default function Footer() {
  return (
    <footer className="px-xs pt-lg text-ink md:px-md">
      <FooterMark />

      <div className="grid h-header grid-cols-2 items-center">
        <div className="text-caption">
          <p>{footerContent.copyright}</p>
          <p className="text-slate">
            {footerContent.company}, {footerContent.companyNumber}
          </p>
        </div>
        <ul className="flex justify-end gap-md text-caption">
          {footerContent.socials.map((social) => (
            <li key={social.name}>
              <a href={social.url} target="_blank" rel="noopener noreferrer" className="link-sweep">
                {social.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
