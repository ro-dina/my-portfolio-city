"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SchoolArticleClient from "@/app/school/[slug]/SchoolArticleClient";
import BlockEditor, { blockLabels } from "@/components/admin/BlockEditor";
import LocalizedInput from "@/components/admin/LocalizedInput";
import TagSelector from "@/components/admin/TagSelector";
import { cloneValue, createBlock, type BlockType } from "@/components/admin/editor-utils";
import type { SchoolArticle, SchoolBlock } from "@/data/schoolTypes";
import { validateArticleForPublish, type PublishValidation, type ValidationIssue } from "@/lib/article-schema";
import { getLocalizedText } from "@/lib/localization";

type EditorArticle = SchoolArticle & { category: string };
type SaveResult = { mode: "local" | "export"; article: EditorArticle; path?: string; fileName?: string; validation: PublishValidation; exports: { json: string; filename: string } };

export default function ArticleEditor({ initialArticle, knownTags, storageMode, isNew, sourceId }: { initialArticle: EditorArticle; knownTags: string[]; storageMode: "local" | "export"; isNew: boolean; sourceId?: string }) {
  const router = useRouter();
  const [article, setArticle] = useState(initialArticle);
  const [originalId, setOriginalId] = useState(isNew ? "" : sourceId ?? initialArticle.slug);
  const [tab, setTab] = useState<"edit" | "preview" | "export">("edit");
  const [blockType, setBlockType] = useState<BlockType>("paragraph");
  const [requestErrors, setRequestErrors] = useState<ValidationIssue[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [exports, setExports] = useState<SaveResult["exports"] | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const update = (next: EditorArticle) => { setArticle(next); setDirty(true); setMessage(""); };
  const validation = useMemo(() => validateArticleForPublish(article), [article]);

  const updateBlock = (index: number, block: SchoolBlock) => update({ ...article, blocks: article.blocks.map((item, i) => i === index ? block : item) });
  const moveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= article.blocks.length) return;
    const blocks = [...article.blocks];
    [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
    update({ ...article, blocks });
  };
  const save = async () => {
    setSaving(true); setRequestErrors([]); setMessage("");
    try {
      const response = await fetch("/api/admin/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ article, previousId: originalId || undefined }) });
      const body = await response.json();
      if (!response.ok) { setRequestErrors(body.errors ?? [{ path: "", message: body.error ?? "保存に失敗しました", code: "request_failed" }]); setMessage("ファイル構造を処理できませんでした。"); return; }
      const data = body as SaveResult;
      setExports(data.exports); setArticle(data.article);
      if (data.mode === "local") {
        const nextId = (data.fileName ?? data.exports.filename).replace(/\.json$/, "");
        setOriginalId(nextId); setDirty(false);
        setMessage(data.validation.publishable ? `公開可能な下書きを保存しました: ${data.path}` : `下書きを保存しました（公開条件未達）: ${data.path}`);
        router.replace(`/admin/articles/${encodeURIComponent(nextId)}/edit`); router.refresh();
      } else {
        setMessage(data.validation.publishable ? "公開可能なJSONを生成しました。" : "未完成の下書きJSONを生成しました。エラーを修正すると公開対象になります。"); setTab("export");
      }
    } catch (error) { setRequestErrors([{ path: "", message: error instanceof Error ? error.message : "通信に失敗しました", code: "request_failed" }]); }
    finally { setSaving(false); }
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
      <div className="sticky top-16 z-30 -mx-4 border-y border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-[1552px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2" role="tablist">{(["edit", "preview", "export"] as const).map((item) => <button key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => setTab(item)} className={`px-3 py-2 text-sm font-medium capitalize ${tab === item ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"}`}>{item}</button>)}</div>
          <div className="flex items-center gap-3"><span className={`hidden text-xs sm:inline ${validation.publishable ? "text-emerald-600" : "text-red-600"}`}>{validation.publishable ? `Publishable · ${validation.warnings.length} warnings` : `Draft · ${validation.errors.length} errors · ${validation.warnings.length} warnings`}</span><span className="border border-slate-200 px-2 py-1 text-[11px] text-slate-500 dark:border-slate-700">{storageMode === "local" ? "LOCAL EDIT" : "EXPORT"}</span><button type="button" disabled={saving} onClick={save} className="primary-link disabled:opacity-50">{saving ? "Saving…" : storageMode === "local" ? "Save draft" : "Generate JSON"}</button></div>
        </div>
      </div>

      {message ? <p className="mt-5 border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300" role="status">{message}</p> : null}
      {requestErrors.length ? <IssuePanel title="処理エラー" issues={requestErrors} tone="error" /> : null}
      {validation.errors.length ? <IssuePanel title="公開できない項目（下書き保存・Exportは可能）" issues={validation.errors} tone="error" /> : null}
      {validation.warnings.length ? <IssuePanel title="改善を推奨する項目" issues={validation.warnings} tone="warning" /> : null}

      {tab === "edit" ? (
        <div className="mt-6 grid gap-6 xl:grid-cols-[24rem_minmax(0,1fr)]">
          <aside className="h-fit space-y-5 border border-slate-200 bg-white p-5 xl:sticky xl:top-36 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-sm font-semibold dark:text-white">Article settings</h2>
            <label className="block text-sm font-medium">Slug <span className="text-red-600">*</span><span className="mt-1 flex gap-2"><input value={article.slug} onChange={(event) => update({ ...article, slug: event.target.value })} className="min-w-0 flex-1 border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-950" /><button type="button" onClick={() => update({ ...article, slug: generateSlug(getLocalizedText(article.title, "en")) })} className="border border-slate-300 px-2 text-xs dark:border-slate-700">Generate</button></span><span className="mt-1 block text-[11px] font-normal text-slate-500">英数字・-・_（先頭は英数字）</span></label>
            <LocalizedInput label="タイトル" value={article.title} onChange={(title) => update({ ...article, title: title ?? { ja: "", en: "" } })} required />
            <LocalizedInput label="概要（任意）" value={article.summary} onChange={(summary) => update({ ...article, summary: summary ?? {} })} multiline allowEmpty />
            <label className="block text-sm font-medium">更新日（任意）<input type="date" value={article.updatedAt} onChange={(event) => update({ ...article, updatedAt: event.target.value })} className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" /></label>
            <label className="block text-sm font-medium">カテゴリ（任意）<input value={article.category} onChange={(event) => update({ ...article, category: event.target.value })} list="article-categories" className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" /><datalist id="article-categories">{["Computer Science", "Database", "OS", "Network", "Security", "Physics", "Mathematics", "AI", "Languages", "Research"].map((category) => <option key={category} value={category} />)}</datalist></label>
            <TagSelector value={article.tags} knownTags={knownTags} onChange={(tags) => update({ ...article, tags })} />
          </aside>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-semibold dark:text-white">本文ブロック</h2><p className="mt-1 text-xs text-slate-500">{article.blocks.length} blocks · block内の未入力項目はwarningとなり、下書き保存はできます。</p></div><div className="flex gap-2"><label className="sr-only" htmlFor="block-type">ブロックタイプ</label><select id="block-type" value={blockType} onChange={(event) => setBlockType(event.target.value as BlockType)} className="border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">{Object.entries(blockLabels).map(([type, label]) => <option key={type} value={type}>{label}</option>)}</select><button type="button" onClick={() => update({ ...article, blocks: [...article.blocks, createBlock(blockType)] })} className="secondary-link">ブロックを追加 +</button></div></div>
            {article.blocks.map((block, index) => <BlockEditor key={index} block={block} index={index} total={article.blocks.length} onChange={(next) => updateBlock(index, next)} onMove={(direction) => moveBlock(index, direction)} onDuplicate={() => update({ ...article, blocks: [...article.blocks.slice(0, index + 1), cloneValue(block), ...article.blocks.slice(index + 1)] })} onDelete={() => update({ ...article, blocks: article.blocks.filter((_, i) => i !== index) })} />)}
          </div>
        </div>
      ) : null}

      {tab === "preview" ? <div className="mt-6 overflow-hidden border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950">公開ページと同じレンダラーを使用</div><SchoolArticleClient article={article} /></div> : null}
      {tab === "export" ? <ExportPanel article={article} exports={exports} validation={validation} /> : null}
    </div>
  );
}

function ExportPanel({ article, exports, validation }: { article: EditorArticle; exports: SaveResult["exports"] | null; validation: PublishValidation }) {
  const fallback = { json: `${JSON.stringify(article, null, 2)}\n`, filename: `${article.slug || "article-draft"}.json` };
  const data = exports ?? fallback;
  const download = () => { const url = URL.createObjectURL(new Blob([data.json], { type: "application/json;charset=utf-8" })); const anchor = document.createElement("a"); anchor.href = url; anchor.download = data.filename; anchor.click(); URL.revokeObjectURL(url); };
  return <div className="mt-6 space-y-6"><div><h2 className="text-xl font-semibold dark:text-white">Export</h2><p className="mt-1 text-sm text-slate-500"><code>{data.filename}</code> を <code>content/articles/</code> に配置できます。公開条件未達の場合はサイト側で除外されます。</p><p className={`mt-2 text-sm font-medium ${validation.publishable ? "text-emerald-600" : "text-red-600"}`}>Publishable: {validation.publishable ? "Yes" : "No"} · Errors: {validation.errors.length} · Warnings: {validation.warnings.length}</p></div><section className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"><header className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800"><h3 className="font-mono text-sm">{data.filename}</h3><div className="flex gap-3"><button type="button" onClick={() => navigator.clipboard.writeText(data.json)} className="text-xs text-blue-700 dark:text-blue-400">Copy JSON</button><button type="button" onClick={download} className="text-xs text-blue-700 dark:text-blue-400">Download</button></div></header><pre className="max-h-[32rem] overflow-auto p-4 text-xs"><code>{data.json}</code></pre></section></div>;
}

function IssuePanel({ title, issues, tone }: { title: string; issues: ValidationIssue[]; tone: "error" | "warning" }) {
  const classes = tone === "error" ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/20 dark:text-red-300" : "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-300";
  return <div className={`mt-5 border p-4 ${classes}`} role={tone === "error" ? "alert" : "status"}><p className="text-sm font-semibold">{title}</p><ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{issues.map((item, index) => <li key={`${item.path}-${item.code}-${index}`}><code>{humanizePath(item.path)}</code>: {item.message}</li>)}</ul></div>;
}

function generateSlug(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-");
}

function humanizePath(path: string) {
  if (!path) return "article";
  return path.replace(/^blocks\.(\d+)/, (_, index) => `ブロック ${Number(index) + 1}`).replace(/\.(ja|en|de|it|fr|ru)$/, (_, locale) => ` ${locale.toUpperCase()}`);
}
