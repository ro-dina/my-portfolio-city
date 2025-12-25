"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Locale, messages } from "@/i18n/messages";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

function getByPath(obj: Record<string, unknown>, path: string): string | undefined {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as string | undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ja");

  // 初期化（localStorage → なければブラウザ言語）
  useEffect(() => {
    const saved = window.localStorage.getItem("locale") as Locale | null;
    if (saved === "ja" || saved === "en" || saved === "ru") {
      setLocaleState(saved);
      return;
    }
    const guess: Locale = navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en";
    setLocaleState(guess);
  }, []);

  // html lang を合わせる
  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("locale", locale);
  }, [locale]);

  const t = useMemo(() => {
    return (path: string) => {
      const hit = getByPath(messages[locale], path);
      return hit ?? path; // 見つからなければキーを返す（デバッグしやすい）
    };
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within <LanguageProvider>");
  return ctx;
}