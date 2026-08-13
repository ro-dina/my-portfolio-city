import type { Metadata } from "next";
import NotesExplorer from "@/components/notes/NotesExplorer";
import { schoolArticleCards } from "@/data/schoolArticleCards";

export const metadata: Metadata = {
  title: "Notes",
  description: "コンピュータサイエンス、データベース、AI、研究過程などの学習ノート。",
};

export default function NotesPage() {
  const notes = [...schoolArticleCards].sort((a, b) => {
    if (!a.updatedAt) return 1;
    if (!b.updatedAt) return -1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="page-shell pb-24">
      <header className="page-intro">
        <p className="eyebrow">Research / Learning</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl dark:text-white">Notes</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
          コンピュータサイエンス、データベース、AI、制作過程のメモ。結果だけでなく、試したことと判断の根拠を検索できる形で蓄積します。
        </p>
      </header>
      <NotesExplorer notes={notes} />
    </div>
  );
}
