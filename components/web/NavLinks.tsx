"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    {
      label: "Example One",
      href: "/",
    },
    {
      label: "Example Two",
      href: "/example-2",
    },
    {
      label: "Example Three",
      href: "/example-3",
    },
    {
      label: "Example Four",
      href: "/example-4",
    },
  ];
  return (
    <div className="flex items-center gap-3">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${
            isActive(link.href) ? "bg-blue-500/10 text-blue-500" : ""
          } px-2 py-1 rounded-md`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
