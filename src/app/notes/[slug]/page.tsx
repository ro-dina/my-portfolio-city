import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchoolArticleClient from "@/app/school/[slug]/SchoolArticleClient";
import { getSchoolArticleBySlug, schoolArticles } from "@/data/schoolArticles";
import { pickText } from "@/data/schoolTypes";

export function generateStaticParams() {
  return schoolArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getSchoolArticleBySlug(slug);
  if (!article) return {};
  return { title: pickText(article.title, "ja"), description: pickText(article.summary, "ja") };
}

export default async function NoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getSchoolArticleBySlug(slug);
  if (!article) notFound();
  return <SchoolArticleClient article={article} />;
}
