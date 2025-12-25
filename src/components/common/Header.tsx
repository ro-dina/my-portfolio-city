// src/components/common/Header.tsx
'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useI18n } from './LanguageProvider'

type Theme = "light" | "dark";

export default function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const [canGoBack, setCanGoBack] = useState(false)
    const [theme, setTheme] = useState<Theme>("light");
    const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    // Show back button only if there is history AND we are not on root.
    if (typeof window !== 'undefined') {
      setCanGoBack(window.history.length > 1 && pathname !== '/')
    }
  }, [pathname])

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
    const initial: Theme =
      saved ?? (document.documentElement.classList.contains("dark") ? "dark" : "light");
    applyTheme(initial);
  }, []);

  const applyTheme = (t: Theme) => {
    setTheme(t);
    const root = document.documentElement;
    if (t === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", t);
  }

  const toggle = () => applyTheme(theme === "dark" ? "light" : "dark")

  return (
    <header className="w-full fixed top-0 left-0 z-50 px-4 py-3 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-gray-200/60 dark:border-white/10 shadow-sm">
      {/* 左側: 戻る/トップへ */}
      <div className="flex space-x-4">
        {canGoBack && (
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-sky-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 transition dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/10"
            aria-label={t("common.back")}
          >
            ← {t("common.back")}
          </button>
        )}
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-semibold text-sky-700 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 transition dark:text-sky-200 dark:hover:bg-white/10"
          aria-label={t("common.top")}
        >
          ⌂ {t("common.top")}
        </Link>
      </div>

      {/* 右側: ハンバーガーメニュー */}
      <Menu as="div" className="relative ml-auto">
        <MenuButton
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:text-sky-700 hover:bg-gray-100 ring-1 ring-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 transition dark:text-slate-100 dark:hover:text-white dark:hover:bg-white/10 dark:ring-white/20"
          aria-label={t("common.menu")}
        >
          <Bars3Icon className="w-6 h-6" />
        </MenuButton>

        <Transition
          enter="transition ease-out duration-150"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <MenuItems className="absolute right-0 mt-2 w-72 origin-top-right bg-white/90 dark:bg-slate-900/90 text-gray-800 dark:text-gray-100 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden focus:outline-none">
            {/* 言語切り替え */}
            <div className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
              {t("common.language")}
            </div>
            <div className="py-1">
              <MenuItem>
                <button
                  onClick={() => setLocale("ja")}
                  className="group flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-100 data-[focus]:bg-sky-50 data-[focus]:text-sky-700 dark:data-[focus]:bg-slate-700/60 dark:data-[focus]:text-sky-200"
                  aria-label={t("common.japanese")}
                >
                  <span>{t("common.japanese")}</span>
                  {locale === "ja" && <span aria-hidden>✓</span>}
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => setLocale("en")}
                  className="group flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-100 data-[focus]:bg-sky-50 data-[focus]:text-sky-700 dark:data-[focus]:bg-slate-700/60 dark:data-[focus]:text-sky-200"
                  aria-label={t("common.english")}
                >
                  <span>{t("common.english")}</span>
                  {locale === "en" && <span aria-hidden>✓</span>}
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => setLocale("ru")}
                  className="group flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-100 data-[focus]:bg-sky-50 data-[focus]:text-sky-700 dark:data-[focus]:bg-slate-700/60 dark:data-[focus]:text-sky-200"
                  aria-label={t("common.russian")}
                >
                  <span>{t("common.russian")}</span>
                  {locale === "ru" && <span aria-hidden>✓</span>}
                </button>
              </MenuItem>
            </div>

            {/* 設定 */}
            <div className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
              {t("common.settings")}
            </div>
            <div className="py-1">
              <MenuItem>
                <button
                  className="group flex w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 data-[focus]:bg-sky-50 data-[focus]:text-sky-700"
                >
                  {t("common.settingsPage")}
                </button>
              </MenuItem>
            </div>

            {/** ダークモード */}
            <button
              onClick={toggle}
              className="block w-full text-left rounded-lg px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:hover:bg-white/15 dark:text-gray-100"
              aria-label={t("common.themeToggle")}
            >
              {theme === "dark" ? t("common.themeDark") : t("common.themeLight")}
            </button>

            {/* 商業施設 */}
            <div className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
              {t("common.commercial")}
            </div>
            <div className="py-1">
              <MenuItem>
                <Link
                  href="/books"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 data-[focus]:bg-sky-50 data-[focus]:text-sky-700 dark:data-[focus]:bg-slate-700/60 dark:data-[focus]:text-sky-200"
                >
                  {t("common.bookstore")}
                </Link>
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </header>
  )
}