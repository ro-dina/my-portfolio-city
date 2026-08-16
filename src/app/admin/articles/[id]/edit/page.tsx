import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ArticleEditor from "@/components/admin/ArticleEditor";
import { requireAdmin } from "@/lib/admin-auth";
import { normalizeArticleDraft } from "@/lib/article-schema";
import { getArticleEntry, getKnownTags, getStorageMode } from "@/lib/article-storage";

export const dynamic = "force-dynamic";

function normalizeDate(value: string) {
  const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  return match ? `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}` : value;
}

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const entry = await getArticleEntry(decodeURIComponent(id));
  if (!entry?.draft) notFound();
  const article = normalizeArticleDraft(entry.draft);
  return <AdminShell><ArticleEditor isNew={false} sourceId={entry.id} storageMode={getStorageMode()} knownTags={await getKnownTags()} initialArticle={{ ...article, category: article.category ?? "", updatedAt: normalizeDate(article.updatedAt) }} /></AdminShell>;
}
