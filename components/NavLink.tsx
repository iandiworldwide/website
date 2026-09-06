"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

// The rule under a nav link draws in from the left on hover, and stays
// drawn on the current page.
export default function NavLink({ href, children, className = "" }: NavLinkProps) {
  const pathname = usePathname();
  const current = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`link-sweep whitespace-nowrap ${className}`}
    >
      {children}
    </Link>
  );
}
