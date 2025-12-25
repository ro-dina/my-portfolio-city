"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useI18n } from "@/components/common/LanguageProvider";
import type { SchoolArticle } from "@/data/schoolArticles";
import { pickText } from "@/data/schoolArticles";

export default function SchoolIndexClient({ articles }: { articles: SchoolArticle[] }) {
  const { locale } = useI18n(); // "ja" | "en" を想定
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return articles;
    return articles.filter((a) => {
      const title = pickText(a.title, locale).toLowerCase();
      const summary = pickText(a.summary, locale).toLowerCase();
      return title.includes(s) || summary.includes(s) || a.tags.some((t) => t.toLowerCase().includes(s));
    });
  }, [articles, q, locale]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-16">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            School
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            {locale === "en"
              ? "Notes and deep dives for projects, CS, OS, physics, languages, etc."
              : "プロジェクト解説・CS・OS・物理・語学などの学習ノート置き場。"}
          </p>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={locale === "en" ? "Search..." : "検索..."}
            className="mt-6 w-full max-w-md rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm
                      dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
          />
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <article
              key={a.slug}
              className="rounded-2xl border border-slate-200/70 bg-white/60 backdrop-blur shadow-sm
                        hover:shadow-md transition dark:border-white/10 dark:bg-slate-900/50"
            >
              <div className="p-5">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  <Link href={`/school/${a.slug}`} className="hover:underline">
                    {pickText(a.title, locale)}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {pickText(a.summary, locale)}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full bg-slate-100 px-2.5 py-1 text-slate-700
                                dark:bg-white/10 dark:text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                  {locale === "en" ? "Updated: " : "更新: "}
                  {new Date(a.updatedAt).toLocaleDateString(locale === "en" ? "en-US" : "ja-JP")}
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}