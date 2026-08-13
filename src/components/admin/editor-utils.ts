import type { I18nText, SchoolBlock, SchoolExerciseContentBlock } from "@/data/schoolTypes";

export type BlockType = SchoolBlock["type"];
export type NestedBlock = SchoolExerciseContentBlock;
export type LocalizedValue = { ja: string; en: string };

export function toLocalized(value: I18nText | undefined): LocalizedValue {
  if (!value) return { ja: "", en: "" };
  if (typeof value === "string") return { ja: value, en: value };
  return { ja: value.ja ?? "", en: value.en ?? "" };
}

export function emptyText(): LocalizedValue {
  return { ja: "", en: "" };
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
