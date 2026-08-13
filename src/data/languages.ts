export type LanguageRecord = {
  slug: string;
  name: string;
  nativeName: string;
  currentLevel: string;
  summary: string;
  goals: string[];
  learningHistory: string[];
  resources: { label: string; href: string }[];
  cultureLinks: { label: string; href: string; type: "Travel" | "Books" | "Films" }[];
};

export const languages: LanguageRecord[] = [
  {
    slug: "english",
    name: "English",
    nativeName: "English",
    currentLevel: "継続学習中 — 実際に使った記録を追加予定",
    summary: "技術情報の読解と、制作内容を自分の言葉で説明するための英語。",
    goals: ["技術文書を正確に読む", "プロジェクトを英語で説明する", "文章と会話の実践記録を残す"],
    learningHistory: ["技術ドキュメントや開発資料を通じて継続的に学習"],
    resources: [],
    cultureLinks: [{ label: "旅行・文化の記録", href: "/travel", type: "Travel" }],
  },
  {
    slug: "german",
    name: "German",
    nativeName: "Deutsch",
    currentLevel: "学習記録を整理中",
    summary: "ドイツ語圏の文化や現地体験と結びつけて学ぶ言語。",
    goals: ["基礎語彙と文法を定着させる", "旅行中のやり取りに使う", "本・映画・訪問記録と学習を結びつける"],
    learningHistory: ["文化・旅行の記録と合わせて学習内容を整理"],
    resources: [],
    cultureLinks: [{ label: "ドイツの記録", href: "/travel/germany", type: "Travel" }],
  },
  {
    slug: "italian",
    name: "Italian",
    nativeName: "Italiano",
    currentLevel: "学習記録を整理中",
    summary: "旅行、映画、文化への関心から学んでいる言語。",
    goals: ["基礎的な会話を身につける", "文化体験を原語と結びつける"],
    learningHistory: [],
    resources: [],
    cultureLinks: [{ label: "旅行の記録", href: "/travel", type: "Travel" }],
  },
  {
    slug: "russian",
    name: "Russian",
    nativeName: "Русский",
    currentLevel: "学習記録を整理中",
    summary: "文字、語彙、文化的背景を段階的に学んでいる言語。",
    goals: ["キリル文字と基礎語彙を定着させる", "短い文章を読み書きする"],
    learningHistory: ["サイトUIのロシア語表示を試作"],
    resources: [],
    cultureLinks: [{ label: "映画の記録", href: "/cinema", type: "Films" }],
  },
  {
    slug: "french",
    name: "French",
    nativeName: "Français",
    currentLevel: "学習記録を整理中",
    summary: "フランス語圏の旅行・文化体験とつなげて学ぶ言語。",
    goals: ["基礎表現を身につける", "訪問した場所や作品について原語で調べる"],
    learningHistory: [],
    resources: [],
    cultureLinks: [{ label: "フランスの記録", href: "/travel/france", type: "Travel" }],
  },
];

export function getLanguage(slug: string) {
  return languages.find((language) => language.slug === slug);
}
