# Isao — Portfolio / Activity Log

Next.js App Router + TypeScript + Tailwind CSSで作成した個人ポートフォリオです。制作物の一覧だけでなく、設計判断、課題、AIとの役割分担、検証、学習ノート、外国語と文化体験をまとめます。

## 情報設計

- `/` — 30秒で活動領域を把握できるトップページ
- `/projects` — Software / Hardware / Research等を検索・分類できる制作一覧
- `/projects/[slug]` — Overview、Problem、Technical Decisions、AI Usage等のケーススタディ
- `/notes` — 技術・研究・学習ノートの検索／タグ絞り込み
- `/notes/[slug]` — 既存のSchool記事本文を再利用したノート詳細
- `/languages` — 外国語学習と旅行・本・映画をまとめる入口
- `/languages/[slug]` — 言語ごとの現在地、目標、履歴、文化体験
- `/about` — 短い自己紹介、技術、言語、外部リンク
- `/travel` — 既存の国→都市→場所データを維持した旅行アーカイブ

旧URLの `/coding` と `/school` は、それぞれ `/projects` と `/notes` へ308リダイレクトします。旧旅行URLと既存データは維持しています。

## 主なディレクトリ

```text
src/
├── app/
│   ├── projects/[slug]/     # 制作一覧・詳細
│   ├── notes/[slug]/        # ノート一覧・詳細
│   ├── languages/[slug]/    # 言語・文化一覧・詳細
│   ├── about/               # 自己紹介
│   ├── travel/              # 既存の旅行アーカイブ
│   └── page.tsx             # Home
├── components/
│   ├── common/              # Header / Footer等
│   ├── projects/            # ProjectCard / 検索・フィルタ
│   ├── notes/               # NoteCard / 検索・フィルタ
│   ├── languages/           # LanguageCard
│   └── ui/                  # Tag / SectionHeader
└── data/
    ├── profile.ts           # 名前、紹介、興味、扱った技術領域
    ├── project.ts           # 既存の制作物データ
    ├── projects.ts          # 分類、代表作、ケーススタディ、AI Usage
    ├── schoolArticleCards.ts
    ├── schoolArticleContents.ts
    ├── languages.ts         # 言語ごとの学習・文化データ
    └── travelContent.ts     # 国→都市→場所の独立した旅行データ
```

## コンテンツの追加方法

### Project

1. `src/data/project.ts` にタイトル、概要、画像、タグ、更新日を追加します。
2. `src/data/projects.ts` の `additions` に分類、代表作フラグ、詳細セクションを追加します。
3. AIを利用した場合は `aiUsage` に「任せたこと／自分が設計したこと／レビュー／動作確認」を分けて記録します。

`ProjectCard`、検索、分類、詳細ページ、静的パスはデータから自動生成されます。

### Note

1. `src/data/schoolArticleCards.ts` にカード情報を追加します。
2. `src/data/schoolArticleContents.ts` に同じ `slug` の本文ブロックを追加します。

既存記事のブロック形式はそのまま利用でき、100件以上になってもカードと長い本文を分けて管理できます。

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
