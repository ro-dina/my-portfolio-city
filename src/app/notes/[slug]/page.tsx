import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchoolArticleClient from "@/app/school/[slug]/SchoolArticleClient";
import { pickText } from "@/data/schoolTypes";
import { getAllArticles, getArticle } from "@/lib/article-storage";

export async function generateStaticParams() {
  return (await getAllArticles()).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return { title: pickText(article.title, "ja"), description: pickText(article.summary, "ja") };
}

export default async function NoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  return <SchoolArticleClient article={article} />;
}
