import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getStorageMode, saveArticle, serializeArticleJson, serializeArticleTypeScript } from "@/lib/article-storage";
import { validateArticle } from "@/lib/article-schema";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "不正な送信元です" }, { status: 403 });
  try {
    const body: unknown = await request.json();
    const input = typeof body === "object" && body !== null && "article" in body
      ? (body as { article: unknown }).article
      : body;
    const previousSlug = typeof body === "object" && body !== null && "previousSlug" in body
      ? String((body as { previousSlug?: unknown }).previousSlug ?? "")
      : undefined;
    const validation = validateArticle(input);
    if (!validation.success) return NextResponse.json({ errors: validation.errors }, { status: 422 });

    const exports = {
      json: serializeArticleJson(validation.article),
      typescript: serializeArticleTypeScript(validation.article),
    };
    if (getStorageMode() === "export") {
      return NextResponse.json({ mode: "export", article: validation.article, exports });
    }

    const saved = await saveArticle(validation.article, previousSlug);
    if (!saved.success) return NextResponse.json({ errors: saved.errors }, { status: 422 });
    return NextResponse.json({ mode: "local", article: saved.article, path: saved.path, exports });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "記事を処理できませんでした" }, { status: 500 });
  }
}
