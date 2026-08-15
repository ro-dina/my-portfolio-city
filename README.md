# Isao — Portfolio / Activity Log

Next.js App Router + TypeScript + Tailwind CSSで作成した個人ポートフォリオです。制作物の一覧だけでなく、設計判断、課題、AIとの役割分担、検証、学習ノート、外国語と文化体験をまとめます。

## 情報設計

- `/` — 30秒で活動領域を把握できるトップページ
- `/projects` — Software / Hardware / Research等を検索・分類できる制作一覧
- `/projects/[slug]` — Overview、Problem、Technical Decisions、AI Usage等のケーススタディ
- `/notes` — 技術・研究・学習ノートの検索／タグ絞り込み
- `/notes/[slug]` — `content/articles/<slug>.json` から生成するノート詳細
- `/languages` — 外国語学習と旅行・本・映画をまとめる入口
- `/languages/[slug]` — 言語ごとの現在地、目標、履歴、文化体験
- `/about` — 短い自己紹介、技術、言語、外部リンク
- `/travel` — 既存の国→都市→場所データを維持した旅行アーカイブ
- `/admin/articles` — 記事一覧とファイルベースCMS
- `/admin/articles/new` — 記事作成
- `/admin/articles/[slug]/edit` — 既存記事の編集

旧URLの `/coding` と `/school` は、それぞれ `/projects` と `/notes` へ308リダイレクトします。旧旅行URLと既存データは維持しています。

## 主なディレクトリ

```text
src/
├── app/
│   ├── admin/articles/       # CMS一覧・新規・編集
│   ├── api/admin/            # 認証・記事保存API
│   ├── projects/[slug]/     # 制作一覧・詳細
│   ├── notes/[slug]/        # ノート一覧・詳細
│   ├── languages/[slug]/    # 言語・文化一覧・詳細
│   ├── about/               # 自己紹介
│   ├── travel/              # 既存の旅行アーカイブ
│   └── page.tsx             # Home
├── components/
│   ├── admin/               # ArticleEditorとblock別フォーム
│   ├── common/              # Header / Footer等
│   ├── projects/            # ProjectCard / 検索・フィルタ
│   ├── notes/               # NoteCard / 検索・フィルタ
│   ├── languages/           # LanguageCard
│   └── ui/                  # Tag / SectionHeader
├── lib/
│   ├── article-schema.ts    # Zod validation
│   ├── article-storage.ts   # 全JSONの検証・読み込み・保存・export
│   └── admin-auth.ts        # 簡易管理認証
└── data/
    ├── profile.ts           # 名前、紹介、興味、扱った技術領域
    ├── project.ts           # 既存の制作物データ
    ├── projects.ts          # 分類、代表作、ケーススタディ、AI Usage
    ├── schoolTypes.ts       # 記事・blockのTypeScript型
    ├── languages.ts         # 言語ごとの学習・文化データ
    └── travelContent.ts     # 国→都市→場所の独立した旅行データ
```

```text
content/
├── articles/<slug>.json    # 1記事1ファイルの唯一の公開ソース
└── .backups/articles/      # 保存前バックアップ（git管理外）
```

## コンテンツの追加方法

### Project

1. `src/data/project.ts` にタイトル、概要、画像、タグ、更新日を追加します。
2. `src/data/projects.ts` の `additions` に分類、代表作フラグ、詳細セクションを追加します。
3. AIを利用した場合は `aiUsage` に「任せたこと／自分が設計したこと／レビュー／動作確認」を分けて記録します。

`ProjectCard`、検索、分類、詳細ページ、静的パスはデータから自動生成されます。

### Note

通常は開発サーバーを起動し、`/admin/articles` から作成・編集します。JavaScript / TypeScriptのオブジェクト構造を直接書く必要はありません。

記事はすべて `content/articles/*.json` から自動的に読み込まれます。新しい記事を追加する場合は、次のどちらかだけで公開対象になります。

1. Local Edit ModeのCMSで保存する
2. Export Modeでダウンロードした `<slug>.json` を `content/articles/` に配置する

ファイル名は記事オブジェクトの `slug` と完全に一致する必要があります。例：`slug: "database-indexes"` の場合は `content/articles/database-indexes.json` です。

旧 `schoolArticleCards.ts / schoolArticleContents.ts / schoolArticles.ts` の内容は7個のJSONへ移行済みで、旧巨大配列への手動追加は不要です。

読み込み時にはすべてのJSONへZod schemaを適用します。以下は開発サーバーとproduction buildを、ファイル名とフィールド位置を含むエラーで停止させます。

- JSON構文エラー
- schema違反または未知のblock type
- `<slug>.json` と記事内slugの不一致
- slugの重複

## File-based CMS

### Local Edit Mode

`npm run dev` ではLocal Edit Modeが既定です。保存時は以下を実行します。

1. Zodで記事と全blockを検証
2. 既存JSONがあれば `content/.backups/articles/` へバックアップ
3. 一時ファイルへ書き込み
4. atomic renameで `content/articles/[slug].json` を更新

`CMS_LOCAL_EDIT=false` を設定するとローカルでもExport Modeを確認できます。

### Export Mode / Vercel

Vercelでは実行環境への書き込みが永続化されないため、自動的にExport Modeになります。CMSは記事slugをファイル名にした `<slug>.json` だけを生成します。そのファイルを変更せず `content/articles/` へ配置してリポジトリへcommitしてください。ストレージ処理は `article-storage.ts` に分離しているため、将来GitHub APIでcommitを作る実装へ差し替えられます。

### 認証

本番では必ず `ADMIN_PASSWORD` を設定してください。認証済み状態は8時間有効のHttpOnly / SameSite=Strict cookieで保持します。環境変数未設定時に認証を省略するのはローカルdevelopmentだけです。

```bash
cp .env.example .env.local
npm run dev
```

### 対応ブロック

`lead / section / list / toc / paragraph / image / table / code / exercise` に対応しています。すべて並び替え・複製・削除ができ、Exercise内部の補助ブロックも編集できます。Codeは複数ファイル、ImageとTableは複数タブ、Tableは日本語・英語セルを持つ行列GUIを利用できます。

### Language / Culture

`src/data/languages.ts` に現在地、目標、学習履歴、リソース、旅行・本・映画へのリンクを追加します。旅行は `src/data/travelContent.ts` の独立した階層データなので、将来Travelページを再分離しても移行しやすい構成です。

## 開発

```bash
npm install
npm run dev
npm run lint
npm run build
```

## 今後の改善候補

- 本人確認済みのプロフィール、経歴、連絡先へ更新
- 各プロジェクトのProblem / Role / Architecture / Validation / Resultを実測情報で補完
- 語学レベル、Writing Samples、使用した教材を具体化
- 代表作のスクリーンショット、OG画像、faviconの更新
- 記事数が増えた段階でMDXまたはヘッドレスCMSへ移行
- Playwright等によるキーボード操作と主要導線のE2Eテスト
