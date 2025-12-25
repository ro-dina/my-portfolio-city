import { notFound } from "next/navigation";
import { schoolArticles } from "@/data/schoolArticles";
import SchoolArticleClient from "./SchoolArticleClient";

export default async function SchoolSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = schoolArticles.find((a) => a.slug === slug);
  if (!article) return notFound();
  return <SchoolArticleClient article={article} />;
}