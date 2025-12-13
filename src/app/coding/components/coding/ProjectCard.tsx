"use client"

// src/components/coding/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import StatusChip from "./StatusChip";
import Tag from "./Tag";
import { formatDate } from "@/data/utils/date";
import type { Project } from "@/data/project";
import { useState } from "react";

export default function ProjectCard({ p }: { p: Project }) {
  const [broken] = useState(false);
  const hasImg = Boolean(p.image?.src) && !broken
  
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/10 dark:bg-white/5">
      {/* 画像枠：常に同じ比率で確保（3:2）。画像が無い/壊れても崩れない */}
      <div className="relative mb-4 aspect-[3/2] w-full overflow-hidden rounded-lg
                      bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
        {hasImg ? (
          <Image
            src={p.image?.src || "/placeholder.jpg"}
            alt={p.image?.alt || p.title}
            width={p.image?.width || 600}
            height={p.image?.height || 400}
            className="rounded-lg object-cover"
          />
        ) : (
          <FallbackThumb title={p.title} />
        )}
      </div>

      <header className="mb-2">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {p.title}
          <StatusChip status={p.status} />
        </h2>
      </header>

      <p className="mb-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {p.summary}
      </p>

      <div className="mb-3 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between text-sm">
        <span className="text-slate-400 dark:text-slate-500">
          更新: {formatDate(p.updatedAt ?? "")}
        </span>

      {p.detailPolicy === "page" ? (
        <Link
          href={`/coding/${p.slug}`}
          className="font-medium text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200"
        >
          詳細を見る →
        </Link>
      ) : p.detailPolicy === "redirect" && p.redirectTo ? (
        <Link
          href={p.redirectTo}
          className="font-medium text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200"
        >
          外部ページ →
        </Link>
      ) : (
        <span className="text-slate-400 dark:text-slate-500">準備中</span>
      )}

      </div>
    </article>
  );
}

// 画像が無い/壊れたときのフォールバック（アイコン＋頭文字）
function FallbackThumb({ title }: { title: string }) {
  const initial = (title || "?").trim().charAt(0).toUpperCase();
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="flex flex-col items-center text-slate-500 dark:text-slate-300">
        {/* カメラ風の簡易SVGアイコン */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              className="opacity-80">
          <path d="M7 7h10l1 2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2h2l2-2z"
                stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="15" r="4" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        <span className="mt-2 text-xs opacity-70">No image</span>
        <span className="mt-1 text-lg font-semibold opacity-90">{initial}</span>
      </div>
    </div>
  );
}

// シマー用の超軽量SVG
/*
function shimmer(w: number, h: number) {
  return `
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f3f4f6" offset="20%" />
        <stop stop-color="#e5e7eb" offset="50%" />
        <stop stop-color="#f3f4f6" offset="80%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f3f4f6" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite"  />
  </svg>`;
}
  */