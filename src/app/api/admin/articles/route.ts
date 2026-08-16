import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getStorageMode, saveArticleDraft, serializeArticleJson } from "@/lib/article-storage";
import { normalizeArticleDraft, validateArticleDraft, validateArticleForPublish } from "@/lib/article-schema";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "不正な送信元です" }, { status: 403 });
  try {
    const body: unknown = await request.json();
    const input = typeof body === "object" && body !== null && "article" in body
      ? (body as { article: unknown }).article
      : body;
    const previousId = typeof body === "object" && body !== null && "previousId" in body
      ? String((body as { previousId?: unknown }).previousId ?? "")
      : undefined;
    const draftValidation = validateArticleDraft(input);
    if (!draftValidation.success) return NextResponse.json({ errors: draftValidation.errors }, { status: 422 });
    const validation = validateArticleForPublish(draftValidation.draft);
    const fileStem = safeFileStem(draftValidation.draft.slug) || safeFileStem(previousId) || "article-draft";

    const exports = {
      json: serializeArticleJson(draftValidation.draft),
      filename: `${fileStem}.json`,
    };
    if (getStorageMode() === "export") {
      return NextResponse.json({ mode: "export", article: normalizeArticleDraft(draftValidation.draft), validation, exports });
    }

    const saved = await saveArticleDraft(draftValidation.draft, previousId);
    if (!saved.success) return NextResponse.json({ errors: saved.errors }, { status: 422 });
    return NextResponse.json({ mode: "local", article: saved.article, path: saved.path, fileName: saved.fileName, validation: saved.validation, exports: { json: serializeArticleJson(saved.draft), filename: saved.fileName } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "記事を処理できませんでした" }, { status: 500 });
  }
}

function safeFileStem(value: unknown) {
  return typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(value.trim()) ? value.trim() : "";
}
