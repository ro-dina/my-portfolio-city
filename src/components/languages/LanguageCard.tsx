"use client";

import Link from "next/link";
import type { LanguageRecord } from "@/data/languages";
import { useI18n } from "@/components/common/LanguageProvider";
import { getLocalizedText } from "@/lib/localization";

export default function LanguageCard({ language }: { language: LanguageRecord }) {
  const { locale } = useI18n();
  return (
    <article className="group border-t border-slate-200 py-5 dark:border-slate-800">
      <Link href={`/languages/${language.slug}`} className="block focus-visible:outline-offset-4">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-xs text-slate-500">{language.nativeName}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-950 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
              {getLocalizedText(language.name, locale)}
            </h3>
          </div>
          <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" aria-hidden>→</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{getLocalizedText(language.summary, locale)}</p>
        <p className="mt-4 text-xs text-slate-500">{getLocalizedText(language.currentLevel, locale)}</p>
      </Link>
    </article>
  );
}
