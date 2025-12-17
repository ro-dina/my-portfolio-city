export type Project = {
    slug: string;
    title: string;
    image?: {
        src: string;
        alt: string;
        width: number;
        height: number;
    };
    summary: string;
    tags: string[];
    href?: string;
    status?: "wip" | "done" | "idea";
    visibility?: "public" | "unlisted" | "hidden"; //カードのフラグ
    detailPolicy?: "page" | "redirect" | "disabled"; //内容のフラグ
    redirectTo?: string;
    updatedAt? : string;
    links?: { label: string; href: string }[];
};

export const projects: Project[] = [
    {
        slug: "algorithm-visualizer",
        title: "Algorithm Visualizer",
        image: {
            src: "/images/projects/IMG_4714.jpg",
            alt: "p.title",
            width: 600,
            height: 400,},
        summary:
            "Union-Find / Knapsack / 最大流などをブラウザで可視化。操作ログと理論ノートも併設。",
        tags: ["TypeScript", "Next.js", "Canvas/SVG"],
        status: "wip",
        updatedAt: "2025-12-11",
        visibility: "public",
        detailPolicy: "page",
    },
    {
        slug: "hotel-3d-viewer",
        title: "Hotel 3D Viewer",
        summary:
            "Unity WebGL × Web フロント連携。ホテル内を移動して比較できるビューア。",
        tags: ["Unity", "WebGL", "Next.js"],
        status: "done",
        visibility: "hidden",
        detailPolicy: "page"
    },
    {
        slug: "raspberrypi-sensor-hub",
        title: "Raspberry Pi Sensor Hub",
        summary:
            "温湿度ほか複数センサーをFlask経由で収集・可視化。DBは将来Supabaseへ移行予定。",
        tags: ["Python", "Flask", "DB"],
        status: "idea",
    },
    {
        slug: "make-portfolio-city",
        title: "ポートフォリオを兼ねた記録サイト",
        summary: "自分のやったことなどの記録サイト。(このサイト)",
        tags: ["TypeScript", "Next.js", "React", "Tailwind CSS"]
    },
    {
        slug: "",
        title: "",
        summary: "",
        tags: [],
        status: "done",
        visibility: "public",
        
    }
];
export const getProjectBySlug = (slug: string) =>
    projects.find((p) => p.slug === slug);
