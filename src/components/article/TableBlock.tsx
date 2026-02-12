"use client";

import { useMemo, useState } from "react";

import { pickText, type I18nText, type Lang, type SchoolTableFile } from "@/data/schoolTypes";

type Props = {
  headers?: I18nText[];
  rows?: I18nText[][];
  rawText?: string;
  caption?: I18nText;
  showRowNumbers?: boolean;
  rowNumberStart?: number;
  preserveCellWhitespace?: boolean;
  monospace?: boolean;
  files?: SchoolTableFile[];
  lang: Lang;
  className?: string;
};

export default function TableBlock({
  headers,
  rows,
  rawText,
  caption,
  showRowNumbers = false,
  rowNumberStart = 1,
  preserveCellWhitespace,
  monospace,
  files,
  lang,
  className = "",
}: Props) {
  const [active, setActive] = useState(0);

  const fileList = useMemo<SchoolTableFile[]>(() => {
    if (files && files.length > 0) return files;
    if (!headers && !rows && !rawText) return [];
    return [{
      headers,
      rows,
      rawText,
      caption,
      showRowNumbers,
      rowNumberStart,
      preserveCellWhitespace,
      monospace,
    }];
  }, [
    files,
    headers,
    rows,
    rawText,
    caption,
    showRowNumbers,
    rowNumberStart,
    preserveCellWhitespace,
    monospace,
  ]);

  const current = fileList[Math.min(active, Math.max(fileList.length - 1, 0))];
  if (!current) return null;
  const currentRows =
    current.rows && current.rows.length > 0
      ? current.rows
      : (current.rawText ?? "")
          .replace(/\r\n?/g, "\n")
          .split("\n")
          .filter((line) => line.length > 0)
          .map((line) => [line as I18nText]);
  const currentHeaders =
    current.headers && current.headers.length > 0
      ? current.headers
      : ["QUERY PLAN"];
  const useMonospace = current.monospace ?? Boolean(current.rawText);
  const keepWhitespace =
    current.preserveCellWhitespace ?? Boolean(current.rawText);
  const cellClassName = [
    "px-3 py-2 align-top border-b border-slate-200 dark:border-white/10",
    useMonospace ? "font-mono text-[13px] leading-relaxed" : "",
    keepWhitespace ? "whitespace-pre-wrap" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure
      className={[
        "rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm overflow-hidden select-text",
        className,
      ].join(" ")}
    >
      {fileList.length > 1 && (
        <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 dark:border-white/10 px-3 sm:px-4 py-2">
          {fileList.map((f, i) => {
            const label = f.tabLabel ? pickText(f.tabLabel, lang) : `Table ${i + 1}`;
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={[
                  "shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium border transition",
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-100 dark:border-white/10 dark:hover:bg-white/15",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-700 dark:text-slate-200">
          <thead className="bg-slate-100 dark:bg-white/5">
            <tr>
              {current.showRowNumbers && (
                <th className="px-3 py-2 font-semibold border-b border-slate-200 dark:border-white/10 whitespace-nowrap text-slate-500 dark:text-slate-400 w-[1%]">
                  #
                </th>
              )}
              {currentHeaders.map((h, idx) => (
                <th
                  key={idx}
                  className="px-3 py-2 font-semibold border-b border-slate-200 dark:border-white/10 whitespace-nowrap"
                >
                  {pickText(h, lang)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIdx) => (
              <tr key={rowIdx} className="odd:bg-white even:bg-slate-50/60 dark:odd:bg-transparent dark:even:bg-white/[0.03]">
                {current.showRowNumbers && (
                  <td className="px-3 py-2 align-top border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 tabular-nums">
                    {(current.rowNumberStart ?? 1) + rowIdx}
                  </td>
                )}
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className={cellClassName}>
                    {pickText(cell, lang)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {current.caption && (
        <figcaption className="px-3 sm:px-4 py-2 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-white/10">
          <span className="select-text inline-block max-w-full align-top">
            {pickText(current.caption, lang)}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
