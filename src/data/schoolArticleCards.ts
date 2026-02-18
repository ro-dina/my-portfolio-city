import type { SchoolArticleCard } from "@/data/schoolTypes";

export const schoolArticleCards: SchoolArticleCard[] = [
  {
    slug: "how-i-write-project-notes",
    title: { ja: "解説記事の書き方テンプレ", en: "How I write project notes" },
    summary: {
      ja: "School 記事を高速に量産するための共通テンプレ。",
      en: "A reusable template to write technical notes fast.",
    },
    tags: ["meta", "writing", "template"],
    updatedAt: "2025-12-25",
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
  },
  {
    slug: "how-to-use-table-of-contents-in-school-articles",
    title: { ja: "School記事で目次を使う方法", en: "How to use table of contents in School articles" },
    summary: {
      ja: "目次を自動生成するためのメモ。",
      en: "Notes on automatically generating a table of contents.",
    },
    tags: ["meta", "writing", "template"],
    updatedAt: "2025-12-25",
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
  },
  {
    slug: "exchange_rate_forecast",
    title: { ja: "為替レートの予測", en: "Exchange rate forecasting" },
    summary: {
      ja: "旅行が好きなので、為替レートを予測するAIを作るメモ。",
      en: "Notes on building an AI model to forecast exchange rates for travel planning.",
    },
    tags: ["AI", "Python"],
    updatedAt: "2025-12-26",
  },
  {
    slug: "postgresql_Execution_Plans",
    title: { ja: "PostgreSQLの実行計画", en: "PostgreSQL Execution Plans" },
    summary: {
      ja: "EXPLAIN、EXPLAIN ANALYZE、オプティマイザ、Seq Scan / Index Scan\nパフォーマンスチューニング (インデックス設計を含む) ",
      en: "EXPLAIN, EXPLAIN ANALYZE, the optimizer, Seq Scan / Index Scan\nPerformance tuning (including index design)",
    },
    tags: ["PostgreSQL", "Database", "SQL"],
    updatedAt: "2026-1-22",
  },
  {
    slug: "postgresql_concurrency_control_isolation_levels",
    title: {ja: "同時実行制御（隔離レベル）"},
    summary: {
      ja: "",
      en: ""
    },
    tags: [],
    updatedAt: ""
  }
];
