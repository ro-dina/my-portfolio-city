import { z } from "zod";
import type { SchoolArticle } from "@/data/schoolTypes";

const nonEmpty = z.string().trim().min(1, "入力してください");

export const localizedTextSchema = z.object({
  ja: nonEmpty,
  en: nonEmpty,
  ru: z.string().optional(),
});

const blockTextSchema = z.union([nonEmpty, localizedTextSchema]);
const optionalLocalizedTextSchema = blockTextSchema.optional();
const anchorSchema = z.string().trim().optional();

const listItemSchema = z.union([
  blockTextSchema,
  z.object({
    title: blockTextSchema,
    description: optionalLocalizedTextSchema,
  }),
]);

const codeFileSchema = z.object({
  tabLabel: nonEmpty,
  lang: nonEmpty,
  filename: z.string(),
  code: nonEmpty,
});

const imageFileSchema = z.object({
  src: nonEmpty,
  alt: optionalLocalizedTextSchema,
  caption: optionalLocalizedTextSchema,
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  tabLabel: optionalLocalizedTextSchema,
});

const tableFileSchema = z.object({
  tabLabel: optionalLocalizedTextSchema,
  headers: z.array(blockTextSchema).min(1, "ヘッダーを1列以上追加してください"),
  rows: z.array(z.array(blockTextSchema)).min(1, "行を1行以上追加してください"),
  caption: optionalLocalizedTextSchema,
  showRowNumbers: z.boolean().optional(),
  rowNumberStart: z.number().int().optional(),
  preserveCellWhitespace: z.boolean().optional(),
  monospace: z.boolean().optional(),
});

const leadBlockSchema = z.object({ type: z.literal("lead"), text: blockTextSchema });
const sectionBlockSchema = z.object({
  type: z.literal("section"),
  title: blockTextSchema,
  body: blockTextSchema,
  anchor: anchorSchema,
});
const listBlockSchema = z.object({
  type: z.literal("list"),
  title: blockTextSchema,
  items: z.array(listItemSchema).min(1, "項目を1件以上追加してください"),
  anchor: anchorSchema,
});
const tocBlockSchema = z.object({
  type: z.literal("toc"),
  title: optionalLocalizedTextSchema,
  items: z.array(z.object({ title: blockTextSchema, anchor: anchorSchema })).min(1, "目次項目を1件以上追加してください"),
});
const paragraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  title: optionalLocalizedTextSchema,
  body: blockTextSchema,
  anchor: anchorSchema,
});
const imageBlockBaseSchema = z.object({
  type: z.literal("image"),
  title: optionalLocalizedTextSchema,
  src: z.string().optional(),
  alt: optionalLocalizedTextSchema,
  caption: optionalLocalizedTextSchema,
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  files: z.array(imageFileSchema).optional(),
});
const validateImage = (value: z.infer<typeof imageBlockBaseSchema>, context: z.RefinementCtx) => {
  if (!value.src?.trim() && !value.files?.length) {
    context.addIssue({ code: "custom", message: "画像URLまたは複数画像を追加してください", path: ["src"] });
  }
};
const imageBlockSchema = imageBlockBaseSchema.superRefine(validateImage);
const tableBlockBaseSchema = z.object({
  type: z.literal("table"),
  title: optionalLocalizedTextSchema,
  headers: z.array(blockTextSchema).optional(),
  rows: z.array(z.array(blockTextSchema)).optional(),
  rawText: z.string().optional(),
  caption: optionalLocalizedTextSchema,
  showRowNumbers: z.boolean().optional(),
  rowNumberStart: z.number().int().optional(),
  preserveCellWhitespace: z.boolean().optional(),
  monospace: z.boolean().optional(),
  files: z.array(tableFileSchema).optional(),
});
const validateTable = (value: z.infer<typeof tableBlockBaseSchema>, context: z.RefinementCtx) => {
  if (!value.files?.length && !value.headers?.length) {
    context.addIssue({ code: "custom", message: "ヘッダーを1列以上追加してください", path: ["headers"] });
  }
  if (!value.files?.length && !value.rows?.length && !value.rawText?.trim()) {
    context.addIssue({ code: "custom", message: "表の行を1行以上追加してください", path: ["rows"] });
  }
};
const tableBlockSchema = tableBlockBaseSchema.superRefine(validateTable);
const codeBlockBaseSchema = z.object({
  type: z.literal("code"),
  title: optionalLocalizedTextSchema,
  lang: z.string().optional(),
  filename: z.string().optional(),
  code: z.string().optional(),
  files: z.array(codeFileSchema).optional(),
});
const validateCode = (value: z.infer<typeof codeBlockBaseSchema>, context: z.RefinementCtx) => {
  if (value.files?.length) return;
  if (!value.lang?.trim()) context.addIssue({ code: "custom", message: "言語を入力してください", path: ["lang"] });
  if (!value.code?.trim()) context.addIssue({ code: "custom", message: "コードを入力してください", path: ["code"] });
};
const codeBlockSchema = codeBlockBaseSchema.superRefine(validateCode);

const exerciseInnerBlockSchema = z.union([
  z.object({ type: z.literal("paragraph"), body: blockTextSchema }),
  z.object({ type: z.literal("list"), items: z.array(listItemSchema).min(1) }),
  imageBlockBaseSchema.omit({ title: true }).superRefine(validateImage),
  tableBlockBaseSchema.omit({ title: true }).superRefine(validateTable),
  codeBlockBaseSchema.omit({ title: true }).superRefine(validateCode),
]);

const exerciseBlockSchema = z.object({
  type: z.literal("exercise"),
  title: blockTextSchema,
  anchor: anchorSchema,
  question: blockTextSchema,
  questionBlocks: z.array(exerciseInnerBlockSchema).optional(),
  answer: optionalLocalizedTextSchema,
  answerBlocks: z.array(exerciseInnerBlockSchema).optional(),
  initiallyOpen: z.boolean().optional(),
});

export const articleBlockSchema = z.union([
  leadBlockSchema,
  sectionBlockSchema,
  listBlockSchema,
  tocBlockSchema,
  paragraphBlockSchema,
  imageBlockSchema,
  tableBlockSchema,
  codeBlockSchema,
  exerciseBlockSchema,
]);

export const articleSchema = z.object({
  slug: nonEmpty.regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/, "英数字・ハイフン・アンダースコアのみ使用できます"),
  title: localizedTextSchema,
  summary: localizedTextSchema,
  category: nonEmpty,
  tags: z.array(nonEmpty).min(1, "タグを1件以上選択してください").superRefine((tags, context) => {
    const normalized = new Set<string>();
    tags.forEach((tag, index) => {
      const key = tag.trim().toLocaleLowerCase();
      if (normalized.has(key)) context.addIssue({ code: "custom", message: "同じタグが重複しています", path: [index] });
      normalized.add(key);
    });
  }),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD形式で入力してください"),
  blocks: z.array(articleBlockSchema).min(1, "本文ブロックを1件以上追加してください"),
});

export type ArticleInput = z.input<typeof articleSchema>;
export type ArticleValidationError = { path: string; message: string };

export function validateArticle(input: unknown):
  | { success: true; article: SchoolArticle }
  | { success: false; errors: ArticleValidationError[] } {
  const result = articleSchema.safeParse(input);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
    };
  }
  return { success: true, article: result.data as SchoolArticle };
}
