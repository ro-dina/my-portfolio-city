"use client";

import { useMemo, useState } from "react";

type Props = {
  code: string;
  lang?: string;          // 右上に "ts" とか表示したいとき用（省略OK）
  filename?: string;
  className?: string;
  showCopy?: boolean;     // false にすればボタン無し
};

export default function CodeBlock({
  code,
  lang,
  filename,
  className = "",
  showCopy = true,
}: Props) {
  const [copied, setCopied] = useState(false);

  const normalized = useMemo(() => {
    // 先頭/末尾の余計な改行を整えて見た目を安定させる
    return code.replace(/^\n+/, "").replace(/\n+$/, "");
  }, [code]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(normalized);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {
      // 権限や環境で失敗する場合があるので握りつぶし（ボタンは残る）
    }
  };

  return (
    <figure
      className={[
        // Light: white card / Dark: slightly lighter than pure black
        "relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm",
        "overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* Header (label + copy) */}
      {(lang || filename || showCopy) && (
        <div
          className={[
            "flex items-center justify-between px-4 py-2",
            // Light header divider / Dark header divider
            "border-b border-slate-200 dark:border-white/10",
          ].join(" ")}
        >
          <div className="flex items-center gap-2 text-xs font-mono">
            {/* Language */}
            {lang && (
              <span className="uppercase text-slate-600 dark:text-slate-300">
                {lang}
              </span>
            )}
            {/* Filename (show as: `python main.py`) */}
            {filename && (
              <span className="text-slate-500 dark:text-slate-400">
                {filename}
              </span>
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

      {/* Body */}
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed bg-transparent">
        <code className="font-mono text-slate-900 dark:text-slate-100 whitespace-pre">
          {normalized}
        </code>
      </pre>
    </figure>
  );
}