import Link from "next/link";
import type { LanguageRecord } from "@/data/languages";

export default function LanguageCard({ language }: { language: LanguageRecord }) {
  return (
    <article className="group border-t border-slate-200 py-5 dark:border-slate-800">
      <Link href={`/languages/${language.slug}`} className="block focus-visible:outline-offset-4">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-xs text-slate-500">{language.nativeName}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-950 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
              {language.name}
            </h3>
          </div>
          <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" aria-hidden>→</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{language.summary}</p>
        <p className="mt-4 text-xs text-slate-500">{language.currentLevel}</p>
      </Link>
    </article>
  );
}
