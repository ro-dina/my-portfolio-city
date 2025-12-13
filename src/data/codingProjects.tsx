import type { Project } from "@/types/project";

export const codingProjects: Project[] = [
  {
    slug: "algorithm-visualizer",
    title: "アルゴリズム・ビジュアライザ",
    summary: "ソート／探索を可視化して学べるブラウザアプリ。",
    tags: ["Next.js", "TypeScript", "D3.js"],
    updatedAt: "2025-12-13",
    hero: {
      src: "/images/coding/algorithm-visualizer.png",
      alt: "アルゴリズム可視化のスクリーンショット",
      width: 1200,
      height: 630,
    },
    links: [{ label: "GitHub", href: "https://example.com" }],
    body: () => (
      <>
        <h2>概要</h2>
        <p>
          バブルソート／マージソート／二分探索などを、配列バーとアニメーションで視覚化。
          学習用に速度変更・一時停止・ステップ実行・履歴戻しを実装。
        </p>
        <h3>技術スタック</h3>
        <ul>
          <li>Next.js App Router</li>
          <li>TypeScript / Zustand</li>
          <li>D3.js（描画）</li>
        </ul>
      </>
    ),
  },
  {
    slug: "sort-simulator",
    title: "ソート・シミュレータ",
    summary: "配列をドラッグで並べ替え → 正解との距離を採点。",
    tags: ["React", "Tailwind CSS"],
    updatedAt: "2025-12-13",
    hero: {
      src: "/images/coding/sort-simulator.png",
      alt: "ソート・シミュレータのスクリーンショット",
      width: 1200,
      height: 630,
    },
    body: () => (
      <>
        <h2>特徴</h2>
        <ol>
          <li>ランダム配列を生成</li>
          <li>ドラッグ＆ドロップで並べ替え</li>
          <li>反転数や Kendall tau で採点</li>
        </ol>
      </>
    ),
  },
];