"use client";

import { useI18n } from "@/components/common/LanguageProvider";
import type { SchoolArticle, SchoolBlock } from "@/data/schoolTypes";
import { pickText } from "@/data/schoolTypes";

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
  const normalizeBodyText = (value: string) => {
    // Ignore hard line breaks in source, but honor explicit "\n".
    return value.replace(/\r?\n/g, " ").replace(/\\n/g, "\n");
  };

  const toAnchorId = (value: string) => {
    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\u3040-\u30ff\u4e00-\u9faf\-]/g, "")
      .replace(/-+/g, "-");
  };

  if (block.type === "lead") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/60 p-5 text-slate-700
                      dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-200">
        <p className="whitespace-pre-line">
          {normalizeBodyText(pickText(block.text, lang))}
        </p>
      </div>
    );
  }

  if (block.type === "section") {
    const title = pickText(block.title, lang);
    const id = block.anchor ?? toAnchorId(title);
    return (
      <Section title={title} id={id}>
        <p className="text-slate-700 dark:text-slate-200 whitespace-pre-line">
          {normalizeBodyText(pickText(block.body, lang))}
        </p>
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

  if (block.type === "toc") {
    return (
      <Section title={block.title ? pickText(block.title, lang) : "Contents"}>
        <ul className="space-y-2 list-disc pl-5 text-slate-700 dark:text-slate-200">
          {block.items.map((item, idx) => {
            const title = pickText(item.title, lang);
            const anchor = item.anchor ?? toAnchorId(title);
            return (
              <li key={idx}>
                <a className="hover:underline" href={`#${anchor}`}>
                  {title}
                </a>
              </li>
            );
          })}
        </ul>
      </Section>
    );
  }

  if (block.type === "paragraph") {
    const id = block.anchor;
    const content = (
      <p
        id={id}
        className="text-slate-700 dark:text-slate-200 whitespace-pre-line"
      >
        {normalizeBodyText(pickText(block.body, lang))}
      </p>
    );
    if (block.title) {
      return (
        <Section title={pickText(block.title, lang)} id={id}>
          {content}
        </Section>
      );
    }
    return content;
  }

  // code
  return (
    <div>
      {block.title && (
        <div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
          {pickText(block.title, lang)}
        </div>
      )}
      <CodeBlock
        code={block.code}
        lang={block.lang}
        filename={block.filename}
        files={block.files}
      />
    </div>
  );
}
