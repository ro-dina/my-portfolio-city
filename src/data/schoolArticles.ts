import type { Localized } from "@/types/project";

/** Localized<string> または string を受けて、言語に応じて取り出す */
export function pickText(v: Localized<string> | string, lang: "ja" | "en" | "ru") {
  if (typeof v === "string") return v;
  return v[lang] ?? v.ja; // en が無ければ ja にフォールバック
}

export type SchoolBlock =
  | {
      type: "lead";
      text: Localized<string> | string;
    }
  | {
      type: "section";
      title: Localized<string> | string;
      body: Localized<string> | string;
    }
  | {
      type: "list";
      title: Localized<string> | string;
      items: Array<Localized<string> | string>;
    }
  | {
      type: "code";
      title?: Localized<string> | string;
      lang?: string;
      filename?: string;
      code: string;
    };

export type SchoolArticle = {
  slug: string;
  title: Localized<string> | string;
  summary: Localized<string> | string;
  tags: string[];
  updatedAt: string; // とりあえず string に固定（Date 混在事故を防ぐ）
  blocks: SchoolBlock[];
};

export const schoolArticles: SchoolArticle[] = [
  {
    slug: "how-i-write-project-notes",
    title: { ja: "解説記事の書き方テンプレ", en: "How I write project notes" },
    summary: {
      ja: "School 記事を高速に量産するための共通テンプレ。",
      en: "A reusable template to write technical notes fast.",
    },
    tags: ["meta", "writing", "template"],
    updatedAt: "2025-12-25",
    blocks: [
      {
        type: "lead",
        text: {
          ja: "School は『学んだことを再利用できる形で残す場所』。このテンプレに沿って書けば、後から自分も他人も追える記事になります。",
          en: "School is where I keep reusable learning notes. This template helps future-me and others follow along.",
        },
      },
      {
        type: "section",
        title: { ja: "構成", en: "Structure" },
        body: {
          ja: "概要 → 目的 → 仕様 → 設計 → 実装の要点 → 詰まった点 → 改善案 → 参考リンク",
          en: "Overview → Motivation → Specs → Design → Key implementation points → Pitfalls → Improvements → Links",
        },
      },
      {
        type: "list",
        title: { ja: "よく使う見出し", en: "Common headings" },
        items: [
          { ja: "制作動機", en: "Motivation" },
          { ja: "挙動（動画/スクショ）", en: "Behavior (demo)" },
          { ja: "特徴", en: "Highlights" },
          { ja: "設計メモ", en: "Design notes" },
          { ja: "トラブルシュート", en: "Troubleshooting" },
        ],
      },
    ],
  },

  {
    slug: "next-app-router-server-client",
    title: { ja: "Next.js: Server/Client分離の考え方", en: "Next.js: Server/Client boundary" },
    summary: {
      ja: "paramsがPromiseなど、App Routerで詰まりやすい境界の整理。",
      en: "A practical guide to App Router boundaries (e.g., params as Promise).",
    },
    tags: ["nextjs", "app-router", "architecture"],
    updatedAt: "2025-12-25",
    blocks: [
      {
        type: "section",
        title: { ja: "結論", en: "Takeaway" },
        body: {
          ja: "ページ（Server）でデータ取得・存在チェック → Clientに“シリアライズ可能なデータだけ”渡す。関数やJSXは渡さない。",
          en: "Fetch/check in Server page → pass only serializable data to Client. Never pass functions/JSX.",
        },
      },
      {
        type: "code",
        title: { ja: "例: Server page", en: "Example: Server page" },
        lang: "ts",
        filename: "page.tsx",
        code: `import { notFound } from "next/navigation";
import { schoolArticles } from "@/data/schoolArticles";
import SchoolArticleClient from "./SchoolArticleClient";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = schoolArticles.find((x) => x.slug === slug);
  if (!a) return notFound();
  return <SchoolArticleClient article={a} />;
}`,
      },
    ],
  },

  {
    slug: "algorithm-visualizer-notes",
    title: { ja: "Algorithm Visualizer 設計メモ", en: "Algorithm Visualizer design notes" },
    summary: {
      ja: "可視化UIの設計・状態管理・ステップ実行の考え方。",
      en: "Notes on visualization UI, state, and step-by-step execution.",
    },
    tags: ["algorithm", "visualization", "ui"],
    updatedAt: "2025-12-25",
    blocks: [
      {
        type: "section",
        title: { ja: "何を学べる？", en: "What you learn" },
        body: {
          ja: "配列の状態をどう“説明できる形”で保存し、UIに反映するか。",
          en: "How to store array states in an explainable way and render them in UI.",
        },
      },
      {
        type: "list",
        title: { ja: "実装の要点", en: "Key points" },
        items: [
          { ja: "操作ログ（ステップ）を配列で持つ", en: "Keep steps as an array of operations" },
          { ja: "現在ステップindexで描画を決める", en: "Render based on current step index" },
          { ja: "速度変更はタイマー間隔だけ変える", en: "Speed control adjusts timer interval" },
        ],
      },
    ],
  },
];