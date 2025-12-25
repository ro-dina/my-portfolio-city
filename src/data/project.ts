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
    title: { ja: "医療用画像のビューワー", en: "viewer of medi" },
    summary: { ja: "", en: ""},
    tags: ["Python"],
    status: "done",
    visibility: "public",
    detailPolicy: "page",
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
