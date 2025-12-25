"use client";

import { useI18n } from "@/components/common/LanguageProvider";
import type { SchoolArticle, SchoolBlock } from "@/data/schoolArticles";
import { pickText } from "@/data/schoolArticles";

import Section from "@/components/article/Section";
import CodeBlock from "@/components/article/CodeBlock";

export default function SchoolArticleClient({ article }: { article: SchoolArticle }) {
  const { locale } = useI18n()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          {pickText(article.title, locale)}
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          {pickText(article.summary, locale)}
        </p>

        <div className="mt-10 space-y-6">
          {article.blocks.map((b, i) => (
            <BlockRenderer key={i} block={b} lang={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BlockRenderer({ block, lang }: { block: SchoolBlock; lang: "ja" | "en" | "ru" }) {
  if (block.type === "lead") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/60 p-5 text-slate-700
                      dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-200">
        {pickText(block.text, lang)}
      </div>
    );
  }

  if (block.type === "section") {
    return (
      <Section title={pickText(block.title, lang)}>
        <p className="text-slate-700 dark:text-slate-200">{pickText(block.body, lang)}</p>
      </Section>
    );
  }

  if (block.type === "list") {
    return (
      <Section title={pickText(block.title, lang)}>
        <ul className="space-y-2 list-disc pl-5 text-slate-700 dark:text-slate-200">
          {block.items.map((x, idx) => (
            <li key={idx}>{pickText(x, lang)}</li>
          ))}
        </ul>
      </Section>
    );
  }

  // code
  return (
    <div>
      {block.title && (
        <div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
          {pickText(block.title, lang)}
        </div>
      )}
      <CodeBlock code={block.code} lang={block.lang} filename={block.filename} />
    </div>
  );
}