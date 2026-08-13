"use client";

import { useMemo, useState } from "react";

export default function TagSelector({ value, knownTags, onChange }: { value: string[]; knownTags: string[]; onChange: (tags: string[]) => void }) {
  const [query, setQuery] = useState("");
  const normalizedSelected = useMemo(() => new Set(value.map((tag) => tag.toLocaleLowerCase())), [value]);
  const suggestions = useMemo(() => knownTags.filter((tag) => !normalizedSelected.has(tag.toLocaleLowerCase()) && tag.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())).slice(0, 12), [knownTags, normalizedSelected, query]);
  const add = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const existing = knownTags.find((tag) => tag.toLocaleLowerCase() === trimmed.toLocaleLowerCase());
    const canonical = existing ?? trimmed;
    if (!normalizedSelected.has(canonical.toLocaleLowerCase())) onChange([...value, canonical]);
    setQuery("");
  };
  return (
    <fieldset>
      <legend className="text-sm font-medium text-slate-700 dark:text-slate-200">タグ <span className="text-red-600">*</span></legend>
      <div className="mt-2 flex flex-wrap gap-2">{value.map((tag) => <button key={tag} type="button" onClick={() => onChange(value.filter((item) => item !== tag))} className="border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs hover:border-red-400 hover:text-red-700 dark:border-slate-700 dark:bg-slate-900">{tag} <span aria-hidden>×</span></button>)}</div>
      <div className="relative mt-3 max-w-xl">
        <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); add(query); } }} placeholder="既存タグを検索、または新しいタグを入力" className="w-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        {query ? <div className="absolute z-20 mt-1 w-full border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">{suggestions.map((tag) => <button key={tag} type="button" onClick={() => add(tag)} className="block w-full px-2 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">{tag}</button>)}<button type="button" onClick={() => add(query)} className="block w-full border-t border-slate-200 px-2 py-2 text-left text-sm font-medium text-blue-700 dark:border-slate-700 dark:text-blue-400">「{query.trim()}」を追加</button></div> : null}
      </div>
      <p className="mt-2 text-xs text-slate-500">既存タグと大文字小文字だけが異なる入力は、既存の表記に統一されます。</p>
    </fieldset>
  );
}
