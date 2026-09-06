import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  /** True when this link's section is the one on screen. */
  current?: boolean;
  className?: string;
}

// The rule under a nav link draws in from the left on hover, and stays
// drawn while its section is the one you are reading.
export default function NavLink({ href, children, current, className = "" }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={current ? "true" : undefined}
      className={`link-sweep whitespace-nowrap ${className}`}
    >
      {children}
    </Link>
  );
}
