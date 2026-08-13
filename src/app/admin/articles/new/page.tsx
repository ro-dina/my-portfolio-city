import AdminShell from "@/components/admin/AdminShell";
import ArticleEditor from "@/components/admin/ArticleEditor";
import { requireAdmin } from "@/lib/admin-auth";
import { getKnownTags, getStorageMode } from "@/lib/article-storage";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  await requireAdmin();
  const today = new Date().toISOString().slice(0, 10);
  return <AdminShell><ArticleEditor isNew storageMode={getStorageMode()} knownTags={await getKnownTags()} initialArticle={{ slug: "", title: { ja: "", en: "" }, summary: { ja: "", en: "" }, category: "Computer Science", tags: [], updatedAt: today, blocks: [{ type: "paragraph", body: { ja: "", en: "" } }] }} /></AdminShell>;
}
