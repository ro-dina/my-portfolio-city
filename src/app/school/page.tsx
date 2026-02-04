import { schoolArticleCards } from "@/data/schoolArticleCards";
import SchoolIndexClient from "./SchoolIndexClient";

export const metadata = {
  title: "School – My City",
  description: "学習ノート・プロジェクト解説のまとめ",
};

export default function SchoolPage() {
  // Serverで並び替えだけして、描画はClientへ
  const sorted = [...schoolArticleCards].sort(
    (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)
  );

  return <SchoolIndexClient articles={sorted} />;
}
