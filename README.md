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
- `/admin/articles/[id]/edit` — 公開記事・未完成draftの編集（idはJSONファイル名）

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
│   ├── article-storage.ts   # 記事JSONの診断・読み込み・保存・export
│   ├── language-storage.ts  # 言語JSONの検証・読み込み
│   ├── localization.ts      # 6言語型と共通fallback
│   └── admin-auth.ts        # 簡易管理認証
└── data/
    ├── profile.ts           # 名前、紹介、興味、扱った技術領域
    ├── project.ts           # 既存の制作物データ
    ├── projects.ts          # 分類、代表作、ケーススタディ、AI Usage
    ├── schoolTypes.ts       # 記事・blockのTypeScript型
    ├── languages.ts         # 言語レコードの型
    └── travelContent.ts     # 国→都市→場所の独立した旅行データ
```

```text
content/
├── articles/<slug>.json    # 1記事1JSON（CMS対象）
├── languages/<slug>.json   # 1言語1JSON
├── projects/               # 次段階のJSON移行先
├── hardware/               # 次段階のJSON移行先
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

公開する記事はファイル名と記事内 `slug` を一致させます。例：`slug: "database-indexes"` の場合は `content/articles/database-indexes.json` です。未完成draftは安全な仮ファイル名でも保存でき、CMS一覧から再編集できます。

旧 `schoolArticleCards.ts / schoolArticleContents.ts / schoolArticles.ts` の内容は記事別JSONへ移行済みで、旧巨大配列への手動追加は不要です。

読み込みと公開の検証は意図的に分けています。

- `Draft validation` — JSONとして解析でき、既知のblock typeと基本データ型を満たすかを確認します。翻訳、slug、概要などは未入力でも編集できます。
- `Publish validation` — `slug`、タイトル1言語以上、本文block 1件以上だけを公開必須条件にします。
- `Error` — 公開対象から除外しますが、ほかの記事・一覧・buildは継続します。例：slugなし、タイトルが全言語で空、blockなし、slug重複。
- `Warning` — 公開を妨げません。例：英訳なし、概要・タグ・カテゴリ・更新日なし、旧形式のslug、ファイル名とslugの不一致。
- JSON構文エラー、未知のblock type、基本型の破損は `Fatal` としてそのファイルだけを除外し、コンソールと管理一覧にファイル名・field pathを表示します。

公開側の `getAllArticles()` は `publishable` な記事だけを返します。そのため1件の不正JSONがあってもサイト全体は落ちず、正常な記事の一覧・詳細・静的パスは生成されます。

### 翻訳とfallback

コンテンツは `ja / en / de / it / fr / ru` に対応し、各翻訳は任意です。文字列または `{ "ja": "...", "en": "..." }` という既存形式もそのまま読めます。表示時は次の順で最初の空でない文字列を使います。

```text
選択中のUI言語 → ja → en → その他の登録済み翻訳 → 空文字
```

UI言語とコンテンツ言語は分離され、ヘッダーの言語選択がCMSプレビュー、記事、言語カード、言語詳細の表示言語になります。

最小の記事JSON例です。翻訳は1言語だけでも公開できます。

```json
{
  "slug": "language-game",
  "title": { "ja": "言語ゲーム", "de": "Sprachspiel" },
  "blocks": [
    {
      "type": "paragraph",
      "body": { "ja": "制作過程を記録します。" }
    }
  ]
}
```

## File-based CMS

### Local Edit Mode

`npm run dev` ではLocal Edit Modeが既定です。保存時は以下を実行します。

1. ZodでDraft構造を検証し、公開errorsとwarningsを計算
2. 既存JSONがあれば `content/.backups/articles/` へバックアップ
3. 一時ファイルへ書き込み
4. atomic renameで `content/articles/[slug].json` を更新

`CMS_LOCAL_EDIT=false` を設定するとローカルでもExport Modeを確認できます。

### Export Mode / Vercel

Vercelでは実行環境への書き込みが永続化されないため、自動的にExport Modeになります。CMSは未完成でもJSONをCopy / Downloadでき、`Publishable: Yes/No` とerrors / warnings件数を併記します。slugが有効なら `<slug>.json`、未入力なら `article-draft.json` を生成します。公開条件を満たしたファイルを `content/articles/` へ配置してcommitしてください。ストレージ処理は `article-storage.ts` に分離しているため、将来GitHub API commitへ差し替えられます。

### 認証

本番では必ず `ADMIN_PASSWORD` を設定してください。認証済み状態は8時間有効のHttpOnly / SameSite=Strict cookieで保持します。環境変数未設定時に認証を省略するのはローカルdevelopmentだけです。

```bash
cp .env.example .env.local
npm run dev
```

### 対応ブロック

`lead / section / list / toc / paragraph / image / table / code / exercise` に対応しています。すべて並び替え・複製・削除ができ、Exercise内部の補助ブロックも編集できます。Codeは複数ファイル、ImageとTableは複数タブ、Tableは6言語対応の行列GUIを利用できます。タイトルから安全なslugを作る `Generate` ボタンもあります。

### Language / Culture

`content/languages/<slug>.json` に1言語1ファイルで、現在地、目標、学習履歴、リソース、旅行・本・映画へのリンクを追加します。全ページはディレクトリから自動生成されます。旅行は `src/data/travelContent.ts` の独立した階層データなので、将来Travelページを再分離しても移行しやすい構成です。

```json
{
  "slug": "german",
  "name": { "ja": "ドイツ語", "en": "German", "de": "Deutsch" },
  "nativeName": "Deutsch",
  "currentLevel": { "ja": "学習中", "de": "Ich lerne Deutsch." },
  "summary": { "ja": "文化・旅行と結びつけた学習記録。" },
  "goals": [{ "ja": "基礎会話を身につける" }],
  "learningHistory": [],
  "resources": [],
  "cultureLinks": []
}
```

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
- Projects / Hardwareを `content/projects` / `content/hardware` の1件1JSON loaderへ段階移行
- Languages用CMSフォーム（現在はJSON loaderと公開ページまで対応）
- GitHub APIを使うExport後のcommit作成
- Playwright等によるキーボード操作と主要導線のE2Eテスト
