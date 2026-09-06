"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavLink from "@/components/NavLink";
import Wordmark from "@/components/Wordmark";
import { navigation } from "@/lib/content";

const left = navigation.slice(0, 3);
const right = navigation.slice(3);

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
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

/*
  The chrome sits in two places: the logotype pinned top left, and the
  navigation pinned along the bottom. Both are fixed and fully transparent,
  so the screens pass beneath them.
*/
export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const activeSection = useActiveSection(onHome);

  // Anchors mark the section you are reading; page links mark the page you are on.
  const isCurrent = (href: string) =>
    href.startsWith("#") ? onHome && href.slice(1) === activeSection : pathname === href;

  // Anchors only work on the home page, so from elsewhere they point back to it.
  const resolve = (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);

  const item = (entry: (typeof navigation)[number]) => (
    <li key={entry.href}>
      <NavLink href={resolve(entry.href)} current={isCurrent(entry.href)}>
        {entry.name}
      </NavLink>
    </li>
  );

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-header items-center px-xs md:px-md">
        <Wordmark />
      </div>

      <nav
        aria-label="Primary"
        className="nav-bottom fixed inset-x-0 bottom-0 z-50 text-ink"
      >
        {/* Desktop: one row, the two groups pushed to opposite edges. */}
        <div className="relative hidden h-header items-center justify-between px-md md:flex">
          <ul className="flex gap-md">{left.map(item)}</ul>
          <ul className="flex gap-md">{right.map(item)}</ul>
        </div>

        {/* Mobile: two rows of three. No hamburger. */}
        <div className="relative flex h-header flex-col justify-center px-xs md:hidden">
          <ul className="flex justify-between">{left.map(item)}</ul>
          <ul className="flex justify-between">{right.map(item)}</ul>
        </div>
      </nav>
    </>
  );
}
