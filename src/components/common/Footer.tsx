"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="page-shell flex flex-col gap-6 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Isao. Built as an ongoing activity log.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/projects" className="hover:text-slate-950 dark:hover:text-white">Projects</Link>
          <Link href="/notes" className="hover:text-slate-950 dark:hover:text-white">Notes</Link>
          <Link href="/travel" className="hover:text-slate-950 dark:hover:text-white">Travel archive</Link>
          <a href="https://github.com/ro-dina" target="_blank" rel="noreferrer" className="hover:text-slate-950 dark:hover:text-white">GitHub ↗</a>
        </div>
      </div>
    </footer>
  );
}
