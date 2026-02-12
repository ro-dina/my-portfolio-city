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
          { title: { ja: "実験1", en: "Experiment 1" }, anchor: "experiment-1" },
          { title: { ja: "実験2", en: "Experiment 2" }, anchor: "experiment-2" },
          { title: { ja: "実験3", en: "Experiment 3" }, anchor: "experiment-3" },
          { title: { ja: "まとめ", en: "Summary" }, anchor: "summary" },
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

          en: `You can write long text.\nLine breaks are preserved.\n\nBlank lines separate paragraphs.
          \nAn execution plan outlines the steps and methods a database uses to execute an SQL query. 
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
            caption: { ja: "図1: Seq Scanのイメージ", en: "Fig.1 Image of Seq Scan" },
            width: 600,
            height: 400,
          },
          {
            tabLabel: { ja: "Index Scan", en: "Index Scan" },
            src: "/images/script/Database/index_scan.gif",
            alt: { ja: "Index Scanの図", en: "Diagram of Index Scan" },
            caption: { ja: "図2: Index Scanのイメージ", en: "Fig.2 Image of Index Scan" },
            width: 600,
            height: 400,
          },
          {
            tabLabel: { ja: "Bitmap Heap Scan", en: "Bitmap Heap Scan" },
            src: "/images/script/Database/bitmap_heap_scan.gif",
            alt: { ja: "Bitmap Heap Scanの図", en: "Diagram of Bitmap Heap Scan" },
            caption: { ja: "図3: Bitmap Heap Scanのイメージ", en: "Fig.3 Image of Bitmap Heap Scan" },
            width: 600,
            height: 400,
          },
          {
            tabLabel: { ja: "Index only Scan", en: "Index Only Scan" },
            src: "/images/script/Database/index_only_scan.gif",
            alt: { ja: "Index only Scanの図", en: "Diagram of Index Only Scan" },
            caption: { ja: "図4: Index only Scanのイメージ", en: "Fig.4 Image of Index Only Scan" },
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
      {
  type: "image",
  title: { ja: "構成図", en: "Diagram" }, // 任意
  src: "/images/script/Database/plane_image_database.png", // 任意
  alt: { ja: "構成の図", en: "System diagram" }, // 任意
  caption: { ja: "図1: 全体構成", en: "Fig.1 Overview" }, // 任意
  width: 1200, // 任意
  height: 700,  // 任意
      },
      {
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
      {
        type: "section",
        title: { ja: "基本インデックスを作る", en: "Create basic indexes" },
        body: {
          ja: `実行計画の差を出すための基本インデックスを作成する。コードは以下の通り。`,
          en: `Create basic indexes to see differences in execution plans. The code is as follows.`,
        },
      },
      {
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
      {
        type: "section",
        title: { ja: "実験1", en: "Experiment 1" },
        anchor: "experiment-1",
        body: {
          ja: `status='paid' はヒット率が高い（低カーディナリティ）ので、インデックスがあっても Seq Scan が選ばれるか確認する。`,
          en: `For status='paid', which has a high hit rate (low cardinality), we will check if a Seq Scan is still selected even with an index.`,
        },
      },
      {
        type: "code",
        title: { ja: "実験1: 低選択率", en: "Experiment 1: Low selectivity" },
        lang: "sql",
        filename: "experiment1_low_selectivity.sql",
        code: `
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE status = 'paid';`
      },
      {
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
          ["Excution Time: 51.405 ms"],
        ],
        showRowNumbers: true,
        rowNumberStart: 1,
      },
      {
        type: "paragraph",
        title: { ja: "考察", en: "Discussion" },
        body: {
          ja: `実験1において、低カーディナリティ列statusに対する検索で、PostgreSQLはSeq ScanやIndex Scanではなく,Bitmap Heap Scanを選択しました。
          \nstatusは4種類しか値を持たないため、1つの値に対して多数の行が一致します。この場合は、Index Scanのように個々の行を参照すると非効率であり、Seq Scanも全行を読むためコストが高いです。
          \n\nPostgreSQLはまずインデックスから一致行の位置をビットマップとして収集し、その後テーブルをまとめて読み込むBitmap Heap Scanを採用することで、検索効率とI/O効率の両立を図っています。`,
          en: `In Experiment 1, for searches on the low-cardinality column 'status', PostgreSQL chose Bitmap Heap Scan instead of Seq Scan or Index Scan.
          \nSince 'status' has only four possible values, many rows match a single value. In this case, using Index Scan to reference individual rows is inefficient, and Seq Scan is costly as it reads all rows.
          \n\nPostgreSQL first collects the positions of matching rows from the index as a bitmap, and then reads the table in bulk using Bitmap Heap Scan, balancing search efficiency and I/O efficiency`,
        },
      },
      {
        type: "section",
        title: { ja: "実験2", en: "Experiment 2" },
        anchor: "experiment-2",
        body: {
          ja: `created_atの範囲検索でBitmapがIndex Scanに切り替わる境界を観測する。`,
          en: `Observe the boundary where range searches on created_at switch from Bitmap to Index Scan.`,
        }
      },
      {
        type: "code",
        title: { ja: "実験2: 範囲検索（30日/7日/1日）", en: "Experiment 2: Range search（30日/7日/1日）" },
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
      {
        type: "table",
        title: { ja: "実験2結果", en: "Experiment 2 Results" },
        files: [
          {
            tabLabel: "30days",
            headers: ["QUERY PLAN"],
            rawText: `Bitmap Heap Scan on orders  (cost=1337.72..10921.08 rows=71392 width=35) (actual time=6.732..56.848 rows=74025 loops=1)
  Recheck Cond: (created_at > (now() - '30 days'::interval))
  Heap Blocks: exact=8334
  Buffers: shared hit=3 read=8540
  ->  Bitmap Index Scan on idx_orders_created_at  (cost=0.00..1319.87 rows=71392 width=0) (actual time=5.318..5.318 rows=74025 loops=1)
        Index Cond: (created_at > (now() - '30 days'::interval))
        Buffers: shared hit=3 read=206
Planning:
  Buffers: shared hit=117 read=9
Planning Time: 0.925 ms
Execution Time: 58.499 ms`,
          showRowNumbers: true,
          rowNumberStart: 1,
          preserveCellWhitespace: true,
          monospace: true
          },
          {
            tabLabel: "7days",
            headers: ["QUERY PLAN"],
            rawText: `Bitmap Heap Scan on orders  (cost=183.54..9101.04 rows=9691 width=35) (actual time=0.941..3.937 rows=10072 loops=1)
  Recheck Cond: (created_at > (now() - '7 days'::interval))
  Heap Blocks: exact=5872
  Buffers: shared hit=5903
  ->  Bitmap Index Scan on idx_orders_created_at  (cost=0.00..181.11 rows=9691 width=0) (actual time=0.521..0.522 rows=10072 loops=1)
        Index Cond: (created_at > (now() - '7 days'::interval))
        Buffers: shared hit=31
Planning:
  Buffers: shared hit=2 read=2
Planning Time: 0.232 ms
Execution Time: 4.160 ms`,
          showRowNumbers: true,
          rowNumberStart: 1,
          preserveCellWhitespace: true,
          monospace: true
          },
          {
            tabLabel: "1day",
            headers: ["QUERY PLAN"],
            rawText: `Index Scan using idx_orders_created_at on orders  (cost=0.43..8.45 rows=1 width=35) (actual time=0.009..0.009 rows=0 loops=1)
  Index Cond: (created_at > (now() - '1 day'::interval))
  Buffers: shared hit=3
Planning:
  Buffers: shared hit=4
Planning Time: 0.068 ms
Execution Time: 0.018 ms`,
            showRowNumbers: true,
            rowNumberStart: 1,
            preserveCellWhitespace: true,
            monospace: true
          }
        ]
      },
      {
        type: "paragraph",
        title: { ja: "考察A", en: "DiscussionA" },
        body: {
          ja: `実験2では created_at に対する範囲検索で(30日、7日、1日)の3つのケースを試しました。しかし、いずれのケースでもPostgreSQLはBitmap Heap Scanを選択しました。
          \nこれは、一致行雨がまだ一定数存在する場合や、対象行がテーブル上に散在している場合、対象ブロックをまとめて読むBitmap Heap Scanが効率的であると判断されたためだと考えられます。
          \n実際、Heap Blocksが8334→7549→2273と減少し、Execution Timeも25.777ms→9.115ms→1.714mmsと改善しています。
          \nIndex Scanに切り替わる境界をある程度絞りたいので1時間・10分・1分も試してみます。`,
          en: `In Experiment 2, we tested three cases of range searches on created_at (30 days, 7 days, 1 day). However, in all cases, PostgreSQL chose Bitmap Heap Scan.
          \nThis is likely because when there are still a certain number of matching rows or when the target rows are scattered across the table, Bitmap Heap Scan, which reads the target blocks in bulk, is considered efficient.
          \nIn fact, the number of Heap Blocks decreased from 8334 to 7549 to 2273, and the Execution Time improved from 25.777ms to 9.115ms to 1.714ms.
          \nTo narrow down the boundary where it switches to Index Scan, we will also test 1 hour, 10 minutes, and 1 minute.`,
        },
      },
      {
        type: "code",
        title: { ja: "実験2追加: 範囲検索（1時間/10分/1分）", en: "Experiment 2 Additional: Range search（1 hour/10 minutes/1 minute）" },
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
        title: { ja: "実験2追加結果", en: "Experiment add 2 Results" },
        files: [
          {
            tabLabel: "1 hour",
            headers: ["QUERY PLAN"],
            rawText: `Index Scan using idx_orders_created_at on orders  (cost=0.43..8.45 rows=1 width=35) (actual time=0.010..0.010 rows=0 loops=1)
  Index Cond: (created_at > (now() - '01:00:00'::interval))
  Buffers: shared hit=6
Planning:
  Buffers: shared hit=130
Planning Time: 0.258 ms
Execution Time: 0.024 ms`,
          showRowNumbers: true,
          rowNumberStart: 1,
          preserveCellWhitespace: true,
          monospace: true
          },
          {
            tabLabel: "10 minutes",
            headers: ["QUERY PLAN"],
            rawText: `Index Scan using idx_orders_created_at on orders  (cost=0.43..8.45 rows=1 width=35) (actual time=0.004..0.004 rows=0 loops=1)
  Index Cond: (created_at > (now() - '00:10:00'::interval))
  Buffers: shared hit=3
Planning:
  Buffers: shared hit=4
Planning Time: 0.065 ms
Execution Time: 0.016 ms`,
          showRowNumbers: true,
          rowNumberStart: 1,
          preserveCellWhitespace: true,
          monospace: true
          },
          {
            tabLabel: "1 minute",
            headers: ["QUERY PLAN"],
            rawText: `Index Scan using idx_orders_created_at on orders  (cost=0.43..8.45 rows=1 width=35) (actual time=0.004..0.004 rows=0 loops=1)
  Index Cond: (created_at > (now() - '00:01:00'::interval))
  Buffers: shared hit=3
Planning:
  Buffers: shared hit=4
Planning Time: 0.072 ms
Execution Time: 0.011 ms`,
            showRowNumbers: true,
            rowNumberStart: 1,
            preserveCellWhitespace: true,
            monospace: true
          }
        ]
      },
      {
        type: "paragraph",
        title: { ja: "考察B", en: "DiscussionB" },
        body: {
          ja: `追加の実験2ではcreated_atに対する範囲検索で(1時間、10分、1分)の3つのケースを試した。PostgreSQLは、すべてのケースでIndex Scanを選択しています。
          \nこれは、ヒット件数（選択率）が高い場合には Index Scan で1行ずつヒープへアクセスするとランダムアクセスが増え、I/O効率が悪化するためです。
          Bitmap Heap Scan は、インデックスから対象行の位置情報をまとめて収集してからヒープブロックをまとめて読み込むため、ヒット件数が多い領域で有利になりやすい。
一方で、1時間以下のようにヒット件数が十分少ない場合は、インデックスを辿って必要な行だけを取得する Index Scan の方が総コストが低くなります。その結果、実行計画が Bitmap 系から Index Scan に切り替わったと考えられます。`,
          en: `In the additional Experiment 2, we tested three cases of range searches on created_at (1 hour, 10 minutes, 1 minute). PostgreSQL chose Index Scan in all cases.
          \nThis is because when the number of hits (selectivity) is high, accessing the heap row by row with Index Scan increases random access, worsening I/O efficiency.
          Bitmap Heap Scan collects the position information of target rows from the index in bulk and then reads the heap blocks in bulk, making it advantageous in areas with many hits.
          On the other hand, when the number of hits is sufficiently low, such as below 1 hour, Index Scan, which follows the index to retrieve only the necessary rows, has a lower total cost. As a result, it is believed that the execution plan switched from Bitmap type to Index Scan.`,
        },
      },
      {
        type: "section",
        title: { ja: "JOIN + GROUP BY", en: "JOIN + GROUP BY" },
        anchor: "experiment-3",
        body: {
          ja: ``,
          en: ``,
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
          ja: `本クエリでは、WHERE条件がなく、oders(100万行)の大部分を読み取る必要があります。そのため
          、インデックスを使っても読み取り量はほとんどへらないため、PostgreSQLはSeq Scanを選択したと考えられます。
          \n\n結合はusers(10万行)をハッシュ表として構築し、oders側を走査しながら参照するHash Joinが選択されています。これは、
          小さい表をハッシュかし、大きい表を走査する典型的な戦略であると言えます。
          \n\nまた、GROUP BYはワーカーごとに部分集約を行い、Gether Mergeにより統合した後、Finalize GroupAggregateによって最終結果を確定しています。
          これにより、並列化によるスループット向上が図られています。
          \n\n最後の ORDER BY は出力が5行のみであり、ソートは quicksort でメモリ 25kB 程度と小さいことがわかります。
          以上より、本実行計画は「大量データ走査＋小テーブルハッシュ結合＋並列集約」という、読み取り主体の集計クエリに適したプランであると考えられます。`,
        }
      },
      {
        type: "section",
        title: { ja: "実験3+α", en: "Experiment 3+α" },
        body: {
          ja: `orderを１時間以内に絞るとどうなるか？`,
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
        anchor: "summary",
        body: {
          ja: `WHERE 条件を追加して orders の候補行数を大きく減らすと、実行計画は Parallel Seq Scan + Hash Join から、Index Scan + Nested Loop に切り替わりました。
          \n\nWHERE句がない場合、ordersをほぼ全件読み取る必要があるため、並列全走査ろHash Joinによってスループットを稼ぐ戦略が有効でした。一方で、created_atの範囲条件により、
          候補が極端に少なくなると、Index Scanで必要行を直接取得し、Nested Loopで結合する方が効率的になります。
          \n\n今回の実行では、1時間以内のデータが0件であったため、users側の参照は実行されませんでした。しかし、一般には候補行数が少ないほどNested Loopは有効であり、
          条件の選択率がオプティマイザの結合戦略に大きく影響することがわかります。`,
          en: `By adding a WHERE condition to significantly reduce the number of candidate rows in orders, the execution plan switched from Parallel Seq Scan + Hash Join to Index Scan + Nested Loop.
          \n\nWhen there is no WHERE clause, it is necessary to read almost all records in orders, making a strategy that leverages throughput through parallel full scans and Hash Join effective. On the other hand, when the range condition on created_at drastically reduces candidates,
          it becomes more efficient to directly retrieve the necessary rows with Index Scan and join them using Nested Loop.
          \n\nIn this execution, there were zero records within one hour, so the reference on the users side was not executed. However, in general, the fewer candidate rows there are, the more effective Nested Loop becomes,
          indicating that the selectivity of conditions significantly influences the optimizer's join strategy.`,
        },
      }






    ],
  },
];
