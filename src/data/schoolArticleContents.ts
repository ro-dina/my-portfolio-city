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
  {
    slug: "how-to-use-table-of-contents-in-school-articles",
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
          body: {
            ja: "この記事では、School記事に目次（TOC）を追加する方法を説明します。見出しに `anchor` を付けることで、目次クリック時に対応セクションへ移動できます。",
            en: "This article explains how to add a table of contents (TOC) to School articles. Add an `anchor` to each heading so clicking a TOC item jumps to the corresponding section.",
          },
        },
        {
          type: "section",
          title: { ja: "実装の要点", en: "Key Points" },
          anchor: "key-points",
          body: {
            ja: "1) `type: \"toc\"` ブロックを先頭に置く\n2) 各項目の `anchor` を本文の見出しと一致させる\n3) 目次項目の順序は読み順に合わせる",
            en: "1) Place a `type: \"toc\"` block near the top.\n2) Match each item `anchor` with the target section heading.\n3) Keep TOC item order aligned with reading flow.",
          },
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
      { //目次
        type: "toc",
        title: { ja: "目次", en: "Contents" },
        items: [
          { title: { ja: "実行計画とは", en: "What is an execution plan?" }, anchor: "what-is-execution-plan" },
          { title: { ja: "前準備: テーブルの作成", en: "Preparation: Creating tables" }, anchor: "preparation-tables" },
          { title: { ja: "実験1: 低カーディナリ列の検索（Bitmap Scan）", en: "Experiment 1: Searching a low-cardinality column (Bitmap Scan)" }, anchor: "experiment-1" },
          { title: { ja: "実験2: 範囲検索の選択率とプラン切替（Bitmap ↔ Index）", en: "Experiment 2: Selectivity in range queries and plan switching (Bitmap ↔ Index)" }, anchor: "experiment-2" },
          { title: { ja: "実験3: JOIN + GROUP BY", en: "Experiment 3: JOIN + GROUP BY" }, anchor: "experiment-3" },
          { title: { ja: "実験3+α: 絞り込みによるJoin戦略の切替（Hash Join → Nested Loop）", en: "Experiment 3+alpha: Join strategy switching with filtering (Hash Join -> Nested Loop)"}, anchor: "experiment-3+α"},
          { title: { ja: "統計分布", en: "Statistical Distribution" }, anchor: "statistical-distribution" },
          { title: { ja: "問題演習", en: "Drills" }, anchor: "drill-1" }
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
          \nオプティマイザが実行計画を立てる際には、統計情報を用います。統計情報は、カタログマネージャというモジュールによって管理され、オプティマイザに提供されます。
          \n本記事では、同一クエリに対してデータ分布・統計情報・インデックス有無を変化させ、EXPLAIN（推定）と EXPLAIN ANALYZE（実測）の差から、オプティマイザの意思決定を観察します。`,

          en: `An execution plan outlines the steps and methods a database uses to execute an SQL query.
          \nWhen a user issues an SQL statement to the DBMS, it first parses the SQL statement using a module called the parser. 
          Next, a module called the optimizer determines the best way to execute the query, resulting in the generation of an execution plan. 
          The execution plan includes details such as which indexes will be used, join methods, and the order of data retrieval. 
          This allows the database to process queries efficiently and deliver optimal performance.
          \nWhen the optimizer creates an execution plan, it uses statistics. These statistics are managed by a module called the catalog manager and provided to the optimizer.
          \nIn this article, we will observe the optimizer's decision-making by changing data distribution, statistics, and index presence for the same query, and examining the differences between EXPLAIN (estimation) and EXPLAIN ANALYZE (actual measurement).`,
        },
      },
      {
        type: "image",
        title: { ja: "各実行計画の視覚的理解図", en: "Visual understanding of each execution plan" },
        files:[
          {
            tabLabel: { ja: "Seq Scan", en: "Seq Scan" },
            src: "/images/script/Database/seq_scan.gif",
            alt: { ja: "Seq Scanの図", en: "Diagram of Seq Scan" },
            caption: { ja: "図1: Seq Scanのイメージ", en: "Fig. 1: Seq Scan overview" },
            width: 600,
            height: 400,
          },
          {
            tabLabel: { ja: "Index Scan", en: "Index Scan" },
            src: "/images/script/Database/index_scan.gif",
            alt: { ja: "Index Scanの図", en: "Diagram of Index Scan" },
            caption: { ja: "図2: Index Scanのイメージ", en: "Fig. 2: Index Scan overview" },
            width: 600,
            height: 400,
          },
          {
            tabLabel: { ja: "Bitmap Heap Scan", en: "Bitmap Heap Scan" },
            src: "/images/script/Database/bitmap_heap_scan.gif",
            alt: { ja: "Bitmap Heap Scanの図", en: "Diagram of Bitmap Heap Scan" },
            caption: { ja: "図3: Bitmap Heap Scanのイメージ", en: "Fig. 3: Bitmap Heap Scan overview" },
            width: 600,
            height: 400,
          },
          {
            tabLabel: { ja: "Index Only Scan", en: "Index Only Scan" },
            src: "/images/script/Database/index_only_scan.gif",
            alt: { ja: "Index Only Scanの図", en: "Diagram of Index Only Scan" },
            caption: { ja: "図4: Index Only Scanのイメージ", en: "Fig. 4: Index Only Scan overview" },
            width: 600,
            height: 400,
          }
        ]
      },
      {
        type: "paragraph",
        title: { ja: "前準備: テーブルの作成", en: "Preparation: Creating tables" },
        anchor: "preparation-tables",
        body: {
          ja: `PostgreSQLで実行計画を確認するには、まず適切なテーブルを作成する必要があります。このセクションでは、実行計画を確認するためのサンプルテーブルを作成します。
          \nサンプルテーブルでは、数を増やしやすいように以下のようなシンプルな構造にします。`,
          en: `To check execution plans in PostgreSQL, you first need to create the appropriate tables. In this section, we will create sample tables for checking execution plans.
          \nFor the sample tables, we will use a simple structure that makes it easy to increase the number of records.`,
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
      { // code ダミーデータ生成
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
            filename: "users_table_data.sql",
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
            filename: "orders_table_data.sql",
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
      { // image 構成図のダイアグラム
  type: "image",
  title: { ja: "構成図", en: "Diagram" }, // 任意
  src: "/images/script/Database/plane_image_database.png", // 任意
  alt: { ja: "構成の図", en: "System diagram" }, // 任意
  caption: { ja: "図1: 全体構成", en: "Fig. 1: System overview" }, // 任意
  width: 1200, // 任意
  height: 700,  // 任意
      },
      { // code 確認と更新
        type: "code",
        title: { ja: "確認と更新", en: "Verification and Update" },
        lang: "sql",
        filename: "analyze_command.sql",
        code: `-- 統計情報の確認
ANALYZE users;
ANALYZE orders;

-- 件数確認
SELECT
  (SELECT count(*) FROM users)  AS users_count,
  (SELECT count(*) FROM orders) AS orders_count;`
      },
      { // section 基本インデックスを作る
        type: "section",
        title: { ja: "基本インデックスを作る", en: "Create basic indexes" },
        body: {
          ja: `実行計画の差を出すための基本インデックスを作成する。コードは以下の通り。`,
          en: `Create basic indexes to see differences in execution plans. The code is as follows.`,
        },
      },
      { // code インデックス作成
        type: "code",
        title: { ja: "インデックス作成", en: "Create Indexes" },
        lang: "sql",
        filename: "create_indexes.sql",
        code: `
-- 代表的な検索・結合・期間条件のためのインデックス
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_user_id ON orders(user_id);

ANALYZE orders;`
      },
      { // section 実験1
        type: "section",
        title: { ja: "実験1: 低カーディナリ列の検索（Bitmap Scan）", en: "Experiment 1: Low-cardinality search (Bitmap Scan)" },
        anchor: "experiment-1",
        body: {
          ja: `ヒット件数が多い条件で Bitmap が選ばれるかどうかを確認する。`,
          en: `Check whether Bitmap Scan is chosen when a condition matches many rows.`,
        },
      },
      { // code 実験1
        type: "code", 
        title: { ja: "実験1: 低カーディナリ列の検索", en: "Experiment 1: Low-cardinality search" },
        lang: "sql",
        filename: "experiment1_low_selectivity.sql",
        code: `
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE status = 'paid';`
      },
      { // 実験1 結果
        type: "table",
        title: { ja: "実験1結果", en: "Experiment 1 Results" },
        headers: ["QUERY PLAN"],
        rows: [
          ["Bitmap Heap Scan on orders  (cost=3741.71..16264.87 rows=335133 width=35) (actual time=10.412..41.591 rows=333946 loops=1)"],
          ["　Recheck Cond: (status = 'paid'::text)"],
          ["　Heap Blocks: exact=8334"],
          ["　Buffers: shared hit=8618"],
          ["　->　Bitmap Index Scan on idx_orders_status  (cost=0.00..3657.92 rows=335133 width=0) (actual time=9.325..9.325 rows=333946 loops=1)"],
          ["　　　Index Cond: (status = 'paid'::text)"],
          ["　　　Buffers: shared hit=284"],
          ["Planning:"],
          ["　Buffers: shared hit=284"],
          ["Planning Time: 0.263 ms"],
          ["Execution Time: 51.405 ms"],
        ],
        showRowNumbers: true,
        rowNumberStart: 1,
      },
      { // 実験１ 本文
        type: "paragraph",
        title: { ja: "考察", en: "Discussion" },
        body: {
          ja: `実験1において、低カーディナリティ列statusに対する検索で、PostgreSQLはSeq ScanやIndex Scanではなく,Bitmap Heap Scanを選択しました。
          \nstatusは4種類しか値を持たないため、1つの値に対して多数の行が一致します。この場合は、Index Scanのように個々の行を参照すると非効率であり、Seq Scanも全行を読むためコストが高いです。
          \n\nPostgreSQLはまずインデックスから一致行の位置をビットマップとして収集し、その後テーブルをまとめて読み込むBitmap Heap Scanを採用することで、検索効率とI/O効率の両立を図っています。`,
          en: `In Experiment 1, for searches on the low-cardinality column 'status', PostgreSQL chose Bitmap Heap Scan instead of Seq Scan or Index Scan.
          \nSince 'status' has only four possible values, many rows match a single value. In this case, using Index Scan to reference individual rows is inefficient, and Seq Scan is costly as it reads all rows.
          \n\nPostgreSQL first collects the positions of matching rows from the index as a bitmap, and then reads the table in bulk using Bitmap Heap Scan, balancing search efficiency and I/O efficiency.`,
        },
      },
      { // section 実験2 
        type: "section",
        title: { ja: "実験2: 範囲検索の選択率とプラン切替（Bitmap ↔ Index）", en: "Experiment 2: Range-query selectivity and plan switching (Bitmap ↔ Index)" },
        anchor: "experiment-2",
        body: {
          ja: `created_atの範囲検索でBitmapがIndex Scanに切り替わる境界を観測する。`,
          en: `Observe the boundary where range searches on created_at switch from Bitmap to Index Scan.`,
        }
      },
      { // code 実験2
        type: "code",
        title: { ja: "実験2: 範囲検索（30日/7日/1日）", en: "Experiment 2: Range search (30 days / 7 days / 1 day)" },
        lang: "sql",
        filename: "experiment2_range_search.sql",
        code: `
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE created_at > now() - interval '30 days';

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE created_at > now() - interval '7 days';

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE created_at > now() - interval '1 day';`
      },
      { // 実験2 結果
        type: "table",
        title: { ja: "実験2結果", en: "Experiment 2 Results" },
        files: [
          {
            tabLabel: "30days",
            headers: ["QUERY PLAN"],
            rawText: `Bitmap Heap Scan on orders  (cost=1920.69..11700.43 rows=82614 width=35) (actual time=7.663..23.873 rows=83375 loops=1)
  Recheck Cond: (created_at > (now() - '30 days'::interval))
  Heap Blocks: exact=8333
  Buffers: shared hit=8642
  ->  Bitmap Index Scan on idx_orders_created_at  (cost=0.00..1900.04 rows=82614 width=0) (actual time=6.244..6.244 rows=83375 loops=1)
        Index Cond: (created_at > (now() - '30 days'::interval))
        Buffers: shared hit=309
Planning:
  Buffers: shared hit=49
Planning Time: 0.174 ms
Execution Time: 27.081 ms`,
          showRowNumbers: true,
          rowNumberStart: 1,
          preserveCellWhitespace: true,
          monospace: true
          },
          {
            tabLabel: "7days",
            headers: ["QUERY PLAN"],
            rawText: `Bitmap Heap Scan on orders  (cost=444.28..9112.15 rows=19078 width=35) (actual time=2.136..8.574 rows=19429 loops=1)
  Recheck Cond: (created_at > (now() - '7 days'::interval))
  Heap Blocks: exact=7535
  Buffers: shared hit=7609
  ->  Bitmap Index Scan on idx_orders_created_at  (cost=0.00..439.51 rows=19078 width=0) (actual time=1.275..1.275 rows=19429 loops=1)
        Index Cond: (created_at > (now() - '7 days'::interval))
        Buffers: shared hit=74
Planning:
  Buffers: shared hit=4
Planning Time: 0.068 ms
Execution Time: 9.138 ms`,
          showRowNumbers: true,
          rowNumberStart: 1,
          preserveCellWhitespace: true,
          monospace: true
          },
          {
            tabLabel: "1day",
            headers: ["QUERY PLAN"],
            rawText: `Bitmap Heap Scan on orders  (cost=65.60..5766.53 rows=2732 width=35) (actual time=0.410..1.751 rows=2724 loops=1)
  Recheck Cond: (created_at > (now() - '1 day'::interval))
  Heap Blocks: exact=2320
  Buffers: shared hit=2334
  ->  Bitmap Index Scan on idx_orders_created_at  (cost=0.00..64.92 rows=2732 width=0) (actual time=0.191..0.191 rows=2724 loops=1)
        Index Cond: (created_at > (now() - '1 day'::interval))
        Buffers: shared hit=14
Planning:
  Buffers: shared hit=4
Planning Time: 0.043 ms
Execution Time: 1.829 ms`,
            showRowNumbers: true,
            rowNumberStart: 1,
            preserveCellWhitespace: true,
            monospace: true
          }
        ]
      },
      { // 実験2 考察A
        type: "paragraph",
        title: { ja: "考察A", en: "Discussion A" },
        body: {
          ja: `実験2では created_at に対する範囲検索で(30日、7日、1日)の3つのケースを試しました。しかし、いずれのケースでもPostgreSQLはBitmap Heap Scanを選択しました。
          \nこれは、一致行数がまだ一定数存在する場合や、対象行がテーブル上に散在している場合、対象ブロックをまとめて読むBitmap Heap Scanが効率的であると判断されたためだと考えられます。
          \n実際、Heap Blocksが8333→7535→2320と減少し、Execution Timeも27.081ms→9.138ms→1.829msと改善しています。
          \n変化しなかった原因は日にち単位だとヒット件数がまだまだ多いことが考えられます。
          \nIndex Scanに切り替わる境界をある程度絞りたいので1時間・10分・1分も試してみます。`,
          en: `In Experiment 2, we tested three cases of range searches on created_at (30 days, 7 days, 1 day). However, in all cases, PostgreSQL chose Bitmap Heap Scan.
          \nThis is likely because when there are still a certain number of matching rows or when the target rows are scattered across the table, Bitmap Heap Scan, which reads the target blocks in bulk, is considered efficient.
          \nIn fact, the number of Heap Blocks decreased from 8333 to 7535 to 2320, and the Execution Time improved from 27.081ms to 9.138ms to 1.829ms.
          \nTo narrow down the boundary where it switches to Index Scan, we will also test 1 hour, 10 minutes, and 1 minute.`,
        },
      },
      { // code 実験2 追加
        type: "code",
        title: { ja: "実験2追加: 範囲検索（1時間/10分/1分）", en: "Experiment 2 (additional): Range search (1 hour / 10 minutes / 1 minute)" },
        lang: "sql",
        filename: "experiment2_additional_range_search.sql",
        code: `
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE created_at > now() - interval '1 hour';

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE created_at > now() - interval '10 minutes';

EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE created_at > now() - interval '1 minute';`
      },
      {
        type: "table",
        title: { ja: "実験2追加結果", en: "Additional results for Experiment 2" },
        files: [
          {
            tabLabel: "1 hour",
            headers: ["QUERY PLAN"],
            rawText: `Bitmap Heap Scan on orders  (cost=5.06..306.52 rows=81 width=35) (actual time=0.020..0.101 rows=99 loops=1)
  Recheck Cond: (created_at > (now() - '01:00:00'::interval))
  Heap Blocks: exact=98
  Buffers: shared hit=102
  ->  Bitmap Index Scan on idx_orders_created_at  (cost=0.00..5.04 rows=81 width=0) (actual time=0.010..0.010 rows=99 loops=1)
        Index Cond: (created_at > (now() - '01:00:00'::interval))
        Buffers: shared hit=4
Planning:
  Buffers: shared hit=4
Planning Time: 0.048 ms
Execution Time: 0.110 ms`,
          showRowNumbers: true,
          rowNumberStart: 1,
          preserveCellWhitespace: true,
          monospace: true
          },
          {
            tabLabel: "18 minutes",
            headers: ["QUERY PLAN"],
            rawText: `Index Scan using idx_orders_created_at on orders  (cost=0.43..8.45 rows=1 width=35) (actual time=0.006..0.006 rows=1 loops=1)
  Index Cond: (created_at > (now() - '00:18:00'::interval))
  Buffers: shared hit=4
Planning:
  Buffers: shared hit=4
Planning Time: 0.056 ms
Execution Time: 0.013 ms`,
          showRowNumbers: true,
          rowNumberStart: 1,
          preserveCellWhitespace: true,
          monospace: true
          },
          {
            tabLabel: "10 minutes",
            headers: ["QUERY PLAN"],
            rawText: `Index Scan using idx_orders_created_at on orders  (cost=0.43..8.45 rows=1 width=35) (actual time=0.003..0.004 rows=0 loops=1)
  Index Cond: (created_at > (now() - '00:10:00'::interval))
  Buffers: shared hit=3
Planning:
  Buffers: shared hit=4
Planning Time: 0.054 ms
Execution Time: 0.009 ms`,
          showRowNumbers: true,
          rowNumberStart: 1,
          preserveCellWhitespace: true,
          monospace: true
          },
          {
            tabLabel: "1 minute",
            headers: ["QUERY PLAN"],
            rawText: `Index Scan using idx_orders_created_at on orders  (cost=0.43..8.45 rows=1 width=35) (actual time=0.003..0.003 rows=0 loops=1)
  Index Cond: (created_at > (now() - '00:01:00'::interval))
  Buffers: shared hit=3
Planning:
  Buffers: shared hit=4
Planning Time: 0.040 ms
Execution Time: 0.008 ms`,
            showRowNumbers: true,
            rowNumberStart: 1,
            preserveCellWhitespace: true,
            monospace: true
          }
        ]
      },
      {
        type: "paragraph",
        title: { ja: "考察B", en: "Discussion B" },
        body: {
          ja: `追加の実験2ではcreated_atに対する範囲検索で(1時間、10分、1分)の3つのケースを試した。PostgreSQLは、1時間の時を除き、すべてのケースでIndex Scanを選択しています。
          \nこれは、ヒット件数（選択率）が高い場合には Index Scan で1行ずつヒープへアクセスするとランダムアクセスが増え、I/O効率が悪化するためです。
          Bitmap Heap Scan は、インデックスから対象行の位置情報をまとめて収集してからヒープブロックをまとめて読み込むため、ヒット件数が多い領域で有利になりやすい。
一方で、18分以下のようにヒット件数が十分少ない場合は、インデックスを辿って必要な行だけを取得する Index Scan の方が総コストが低くなります。その結果、実行計画が Bitmap 系から Index Scan に切り替わったと考えられます。`,
          en: `In the additional Experiment 2, we tested three cases of range searches on created_at (1 hour, 10 minutes, 1 minute). PostgreSQL chose Index Scan in all cases.
          \nThis is because when the number of hits (selectivity) is high, accessing the heap row by row with Index Scan increases random access, worsening I/O efficiency.
          Bitmap Heap Scan collects the position information of target rows from the index in bulk and then reads the heap blocks in bulk, making it advantageous in areas with many hits.
          On the other hand, when the number of hits is sufficiently low, such as below 1 hour, Index Scan, which follows the index to retrieve only the necessary rows, has a lower total cost. As a result, it is believed that the execution plan switched from Bitmap type to Index Scan.`,
        },
      },
      {
        type: "section",
        title: { ja: "実験3: JOIN + GROUP BY（Hash Join / Parallel / Aggregate）", en: "Experiment 3: JOIN + GROUP BY (Hash Join / Parallel / Aggregate)" },
        anchor: "experiment-3",
        body: {
          ja: `本クエリは、usersとordersを結合して、都道府県ごとの合計金額を求める集計処理をしています。具体的なコードは以下に示される通りです。`,
          en: `This query joins users and orders, then aggregates the total amount by prefecture. The SQL is shown below.`,
        },
      },
      {
        type: "code",
        title: { ja: "実験3: JOIN + GROUP BY", en: "Experiment 3: JOIN + GROUP BY" },
        lang: "sql",
        filename: "experiment3_join_groupby.sql",
        code: `
EXPLAIN (ANALYZE, BUFFERS)
SELECT u.prefecture, SUM(o.amount) AS total_amount
FROM users u
JOIN orders o ON o.user_id = u.id
GROUP BY u.prefecture
ORDER BY total_amount DESC;`
      },
      {
        type: "table",
        title: { ja: "実験3結果", en: "Experiment 3 Results" },
        headers: ["QUERY PLAN"],
        rawText: `Sort  (cost=19763.25..19763.27 rows=5 width=15) (actual time=121.768..123.715 rows=5 loops=1)
  Sort Key: (sum(o.amount)) DESC
  Sort Method: quicksort  Memory: 25kB
  Buffers: shared hit=10882
  ->  Finalize GroupAggregate  (cost=19761.93..19763.20 rows=5 width=15) (actual time=121.762..123.711 rows=5 loops=1)
        Group Key: u.prefecture
        Buffers: shared hit=10882
        ->  Gather Merge  (cost=19761.93..19763.10 rows=10 width=15) (actual time=121.758..123.707 rows=15 loops=1)
              Workers Planned: 2
              Workers Launched: 2
              Buffers: shared hit=10882
              ->  Sort  (cost=18761.91..18761.92 rows=5 width=15) (actual time=117.854..117.855 rows=5 loops=3)
                    Sort Key: u.prefecture
                    Sort Method: quicksort  Memory: 25kB
                    Buffers: shared hit=10882
                    Worker 0:  Sort Method: quicksort  Memory: 25kB
                    Worker 1:  Sort Method: quicksort  Memory: 25kB
                    ->  Partial HashAggregate  (cost=18761.80..18761.85 rows=5 width=15) (actual time=117.830..117.832 rows=5 loops=3)
                          Group Key: u.prefecture
                          Batches: 1  Memory Usage: 24kB
                          Buffers: shared hit=10866
                          Worker 0:  Batches: 1  Memory Usage: 24kB
                          Worker 1:  Batches: 1  Memory Usage: 24kB
                          ->  Hash Join  (cost=3084.00..16678.46 rows=416667 width=11) (actual time=23.340..91.715 rows=333333 loops=3)
                                Hash Cond: (o.user_id = u.id)
                                Buffers: shared hit=10866
                                ->  Parallel Seq Scan on orders o  (cost=0.00..12500.67 rows=416667 width=12) (actual time=0.020..11.975 rows=333333 loops=3)
                                      Buffers: shared hit=8334
                                ->  Hash  (cost=1834.00..1834.00 rows=100000 width=15) (actual time=22.577..22.577 rows=100000 loops=3)
                                      Buckets: 131072  Batches: 1  Memory Usage: 5907kB
                                      Buffers: shared hit=2502
                                      ->  Seq Scan on users u  (cost=0.00..1834.00 rows=100000 width=15) (actual time=0.059..8.932 rows=100000 loops=3)
                                            Buffers: shared hit=2502
Planning:
  Buffers: shared hit=14
Planning Time: 0.324 ms
Execution Time: 123.799 ms`,
        showRowNumbers: true,
        rowNumberStart: 1,
        preserveCellWhitespace: true,
        monospace: true
      },
      {
        type: "paragraph",
        title: { ja: "考察", en: "Discussion" },
        body: {
          ja: `本クエリでは、WHERE条件がなく、orders(100万行)の大部分を読み取る必要があります。そのため
          、インデックスを使っても読み取り量はほとんど減らないため、PostgreSQLはSeq Scanを選択したと考えられます。
          \n\n結合はusers(10万行)をハッシュ表として構築し、orders側を走査しながら参照するHash Joinが選択されています。これは、
          小さい表をハッシュ化し、大きい表を走査する典型的な戦略であると言えます。
          \n\nまた、GROUP BYはワーカーごとに部分集約を行い、Gather Mergeにより統合した後、Finalize GroupAggregateによって最終結果を確定しています。
          これにより、並列化によるスループット向上が図られています。
          \n\n最後の ORDER BY は出力が5行のみであり、ソートは quicksort でメモリ 25kB 程度と小さいことがわかります。
          以上より、本実行計画は「大量データ走査＋小テーブルハッシュ結合＋並列集約」という、読み取り主体の集計クエリに適したプランであると考えられます。`,
          en: `This query has no WHERE clause, so it must read most of orders (1,000,000 rows). Even with indexes, the read volume barely decreases, so PostgreSQL likely chose Seq Scan.
          \n\nFor the join, PostgreSQL builds a hash table on users (100,000 rows) and probes it while scanning orders, which is a typical strategy: hash the smaller table and scan the larger one.
          \n\nFor GROUP BY, each worker performs partial aggregation, then the results are merged with Gather Merge and finalized by Finalize GroupAggregate.
          This improves throughput through parallelism.
          \n\nThe final ORDER BY sorts only five output rows, so quicksort uses a very small amount of memory (about 25kB).
          Overall, this plan, "large data scan + hash join on a smaller table + parallel aggregation," is suitable for a read-heavy aggregation query.`,
        }
      },
      {
        type: "section",
        title: { ja: "実験3+α: 絞り込みによるJoin戦略の切替（Hash Join → Nested Loop）", en: "Experiment 3+alpha: Join strategy switching with filtering" },
        anchor: "experiment-3+α",
        body: {
          ja: `ordersを1時間以内に絞るとどうなるか？`,
          en: `What happens if you narrow down orders to within one hour?`,
        }
      },
      {
        type: "code",
        title: { ja: "実験3+α: JOIN + GROUP BY + WHERE", en: "Experiment 3+α: JOIN + GROUP BY + WHERE" },
        lang: "sql",
        filename: "experiment3_plus_join_groupby_where.sql",
        code: `
EXPLAIN (ANALYZE, BUFFERS)
SELECT u.prefecture, SUM(o.amount) AS total_amount
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.created_at > now() - interval '1 hour'
GROUP BY u.prefecture
ORDER BY total_amount DESC;`
      },
      {
        type: "table",
        title: { ja: "実験3+α結果", en: "Experiment 3+α Results" },
        headers: ["QUERY PLAN"],
        rows: [
          ["Sort  (cost=16.80..16.80 rows=1 width=15) (actual time=0.013..0.013 rows=0 loops=1)"],
          ["　Sort Key: (sum(o.amount)) DESC"],
          ["　Sort Method: quicksort  Memory: 25kB"],
          ["　Buffers: shared hit=3"],
          ["　->   GroupAggregate  (cost=16.77..16.79 rows=1 width=15) (actual time=0.010..0.010 rows=0 loops=1)"],
          ["　　　　Group Key: u.prefecture"],
          ["　　　　Buffers: shared hit=3"],
          ["　　　　->   Sort  (cost=16.77..16.77 rows=1 width=11) (actual time=0.009..0.010 rows=0 loops=1)"],
          ["　　　　　　　Sort Key: u.prefecture"],
          ["　　　　　　　Sort Method: quicksort  Memory: 25kB"],
          ["　　　　　　　Buffers: shared hit=3"],
          ["　　　　　　　->   Nested Loop  (cost=0.72..16.76 rows=1 width=11) (actual time=0.005..0.006 rows=0 loops=1)"],
          ["　　　　　　　　　　Buffers: shared hit=3"],
          ["　　　　　　　　　　->   Index Scan using idx_orders_created_at on orders o  (cost=0.43..8.45 rows=1 width=12) (actual time=0.005..0.005 rows=0 loops=1)"],
          ["　　　　　　　　　　　　　Index Cond: (created_at > (now() - '01:00:00'::interval))"],
          ["　　　　　　　　　　　　　 Buffers: shared hit=3"],
          ["　　　　　　　　　　->   Index Scan using users_pkey on users u  (cost=0.29..8.31 rows=1 width=15) (never executed)"],
          ["　　　　　　　　　　　　　Index Cond: (id = o.user_id)"],
          ["Planning:"],
          ["　Buffers: shared hit=18"],
          ["Planning Time: 0.192 ms"],
          ["Execution Time: 0.034 ms"]
        ],
        showRowNumbers: true,
        rowNumberStart: 1,
      },
      {
        type: "paragraph",
        title: { ja: "考察", en: "Discussion" },
        body: {
          ja: `WHERE 条件を追加して orders の候補行数を大きく減らすと、実行計画は Parallel Seq Scan + Hash Join から、Index Scan + Nested Loop に切り替わりました。
          \n\nWHERE句がない場合、ordersをほぼ全件読み取る必要があるため、並列全走査とHash Joinによってスループットを稼ぐ戦略が有効でした。一方で、created_atの範囲条件により、
          候補が極端に少なくなると、Index Scanで必要行を直接取得し、Nested Loopで結合する方が効率的になります。
          \n\n今回の実行では、1時間以内のデータが0件であったため、users側の参照は実行されませんでした。しかし、一般には候補行数が少ないほどNested Loopは有効であり、
          条件の選択率がオプティマイザの結合戦略に大きく影響することがわかります。`,
          en: `By adding a WHERE condition to significantly reduce the number of candidate rows in orders, the execution plan switched from Parallel Seq Scan + Hash Join to Index Scan + Nested Loop.
          \n\nWhen there is no WHERE clause, it is necessary to read almost all records in orders, making a strategy that leverages throughput through parallel full scans and Hash Join effective. On the other hand, when the range condition on created_at drastically reduces candidates,
          it becomes more efficient to directly retrieve the necessary rows with Index Scan and join them using Nested Loop.
          \n\nIn this execution, there were zero records within one hour, so the reference on the users side was not executed. However, in general, the fewer candidate rows there are, the more effective Nested Loop becomes,
          indicating that the selectivity of conditions significantly influences the optimizer's join strategy.`,
        },
      },
      {
        type: "section",
        title: { ja: "統計情報", en: "Statistics" },
        anchor: "statistical-distribution",
        body: {
          ja: `問題演習に入る前に、pg_stats にある推定分布と実データの分布を比較します。どのプランが選ばれたかを説明するための前提確認です。`,
          en: `Before moving to drills, compare the estimated distribution in pg_stats with the actual data distribution. This helps explain why certain plans were chosen.`
        },
      },
      {
        type: "code",
        title: {ja: "統計分布の確認", en: "Check statistical distribution"},

        files: [
          {
            tabLabel: "Estimated distribution",
            lang: "sql",
            filename: "",
            code: `
SELECT
  attname,
  n_distinct,
  most_common_vals,
  most_common_freqs
FROM pg_stats
WHERE tablename='orders' AND attname IN ('status');`,
          },
          {
            tabLabel: "Actual distribution",
            lang: "sql",
            filename: "",
            code: `
-- 実際の分布（真値）
SELECT status, count(*) AS cnt, count(*)::float / (SELECT count(*) FROM orders) AS ratio
FROM orders
GROUP BY status
ORDER BY cnt DESC;`,
          },
        ],
      },
      {
        type: "table",
        title: { ja: "実行結果", en: "Execution results" },
        files: [
          {
            tabLabel: "Estimated distribution",
            headers: ["attname","n_distinct","most_common_vals","most_common_freqs"],
            rows: [
              ["status","4","{paid,shipped,pending,cancelled}","{0.33426666,0.33116665,0.1688,0.16576667}"]
            ],
            showRowNumbers: true,
            rowNumberStart: 1,
          },
          {
            tabLabel: "Actual distribution",
            headers: ["status","cnt","ratio"],
            rows:[
              ["paid","333656","0.333656"],
              ["shipped","333625","0.333625"],
              ["pending","166368","0.166368"],
              ["cancelled","166351","0.166351"]
            ],
          showRowNumbers: true,
          rowNumberStart: 1,
          }
        ]
      },
      {
        type: "paragraph",
        title: { ja: "ここからわかること", en: "Key takeaways" },
        body: {
          ja: `ダミーデータ生成では本来はstatusを一様分布として生成したつもりであったが、実際の分布は約33%,33%,16%,16%となってしまいました。
          \nこれは、(random()*3)::int の切り捨てによるものだと考えられます。
          \nしかしこの違いは、実験1においては少し影響を与えるものの、ヒット件数が多いのでIndex Scanが不利になりやすいために、結果に対して強い影響を与えることはないと考えられます。
          \n実験2に関しては、created_atの選択率が支配的なので、結論は変わりません。
          \n実験3もstatus分布はほぼ無関係で、実験3+αも問題ないです。
          \n話を分布に戻しますと、オプティマイザは単に「値の種類数」ではなく、「実際の頻度分布」に基づいて実行計画を選択していることが確認できると思います。`, 
          en: `In dummy data generation, we intended status to be uniformly distributed, but the actual distribution became roughly 33%, 33%, 16%, and 16%.
          \nThis is likely caused by integer truncation in (random()*3)::int.
          \nThis difference slightly affects Experiment 1, but because the hit count is still large, Index Scan tends to remain disadvantageous, so the overall conclusion does not change much.
          \nFor Experiment 2, selectivity on created_at is dominant, so the conclusion is unchanged.
          \nExperiment 3 is also mostly unaffected by status distribution, and Experiment 3+alpha remains valid.
          \nIn short, the optimizer does not choose plans based only on the number of distinct values, but on the actual frequency distribution.`}
      },
{
  type: "exercise",
  title: { ja: "問題演習 1: status が一様分布でも結論は変わらないか？", en: "Drill 1: Does uniform status change the conclusion?" },
  anchor: "drill-1",
  question: {
    ja: "本文では「status が一様でなくても実験1の結論は大きく変わらない」と述べています。orders を一様分布に作り直し、EXPLAIN (ANALYZE, BUFFERS) のプランと実行時間がどう変わるか確認してください。",
    en: "Rebuild orders with uniform status distribution and check whether the plan/time changes for status='paid'."
  },
  questionBlocks: [
    {
      type: "code",
      lang: "sql",
      filename: "drill_1_rebuild_uniform.sql",
      code: `-- 1) 初期化（必要なら）
TRUNCATE orders;

-- 2) 一様分布に近い status を生成（4値を均等に）
INSERT INTO orders (user_id, amount, status, created_at)
SELECT
  (random()*99999)::int + 1,
  (random()*10000)::int,
  (ARRAY['pending','paid','shipped','cancelled'])[1 + floor(random()*4)::int],
  now() - (random() * interval '1 year')
FROM generate_series(1, 1000000);

-- 3) 統計情報更新
ANALYZE orders;

-- 4) 分布確認
SELECT status, count(*) AS cnt, count(*)::float / (SELECT count(*) FROM orders) AS ratio
FROM orders
GROUP BY status
ORDER BY cnt DESC;`
    },
    {
      type: "code",
      lang: "sql",
      filename: "drill_1_explain.sql",
      code: `EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE status = 'paid';`
    }
  ],
  answer: {
    ja: "多くの場合、status='paid' が 25% 程度になるため推定 rows / actual rows や Buffers の値は変化しますが、ヒット件数が依然として多いので、Bitmap Index Scan + Bitmap Heap Scan が選ばれやすいです。Index Scan よりもページ単位でまとめて読む方が有利になりやすいためです。",
    en: "Even with uniform distribution, many rows match, so Bitmap Index + Bitmap Heap is still likely."
  }
},

{
  type: "exercise",
  title: { ja: "問題演習 2: どの実行計画になりやすい？（選択率の目安）", en: "Drill 2: Which plan is likely? (Selectivity rule of thumb)" },
  anchor: "drill-2",
  question: {
    ja: "orders(status) にインデックスがある状態で、次のクエリを EXPLAIN すると、どの系のプランになりやすいでしょうか？理由も述べてください。",
    en: "With an index on orders(status), which plan family is likely for the query below?"
  },
  questionBlocks: [
    {
      type: "code",
      lang: "sql",
      filename: "drill_2_explain.sql",
      code: `EXPLAIN
SELECT *
FROM orders
WHERE status = 'paid';`
    },
    {
      type: "paragraph",
      body: {
        ja: "ヒント: status='paid' の割合が 25%〜33% 程度になると、行単位のランダムアクセスよりもページ単位でまとめて読む戦略が有利になりやすいです。",
        en: "Hint: If selectivity is ~25–33%, batched page access often wins over per-row random access."
      }
    }
  ],
  answer: {
    ja: "Bitmap Index Scan + Bitmap Heap Scan が選ばれやすいです。ヒット件数が多い場合、Index Scan はヒープへのランダムアクセスが増えやすく、Bitmap で対象ページをまとめて読む方が I/O 的に有利になりやすいからです。",
    en: "Bitmap Index + Bitmap Heap is likely due to many matches and reduced random heap access."
  },
  answerBlocks: [
    {
      type: "table",
      headers: [
        { ja: "条件（選択率の目安）", en: "Condition (rough selectivity)" },
        { ja: "選ばれやすいプラン", en: "Likely plan" }
      ],
      rows: [
        [
          { ja: "高選択率（< 1%）", en: "High selectivity (<1%)" },
          { ja: "Index Scan", en: "Index Scan" }
        ],
        [
          { ja: "中選択率（数%〜数十%）", en: "Mid selectivity (few % to tens %)" },
          { ja: "Bitmap Heap Scan", en: "Bitmap Heap Scan" }
        ],
        [
          { ja: "低選択率（ほぼ全件）", en: "Low selectivity (almost all rows)" },
          { ja: "Seq Scan", en: "Seq Scan" }
        ]
      ],
      showRowNumbers: true
    }
  ]
},

{
  type: "exercise",
  title: { ja: "問題演習 3: EXPLAIN と EXPLAIN ANALYZE の違い", en: "Drill 3: EXPLAIN vs EXPLAIN ANALYZE" },
  anchor: "drill-3",
  question: {
    ja: "EXPLAIN と EXPLAIN ANALYZE の違いを 2 点述べ、どちらが実測時間（actual time）を含むか答えてください。",
    en: "State two differences and which includes actual timings."
  },
  answer: {
    ja: "① EXPLAIN はクエリを実行せず、統計情報に基づく推定（cost / rows）を表示する。② EXPLAIN ANALYZE は実際にクエリを実行し、actual time / actual rows を含む。実測時間を含むのは EXPLAIN ANALYZE。",
    en: "EXPLAIN is estimated without running; EXPLAIN ANALYZE runs the query and shows actual timings/rows."
  }
},

{
  type: "exercise",
  title: { ja: "問題演習 4: 推定 rows と actual rows がズレる理由", en: "Drill 4: Why estimated rows differ from actual rows?" },
  anchor: "drill-4",
  question: {
    ja: "実験1（status）で rows（推定）と actual rows（実測）がズレる理由を 1〜2 個挙げてください。",
    en: "Give 1–2 reasons why estimated vs actual rows differ."
  },
  answer: {
    ja: "例: (1) 統計情報は全件ではなくサンプルに基づく推定であり誤差が出る。(2) データ分布の偏りや相関、更新後に ANALYZE が不十分（または未実行）だと推定が古くなる。",
    en: "Sampling-based stats, skew/correlation, stale stats without ANALYZE, etc."
  }
},

{
  type: "exercise",
  title: { ja: "問題演習 5: orders をほぼ全件読むと Hash Join が選ばれやすい理由", en: "Drill 5: Why Hash Join for scanning most rows?" },
  anchor: "drill-5",
  question: {
    ja: "orders をほぼ全件読む JOIN クエリでは Hash Join が選ばれやすい理由を説明してください。",
    en: "Explain why Hash Join is favored when scanning most rows."
  },
  answer: {
    ja: "Hash Join は小さい表（users）をハッシュ表にしておき、大きい表（orders）を 1 回走査しながら照合できるため、全件に近い読み取りでは効率が良い。Nested Loop は外側×内側の参照回数が増えやすく、大量走査では不利になりやすい。",
    en: "Hash the small table and scan the large table once; NL can multiply probes and becomes costly."
  }
},

{
  type: "exercise",
  title: { ja: "問題演習 6: 絞り込みで Nested Loop が有利になる条件", en: "Drill 6: When filtering makes Nested Loop favorable" },
  anchor: "drill-6",
  question: {
    ja: "WHERE で orders の候補が少ないとき Nested Loop が有利になりやすい理由を説明してください。",
    en: "Why does Nested Loop become favorable when filtered rows are few?"
  },
  answer: {
    ja: "外側（orders の候補）が少数なら、内側（users）への index lookup を少ない回数で済ませられるため総コストが下がる。Hash Join はハッシュ表構築コストが先に発生するので、ヒットが極小のときは構築コストの方が相対的に重くなりやすい。",
    en: "Few outer rows means few index probes; hash build overhead may dominate for tiny result sets."
  }
},

{
  type: "exercise",
  title: { ja: "問題演習 7: Index Only Scan を観察する", en: "Drill 7: Observe Index Only Scan" },
  anchor: "drill-7",
  question: {
    ja: "次の手順で Index Only Scan が出るか確認してください。出ない場合も失敗ではなく、Index Only Scan にならない理由（Heap Fetches が発生する等）を説明できればOKです。",
    en: "Try to trigger Index Only Scan; if it doesn't appear, explain why (e.g., heap fetches)."
  },
  questionBlocks: [
    {
      type: "code",
      lang: "sql",
      filename: "drill_7_setup.sql",
      code: `-- 1) Index Only Scan を狙うため、必要列を含む複合インデックスを作成
CREATE INDEX IF NOT EXISTS idx_orders_status_amount ON orders(status, amount);

-- 2) 可視性マップ更新を期待して VACUUM (ANALYZE)
VACUUM (ANALYZE) orders;`
    },
    {
      type: "code",
      lang: "sql",
      filename: "drill_7_explain.sql",
      code: `EXPLAIN (ANALYZE, BUFFERS)
SELECT amount
FROM orders
WHERE status = 'paid';`
    }
  ],
  answer: {
    ja: "Index Only Scan が出た場合は、プラン名と Heap Fetches の値（0 かどうか）に注目してください。Index Only Scan が出ない場合でも、(1) 可視性マップが十分でない (2) ヒープ参照が必要 (3) コスト推定で別プランが有利、といった理由を説明できればOKです。",
    en: "Check plan type and Heap Fetches; explain why it may not appear."
  },
  answerBlocks: [
    {
      type: "paragraph",
      body: {
        ja: "観察ポイント: `Index Only Scan` か / `Heap Fetches` が 0 か / Buffers の read/hit の変化",
        en: "Observe: plan node, Heap Fetches, and buffer behavior."
      }
    }
  ]
},

{
  type: "exercise",
  title: { ja: "問題演習 8: ANALYZE の重要性（統計情報で推定 rows は変わるか？）", en: "Drill 8: Importance of ANALYZE (does estimation change?)" },
  anchor: "drill-8",
  question: {
    ja: "TRUNCATE→再投入の直後は統計情報が古くなりやすいです。ANALYZE 前後で EXPLAIN の推定 rows がどう変わるか比較してください。",
    en: "Compare EXPLAIN estimated rows before/after ANALYZE after rebuilding data."
  },
  questionBlocks: [
    {
      type: "code",
      lang: "sql",
      filename: "drill_8_rebuild.sql",
      code: `-- 1) データ再投入（例: 一様分布で再生成）
TRUNCATE orders;

INSERT INTO orders (user_id, amount, status, created_at)
SELECT
  (random()*99999)::int + 1,
  (random()*10000)::int,
  (ARRAY['pending','paid','shipped','cancelled'])[1 + floor(random()*4)::int],
  now() - (random() * interval '1 year')
FROM generate_series(1, 1000000);`
    },
    {
      type: "code",
      lang: "sql",
      filename: "drill_8_before_analyze.sql",
      code: `-- 2) ANALYZE 前の推定を確認
EXPLAIN
SELECT *
FROM orders
WHERE status = 'paid';`
    },
    {
      type: "code",
      lang: "sql",
      filename: "drill_8_after_analyze.sql",
      code: `-- 3) 統計情報を更新して、推定がどう変わるか再確認
ANALYZE orders;

EXPLAIN
SELECT *
FROM orders
WHERE status = 'paid';`
    }
  ],
  answer: {
    ja: "ANALYZE 前は推定 rows が実態とズレやすく、ANALYZE 後は pg_stats が更新されて推定 rows が実測に近づきやすいです。推定が改善すると、境界付近のケースでは実行計画が切り替わることもあります。",
    en: "ANALYZE refreshes stats; estimates become closer and can affect plan choices near boundaries."
  }
},
      {
        type: "section",
        title: { ja: "コラム", en: "Column" },
        body: { ja: "制作時間: 約12時間", en: "Estimated implementation time: about 12 hours."} 
      },
    ],
  },
  {
    slug: "postgresql_concurrency_control_isolation_levels",
    blocks: [
      {
        type: "toc",
        title: { ja: "目次", en: "Contents" },
        items: [
          {title: { ja: "トランザクションとは", en: ""}, anchor: "0"},
          {title: { ja: "同時実行問題の種類", en: ""}, anchor: "1"},
          {title: { ja: "実験環境の準備", en: ""}, anchor: "2"},
          {title: { ja: "READ UNCOMMITTED / READ COMMITTED",}, anchor: "3"},
          {title: { ja: "REPEATABLE READ"}, anchor: "4"},
          {title: { ja: "SERIALIZABLE"}, anchor: "5"},
          {title: { ja: "PostgreSQLのMVCC"}, anchor: "6"},
          {title: { ja: "まとめ", en: "summary"}, anchor: "7"},
          {title: { ja: "問題演習", en: "Drills" }, anchor: "drill-1" }
        ]
      },
      {
        type: "paragraph",
        title: { ja: "トランザクションとは", en: ""},
        anchor: "0",
        body: {
          ja: `データベースは複数ユーザから同時にアクセスされることを前提として設計されています。
          しかし、同時実行によってデータの整合性が破壊される可能性があります。
          本記事ではPostgreSQLのトランザクション隔離レベルを変更しながら、実際に不整合が発生する状況を再現し、どのように防がれるのかを観察していきます。
          `
        },
      },
      {
        type: "list",
        title: { ja: "主な同時実行環境問題の種類", en: ""},
        anchor: "1",
        items: [
          { title: { ja: "Lost Update", en: "Lost Update" },
            description: {
              ja: "同じデータに対して2人が同時に更新をかけた際、後から更新した人の内容で上書きされる現象。"
            }
          },
          { title: { ja: "Dirty Read", en: "Dirty Read"},
            description: {
              ja: "確定していないデータを、別の処理が読んでしまう問題。"
            }},
          { title: {ja: "Non-repeatable Read", en: "Non-repeatable Read"},
            description: {
              ja: "一つのトランザクション内で同じデータを2回読み込んだ時、1回目と2回目で値が変わる現象。"
            }},
          { title: {ja: "Phantom Read", en: "Phantom Read"},
            description: {
              ja: "検索結果の行数が途中で増減する問題。"
            }},
        ]
      },
      {
        type: "paragraph",
        title: { ja: "実験環境の準備", en: ""},
        anchor: "2",
        body: {
          ja: `使用テーブルを設計します。作成コマンドは以下に示します。
          \n また、この記事ではDockerとVSCodeの拡張機能である、PostgreSQL(ms-ossdata.vscode-pgsql)を使用しています。そのため、実行方法や操作方法はこの拡張機能前提のものです。`
        }
      },
      {
        type: "code",
        title: { ja: "サンプル", en: "Sample" },
        lang: "sql",
        filename: "cc_create_tables.sql",
        code:`
CREATE TABLE bank_accounts (
    id SERIAL PRIMARY KEY,
    owner TEXT,
    balance INT
);

INSERT INTO bank_accounts (owner, balance) VALUES
('Alice', 1000),
('Bob', 1000); `
      },
      {
        type: "section",
        title: { ja: "Lost Update"},
        body: {
          ja: "まずはLost Updateを観測してみましょう。"
        }
      },
      {
        type: "code",
        title: { ja: "初期状態確認", en: ""},
        lang: "sql",
        filename: "check.sql",
        code: `SELECT * FROM bank_accounts;`
      },
      {
        type: "code",
        title: { ja: "セッション", en: "session"},
        files: [
          {
            tabLabel: "Session A",
            lang: "sql",
            filename: "cc_lost_update_sessionA.sql",
            code: `BEGIN;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

SELECT balance FROM bank_accounts WHERE owner='Alice';
-- 1000 を確認

UPDATE bank_accounts
SET balance = balance - 100
WHERE owner='Alice';

-- COMMITはまだしない`
          },
          {
            tabLabel: "Session B",
            lang: "sql",
            filename: "cc_lost_update_sessionB.sql",
            code: `BEGIN;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

SELECT balance FROM bank_accounts WHERE owner='Alice';
-- まだ1000が見える

UPDATE bank_accounts
SET balance = balance - 200
WHERE owner='Alice';

COMMIT;`
          }
        ]
      },
      {
        type: "paragraph",
        title: {ja: "コミットと確認", en: ""},
        body: {
          ja: `わかりやすく観測できる方法として、SessionAの12行目(COMMIT;の行)以外を選択して、右クリックから"PostgreSQL クエリを実行する"を選択してください。
              次にSessionB全体を実行してください。環境によっては出ないかもしれませんが、"pgsql: このエディターのセッションのクエリはすでに実行中です。このクエリをキャンセルするか、完了まで待ってください。"と出ます。
              \nここでSessionAに戻り今度は12行目だけを選択し、”PostgreSQL クエリを実行する"をクリックしてください。これで、SessionBの処理も行われます。
              \nSessionAで100、SessionBで200引いているので、更新競合が対策されていれば700と出力されるはずです。以下のコードを実行して確認してみてください。`,
          en: ``
        }
      },
      {//コミットと確認
        type: "code",
        title: {ja: "コミットと確認", en: ""},
        lang: "sql",
        filename: "check_result.sql",
        code: `SELECT * FROM bank_accounts WHERE owner='Alice';`
      },
      {// 実行結果テーブル
        type: "table",
        title: {ja: "lost update検証の実行結果", en: ""},
        headers: ["id", "owner", "balance"],
        rows:[
          ["1", "Alice", "700"]
        ],
        showRowNumbers: true,
        rowNumberStart: 1
      },
      { //lost update まとめ
        type: "paragraph",
        title: {ja: "lost updateのまとめ"},
        body: {
          ja: `PostgreSQLでは、同一行に対する更新が競合した場合、後続トランザクションはロック待ちとなり、
              先行トランザクションのコミット後に更新対象行を再取得して更新を行います。
              \nそのため、更新結果が上書きされるLost Updateは発生せず、両方の更新が反映された値になることが確認されました。`
        }
      },
      { // Dirty Readが発生するか
        type: "section",
        title: {ja: "Dirty Readは発生するか"},
        body: {
          ja: `もしもコミット前のDBの情報が見えるとDirty Readが発生しています。そのため以下のコードを使って検証します。`,
          en: ""
        }
      },
      { //Dirty Read検証用コード
        type: "code",
        title: {ja: ""},
        files: [
          {
            tabLabel: "Session A",
            lang: "sql",
            filename: "cc_dirty_read_sessionA.sql",
            code:`BEGIN;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

UPDATE bank_accounts
SET balance = 5000
WHERE owner='Alice';

-- COMMITしない`
          },
          {
            tabLabel: "Session B",
            lang: "sql",
            filename: "cc_dirty_read_sessionB.sql",
            code: `BEGIN;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

SELECT balance FROM bank_accounts WHERE owner='Alice';`
          }
        ]
      },
      { //結果前に
        type: "paragraph",
        title: {ja: "予想"},
        body: {
          ja: `もし、Dirty Readが発生するなら、balanceが5000と表示されるはずです。実行結果は以下のようになりました。
              \nちなみに実行する前に、データをリセットしています。そのため値としてはAliceのbalanceが1000のままです。`
        }
      },
      { //Dirty readの結果
        type: "table",
        title: {ja: "Dirty read検証の実行結果", en: ""},
        headers: ["balance"],
        rows:[
          ["1000"]
        ],
        showRowNumbers: true,
        rowNumberStart: 1
      },
      {//Dirty readのまとめ
        type: "paragraph",
        title: {ja: "Dirty readのまとめ"},
        body:{
          ja: `表示は変わらず1000のままです。現在、PostgreSQLはデフォルトではUNCOMMITTEDの分離レベルがないのでDirty readは発生しません。
              \n他のデータベースでも、MySQLやSQL Serverはデフォルトでは発生しておらず、OracleはそもそもREAD UNCOMMITTEDをサポートしていません。
              \nREAD UNCOMMITTEDは未コミットデータの参照を許可する分離レベルとしてSQL標準に定義されていますが、MVCCを採用する現代の主要DBMSでは実用的な利点がありません。
              そのためPostgreSQLやOracleでは実質的にREAD COMMITTEDと同一の動作となります。
              \n\nまた、今後のため、SessionAをCOMMIT;するなどして止めておくことをおすすめします。`
        }
      },
      { // non-repeatable-read
        type: "paragraph",
        title: {ja: "Non-repeatable Read", en: "Non-repeatable Read"},
        body: {
          ja: `次はNon-repeatable Readの実験をします。同じトランザクション内で同じ行を読んだのに値が変わるのかどうかをみます。
              \nSessionA → SessionB → SessionA(4行目)の順に実行して、最初と最後のSessionAの結果を比べてみてください。`
        }
      },
      { //Non-repeatable Readのコード 
        type: "code",
        title: {ja: ""},
        files:[
          {
            tabLabel: "SessionA",
            lang: "sql",
            filename: "cc_non_repeatable_ReadA.sql",
            code: `BEGIN;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

SELECT balance FROM bank_accounts WHERE owner='Alice';
-- 1000 を確認
`
          },
          {
            tabLabel: "SessionB",
            lang: "sql",
            filename: "cc_non_repeatable_ReadB.sql",
            code: `BEGIN;
UPDATE bank_accounts
SET balance = balance - 100
WHERE owner='Alice';
COMMIT;
`
          },
        ]
      },
      { //Non-repeatable Readの結果
        type: "table",
        title: {ja: "Non-repeatable Readの実行結果(SessionBを実行する前)", en: ""},
        headers: ["balance"],
        rows:[
          ["1000"]
        ],
        showRowNumbers: true,
        rowNumberStart: 1
      },
      { //Non-repeatable Readの結果
        type: "table",
        title: {ja: "Non-repeatable Readの実行結果(SessionBを実行した後)", en: ""},
        headers: ["balance"],
        rows:[
          ["900"]
        ],
        showRowNumbers: true,
        rowNumberStart: 1
      },
      { //Non-repeatable readのまとめ
        type: "paragraph",
        title: {ja: "Non-repeatable readのまとめ"},
        body: {
          ja: `READ COMMITTEDでは各SELECT時点でのコミット済みの最新データを読みます。そのため、トランザクション開始時の状態は保証されません。
              他トランザクションのCOMMITが途中で可視化されるため、同じ行を再度読み取ると値が変化します。`
        }
      },
      { //Repeatable Read導入
        type: "paragraph",
        title: { ja: "Repeatable Read"},
        body: {
          ja: `同トランザクション内で結果を変えないようにするためにはRepeatable Readというものを使います。
          \nRepeatable Readはトランザクション開始時点のスナップショットを固定するため、同じ行を2回読んでも値が変わりません。(Non-repeatable Readが起きません)
          \n方法は簡単でNon-repeatable ReadのSessionAのコードの2行目の"READ COMMITTED"を"REPEATABLE READ”とするだけで観測できます。
          \n以下にコードを示します。これもSessionA → SessionB → SessionA(4行目)の順に実行してください。`
        }
      },
      { //Repeatable Read のコード
        type: "code",
        title: {ja: "Repeatable Readのコード", en: "Repeatable Read Code"},
        files:[
          {
            tabLabel: "SessionA",
            lang: "sql",
            filename: "cc_repeatable_ReadA.sql",
            code: `BEGIN;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

SELECT balance FROM bank_accounts WHERE owner='Alice';
-- 1000
`
          },
          {
            tabLabel: "SessionB",
            lang: "sql",
            filename: "cc_repeatable_ReadB.sql",
            code: `BEGIN;
UPDATE bank_accounts
SET balance = balance - 100
WHERE owner='Alice';
COMMIT;
`
          },
        ]
      },
      { //Repeatable Readの結果
        type: "table",
        title: { ja: "Repeatable Readの結果(SessionBを実行する前)"},
        headers: ["balance"],
        rows:[
          ["1000"]
        ],
        showRowNumbers: true,
        rowNumberStart: 1
      },
      { //Repeatable Readの結果
        type: "table",
        title: { ja: "Repeatable Readの結果(SessionBを実行した後)"},
        headers: ["balance"],
        rows:[
          ["1000"]
        ],
        showRowNumbers: true,
        rowNumberStart: 1
      },
      { //repeatable readのまとめ
        type: "paragraph",
        title: {ja: "repeatable readのまとめ"},
        body: {
          ja: `結果からわかる通り、今回は無事1000のままでした。ここから、Repeatable Readは読んだ結果が途中で変わらない事を保証する分離レベルだからです。
          \nただし、Repeatable Readでも、存在しなかった行が突然現れる現状(Phantom Read)は理論上ありえます。次はそれを確認していきましょう。`
        }
      },
      { //Phantom Read
        type: "paragraph",
        title: { ja: "Phantom Read"},
        body: {
          ja: `Phantom Readとは。同じ条件で検索したにも関わらず、途中で存在しなかった行が新たに現れる現象です。
              \nNon-repeatable Readは既存行の値が変わる現象だったのに対して、Phantom Readは行そのものが増減します。
              \nSessionA → SessionB → SessionA(check)の順で実行してください。`
        }
      },
      { //Phantom Read
        type: "code",
        title: {ja: "Phantom Read"},
        files: [
          {
            tabLabel: "Session A",
            lang: "sql",
            filename: "cc_phantom_read_A_begin_read_committed.sql",
            code:`BEGIN;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

SELECT count(*)
FROM bank_accounts
WHERE balance >= 1000;
-- 2件 (Alice, Bob)
`
          },
          {
            tabLabel: "Session B",
            lang: "sql",
            filename: "cc_phantom_read_B_insert_carol_commit.sql",
            code: `BEGIN;

INSERT INTO bank_accounts(owner, balance)
VALUES ('Carol', 2000);

COMMIT;`
          },
          {
            tabLabel: "Session A(check)",
            lang: "sql",
            filename: "cc_phantom_read_A_reread_commit.sql",
            code: `SELECT count(*)
FROM bank_accounts
WHERE balance >= 1000;
-- 3件 (Alice, Bob, Carol)

COMMIT;`
          }
        ]
      },
      { //Phantom Readの結果
        type: "table",
        title: {ja: "Phantom Readの実行結果(SessionBを実行する前)", en: ""},
        headers: ["count"],
        rows:[
          ["2"]
        ],
        showRowNumbers: true,
        rowNumberStart: 1
      },
      { //Phantom Readの結果
        type: "table",
        title: {ja: "Phantom Readの実行結果(SessionBを実行した後)", en: ""},
        headers: ["count"],
        rows:[
          ["3"]
        ],
        showRowNumbers: true,
        rowNumberStart: 1
      },
      { //Phantom Readのまとめ
        type: "paragraph",
        title: { ja: "Phantom Readの実行結果"},
        body: {
          ja: `READ COMMITTEDでは、同一トランザクション中でも後続のSELECTで他トランザクションのCOMMIT済み行が見えるため、件数が2→3に増加しました。これでPhantom readが観測されました。`
        }
      },
      { //phantom read対策
        type: "paragraph",
        title: { ja: "phantom readを起こさないためには"},
        body: {
          ja: `phantom readもNon-repeatable readとrepeatable readのように起こさないようにできます。`
        }
      },
      { //Phantom Readを発生させないコード
        type: "code",
        title: {ja: "Phantom Readを発生させないコード"},
        files: [
          {
            tabLabel: "Session A",
            lang: "sql",
            filename: "cc_phantom_read_A_begin_read_committed.sql",
            code:`BEGIN;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

SELECT count(*)
FROM bank_accounts
WHERE balance >= 1000;
-- 2件 (Alice, Bob)
`
          },
          {
            tabLabel: "Session B",
            lang: "sql",
            filename: "cc_phantom_read_B_insert_carol_commit.sql",
            code: `BEGIN;

INSERT INTO bank_accounts(owner, balance)
VALUES ('Carol', 2000);

COMMIT;`
          },
          {
            tabLabel: "Session A(check)",
            lang: "sql",
            filename: "cc_phantom_read_A_reread_commit.sql",
            code: `SELECT count(*)
FROM bank_accounts
WHERE balance >= 1000;
-- 2件 (Alice, Bob)

COMMIT;`
          }
        ]
      },
      { //Phantom Readの結果
        type: "table",
        title: {ja: "Phantom Readの実行結果(SessionBを実行する前)", en: ""},
        headers: ["count"],
        rows:[
          ["2"]
        ],
        showRowNumbers: true,
        rowNumberStart: 1
      },
      { //Phantom Readの結果
        type: "table",
        title: {ja: "Phantom Readの実行結果(SessionBを実行した後)", en: ""},
        headers: ["count"],
        rows:[
          ["2"]
        ],
        showRowNumbers: true,
        rowNumberStart: 1
      },
      { //Phantom Read対策のまとめ
        type: "paragraph",
        title: { ja: "Phantom Read対策"},
        body: {
          ja: `REPEATABLE READでは、トランザクション開始時点のスナップショットに基づいて読み取るため。途中で追加された行が同一トランザクション内の再検索に現れず。件数が2で保たれました。`
        }
      },
      {
        type: "section",
        title: { ja: "コラム", en: "Column" },
        body: { ja: "制作時間: 約 6時間", en: "Estimated implementation time: about  hours."} //4.5
      }
    ]
  }
];
