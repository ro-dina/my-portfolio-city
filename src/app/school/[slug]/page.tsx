import { notFound } from "next/navigation";
import { getSchoolArticleBySlug } from "@/data/schoolArticles";
import SchoolArticleClient from "./SchoolArticleClient";

export default async function SchoolSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getSchoolArticleBySlug(slug);
  if (!article) return notFound();
  return <SchoolArticleClient article={article} />;
}
