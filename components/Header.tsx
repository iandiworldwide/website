"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "@/components/NavLink";
import { navigation, siteConfig } from "@/lib/content";

// The first three links sit centre, the rest right.
const centre = navigation.slice(0, 3);
const right = navigation.slice(3);
// On mobile the last link joins the wordmark on the top row.
const mobileTop = navigation[navigation.length - 1];
const mobileRow = navigation.slice(0, -1);

const anchors = navigation.filter((item) => item.href.startsWith("#"));

// Watches the home page's sections and reports whichever fills most of the
// viewport, so the nav marks where you are as you scroll.
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("");

  useEffect(() => {
    // Off the home page there are no sections to watch. Any stale value is
    // ignored by the caller, which checks it is on the home page first.
    if (!enabled) return;
    const sections = anchors
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(bestRatio > 0 ? best : "");
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-63px 0px 0px 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const activeSection = useActiveSection(onHome);

  // Anchors mark the section you are reading; page links mark the page you are on.
  const isCurrent = (href: string) =>
    href.startsWith("#") ? onHome && href.slice(1) === activeSection : pathname === href;

  // Anchors only work on the home page, so from elsewhere they point back to it.
  const resolve = (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-header bg-transparent text-ink">
      {/* Desktop: wordmark left, links centred and right. No rule, no fill. */}
      <nav
        aria-label="Primary"
        className="hidden h-full md:grid md:grid-cols-3 md:items-center md:px-md"
      >
        <div className="justify-self-start">
          <Link href="/" aria-label={siteConfig.name} className="wordmark">
            {siteConfig.logo}
          </Link>
        </div>
        <ul className="flex justify-center gap-md">
          {centre.map((item) => (
            <li key={item.href}>
              <NavLink href={resolve(item.href)} current={isCurrent(item.href)}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex justify-end gap-md">
          {right.map((item) => (
            <li key={item.href}>
              <NavLink href={resolve(item.href)} current={isCurrent(item.href)}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: a top pair plus a bottom row. No hamburger. */}
      <nav aria-label="Primary" className="flex h-full flex-col justify-center px-xs md:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label={siteConfig.name} className="wordmark">
            {siteConfig.logo}
          </Link>
          <NavLink href={resolve(mobileTop.href)} current={isCurrent(mobileTop.href)}>
            {mobileTop.name}
          </NavLink>
        </div>
        <ul className="flex justify-between">
          {mobileRow.map((item) => (
            <li key={item.href}>
              <NavLink href={resolve(item.href)} current={isCurrent(item.href)}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
