import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LanguageDetailClient from "@/components/languages/LanguageDetailClient";
import { getAllLanguages, getLanguage } from "@/lib/language-storage";
import { getLocalizedText } from "@/lib/localization";

export async function generateStaticParams() {
  return (await getAllLanguages()).map((language) => ({ slug: language.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const language = await getLanguage(slug);
  return language ? { title: getLocalizedText(language.name, "ja"), description: getLocalizedText(language.summary, "ja") } : {};
}

export default async function LanguageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const language = await getLanguage(slug);
  if (!language) notFound();

  return <LanguageDetailClient language={language} />;
}
