import type { SchoolArticleContent } from "@/data/schoolTypes";

export const schoolArticleContents: SchoolArticleContent[] = [
  {
    slug: "how-i-write-project-notes",
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
  {    slug: "how-to-use-table-of-contents-in-school-articles",
    blocks: [
        {
          type: "toc",
          title: { ja: "目次", en: "Contents" },
          items: [
            { title: { ja: "概要", en: "Overview" }, anchor: "overview" },
            { title: { ja: "実装の要点", en: "Key Points" }, anchor: "key-points" },
          ],
        },
        {
          type: "section",
          title: { ja: "概要", en: "Overview" },
          anchor: "overview",
          body: { ja: "..." , en: "..." },
        },
        {
          type: "section",
          title: { ja: "実装の要点", en: "Key Points" },
          anchor: "key-points",
          body: { ja: "..." , en: "..." },
        },
            ],
  },

  {
    slug: "algorithm-visualizer-notes",
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
  {
    slug: "exchange_rate_forecast",
    blocks: [
      {
        type: "section",
        title: { ja: "概要", en: "Overview" },
        body: {
          ja: "（ここに目的・データ・モデルの概要を追記）",
          en: "(Add motivation, data sources, and model overview here)",
        },
      },
    ],
  },
  {
    slug: "postgresql_Execution_Plans",
    blocks: [
      {
        type: "section",
        title: { ja: "概要", en: "Overview" },
        body: {
          ja: "（ここに目的・データ・モデルの概要を追記）",
          en: "(Add motivation, data sources, and model overview here)",
        },
      },
      {
        type: "section",
        title: { ja: "メモ", en: "Notes" },
        body: {
          ja: "実行計画EXPLAIN、EXPLAIN ANALYZE、オプティマイザ、Seq Scan / Index Scan\nパフォーマンスチューニング (インデックス設計を含む) に興味関心がある学生におすすめ。\n参考: 📖 教科書「6-4 統計情報」\n難易度: ⭐⭐⭐",
          en: "Interested students in execution plans EXPLAIN, EXPLAIN ANALYZE, the optimizer, Seq Scan / Index Scan\nPerformance tuning (including index design) will find this useful.\nRef: 📖 Textbook '6-4 Statistics'\nDifficulty: ⭐⭐⭐",
        },
      },
      {
        type: "toc",
        title: { ja: "目次", en: "Contents" },
        items: [
          { title: { ja: "実行計画とは", en: "What is an execution plan?" }, anchor: "what-is-execution-plan" },
          { title: { ja: "前準備: テーブルの作成", en: "Preparation: Creating tables" }, anchor: "preparation-tables" },
          { title: { ja: "EXPLAIN コマンド", en: "EXPLAIN command" }, anchor: "explain-command" },
          { title: { ja: "EXPLAIN ANALYZE コマンド", en: "EXPLAIN ANALYZE command" }, anchor: "explain-analyze-command" },
          { title: { ja: "実行計画の読み方", en: "How to read execution plans" }, anchor: "reading-execution-plans" },
          { title: { ja: "パフォーマンスチューニングへの応用", en: "Application to performance tuning" }, anchor: "performance-tuning-application" },
        ],
      },
      {
        type: "paragraph",
        title: { ja: "実行計画とは", en: "What is an execution plan?" },
        anchor: "what-is-execution-plan",
        body: {
          ja: `実行計画とは、データベースがSQLクエリを実行する際の手順や方法を示すものです。
          \nユーザがDBMSにSQL文を発行すると、DBMSはまず、パーサと呼ばれるモジュールでSQL文の構文解析を行います。
          次に、オプティマイザというモジュールがクエリの最適な実行方法を決定し、その結果として実行計画が生成されます。
          実行計画には、使用されるインデックス、結合方法、データの読み取り順序などが含まれます。これにより、データベースは効率的にクエリを処理し、最適なパフォーマンスを提供します。
          \nオプティマイザが実行計画を立てる際には、統計情報を用います。統計情報は、カタログマネージャというモジュールによって管理され、オプティマイザに提供されます。`,

          en: `You can write long text.\nLine breaks are preserved.\n\nBlank lines separate paragraphs.
          \nAn execution plan outlines the steps and methods a database uses to execute an SQL query. 
          \nWhen a user issues an SQL statement to the DBMS, it first parses the SQL statement using a module called the parser. 
          Next, a module called the optimizer determines the best way to execute the query, resulting in the generation of an execution plan. 
          The execution plan includes details such as which indexes will be used, join methods, and the order of data retrieval. 
          This allows the database to process queries efficiently and deliver optimal performance.
          \nWhen the optimizer creates an execution plan, it uses statistics. These statistics are managed by a module called the catalog manager and provided to the optimizer.`,
        },
      },
      {
        type: "paragraph",
        title: { ja: "前準備: テーブルの作成", en: "Preparation: Creating tables" },
        anchor: "preparation-tables",
        body: {
          ja: `PostgreSQLで実行計画を確認するには、まず適切なテーブルを作成する必要があります。このセクションでは、実行計画を確認するためのサンプルテーブルを作成します。
          \nサンプルテーブルでは、数を増やしやすいように以下のようなシンプルな構造にします。`,
          en: `To create the best execution plan, the optimizer needs statistics about tables and indexes. In PostgreSQL, the ANALYZE command is used to collect these statistics.
          \nThe ANALYZE command gathers statistics about the distribution of data within tables and indexes, which helps the optimizer make informed decisions when generating execution plans.`,
        },
      },
      {
        type: "code",
        title: { ja: "サンプル", en: "Sample" },

        // 必須: code
        code: `-- default tab
      SELECT * FROM users;`,

        // 任意: files（複数タブ）
        files: [
          {
            tabLabel: "users_table",
            lang: "sql",
            filename: "users_table.sql",
            code: `
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    prefecture TEXT NOT NULL,
    age INT NOT NULL,
    created_at TIMESTAMP NOT NULL
);`,
          },
          {
            tabLabel: "orders_table",
            lang: "sql",
            filename: "orders_table.sql",
            code: `
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    amount INT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);`,
          },
        ],
      },
      {
        type: "code",
        title: { ja: "ダミーデータ生成", en: "Generate dummy data" },

        // 必須: code
        code: `-- default tab
      SELECT * FROM users;`,

        // 任意: files（複数タブ）
        files: [
          {
            tabLabel: "users_table(10万件)",
            lang: "sql",
            filename: "users_table.sql",
            code: `
INSERT INTO users (name, prefecture, age, created_at)
SELECT
    'user_' || i,
    (ARRAY['Tokyo','Osaka','Aichi','Hokkaido','Fukuoka'])[1 + (random()*4)::int],
    18 + (random()*50)::int,
    now() - (random() * interval '5 years')
FROM generate_series(1, 100000) AS i;`,
          },
          {
            tabLabel: "orders_table(100万件)",
            lang: "sql",
            filename: "orders_table.sql",
            code: `
INSERT INTO orders (user_id, amount, status, created_at)
SELECT
    (random()*99999)::int + 1,
    (random()*10000)::int,
    (ARRAY['pending','paid','shipped','cancelled'])[1 + (random()*3)::int],
    now() - (random() * interval '1 year')
FROM generate_series(1, 1000000);`,
          },
        ],
      },
      {
  type: "image",
  title: { ja: "構成図", en: "Diagram" }, // 任意
  src: "/images/school/diagram.png",
  alt: { ja: "構成の図", en: "System diagram" }, // 任意
  caption: { ja: "図1: 全体構成", en: "Fig.1 Overview" }, // 任意
  width: 1200, // 任意
  height: 700,  // 任意
}



    ],
  },
];
