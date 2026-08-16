"use client";

import Link from "next/link";
import { useI18n } from "@/components/common/LanguageProvider";
import type { LanguageRecord } from "@/data/languages";
import { getLocalizedText } from "@/lib/localization";

export default function LanguageDetailClient({ language }: { language: LanguageRecord }) {
  const { locale } = useI18n();
  const text = (value: Parameters<typeof getLocalizedText>[0]) => getLocalizedText(value, locale);
  return (
    <article className="page-shell pb-24 pt-10 sm:pt-16">
      <Link href="/languages" className="quiet-link inline-flex">← Languages & Culture</Link>
      <header className="page-intro !pb-12">
        <p className="eyebrow">{language.nativeName}</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl dark:text-white">{text(language.name)}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">{text(language.summary)}</p>
      </header>
      <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,46rem)] lg:gap-16">
        <aside className="border-l border-slate-200 pl-5 dark:border-slate-800"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Current level</p><p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{text(language.currentLevel)}</p></aside>
        <div className="space-y-12">
          <LanguageList title="Goals" values={language.goals.map(text)} empty="目標を追加予定です。" />
          <LanguageList title="Learning History" values={language.learningHistory.map(text)} empty="記録を追加予定です。" />
          <section id="culture" className="border-t border-slate-200 pt-6 dark:border-slate-800"><h2 className="text-xl font-semibold dark:text-white">Books / Films / Travel</h2>{language.cultureLinks.length ? <div className="mt-5 grid gap-px bg-slate-200 sm:grid-cols-2 dark:bg-slate-800">{language.cultureLinks.map((item) => <Link key={`${item.type}-${item.href}`} href={item.href} className="group bg-white p-5 dark:bg-slate-950"><span className="font-mono text-xs text-slate-500">{item.type}</span><span className="mt-2 flex items-center justify-between font-medium group-hover:text-blue-700 dark:group-hover:text-blue-400">{text(item.label)}<span aria-hidden>→</span></span></Link>)}</div> : <p className="mt-4 text-slate-500">文化記録を追加予定です。</p>}</section>
          <section className="border-t border-slate-200 pt-6 dark:border-slate-800"><h2 className="text-xl font-semibold dark:text-white">Writing Samples / Resources</h2>{language.resources.length ? <ul className="mt-4 space-y-2">{language.resources.map((item) => <li key={item.href}><Link href={item.href} className="quiet-link inline-flex">{text(item.label)} →</Link></li>)}</ul> : <p className="mt-4 text-slate-500">文章と学習リソースを追加予定です。</p>}</section>
        </div>
      </div>
    </article>
  );
}

function LanguageList({ title, values, empty }: { title: string; values: string[]; empty: string }) {
  const visible = values.filter(Boolean);
  return <section className="border-t border-slate-200 pt-6 dark:border-slate-800"><h2 className="text-xl font-semibold dark:text-white">{title}</h2>{visible.length ? <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-400">{visible.map((value, index) => <li key={`${value}-${index}`}>{value}</li>)}</ul> : <p className="mt-4 text-slate-500">{empty}</p>}</section>;
}
