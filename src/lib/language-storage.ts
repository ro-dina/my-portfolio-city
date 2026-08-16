import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { LanguageRecord } from "@/data/languages";
import { hasLocalizedText } from "@/lib/localization";

const localized = z.union([
  z.string(),
  z.object({ ja: z.string().optional(), en: z.string().optional(), de: z.string().optional(), it: z.string().optional(), fr: z.string().optional(), ru: z.string().optional() }),
]);
const link = z.object({ label: localized, href: z.string() });
const cultureLink = link.extend({ type: z.enum(["Travel", "Books", "Films"]) });
const languageSchema = z.object({
  slug: z.string(), name: localized, nativeName: z.string(), currentLevel: localized.optional(), summary: localized.optional(),
  goals: z.array(localized).default([]), learningHistory: z.array(localized).default([]),
  resources: z.array(link).default([]), cultureLinks: z.array(cultureLink).default([]),
}).passthrough();

const DIRECTORY = path.join(process.cwd(), "content", "languages");

export async function getAllLanguages(): Promise<LanguageRecord[]> {
  let files: string[];
  try { files = (await fs.readdir(DIRECTORY)).filter((name) => name.endsWith(".json")).sort(); }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") console.error("[languages] ディレクトリを読み込めません", error);
    return [];
  }
  const records: LanguageRecord[] = [];
  for (const file of files) {
    try {
      const result = languageSchema.safeParse(JSON.parse(await fs.readFile(path.join(DIRECTORY, file), "utf8")));
      if (!result.success) { console.error(`[languages] ✖ ${file}: ${result.error.issues.map((item) => `${item.path.join(".")}: ${item.message}`).join(", ")}`); continue; }
      if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(result.data.slug) || !hasLocalizedText(result.data.name)) { console.error(`[languages] ✖ ${file}: slugまたはnameがありません`); continue; }
      records.push(result.data as LanguageRecord);
    } catch (error) { console.error(`[languages] ✖ ${file}: ${error instanceof Error ? error.message : String(error)}`); }
  }
  return records;
}

export async function getLanguage(slug: string) {
  return (await getAllLanguages()).find((language) => language.slug === slug);
}
