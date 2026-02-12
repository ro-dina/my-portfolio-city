"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_PX = 320;

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="ページの先頭に戻る"
      className={[
        "fixed bottom-5 right-5 z-50 rounded-full",
        "h-11 w-11 sm:h-12 sm:w-12",
        "border border-slate-200 bg-white/95 text-slate-700 shadow-md backdrop-blur",
        "hover:bg-slate-50 hover:text-slate-900 transition",
        "dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      ↑
    </button>
  );
}
