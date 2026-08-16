import { z } from "zod";
import type { SchoolArticle, SchoolArticleDraft, SchoolBlock, SchoolExerciseContentBlock } from "@/data/schoolTypes";
import { compactLocalizedText, hasLocalizedText, hasTranslation, type LocalizedText } from "@/lib/localization";

const localizedTextDraftSchema = z.union([
  z.string(),
  z.object({
    ja: z.string().optional(),
    en: z.string().optional(),
    de: z.string().optional(),
    it: z.string().optional(),
    fr: z.string().optional(),
    ru: z.string().optional(),
  }),
]);

const listItemDraftSchema = z.union([
  localizedTextDraftSchema,
  z.object({ title: localizedTextDraftSchema.optional(), description: localizedTextDraftSchema.optional() }).passthrough(),
]);

const codeFileDraftSchema = z.object({
  tabLabel: z.string().optional(), lang: z.string().optional(), filename: z.string().optional(), code: z.string().optional(),
}).passthrough();

const imageFileDraftSchema = z.object({
  src: z.string().optional(), alt: localizedTextDraftSchema.optional(), caption: localizedTextDraftSchema.optional(),
  width: z.number().optional(), height: z.number().optional(), tabLabel: localizedTextDraftSchema.optional(),
}).passthrough();

const tableFileDraftSchema = z.object({
  headers: z.array(localizedTextDraftSchema).optional(), rows: z.array(z.array(localizedTextDraftSchema)).optional(),
  rawText: z.string().optional(), caption: localizedTextDraftSchema.optional(), tabLabel: localizedTextDraftSchema.optional(),
  showRowNumbers: z.boolean().optional(), rowNumberStart: z.number().optional(),
  preserveCellWhitespace: z.boolean().optional(), monospace: z.boolean().optional(),
}).passthrough();

const commonBlockFields = {
  title: localizedTextDraftSchema.optional(),
  anchor: z.string().optional(),
};

const leadDraftSchema = z.object({ type: z.literal("lead"), text: localizedTextDraftSchema.optional() }).passthrough();
const sectionDraftSchema = z.object({ type: z.literal("section"), ...commonBlockFields, body: localizedTextDraftSchema.optional() }).passthrough();
const listDraftSchema = z.object({ type: z.literal("list"), ...commonBlockFields, items: z.array(listItemDraftSchema).optional() }).passthrough();
const tocDraftSchema = z.object({
  type: z.literal("toc"), title: localizedTextDraftSchema.optional(),
  items: z.array(z.object({ title: localizedTextDraftSchema.optional(), anchor: z.string().optional() }).passthrough()).optional(),
}).passthrough();
const paragraphDraftSchema = z.object({ type: z.literal("paragraph"), ...commonBlockFields, body: localizedTextDraftSchema.optional() }).passthrough();
const imageDraftSchema = z.object({
  type: z.literal("image"), ...commonBlockFields, src: z.string().optional(), alt: localizedTextDraftSchema.optional(),
  caption: localizedTextDraftSchema.optional(), width: z.number().optional(), height: z.number().optional(),
  files: z.array(imageFileDraftSchema).optional(),
}).passthrough();
const tableDraftSchema = z.object({
  type: z.literal("table"), ...commonBlockFields, headers: z.array(localizedTextDraftSchema).optional(),
  rows: z.array(z.array(localizedTextDraftSchema)).optional(), rawText: z.string().optional(),
  caption: localizedTextDraftSchema.optional(), showRowNumbers: z.boolean().optional(), rowNumberStart: z.number().optional(),
  preserveCellWhitespace: z.boolean().optional(), monospace: z.boolean().optional(), files: z.array(tableFileDraftSchema).optional(),
}).passthrough();
const codeDraftSchema = z.object({
  type: z.literal("code"), ...commonBlockFields, lang: z.string().optional(), filename: z.string().optional(),
  code: z.string().optional(), files: z.array(codeFileDraftSchema).optional(),
}).passthrough();

const exerciseInnerDraftSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("paragraph"), body: localizedTextDraftSchema.optional() }).passthrough(),
  z.object({ type: z.literal("list"), items: z.array(listItemDraftSchema).optional() }).passthrough(),
  imageDraftSchema.omit({ title: true, anchor: true }),
  tableDraftSchema.omit({ title: true, anchor: true }),
  codeDraftSchema.omit({ title: true, anchor: true }),
]);
const exerciseDraftSchema = z.object({
  type: z.literal("exercise"), ...commonBlockFields, question: localizedTextDraftSchema.optional(),
  questionBlocks: z.array(exerciseInnerDraftSchema).optional(), answer: localizedTextDraftSchema.optional(),
  answerBlocks: z.array(exerciseInnerDraftSchema).optional(), initiallyOpen: z.boolean().optional(),
}).passthrough();

export const draftArticleBlockSchema = z.discriminatedUnion("type", [
  leadDraftSchema, sectionDraftSchema, listDraftSchema, tocDraftSchema, paragraphDraftSchema,
  imageDraftSchema, tableDraftSchema, codeDraftSchema, exerciseDraftSchema,
]);

export const articleDraftSchema = z.object({
  slug: z.string().optional(),
  title: localizedTextDraftSchema.optional(),
  summary: localizedTextDraftSchema.optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  updatedAt: z.string().optional(),
  blocks: z.array(draftArticleBlockSchema).optional(),
}).passthrough();

export type ParsedArticleDraft = z.infer<typeof articleDraftSchema>;
export type ValidationIssue = { path: string; message: string; code: string };
export type PublishValidation = {
  publishable: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  article?: SchoolArticle;
};

function issue(path: string, message: string, code: string): ValidationIssue {
  return { path, message, code };
}

export function validateArticleDraft(input: unknown) {
  const result = articleDraftSchema.safeParse(input);
  if (result.success) return { success: true as const, draft: result.data };
  return {
    success: false as const,
    errors: result.error.issues.map((item) => issue(item.path.join("."), item.message, "invalid_structure")),
  };
}

export function validateArticleForPublish(input: unknown): PublishValidation {
  const draftResult = validateArticleDraft(input);
  if (!draftResult.success) return { publishable: false, errors: draftResult.errors, warnings: [] };
  const draft = draftResult.draft;
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const slug = draft.slug?.trim() ?? "";

  if (!slug) errors.push(issue("slug", "slugがありません", "missing_slug"));
  else if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(slug)) warnings.push(issue("slug", "既存URLとの互換性のため公開しますが、英数字・ハイフン・アンダースコアへの変更を推奨します", "legacy_slug"));
  if (!hasLocalizedText(draft.title)) errors.push(issue("title", "タイトルが少なくとも1言語必要です", "missing_title"));
  if (!draft.blocks?.length) errors.push(issue("blocks", "本文blockが1つ以上必要です", "missing_blocks"));

  if (hasLocalizedText(draft.title) && !hasTranslation(draft.title, "ja")) warnings.push(issue("title.ja", "日本語タイトルがありません。fallback表示されます", "missing_translation"));
  if (hasLocalizedText(draft.title) && !hasTranslation(draft.title, "en")) warnings.push(issue("title.en", "英語タイトルがありません。fallback表示されます", "missing_translation"));
  if (!hasLocalizedText(draft.summary)) warnings.push(issue("summary", "概要がありません", "missing_summary"));
  if (!draft.tags?.some((tag) => tag.trim())) warnings.push(issue("tags", "タグがありません", "missing_tags"));
  if (!draft.category?.trim()) warnings.push(issue("category", "カテゴリがありません", "missing_category"));
  if (!draft.updatedAt?.trim()) warnings.push(issue("updatedAt", "更新日がありません", "missing_updated_at"));
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.updatedAt)) warnings.push(issue("updatedAt", "更新日はYYYY-MM-DD形式を推奨します", "invalid_date_format"));

  collectBlockWarnings(draft.blocks ?? [], warnings);
  return {
    publishable: errors.length === 0,
    errors,
    warnings,
    article: errors.length === 0 ? normalizeArticleDraft(draft) : undefined,
  };
}

function collectBlockWarnings(blocks: ParsedArticleDraft["blocks"], warnings: ValidationIssue[], prefix = "blocks") {
  blocks?.forEach((block, index) => {
    const base = `${prefix}.${index}`;
    for (const key of ["text", "title", "body", "question", "answer", "caption"] as const) {
      const value = block[key as keyof typeof block] as LocalizedText | undefined;
      if (value && hasLocalizedText(value) && !hasTranslation(value, "en")) {
        warnings.push(issue(`${base}.${key}.en`, "英語翻訳がありません。fallback表示されます", "missing_translation"));
      }
    }
    if ((block.type === "paragraph" || block.type === "section") && !hasLocalizedText(block.body)) {
      warnings.push(issue(`${base}.body`, "本文が空です", "empty_block_body"));
    }
    if (block.type === "lead" && !hasLocalizedText(block.text)) warnings.push(issue(`${base}.text`, "リード文が空です", "empty_block_body"));
    if (block.type === "section" && !hasLocalizedText(block.title)) warnings.push(issue(`${base}.title`, "見出しが空です", "empty_block_title"));
    if (block.type === "list") {
      if (!hasLocalizedText(block.title)) warnings.push(issue(`${base}.title`, "見出しが空です", "empty_block_title"));
      if (!block.items?.length) warnings.push(issue(`${base}.items`, "リスト項目がありません", "empty_block_items"));
    }
    if (block.type === "toc" && !block.items?.length) warnings.push(issue(`${base}.items`, "目次項目がありません", "empty_block_items"));
    if (block.type === "image" && !block.src?.trim() && !block.files?.some((file) => file.src?.trim())) warnings.push(issue(`${base}.src`, "画像URLがありません", "empty_image"));
    if (block.type === "table" && !block.rawText?.trim() && !block.headers?.length && !block.files?.length) warnings.push(issue(`${base}.headers`, "表データがありません", "empty_table"));
    if (block.type === "code") {
      if (!block.code?.trim() && !block.files?.length) warnings.push(issue(`${base}.code`, "コードがありません", "empty_code"));
      if (!block.lang?.trim() && !block.files?.length) warnings.push(issue(`${base}.lang`, "コード言語がありません", "missing_code_language"));
    }
    if (block.type === "exercise") {
      if (!hasLocalizedText(block.title)) warnings.push(issue(`${base}.title`, "見出しが空です", "empty_block_title"));
      if (!hasLocalizedText(block.question) && !block.questionBlocks?.length) warnings.push(issue(`${base}.question`, "問題文が空です", "empty_question"));
      collectBlockWarnings(block.questionBlocks as ParsedArticleDraft["blocks"], warnings, `${base}.questionBlocks`);
      collectBlockWarnings(block.answerBlocks as ParsedArticleDraft["blocks"], warnings, `${base}.answerBlocks`);
    }
  });
}

export function normalizeArticleDraft(draft: SchoolArticleDraft | ParsedArticleDraft): SchoolArticle {
  return {
    slug: draft.slug?.trim() ?? "",
    title: compactLocalizedText(draft.title) ?? {},
    summary: compactLocalizedText(draft.summary) ?? {},
    category: draft.category?.trim() || undefined,
    tags: (draft.tags ?? []).map((tag) => tag.trim()).filter(Boolean),
    updatedAt: draft.updatedAt?.trim() ?? "",
    blocks: (draft.blocks ?? []).map((block) => normalizeBlock(block as Record<string, unknown>)),
  };
}

function normalizeBlock(raw: Record<string, unknown>): SchoolBlock {
  const type = raw.type as SchoolBlock["type"];
  const localized = (key: string) => compactLocalizedText(raw[key] as LocalizedText | undefined) ?? {};
  if (type === "lead") return { type, text: localized("text") };
  if (type === "section") return { type, title: localized("title"), body: localized("body"), anchor: stringValue(raw.anchor) };
  if (type === "paragraph") return { type, title: optionalLocalized(raw.title), body: localized("body"), anchor: stringValue(raw.anchor) };
  if (type === "list") return { type, title: localized("title"), items: Array.isArray(raw.items) ? raw.items as never[] : [], anchor: stringValue(raw.anchor) };
  if (type === "toc") return { type, title: optionalLocalized(raw.title), items: Array.isArray(raw.items) ? raw.items as never[] : [] };
  if (type === "image") {
    const files = Array.isArray(raw.files) ? raw.files : undefined;
    return ({ type, title: optionalLocalized(raw.title), src: stringValue(raw.src) ?? "", alt: optionalLocalized(raw.alt), caption: optionalLocalized(raw.caption), width: numberValue(raw.width), height: numberValue(raw.height), files } as unknown) as SchoolBlock;
  }
  if (type === "table") {
    return ({ type, title: optionalLocalized(raw.title), headers: arrayValue(raw.headers), rows: arrayValue(raw.rows), rawText: stringValue(raw.rawText), caption: optionalLocalized(raw.caption), showRowNumbers: booleanValue(raw.showRowNumbers), rowNumberStart: numberValue(raw.rowNumberStart), preserveCellWhitespace: booleanValue(raw.preserveCellWhitespace), monospace: booleanValue(raw.monospace), files: arrayValue(raw.files) } as unknown) as SchoolBlock;
  }
  if (type === "code") {
    return ({ type, title: optionalLocalized(raw.title), lang: stringValue(raw.lang), filename: stringValue(raw.filename), code: stringValue(raw.code) ?? "", files: arrayValue(raw.files) } as unknown) as SchoolBlock;
  }
  return ({ type: "exercise", title: localized("title"), anchor: stringValue(raw.anchor), question: localized("question"), questionBlocks: normalizeInnerBlocks(raw.questionBlocks), answer: optionalLocalized(raw.answer), answerBlocks: normalizeInnerBlocks(raw.answerBlocks), initiallyOpen: booleanValue(raw.initiallyOpen) } as unknown) as SchoolBlock;
}

function normalizeInnerBlocks(value: unknown): SchoolExerciseContentBlock[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.map((block) => normalizeBlock(block as Record<string, unknown>) as unknown as SchoolExerciseContentBlock);
}

function optionalLocalized(value: unknown) { return compactLocalizedText(value as LocalizedText | undefined); }
function stringValue(value: unknown) { return typeof value === "string" ? value : undefined; }
function numberValue(value: unknown) { return typeof value === "number" ? value : undefined; }
function booleanValue(value: unknown) { return typeof value === "boolean" ? value : undefined; }
function arrayValue(value: unknown) { return Array.isArray(value) ? value : undefined; }

// Backward-compatible name for callers that only need publish status.
export const validateArticle = validateArticleForPublish;
