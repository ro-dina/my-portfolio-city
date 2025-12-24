"use client";

import { useMemo, useState } from "react";

type CodeFile = {
  code: string;
  lang?: string;
  filename?: string;
  tabLabel?: string; // optional: label for the tab button
};

type Props = {
  /** Back-compat (single file) */
  code?: string;
  lang?: string; // 右上に "ts" とか表示したいとき用（省略OK）
  filename?: string;

  /** New (multi file) */
  files?: CodeFile[];

  className?: string;
  showCopy?: boolean; // false にすればボタン無し
};

function normalizeCode(src: string) {
  // 先頭/末尾の余計な改行を整えて見た目を安定させる
  return src.replace(/^\n+/, "").replace(/\n+$/, "");
}

export default function CodeBlock({
  code,
  lang,
  filename,
  files,
  className = "",
  showCopy = true,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(0);

  // Build file list (backward compatible)
  const fileList = useMemo<CodeFile[]>(() => {
    if (files && files.length > 0) return files;
    return [{ code: code ?? "", lang, filename }];
  }, [files, code, lang, filename]);

  const current = fileList[Math.min(active, fileList.length - 1)] ?? {
    code: "",
  };

  const normalized = useMemo(() => normalizeCode(current.code ?? ""), [current.code]);
  const lines = useMemo(() => normalized.split("\n"), [normalized]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(normalized);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {
      // 権限や環境で失敗する場合があるので握りつぶし（ボタンは残る）
    }
  };

  const hasHeader =
    fileList.length > 1 || current.lang || current.filename || showCopy;

  return (
    <figure
      className={[
        // Light: white card / Dark: slightly lighter than pure black
        "relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm",
        "overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* Header (tabs + label + copy) */}
      {hasHeader && (
        <div
          className={[
            "flex items-center justify-between gap-3 px-3 sm:px-4 py-2",
            "border-b border-slate-200 dark:border-white/10",
          ].join(" ")}
        >
          <div className="min-w-0">
            {/* Tabs */}
            {fileList.length > 1 && (
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {fileList.map((f, i) => {
                  const label =
                    f.tabLabel ?? f.filename ?? f.lang ?? `File ${i + 1}`;
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      className={[
                        "shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium",
                        "border transition",
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

            {/* Meta line (LANG + filename) */}
            {(current.lang || current.filename) && (
              <div className="flex items-center gap-2 text-xs font-mono min-w-0">
                {current.lang && (
                  <span className="uppercase text-slate-600 dark:text-slate-300">
                    {current.lang}
                  </span>
                )}
                {current.filename && (
                  <span className="truncate text-slate-500 dark:text-slate-400">
                    {current.filename}
                  </span>
                )}
              </div>
            )}
          </div>

          {showCopy && (
            <button
              type="button"
              onClick={onCopy}
              className={[
                "inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs font-medium",
                // Light button
                "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200",
                // Dark button
                "dark:bg-white/10 dark:hover:bg-white/15 dark:text-slate-100 dark:border-white/10",
                "transition",
              ].join(" ")}
              aria-label="Copy code"
            >
              <span className={copied ? "text-emerald-600 dark:text-emerald-300" : ""}>
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
          )}
        </div>
      )}

      {/* Body (shared scroll so line numbers align) */}
      <div className="overflow-x-auto">
        <div className="flex">
          {/* Line numbers */}
          <div
            className={[
              "select-none text-right",
              // match code typography
              "font-mono text-[13px] leading-relaxed",
              // padding to align with code block padding
              "py-4 pl-4 pr-3",
              // colors
              "text-slate-400 dark:text-slate-500",
              // prevent shrinking too small
              "min-w-[3ch]",
            ].join(" ")}
            aria-hidden="true"
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code */}
          <pre className="m-0 p-4 text-[13px] leading-relaxed bg-transparent">
            <code className="font-mono text-slate-900 dark:text-slate-100 whitespace-pre">
              {normalized}
            </code>
          </pre>
        </div>
      </div>
    </figure>
  );
}