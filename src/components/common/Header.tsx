"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/common/LanguageProvider";
import { CONTENT_LOCALES, localeLabels, type Locale } from "@/lib/localization";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Notes", href: "/notes" },
  { label: "Languages & Culture", href: "/languages" },
  { label: "About", href: "/about" },
];

type Theme = "light" | "dark";

export default function Header() {
  const pathname = usePathname();
  const { locale, setLocale } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initial = saved ?? preferred;
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("theme", next);
  };

  const isCurrent = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-slate-950 dark:text-white" aria-label="Isao — Home">
          ISAO<span className="text-blue-600 dark:text-blue-400">/</span>LOG
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="メインナビゲーション">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={`text-sm transition ${isCurrent(item.href) ? "font-medium text-slate-950 dark:text-white" : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <label className="sr-only" htmlFor="site-locale">表示言語</label>
          <select
            id="site-locale"
            value={locale}
            onChange={(event) => setLocale(event.target.value as Locale)}
            className="hidden bg-transparent px-2 py-2 text-xs text-slate-500 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:block dark:text-slate-400"
          >
            {CONTENT_LOCALES.map((item) => <option key={item} value={item}>{item.toUpperCase()}</option>)}
          </select>
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-9 place-items-center text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
            aria-label={theme === "dark" ? "ライトモードに切り替える" : "ダークモードに切り替える"}
          >
            <span aria-hidden>{theme === "dark" ? "☀" : "◐"}</span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-9 place-items-center text-slate-700 lg:hidden dark:text-slate-200"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            <span className="text-xl" aria-hidden>{menuOpen ? "×" : "≡"}</span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-navigation" className="border-t border-slate-200 px-5 py-4 lg:hidden dark:border-slate-800" aria-label="モバイルナビゲーション">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={`px-2 py-3 text-sm ${isCurrent(item.href) ? "bg-slate-100 font-medium text-slate-950 dark:bg-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}
              >
                {item.label}
              </Link>
            ))}
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value as Locale)}
              className="mt-2 border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-800 dark:text-white"
              aria-label="表示言語"
            >
              {CONTENT_LOCALES.map((item) => <option key={item} value={item}>{localeLabels[item]}</option>)}
            </select>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
