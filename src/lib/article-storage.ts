import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { SchoolArticle } from "@/data/schoolTypes";
import { schoolArticleCards } from "@/data/schoolArticleCards";
import { schoolArticleContents } from "@/data/schoolArticleContents";
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

function getLegacyArticles(): SchoolArticle[] {
  return schoolArticleCards.flatMap((card) => {
    const content = schoolArticleContents.find((item) => item.slug === card.slug);
    return content ? [{ ...card, blocks: content.blocks }] : [];
  });
}

async function readJsonArticles(): Promise<SchoolArticle[]> {
  try {
    const entries = await fs.readdir(ARTICLES_DIRECTORY, { withFileTypes: true });
    const articles = await Promise.all(entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map(async (entry) => {
        const raw = await fs.readFile(path.join(ARTICLES_DIRECTORY, entry.name), "utf8");
        const parsed: unknown = JSON.parse(raw);
        const validation = validateArticle(parsed);
        if (!validation.success) {
          throw new Error(`${entry.name}: ${validation.errors.map((error) => `${error.path} ${error.message}`).join(", ")}`);
        }
        return validation.article;
      }));
    return articles;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function getAllArticles(): Promise<SchoolArticle[]> {
  const merged = new Map(getLegacyArticles().map((article) => [article.slug, article]));
  for (const article of await readJsonArticles()) merged.set(article.slug, article);
  return [...merged.values()];
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

export function serializeArticleTypeScript(article: SchoolArticle) {
  return `export const article = ${JSON.stringify(article, null, 2)} as const;\n`;
}
