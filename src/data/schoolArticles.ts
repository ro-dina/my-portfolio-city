// School 記事用：en/ru は任意（無ければ ja にフォールバック）
import type { SchoolArticle } from "@/data/schoolTypes";
import {
  type I18nText,
  type Lang,
  type SchoolArticleCard,
  type SchoolArticleContent,
  type SchoolBlock,
  pickText,
} from "@/data/schoolTypes";
import { schoolArticleCards } from "@/data/schoolArticleCards";
import { schoolArticleContents } from "@/data/schoolArticleContents";

export type { I18nText, Lang, SchoolArticle, SchoolArticleCard, SchoolArticleContent, SchoolBlock };
export { pickText };

export const schoolArticles: SchoolArticle[] = schoolArticleCards
  .map((card) => {
    const content = schoolArticleContents.find((c) => c.slug === card.slug);
    if (!content) return undefined;
    return { ...card, blocks: content.blocks };
  })
  .filter((a): a is SchoolArticle => Boolean(a));

export function getSchoolArticleBySlug(slug: string) {
  const card = schoolArticleCards.find((c) => c.slug === slug);
  const content = schoolArticleContents.find((c) => c.slug === slug);
  if (!card || !content) return undefined;
  return { ...card, blocks: content.blocks };
}
