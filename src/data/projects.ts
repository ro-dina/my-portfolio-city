import { projects as sourceProjects, type LocalizedString, type Project as SourceProject } from "@/data/project";

export type ProjectCategory =
  | "Software"
  | "Hardware"
  | "Robotics"
  | "AI"
  | "Web"
  | "Security"
  | "Research";

export type ProjectSection = {
  title: string;
  body: string;
  items?: string[];
};

export type PortfolioProject = SourceProject & {
  categories: ProjectCategory[];
  featured?: boolean;
  updatedAt: string;
  sections?: ProjectSection[];
  aiUsage?: {
    delegated: string;
    designed: string;
    reviewed: string;
    validated: string;
  };
};

const additions: Record<
  string,
  Pick<PortfolioProject, "categories" | "featured" | "sections" | "aiUsage"> &
    Partial<Pick<PortfolioProject, "updatedAt">>
> = {
  "algorithm-visualizer": {
    categories: ["Software", "Web"],
    featured: true,
    sections: [
      {
        title: "Overview",
        body: "Union-Find、Knapsack、最大流などの処理をブラウザ上で可視化し、操作ログと理論ノートを一緒に確認できる学習ツールです。",
      },
      {
        title: "Goal",
        body: "答えだけでなく、アルゴリズムが状態を更新していく過程を追えるようにすることを目標にしています。",
      },
      {
        title: "Technical Decisions",
        body: "UIと可視化状態をTypeScriptで扱い、Canvas / SVGを用途に応じて使える構成にしています。",
      },
      {
        title: "What I Learned",
        body: "アルゴリズムの内部状態をUIへ落とし込むには、計算ロジックと表示ステップを分離する必要があると学びました。",
      },
    ],
  },
  "hotel-3d-viewer": {
    categories: ["Software", "Web"],
    featured: true,
    updatedAt: "2025-12-13",
    sections: [
      {
        title: "Overview",
        body: "Unity WebGLとWebフロントエンドを連携し、ホテル内を移動しながら比較できる3Dビューアです。",
      },
      {
        title: "Architecture",
        body: "Next.js側の予約体験とUnity側の3D空間を分け、それぞれの責務を保ちながら連携します。",
      },
    ],
  },
  "raspberrypi-sensor-hub": {
    categories: ["Hardware", "Research"],
    updatedAt: "2025-12-01",
  },
  "make-portfolio-city": {
    categories: ["Software", "Web"],
    featured: true,
    updatedAt: "2026-08-11",
    sections: [
      {
        title: "Overview",
        body: "制作物だけでなく、技術判断、学習ノート、語学と文化体験をまとめる個人ポートフォリオです。",
      },
      {
        title: "Problem",
        body: "カテゴリを街の施設に見立てた以前のUIでは、初見の訪問者が活動の全体像や代表作へすぐ到達しにくい課題がありました。",
      },
      {
        title: "Technical Decisions",
        body: "Next.js App RouterとTailwind CSSを維持し、表示用コンポーネントとTypeScriptデータを分離。旧URLはリダイレクトで互換性を保っています。",
      },
      {
        title: "Validation",
        body: "lintとproduction buildに加え、キーボードフォーカス、モバイル幅、ライト／ダークテーマを確認します。",
      },
    ],
    aiUsage: {
      delegated: "既存コードの構造調査、UI実装案、定型コンポーネント作成の補助。",
      designed: "残す情報、情報設計、公開するプロフィール内容、プロジェクトとして伝えたい軸は本人が決定。",
      reviewed: "生成された変更を既存データ・URL・型定義と照合し、内容の正確さと保守性を確認。",
      validated: "静的解析とproduction buildを実行し、主要導線とレスポンシブ表示を確認。",
    },
  },
  "vtk-Viewer": {
    categories: ["Software", "Research"],
    featured: true,
    updatedAt: "2025-12-13",
    sections: [
      {
        title: "Overview",
        body: "DICOMなどの医療画像を複数断面から確認するためのデスクトップビューアです。",
      },
      {
        title: "Technical Decisions",
        body: "UIにPySide6、画像の2D / 3D表示にVTKを使用しています。",
      },
      {
        title: "Result",
        body: "視点ごとに表示を切り替えながら医療画像を確認できる試作を作成しました。",
      },
    ],
  },
  "FX-predictor": {
    categories: ["AI", "Research"],
    featured: true,
    updatedAt: "2025-12-26",
  },
  "Disaster-prevention-app": {
    categories: ["Software", "Web"],
    updatedAt: "2025-12-10",
  },
  "Maze-escape-game": {
    categories: ["Software"],
    updatedAt: "2025-12-01",
  },
  "face-surcher": {
    categories: ["AI", "Software"],
    featured: true,
    updatedAt: "2025-12-01",
  },
  "texture-generator": {
    categories: ["Software"],
    updatedAt: "2025-12-01",
  },
  "rename-tool": {
    categories: ["Software"],
    updatedAt: "2025-12-01",
  },
  "auth-system": {
    categories: ["Security", "Web"],
    featured: true,
    updatedAt: "2025-12-01",
  },
  "reversi-game": {
    categories: ["AI", "Software"],
    updatedAt: "2025-12-01",
  },
};

export const projects: PortfolioProject[] = sourceProjects
  .filter((project) => project.visibility !== "hidden")
  .map((project) => {
    const addition = additions[project.slug] ?? { categories: ["Software" as const] };
    return {
      ...project,
      ...addition,
      updatedAt:
        addition.updatedAt ??
        (project.updatedAt instanceof Date
          ? project.updatedAt.toISOString().slice(0, 10)
          : project.updatedAt) ??
        "2025-12-01",
    };
  });

export const projectCategories: ProjectCategory[] = [
  "Software",
  "Hardware",
  "Robotics",
  "AI",
  "Web",
  "Security",
  "Research",
];

export function pickProjectText(value: LocalizedString, locale: "ja" | "en" | "ru" = "ja") {
  if (typeof value === "string") return value;
  return value[locale] ?? value.en ?? value.ja;
}

export function getPortfolioProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
