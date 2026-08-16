import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin-auth";
import { getArticleEntries, getStorageMode } from "@/lib/article-storage";
import { getLocalizedText } from "@/lib/localization";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  await requireAdmin();
  const articles = (await getArticleEntries()).sort((a, b) => (b.draft?.updatedAt ?? "").localeCompare(a.draft?.updatedAt ?? ""));
  const mode = getStorageMode();
  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="eyebrow">Content</p><h1 className="mt-2 text-3xl font-semibold dark:text-white">Articles</h1><p className="mt-2 text-sm text-slate-500">{articles.length} files · {articles.filter((item) => item.publishable).length} publishable · {mode === "local" ? "Local Edit Mode" : "Export Mode"}</p></div>
          <Link href="/admin/articles/new" className="primary-link">New article +</Link>
        </div>
        <div className="mt-8 overflow-x-auto border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-900"><tr><th className="px-4 py-3">Title / file</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Tags</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3"><span className="sr-only">Actions</span></th></tr></thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {articles.map((entry) => <tr key={entry.fileName}><td className="px-4 py-4"><p className="font-medium dark:text-white">{entry.draft ? getLocalizedText(entry.draft.title, "ja") || "Untitled draft" : "Invalid JSON"}</p><p className="mt-1 font-mono text-xs text-slate-500">{entry.fileName}</p>{entry.fatal ? <p className="mt-1 max-w-md text-xs text-red-600">{entry.errors[0]?.message}</p> : null}</td><td className="px-4 py-4"><span className={`border px-2 py-1 text-xs ${entry.publishable ? "border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300" : entry.fatal ? "border-red-300 text-red-700 dark:border-red-800 dark:text-red-300" : "border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300"}`}>{entry.publishable ? "Published" : entry.fatal ? "Invalid" : "Draft"}</span><p className="mt-2 text-[11px] text-slate-500">{entry.errors.length} errors · {entry.warnings.length} warnings</p></td><td className="px-4 py-4 text-xs text-slate-500">{entry.draft?.tags?.join(", ") || "—"}</td><td className="px-4 py-4 text-slate-500">{entry.draft?.updatedAt || "—"}</td><td className="px-4 py-4 text-right">{entry.draft ? <Link href={`/admin/articles/${encodeURIComponent(entry.id)}/edit`} className="quiet-link inline-flex">Edit →</Link> : <span className="text-xs text-slate-400">Fix JSON manually</span>}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
