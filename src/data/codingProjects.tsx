import type { Project } from "@/types/project";
import Section from "@/components/article/Section";
import FeatureList from "@/components/article/FeatureList";
import ProductionBackground from "@/components/article/ProductionBackground";

export const codingProjects: Project[] = [
  {
    slug: "algorithm-visualizer",
    title: "アルゴリズム・ビジュアライザ",
    summary: "ソート／探索を可視化して学べるブラウザアプリ。",
    tags: ["Next.js", "TypeScript", "D3.js"],
    updatedAt: "2025-12-13",
    //hero: {
    //  src: "/images/projects/Union-Find.png",
    //  alt: "アルゴリズム可視化のスクリーンショット",
    //  width: 1200,
    //  height: 630,
    //},
    links: [{ label: "GitHub", href: "https://example.com" }],
    body: () => (
      <>
        <Section title="概要">
          <p>
            バブルソート／マージソート／二分探索などを、配列バーとアニメーションで視覚化。
            学習用に速度変更・一時停止・ステップ実行・履歴戻しを実装。
          </p>
        </Section>
          

        <ProductionBackground title="制作にあたって">
          <p>
            
          </p>
        </ProductionBackground>

        <Section title="技術スタック">
          <FeatureList>
            <li>Next.js App Router</li>
            <li>TypeScript / Zustand</li>
            <li>D3.js（描画）</li>
          </FeatureList>
        </Section>
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
        <Section title="特徴">
          <ol className="list-decimal pl-5 space-y-1">
            <li>ランダム配列を生成</li>
            <li>ドラッグ＆ドロップで並べ替え</li>
            <li>反転数や Kendall tau で採点</li>
          </ol>
        </Section>
      </>
    ),
  },
  {
    slug: "hotel-3d-viewer",
    title: "ホテルビューワー",
    summary: "3Dホテルビューワーです",
    tags: ["Next.js", "TypeScript", "C#", "Unity", "VSCode"],
    updatedAt: "2025-12-13",
    hero: {
      src: "/images/coding/algorithm-visualizer.png",
      alt: "ホテル3",
      width: 1200,
      height: 630,
    },
    links: [{ label: "GitHub", href: "https://example.com" }],
    body: () => (
      <>
        <Section title="概要">
          <p>ホテルを3Dで見ることのできる予約サイトです。</p>
        </Section>

        <Section title="技術スタック">
          <FeatureList>
            <li>Next.js App Router</li>
            <li>TypeScript / Zustand</li>
            <li>D3.js（描画）</li>
          </FeatureList>
        </Section>
      </>
    ),
  },
];