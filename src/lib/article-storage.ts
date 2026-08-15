import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { SchoolArticle } from "@/data/schoolTypes";
import { validateArticle } from "@/lib/article-schema";

const ARTICLES_DIRECTORY = path.join(process.cwd(), "content", "articles");
const BACKUPS_DIRECTORY = path.join(process.cwd(), "content", ".backups", "articles");

export type StorageMode = "local" | "export";

export function getStorageMode(): StorageMode {
  const explicitlyDisabled = process.env.CMS_LOCAL_EDIT === "false";
  const explicitlyEnabled = process.env.CMS_LOCAL_EDIT === "true";
  if (explicitlyEnabled && !process.env.VERCEL) return "local";
  if (!explicitlyDisabled && process.env.NODE_ENV === "development" && !process.env.VERCEL) return "local";
  return "export";
}

async function readJsonArticles(): Promise<SchoolArticle[]> {
  try {
    const entries = (await fs.readdir(ARTICLES_DIRECTORY, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .sort((a, b) => a.name.localeCompare(b.name));
    const articles: SchoolArticle[] = [];
    const seenSlugs = new Map<string, string>();
    for (const entry of entries) {
      const filePath = path.join(ARTICLES_DIRECTORY, entry.name);
      let parsed: unknown;
      try {
        parsed = JSON.parse(await fs.readFile(filePath, "utf8"));
      } catch (error) {
        throw new Error(`[articles] ${entry.name}: JSONを解析できません: ${error instanceof Error ? error.message : String(error)}`);
      }
        const validation = validateArticle(parsed);
        if (!validation.success) {
        throw new Error(`[articles] ${entry.name}: Zod検証に失敗しました\n${validation.errors.map((error) => `  - ${error.path || "article"}: ${error.message}`).join("\n")}`);
        }
      const expectedFileName = `${validation.article.slug}.json`;
      if (entry.name !== expectedFileName) {
        throw new Error(`[articles] ${entry.name}: ファイル名はslugと一致させてください。期待値: ${expectedFileName}`);
      }
      const duplicate = seenSlugs.get(validation.article.slug);
      if (duplicate) {
        throw new Error(`[articles] slug "${validation.article.slug}" が重複しています: ${duplicate}, ${entry.name}`);
      }
      seenSlugs.set(validation.article.slug, entry.name);
      articles.push(validation.article);
    }
    return articles;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function getAllArticles(): Promise<SchoolArticle[]> {
  return readJsonArticles();
}

export async function getArticle(slug: string): Promise<SchoolArticle | undefined> {
  return (await getAllArticles()).find((article) => article.slug === slug);
}

export async function getKnownTags(): Promise<string[]> {
  const tags = (await getAllArticles()).flatMap((article) => article.tags);
  const canonical = new Map<string, string>();
  for (const tag of tags) {
    const key = tag.trim().toLocaleLowerCase();
    if (key && !canonical.has(key)) canonical.set(key, tag.trim());
  }
  return [...canonical.values()].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
}

export async function saveArticle(article: SchoolArticle, previousSlug?: string) {
  if (getStorageMode() !== "local") throw new Error("この環境はExport Modeです。直接保存できません。");
  const validation = validateArticle(article);
  if (!validation.success) return validation;

  await fs.mkdir(ARTICLES_DIRECTORY, { recursive: true });
  await fs.mkdir(BACKUPS_DIRECTORY, { recursive: true });
  const target = path.join(ARTICLES_DIRECTORY, `${validation.article.slug}.json`);
  const serialized = `${JSON.stringify(validation.article, null, 2)}\n`;

  try {
    const current = await fs.readFile(target, "utf8");
    const stamp = new Date().toISOString().replaceAll(":", "-");
    await fs.writeFile(path.join(BACKUPS_DIRECTORY, `${validation.article.slug}-${stamp}.json`), current, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }

  const temporary = `${target}.${process.pid}.tmp`;
  await fs.writeFile(temporary, serialized, { encoding: "utf8", flag: "wx" });
  await fs.rename(temporary, target);

  if (previousSlug && !/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(previousSlug)) {
    throw new Error("変更前slugが不正です。");
  }
  if (previousSlug && previousSlug !== validation.article.slug) {
    const previous = path.join(ARTICLES_DIRECTORY, `${previousSlug}.json`);
    try {
      const old = await fs.readFile(previous, "utf8");
      const stamp = new Date().toISOString().replaceAll(":", "-");
      await fs.writeFile(path.join(BACKUPS_DIRECTORY, `${previousSlug}-${stamp}.json`), old, "utf8");
      await fs.unlink(previous);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }

  return { success: true as const, article: validation.article, path: target };
}

export function serializeArticleJson(article: SchoolArticle) {
  return `${JSON.stringify(article, null, 2)}\n`;
}
