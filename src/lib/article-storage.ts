import "server-only";

import type { Dirent } from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { SchoolArticle, SchoolArticleDraft } from "@/data/schoolTypes";
import {
  normalizeArticleDraft,
  validateArticleDraft,
  validateArticleForPublish,
  type ParsedArticleDraft,
  type ValidationIssue,
} from "@/lib/article-schema";

const ARTICLES_DIRECTORY = path.join(process.cwd(), "content", "articles");
const BACKUPS_DIRECTORY = path.join(process.cwd(), "content", ".backups", "articles");

export type StorageMode = "local" | "export";
export type ArticleFileEntry = {
  id: string;
  fileName: string;
  draft?: ParsedArticleDraft;
  article?: SchoolArticle;
  publishable: boolean;
  fatal: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
};

export function getStorageMode(): StorageMode {
  const explicitlyDisabled = process.env.CMS_LOCAL_EDIT === "false";
  const explicitlyEnabled = process.env.CMS_LOCAL_EDIT === "true";
  if (explicitlyEnabled && !process.env.VERCEL) return "local";
  if (!explicitlyDisabled && process.env.NODE_ENV === "development" && !process.env.VERCEL) return "local";
  return "export";
}

export async function getArticleEntries(): Promise<ArticleFileEntry[]> {
  let entries: Dirent[];
  try {
    entries = await fs.readdir(ARTICLES_DIRECTORY, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    console.error("[articles] ディレクトリを読み込めません", error);
    return [];
  }

  const results: ArticleFileEntry[] = [];
  for (const entry of entries.filter((item) => item.isFile() && item.name.endsWith(".json")).sort((a, b) => a.name.localeCompare(b.name))) {
    const id = entry.name.slice(0, -5);
    const filePath = path.join(ARTICLES_DIRECTORY, entry.name);
    let parsed: unknown;
    try {
      parsed = JSON.parse(await fs.readFile(filePath, "utf8"));
    } catch (error) {
      const message = `JSONを解析できません: ${error instanceof Error ? error.message : String(error)}`;
      reportDiagnostic(entry.name, message, true);
      results.push({ id, fileName: entry.name, publishable: false, fatal: true, errors: [{ path: "", message, code: "invalid_json" }], warnings: [] });
      continue;
    }

    const draftValidation = validateArticleDraft(parsed);
    if (!draftValidation.success) {
      reportDiagnostic(entry.name, draftValidation.errors.map((item) => `${item.path}: ${item.message}`).join(", "), true);
      results.push({ id, fileName: entry.name, publishable: false, fatal: true, errors: draftValidation.errors, warnings: [] });
      continue;
    }

    const publish = validateArticleForPublish(draftValidation.draft);
    const warnings = [...publish.warnings];
    if (draftValidation.draft.slug && entry.name !== `${draftValidation.draft.slug}.json`) {
      warnings.push({ path: "slug", message: `ファイル名とslugが異なります (${entry.name})`, code: "filename_mismatch" });
    }
    if (publish.errors.length || warnings.length) {
      reportDiagnostic(entry.name, [...publish.errors, ...warnings].map((item) => `${item.path}: ${item.message}`).join(", "), false);
    }
    results.push({ id, fileName: entry.name, draft: draftValidation.draft, article: publish.article, publishable: publish.publishable, fatal: false, errors: publish.errors, warnings });
  }

  const bySlug = new Map<string, ArticleFileEntry[]>();
  for (const entry of results) {
    const slug = entry.draft?.slug?.trim();
    if (slug) bySlug.set(slug, [...(bySlug.get(slug) ?? []), entry]);
  }
  for (const [slug, duplicates] of bySlug) {
    if (duplicates.length < 2) continue;
    for (const entry of duplicates) {
      entry.publishable = false;
      entry.article = undefined;
      entry.errors.push({ path: "slug", message: `slug "${slug}" が重複しています`, code: "duplicate_slug" });
      reportDiagnostic(entry.fileName, `slug "${slug}" が重複しています`, true);
    }
  }
  return results;
}

function reportDiagnostic(fileName: string, message: string, fatal: boolean) {
  const output = `[articles] ${fatal ? "✖" : "⚠"} ${fileName}: ${message}`;
  if (fatal) console.error(output);
  else if (process.env.NODE_ENV !== "production") console.warn(output);
}

export async function getAllArticles(): Promise<SchoolArticle[]> {
  return (await getArticleEntries()).flatMap((entry) => entry.publishable && entry.article ? [entry.article] : []);
}

export async function getArticle(slug: string): Promise<SchoolArticle | undefined> {
  return (await getAllArticles()).find((article) => article.slug === slug);
}

export async function getArticleEntry(idOrSlug: string): Promise<ArticleFileEntry | undefined> {
  return (await getArticleEntries()).find((entry) => entry.id === idOrSlug || entry.draft?.slug === idOrSlug);
}

export async function getKnownTags(): Promise<string[]> {
  const tags = (await getArticleEntries()).flatMap((entry) => entry.draft?.tags ?? []);
  const canonical = new Map<string, string>();
  for (const tag of tags) {
    const key = tag.trim().toLocaleLowerCase();
    if (key && !canonical.has(key)) canonical.set(key, tag.trim());
  }
  return [...canonical.values()].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
}

export async function saveArticleDraft(input: SchoolArticleDraft, previousId?: string) {
  if (getStorageMode() !== "local") throw new Error("この環境はExport Modeです。直接保存できません。");
  const draftValidation = validateArticleDraft(input);
  if (!draftValidation.success) return { success: false as const, errors: draftValidation.errors };

  const publish = validateArticleForPublish(draftValidation.draft);
  const safeSlug = draftValidation.draft.slug?.trim();
  const fallbackId = previousId && isSafeFileStem(previousId) ? previousId : `draft-${Date.now()}`;
  const fileStem = safeSlug && isSafeFileStem(safeSlug) ? safeSlug : fallbackId;
  await fs.mkdir(ARTICLES_DIRECTORY, { recursive: true });
  await fs.mkdir(BACKUPS_DIRECTORY, { recursive: true });
  const target = path.join(ARTICLES_DIRECTORY, `${fileStem}.json`);
  const serialized = serializeArticleJson(draftValidation.draft);

  try {
    const current = await fs.readFile(target, "utf8");
    const stamp = new Date().toISOString().replaceAll(":", "-");
    await fs.writeFile(path.join(BACKUPS_DIRECTORY, `${fileStem}-${stamp}.json`), current, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }

  const temporary = `${target}.${process.pid}.tmp`;
  await fs.writeFile(temporary, serialized, { encoding: "utf8", flag: "wx" });
  await fs.rename(temporary, target);

  if (previousId && previousId !== fileStem && isSafeFileStem(previousId)) {
    const previous = path.join(ARTICLES_DIRECTORY, `${previousId}.json`);
    try { await fs.unlink(previous); } catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
  }

  return { success: true as const, draft: draftValidation.draft, article: publish.article ?? normalizeArticleDraft(draftValidation.draft), validation: publish, path: target, fileName: `${fileStem}.json` };
}

function isSafeFileStem(value: string) { return /^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(value); }

export function serializeArticleJson(article: SchoolArticleDraft | ParsedArticleDraft) {
  return `${JSON.stringify(article, null, 2)}\n`;
}
