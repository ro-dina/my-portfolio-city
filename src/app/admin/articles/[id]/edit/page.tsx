import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ArticleEditor from "@/components/admin/ArticleEditor";
import { toLocalized } from "@/components/admin/editor-utils";
import { requireAdmin } from "@/lib/admin-auth";
import { getArticle, getKnownTags, getStorageMode } from "@/lib/article-storage";

export const dynamic = "force-dynamic";

function normalizeDate(value: string) {
  const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  return match ? `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}` : value;
}

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const article = await getArticle(decodeURIComponent(id));
  if (!article) notFound();
  return <AdminShell><ArticleEditor isNew={false} storageMode={getStorageMode()} knownTags={await getKnownTags()} initialArticle={{ ...article, title: toLocalized(article.title), summary: toLocalized(article.summary), category: article.category ?? article.tags[0] ?? "Computer Science", updatedAt: normalizeDate(article.updatedAt) }} /></AdminShell>;
}
