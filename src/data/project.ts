export type LocalizedString = string | { ja: string; en?: string; ru?: string };

export type Project = {
  slug: string;
  title: LocalizedString;
  image?: {
    src: string;
    alt: LocalizedString;
    width: number;
    height: number;
  };
  summary: LocalizedString;
  tags: string[];
  href?: string;
  status?: "wip" | "done" | "idea";
  visibility?: "public" | "unlisted" | "hidden"; // カードのフラグ
  detailPolicy?: "page" | "redirect" | "disabled"; // 内容のフラグ
  redirectTo?: string;
  updatedAt?: string | Date;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "algorithm-visualizer",
    title: { ja: "Algorithm Visualizer", en: "Algorithm Visualizer" },
    image: {
      src: "/images/projects/IMG_4714.jpg",
      alt: { ja: "アルゴリズム可視化のスクリーンショット", en: "Algorithm visualizer screenshot" },
      width: 600,
      height: 400,
    },
    summary: {
      ja: "Union-Find / Knapsack / 最大流などをブラウザで可視化。操作ログと理論ノートも併設。",
      en: "Visualize Union-Find / Knapsack / Max Flow in the browser. Includes action logs and theory notes.",
    },
    tags: ["TypeScript", "Next.js", "Canvas/SVG"],
    status: "wip",
    updatedAt: "2025-12-11",
    visibility: "public",
    detailPolicy: "page",
  },
  {
    slug: "hotel-3d-viewer",
    title: { ja: "Hotel 3D Viewer", en: "Hotel 3D Viewer" },
    summary: {
      ja: "Unity WebGL × Web フロント連携。ホテル内を移動して比較できるビューア。",
      en: "Unity WebGL × web frontend integration. A viewer to walk inside hotels and compare them.",
    },
    tags: ["Unity", "WebGL", "Next.js"],
    status: "done",
    visibility: "hidden",
    detailPolicy: "page",
  },
  {
    slug: "raspberrypi-sensor-hub",
    title: { ja: "Raspberry Pi Sensor Hub", en: "Raspberry Pi Sensor Hub" },
    summary: {
      ja: "温湿度ほか複数センサーをFlask経由で収集・可視化。DBは将来Supabaseへ移行予定。",
      en: "Collect and visualize temperature/humidity and more via Flask. Plan to migrate DB to Supabase later.",
    },
    tags: ["Python", "Flask", "DB"],
    status: "idea",
  },
  {
    slug: "make-portfolio-city",
    title: { ja: "ポートフォリオを兼ねた記録サイト", en: "Portfolio + Activity Log Site" },
    summary: { ja: "自分のやったことなどの記録サイト。(このサイト)", en: "A site to record what I do (this site)." },
    tags: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
  },
  {
    slug: "vtk-Viewer",
    title: { ja: "医療用画像のビューワー", en: "viewer of medical images" },
    summary: { ja: "医療用画像を表示するビューワー。", en: "A viewer for medical images." },
    tags: ["Python", "VTK", "3D", "2D"],
    status: "done",
    visibility: "public",
    detailPolicy: "page",
  },
  {
    slug: "FX-predictor",
    title: { ja: "FX予測モデル", en: "FX Prediction Model" },
    summary: { ja: "外為の予測モデル。", en: "Prediction model for foreign exchange." },
    tags: ["Python", "AI", "machine learning"],
    status: "wip",
    visibility: "public",
    detailPolicy: "disabled",
  },
  {
    slug: "Disaster-prevention-app",
    title: { ja: "災害対策アプリ", en: "Disaster Prevention App" },
    summary: { ja: "災害時の避難所情報を提供するアプリ。", en: "An app providing evacuation information during disasters." },
    tags: ["React", "React Native", "Expo Go", "React Navigation", "React Native Maps", "TypeScript"],
    status: "wip",
    visibility: "public",
    detailPolicy: "disabled",
  },
  {
    slug: "Maze-escape-game",
    title: { ja : "迷路脱出ゲーム", en: "Maze Escape Game" },
    summary: { ja: "Pygameを使った迷路脱出ゲーム。", en: "A maze escape game using Pygame." },
    tags: ["Python", "Pygame", "game"],
    status: "done",
    visibility: "public",
    detailPolicy: "disabled",
  },
  {
    slug: "face-surcher",
    title: { ja: "顔検索アプリ", en: "Face Search App" },
    summary: { ja: "OpenCVとPythonで作成した顔検索アプリ。", en: "A face search app created with OpenCV and Python." },
    tags: ["Python", "OpenCV", "AI"],
    status: "done",
    visibility: "public",
    detailPolicy: "disabled",
  },
  {
    slug: "texture-generator",
    title: { ja: "テクスチャ生成ツール", en: "Texture Generator Tool" },
    summary: { ja: "地面や壁などに使えるProceduralテクスチャを生成するツール。", en: "A tool to generate procedural textures for ground and walls." },
    tags: ["Python", "PIL", "image processing"],
    status: "done",
    visibility: "public",
    detailPolicy: "disabled",
  },
  {
    slug: "rename-tool",
    title: { ja: "ファイルの名前を変えるツール", en: "File Rename Tool" },
    summary: { ja: "フィル名をテンプレートのものに変えるツール。", en: "A tool to rename files according to a template." },
    tags: ["Python", "os", "file management"],
    status: "done",
    visibility: "public",
    detailPolicy: "disabled",
  },
  {
    slug: "auth-system",
    title: { ja: "認証システム", en: "Authentication System" },
    summary: { ja: "ユーザー認証を行うシステム。", en: "A system for user authentication." },
    tags: ["React", "Next.js", "TypeScript", "Google"],
    status: "done",
    visibility: "public",
    detailPolicy: "disabled",
  },
  {
    slug: "reversi-game",
    title: { ja: "リバーシゲーム", en: "Reversi Game" },
    summary: { ja: "AIと対戦できるリバーシゲーム。", en: "A reversi game where you can play against AI." },
    tags: ["Python", "AI"],
    status: "done",
    visibility: "public",
    detailPolicy: "disabled",
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
