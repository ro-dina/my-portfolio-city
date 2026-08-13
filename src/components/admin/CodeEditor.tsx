type CodeFile = { code: string; lang?: string; filename?: string; tabLabel?: string };
export type EditableCodeBlock = { lang?: string; filename?: string; code?: string; files?: CodeFile[] };

const inputClass = "w-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

export default function CodeEditor<T extends EditableCodeBlock>({ block, onChange }: { block: T; onChange: (block: T) => void }) {
  const files = block.files;
  const setFiles = (next: CodeFile[]) => onChange({ ...block, files: next, code: undefined, lang: undefined, filename: undefined });
  if (files?.length) {
    return (
      <div className="space-y-4">
        {files.map((file, index) => (
          <fieldset key={index} className="border border-slate-200 p-4 dark:border-slate-800">
            <legend className="px-2 text-xs font-semibold text-slate-500">FILE {index + 1}</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="text-xs text-slate-500">タブ名 *<input value={file.tabLabel ?? ""} onChange={(event) => setFiles(files.map((item, i) => i === index ? { ...item, tabLabel: event.target.value } : item))} className={`${inputClass} mt-1`} /></label>
              <label className="text-xs text-slate-500">言語 *<input value={file.lang ?? ""} onChange={(event) => setFiles(files.map((item, i) => i === index ? { ...item, lang: event.target.value } : item))} className={`${inputClass} mt-1`} /></label>
              <label className="text-xs text-slate-500">Filename<input value={file.filename ?? ""} onChange={(event) => setFiles(files.map((item, i) => i === index ? { ...item, filename: event.target.value } : item))} className={`${inputClass} mt-1`} /></label>
            </div>
            <label className="mt-3 block text-xs text-slate-500">Code *<textarea value={file.code} onChange={(event) => setFiles(files.map((item, i) => i === index ? { ...item, code: event.target.value } : item))} rows={10} spellCheck={false} className={`${inputClass} mt-1 font-mono`} /></label>
            <button type="button" disabled={files.length === 1} onClick={() => setFiles(files.filter((_, i) => i !== index))} className="mt-3 text-xs text-red-600 disabled:opacity-40">ファイルを削除</button>
          </fieldset>
        ))}
        <div className="flex flex-wrap gap-3"><button type="button" onClick={() => setFiles([...files, { tabLabel: `File ${files.length + 1}`, lang: "", filename: "", code: "" }])} className="secondary-link">ファイルを追加</button><button type="button" onClick={() => onChange({ ...block, files: undefined, lang: files[0]?.lang, filename: files[0]?.filename, code: files[0]?.code } as T)} className="text-xs text-slate-500">単一ファイルに戻す</button></div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-slate-500">言語 *<input value={block.lang ?? ""} onChange={(event) => onChange({ ...block, lang: event.target.value })} className={`${inputClass} mt-1`} /></label><label className="text-xs text-slate-500">Filename<input value={block.filename ?? ""} onChange={(event) => onChange({ ...block, filename: event.target.value })} className={`${inputClass} mt-1`} /></label></div>
      <label className="block text-xs text-slate-500">Code *<textarea value={block.code ?? ""} onChange={(event) => onChange({ ...block, code: event.target.value })} rows={12} spellCheck={false} className={`${inputClass} mt-1 font-mono`} /></label>
      <button type="button" onClick={() => setFiles([{ tabLabel: block.filename || "File 1", lang: block.lang, filename: block.filename, code: block.code ?? "" }])} className="secondary-link">複数ファイルにする</button>
    </div>
  );
}
