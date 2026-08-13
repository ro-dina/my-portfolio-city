import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllArticles, getStorageMode } from "@/lib/article-storage";
import { pickText } from "@/data/schoolTypes";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  await requireAdmin();
  const articles = (await getAllArticles()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const mode = getStorageMode();
  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="eyebrow">Content</p><h1 className="mt-2 text-3xl font-semibold dark:text-white">Articles</h1><p className="mt-2 text-sm text-slate-500">{articles.length} articles · {mode === "local" ? "Local Edit Mode" : "Export Mode"}</p></div>
          <Link href="/admin/articles/new" className="primary-link">New article +</Link>
        </div>
        <div className="mt-8 overflow-x-auto border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-900"><tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Tags</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3"><span className="sr-only">Actions</span></th></tr></thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {articles.map((article) => <tr key={article.slug}><td className="px-4 py-4"><p className="font-medium dark:text-white">{pickText(article.title, "ja")}</p><p className="mt-1 font-mono text-xs text-slate-500">{article.slug}</p></td><td className="px-4 py-4 text-slate-600 dark:text-slate-400">{article.category ?? "—"}</td><td className="px-4 py-4 text-xs text-slate-500">{article.tags.join(", ") || "—"}</td><td className="px-4 py-4 text-slate-500">{article.updatedAt || "—"}</td><td className="px-4 py-4 text-right"><Link href={`/admin/articles/${encodeURIComponent(article.slug)}/edit`} className="quiet-link inline-flex">Edit →</Link></td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
