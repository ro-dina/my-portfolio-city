"use client";

import { useState } from "react";
import { useI18n } from "@/components/common/LanguageProvider";
import type {
  SchoolArticle,
  SchoolBlock,
  SchoolExerciseContentBlock,
  SchoolListItem,
} from "@/data/schoolTypes";
import { pickText } from "@/data/schoolTypes";

import Section from "@/components/article/Section";
import CodeBlock from "@/components/article/CodeBlock";
import ImageBlock from "@/components/article/ImageBlock";
import TableBlock from "@/components/article/TableBlock";

const ENABLE_TOC_TARGET_UNDERLINE = false;

export default function SchoolArticleClient({ article }: { article: SchoolArticle }) {
  const { locale } = useI18n()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-16">
        <h1 className="select-text inline-block max-w-full align-top text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          {pickText(article.title, locale)}
        </h1>
        <p className="select-text inline-block max-w-full align-top mt-3 text-slate-600 dark:text-slate-300">
          {pickText(article.summary, locale)}
        </p>

        <div className="mt-10 space-y-6 select-none">
          {article.blocks.map((b, i) => (
            <BlockRenderer
              key={i}
              block={b}
              lang={locale}
              enableTargetUnderline={ENABLE_TOC_TARGET_UNDERLINE}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BlockRenderer({
  block,
  lang,
  enableTargetUnderline,
}: {
  block: SchoolBlock;
  lang: "ja" | "en" | "ru";
  enableTargetUnderline: boolean;
}) {
  const normalizeBodyText = (value: string) => {
    // Keep intentional newlines, but remove editor-wrap newlines with indentation.
    return value
      .replace(/\r\n?/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/\n[ \t]+/g, "")
      .replace(/\n{3,}/g, "\n\n");
  };

  const toAnchorId = (value: string) => {
    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\u3040-\u30ff\u4e00-\u9faf\-]/g, "")
      .replace(/-+/g, "-");
  };

  const renderListItem = (item: SchoolListItem, idx: number) => {
    if (typeof item === "string" || ("ja" in item && !("title" in item))) {
      return <li key={idx}>{pickText(item, lang)}</li>;
    }

    return (
      <li key={idx}>
        <div className="font-medium text-slate-800 dark:text-slate-100">
          {pickText(item.title, lang)}
        </div>
        {item.description && (
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
            {normalizeBodyText(pickText(item.description, lang))}
          </div>
        )}
      </li>
    );
  };

  const renderExerciseContentBlock = (item: SchoolExerciseContentBlock, idx: number) => {
    if (item.type === "paragraph") {
      return (
        <p
          key={idx}
          className="select-text inline-block max-w-full align-top text-slate-700 dark:text-slate-200 whitespace-pre-wrap"
        >
          {normalizeBodyText(pickText(item.body, lang))}
        </p>
      );
    }

    if (item.type === "list") {
      return (
        <ul
          key={idx}
          className="select-text space-y-2 list-disc pl-5 text-slate-700 dark:text-slate-200"
        >
          {item.items.map(renderListItem)}
        </ul>
      );
    }

    if (item.type === "image") {
      return (
        <ImageBlock
          key={idx}
          src={item.src}
          alt={item.alt}
          caption={item.caption}
          width={item.width}
          height={item.height}
          files={item.files}
          lang={lang}
        />
      );
    }

    if (item.type === "table") {
      const rawText = "rawText" in item ? item.rawText : undefined;
      const preserveCellWhitespace =
        "preserveCellWhitespace" in item ? item.preserveCellWhitespace : undefined;
      const monospace = "monospace" in item ? item.monospace : undefined;

      return (
        <TableBlock
          key={idx}
          headers={item.headers}
          rows={item.rows}
          rawText={rawText}
          caption={item.caption}
          showRowNumbers={item.showRowNumbers}
          rowNumberStart={item.rowNumberStart}
          preserveCellWhitespace={preserveCellWhitespace}
          monospace={monospace}
          files={item.files}
          lang={lang}
        />
      );
    }

    return (
      <div key={idx} className="select-none">
        <CodeBlock
          code={item.code}
          lang={item.lang}
          filename={item.filename}
          files={item.files}
        />
      </div>
    );
  };

  if (block.type === "lead") {
    return (
      <div className="select-none rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm overflow-hidden
                      dark:border-white/10 dark:bg-slate-900 dark:text-slate-200">
        <p className="select-text inline-block max-w-full align-top whitespace-pre-wrap">
          {normalizeBodyText(pickText(block.text, lang))}
        </p>
      </div>
    );
  }

  if (block.type === "section") {
    const title = pickText(block.title, lang);
    const id = block.anchor ?? toAnchorId(title);
    return (
      <Section title={title} id={id} highlightOnTarget={enableTargetUnderline}>
        <p className="select-text inline-block max-w-full align-top text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
          {normalizeBodyText(pickText(block.body, lang))}
        </p>
      </Section>
    );
  }

  if (block.type === "list") {
    const title = pickText(block.title, lang);
    const id = block.anchor ?? toAnchorId(title);
    return (
      <Section title={title} id={id} highlightOnTarget={enableTargetUnderline}>
        <ul className="select-text space-y-2 list-disc pl-5 text-slate-700 dark:text-slate-200">
          {block.items.map(renderListItem)}
        </ul>
      </Section>
    );
  }

  if (block.type === "toc") {
    return (
      <Section title={block.title ? pickText(block.title, lang) : "Contents"}>
        <ul className="select-text space-y-2 list-disc pl-5 text-slate-700 dark:text-slate-200">
          {block.items.map((item, idx) => {
            const title = pickText(item.title, lang);
            const anchor = item.anchor ?? toAnchorId(title);
            return (
              <li key={idx}>
                <a
                  className="select-text inline-block max-w-full align-top hover:underline focus:outline-none focus-visible:underline"
                  href={`#${anchor}`}
                >
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
    const paragraphText = (
      <p className="select-text inline-block max-w-full align-top text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
        {normalizeBodyText(pickText(block.body, lang))}
      </p>
    );
    if (block.title) {
      return (
        <Section
          title={pickText(block.title, lang)}
          id={id}
          highlightOnTarget={enableTargetUnderline}
        >
          {paragraphText}
        </Section>
      );
    }
    return (
      <div
        id={id}
        className="select-none rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm overflow-hidden [scroll-margin-top:var(--school-anchor-offset,7rem)]
                   dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
      >
        {paragraphText}
      </div>
    );
  }

  if (block.type === "image") {
    const figure = (
      <ImageBlock
        src={block.src}
        alt={block.alt}
        caption={block.caption}
        width={block.width}
        height={block.height}
        files={block.files}
        lang={lang}
      />
    );
    if (block.title) {
      return <Section title={pickText(block.title, lang)}>{figure}</Section>;
    }
    return figure;
  }

  if (block.type === "table") {
    const rawText = "rawText" in block ? block.rawText : undefined;
    const preserveCellWhitespace =
      "preserveCellWhitespace" in block ? block.preserveCellWhitespace : undefined;
    const monospace = "monospace" in block ? block.monospace : undefined;

    const table = (
      <TableBlock
        headers={block.headers}
        rows={block.rows}
        rawText={rawText}
        caption={block.caption}
        showRowNumbers={block.showRowNumbers}
        rowNumberStart={block.rowNumberStart}
        preserveCellWhitespace={preserveCellWhitespace}
        monospace={monospace}
        files={block.files}
        lang={lang}
      />
    );
    if (block.title) {
      return <Section title={pickText(block.title, lang)}>{table}</Section>;
    }
    return table;
  }

  if (block.type === "exercise") {
    return (
      <ExerciseCard
        id={block.anchor}
        title={pickText(block.title, lang)}
        question={normalizeBodyText(pickText(block.question, lang))}
        questionBlocks={block.questionBlocks}
        answer={block.answer ? normalizeBodyText(pickText(block.answer, lang)) : undefined}
        answerBlocks={block.answerBlocks}
        initiallyOpen={block.initiallyOpen}
        onRenderItem={renderExerciseContentBlock}
        highlightOnTarget={enableTargetUnderline}
      />
    );
  }

  // code
  return (
    <div className="select-none">
      {block.title && (
        <div className="select-text inline-block max-w-full align-top mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
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

function ExerciseCard({
  id,
  title,
  question,
  questionBlocks,
  answer,
  answerBlocks,
  initiallyOpen,
  onRenderItem,
  highlightOnTarget,
}: {
  id?: string;
  title: string;
  question: string;
  questionBlocks?: SchoolExerciseContentBlock[];
  answer?: string;
  answerBlocks?: SchoolExerciseContentBlock[];
  initiallyOpen?: boolean;
  onRenderItem: (item: SchoolExerciseContentBlock, idx: number) => React.ReactNode;
  highlightOnTarget: boolean;
}) {
  const [open, setOpen] = useState(Boolean(initiallyOpen));

  return (
    <Section title={title} id={id} highlightOnTarget={highlightOnTarget}>
      <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-4 dark:border-sky-900/60 dark:bg-sky-950/25">
        <div className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
          Question
        </div>
        <p className="mt-2 select-text inline-block max-w-full align-top text-slate-800 dark:text-slate-100 whitespace-pre-wrap">
          {question}
        </p>
        {questionBlocks && questionBlocks.length > 0 && (
          <div className="mt-3 space-y-3">{questionBlocks.map(onRenderItem)}</div>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/60">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-white/15 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15"
          aria-expanded={open}
        >
          <span>{open ? "答えを隠す" : "答えを見る"}</span>
          <span aria-hidden>{open ? "▲" : "▼"}</span>
        </button>

        {open && (
          <div className="mt-3 space-y-3">
            {answer && (
              <p className="select-text inline-block max-w-full align-top text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                {answer}
              </p>
            )}
            {answerBlocks && answerBlocks.length > 0 && (
              <div className="space-y-3">{answerBlocks.map(onRenderItem)}</div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
