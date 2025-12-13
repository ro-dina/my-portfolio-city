// src/components/Header.tsx
'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

type Theme = "light" | "dark";

export default function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const [canGoBack, setCanGoBack] = useState(false)
    const [theme, setTheme] = useState<Theme>("light");

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
            className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-sky-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 transition"
            aria-label="前のページに戻る"
          >
            ← 戻る
          </button>
        )}
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-semibold text-sky-700 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 transition"
          aria-label="トップページへ"
        >
          ⌂ トップ
        </Link>
      </div>

      {/* 右側: ハンバーガーメニュー */}
      <Menu as="div" className="relative ml-auto">
        <MenuButton
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:text-sky-700 hover:bg-gray-100 ring-1 ring-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 transition"
          aria-label="メニューを開く"
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
          <MenuItems className="absolute right-0 mt-2 w-72 origin-top-right bg-white/90 dark:bg-slate-800/90 text-gray-800 dark:text-gray-100 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden focus:outline-none">
            {/* 言語切り替え */}
            <div className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              言語
            </div>
            <div className="py-1">
              <MenuItem>
                {({ active }) => (
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-sky-50 text-sky-700' : 'text-gray-700'}`}
                  >
                    日本語
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-sky-50 text-sky-700' : 'text-gray-700'}`}
                  >
                    English
                  </button>
                )}
              </MenuItem>
            </div>

            {/* 設定 */}
            <div className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              設定
            </div>
            <div className="py-1">
              <MenuItem>
                {({ active }) => (
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-sky-50 text-sky-700' : 'text-gray-700'}`}
                  >
                    設定ページ
                  </button>
                )}
              </MenuItem>
            </div>

            {/** ダークモード */}
            <button
              onClick={toggle}
              className="block w-full text-left rounded-lg px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:hover:bg-white/15 dark:text-gray-100"
              aria-label="テーマ切り替え"
            >
              {theme === "dark" ? "🌙 ダーク" : "☀️ ライト"}
            </button>

            {/* 商業施設 */}
            <div className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              商業施設
            </div>
            <div className="py-1">
              <MenuItem>
                {({ active }) => (
                  <Link
                    href="/books"
                    className={`block px-4 py-2 text-sm ${active ? 'bg-sky-50 text-sky-700' : 'text-gray-700'}`}
                  >
                    本屋
                  </Link>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </header>
  )
}