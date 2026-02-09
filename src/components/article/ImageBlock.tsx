"use client";

import { useMemo, useState } from "react";

import { pickText, type I18nText, type Lang, type SchoolImageFile } from "@/data/schoolTypes";

type Props = {
  src?: string;
  alt?: I18nText;
  caption?: I18nText;
  width?: number;
  height?: number;
  files?: SchoolImageFile[];
  lang: Lang;
  className?: string;
};

export default function ImageBlock({
  src,
  alt,
  caption,
  width,
  height,
  files,
  lang,
  className = "",
}: Props) {
  const [active, setActive] = useState(0);

  const fileList = useMemo<SchoolImageFile[]>(() => {
    if (files && files.length > 0) return files;
    if (!src) return [];
    return [{ src, alt, caption, width, height }];
  }, [files, src, alt, caption, width, height]);

  const current = fileList[Math.min(active, Math.max(fileList.length - 1, 0))];
  if (!current) return null;

  return (
    <figure
      className={[
        "rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm overflow-hidden",
        className,
      ].join(" ")}
    >
      {fileList.length > 1 && (
        <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 dark:border-white/10 px-3 sm:px-4 py-2">
          {fileList.map((f, i) => {
            const label = f.tabLabel ? pickText(f.tabLabel, lang) : `Image ${i + 1}`;
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

      <div className="p-3 sm:p-4 space-y-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt ? pickText(current.alt, lang) : ""}
          width={current.width}
          height={current.height}
          className="w-full rounded-xl border border-slate-200/70 dark:border-slate-800/80"
        />
        {current.caption && (
          <figcaption className="text-sm text-slate-600 dark:text-slate-300">
            {pickText(current.caption, lang)}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
