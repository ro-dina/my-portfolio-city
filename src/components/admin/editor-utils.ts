import type { I18nText, SchoolBlock, SchoolExerciseContentBlock } from "@/data/schoolTypes";
import { CONTENT_LOCALES, type Locale } from "@/lib/localization";

export type BlockType = SchoolBlock["type"];
export type NestedBlock = SchoolExerciseContentBlock;
export type LocalizedValue = Record<Locale, string>;

export function toLocalized(value: I18nText | undefined): LocalizedValue {
  const empty = Object.fromEntries(CONTENT_LOCALES.map((locale) => [locale, ""])) as LocalizedValue;
  if (!value) return empty;
  if (typeof value === "string") return { ...empty, ja: value };
  return Object.fromEntries(CONTENT_LOCALES.map((locale) => [locale, value[locale] ?? ""])) as LocalizedValue;
}

export function emptyText(): LocalizedValue {
  return toLocalized(undefined);
}

export function createBlock(type: BlockType): SchoolBlock {
  if (type === "lead") return { type, text: emptyText() };
  if (type === "section") return { type, title: emptyText(), body: emptyText() };
  if (type === "list") return { type, title: emptyText(), items: [emptyText()] };
  if (type === "toc") return { type, title: { ja: "目次", en: "Contents" }, items: [{ title: emptyText(), anchor: "" }] };
  if (type === "paragraph") return { type, body: emptyText() };
  if (type === "image") return { type, src: "", alt: emptyText(), caption: emptyText() };
  if (type === "table") return { type, headers: [emptyText()], rows: [[emptyText()]], showRowNumbers: false, rowNumberStart: 1 };
  if (type === "code") return { type, lang: "", filename: "", code: "" };
  return { type: "exercise", title: emptyText(), question: emptyText(), answer: emptyText(), initiallyOpen: false };
}

export function createNestedBlock(type: NestedBlock["type"]): NestedBlock {
  if (type === "paragraph") return { type, body: emptyText() };
  if (type === "list") return { type, items: [emptyText()] };
  if (type === "image") return { type, src: "", alt: emptyText(), caption: emptyText() };
  if (type === "table") return { type, headers: [emptyText()], rows: [[emptyText()]], showRowNumbers: false, rowNumberStart: 1 };
  return { type: "code", lang: "", filename: "", code: "" };
}

export function cloneValue<T>(value: T): T {
  return structuredClone(value);
}
