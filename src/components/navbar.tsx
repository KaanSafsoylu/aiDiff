"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/reports", label: "Raporlar" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white">
            ai<span className="text-violet-400">Diff</span>
          </span>
        </Link>

        <nav className="flex items-center space-x-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-violet-600/20 text-violet-200"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
