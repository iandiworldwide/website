import NavLink from "@/components/NavLink";
import Wordmark from "@/components/Wordmark";
import { navigation } from "@/lib/content";

// The wordmark is the home link; remaining links split centre / right.
// On mobile the last link joins the wordmark on the top row.
const links = navigation.filter((item) => item.href !== "/");
const centre = links.slice(0, 3);
const right = links.slice(3);
const mobileTop = links[links.length - 1];
const mobileRow = links.slice(0, -1);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-header bg-surface text-ink">
      {/* Desktop: wordmark left, links centred and right. No rule, no blur. */}
      <nav
        aria-label="Primary"
        className="hidden h-full md:grid md:grid-cols-3 md:items-center md:px-md"
      >
        {/* justify-self stops the link stretching across its grid column. */}
        <div className="justify-self-start">
          <Wordmark />
        </div>
        <ul className="flex justify-center gap-md">
          {centre.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex justify-end gap-md">
          {right.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: a top pair plus a bottom row. No hamburger. */}
      <nav
        aria-label="Primary"
        className="flex h-full flex-col justify-center px-xs md:hidden"
      >
        <div className="flex items-center justify-between">
          <Wordmark />
          <NavLink href={mobileTop.href}>{mobileTop.name}</NavLink>
        </div>
        <ul className="flex justify-between">
          {mobileRow.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
