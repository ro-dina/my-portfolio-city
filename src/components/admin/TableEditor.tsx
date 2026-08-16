"use client";

import { useState } from "react";
import type { I18nText, SchoolTableFile } from "@/data/schoolTypes";
import { emptyText, toLocalized } from "@/components/admin/editor-utils";
import LocalizedInput from "@/components/admin/LocalizedInput";
import { CONTENT_LOCALES, localeLabels, type Locale } from "@/lib/localization";

export type EditableTableBlock = {
  headers?: I18nText[];
  rows?: I18nText[][];
  rawText?: string;
  caption?: I18nText;
  showRowNumbers?: boolean;
  rowNumberStart?: number;
  preserveCellWhitespace?: boolean;
  monospace?: boolean;
  files?: SchoolTableFile[];
};

const cellClass = "w-full min-w-32 border border-slate-300 bg-white px-2 py-1.5 text-xs outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

function GridEditor({ value, onChange }: { value: SchoolTableFile; onChange: (value: SchoolTableFile) => void }) {
  const [activeLocale, setActiveLocale] = useState<Locale>("ja");
  const headers = value.headers?.length ? value.headers : [emptyText()];
  const rows = value.rows?.length ? value.rows : [headers.map(() => emptyText())];
  const updateCell = (rowIndex: number, columnIndex: number, locale: Locale, text: string) => {
    const nextRows = rows.map((row) => row.map((cell) => ({ ...toLocalized(cell) })));
    nextRows[rowIndex][columnIndex] = { ...toLocalized(nextRows[rowIndex][columnIndex]), [locale]: text };
    onChange({ ...value, headers, rows: nextRows });
  };
  const updateHeader = (columnIndex: number, locale: Locale, text: string) => {
    const next = headers.map((header) => ({ ...toLocalized(header) }));
    next[columnIndex] = { ...toLocalized(next[columnIndex]), [locale]: text };
    onChange({ ...value, headers: next, rows });
  };
  const addColumn = () => onChange({ ...value, headers: [...headers, emptyText()], rows: rows.map((row) => [...row, emptyText()]) });
  const removeColumn = (index: number) => {
    if (headers.length === 1) return;
    onChange({ ...value, headers: headers.filter((_, i) => i !== index), rows: rows.map((row) => row.filter((_, i) => i !== index)) });
  };
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1" role="tablist" aria-label="表の編集言語">{CONTENT_LOCALES.map((locale) => <button key={locale} type="button" role="tab" aria-selected={activeLocale === locale} onClick={() => setActiveLocale(locale)} className={`border px-2 py-1 text-xs ${activeLocale === locale ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300" : "border-slate-200 text-slate-500 dark:border-slate-800"}`}>{localeLabels[locale]}</button>)}</div>
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800">
        <table className="min-w-full border-collapse"><thead><tr>{headers.map((header, columnIndex) => <th key={columnIndex} className="border-b border-r border-slate-200 bg-slate-50 p-2 align-top dark:border-slate-800 dark:bg-slate-900"><div className="space-y-1"><input aria-label={`列${columnIndex + 1} ${localeLabels[activeLocale]}ヘッダー`} value={toLocalized(header)[activeLocale]} onChange={(event) => updateHeader(columnIndex, activeLocale, event.target.value)} placeholder={`${activeLocale.toUpperCase()} header`} className={cellClass} /><button type="button" disabled={headers.length === 1} onClick={() => removeColumn(columnIndex)} className="text-[11px] font-normal text-red-600 disabled:opacity-30">列を削除</button></div></th>)}</tr></thead>
          <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{headers.map((_, columnIndex) => { const cell = row[columnIndex] ?? emptyText(); return <td key={columnIndex} className="border-b border-r border-slate-200 p-2 align-top dark:border-slate-800"><input aria-label={`${rowIndex + 1}行${columnIndex + 1}列 ${localeLabels[activeLocale]}`} value={toLocalized(cell)[activeLocale]} onChange={(event) => updateCell(rowIndex, columnIndex, activeLocale, event.target.value)} placeholder={activeLocale.toUpperCase()} className={cellClass} /></td>; })}<td className="p-2"><button type="button" disabled={rows.length === 1} onClick={() => onChange({ ...value, headers, rows: rows.filter((_, i) => i !== rowIndex) })} className="whitespace-nowrap text-xs text-red-600 disabled:opacity-30">行を削除</button></td></tr>)}</tbody></table>
      </div>
      <div className="flex flex-wrap gap-2"><button type="button" onClick={() => onChange({ ...value, headers, rows: [...rows, headers.map(() => emptyText())] })} className="secondary-link">行を追加</button><button type="button" onClick={addColumn} className="secondary-link">列を追加</button></div>
    </div>
  );
}

export default function TableEditor<T extends EditableTableBlock>({ block, onChange }: { block: T; onChange: (block: T) => void }) {
  const setFiles = (files: SchoolTableFile[]) => onChange({ ...block, files, headers: undefined, rows: undefined, rawText: undefined, caption: undefined } as T);
  if (block.files?.length) {
    return <div className="space-y-5">{block.files.map((file, index) => <fieldset key={index} className="space-y-4 border border-slate-200 p-4 dark:border-slate-800"><legend className="px-2 text-xs font-semibold text-slate-500">TABLE {index + 1}</legend><LocalizedInput label="タブ名" value={file.tabLabel} onChange={(tabLabel) => setFiles(block.files!.map((item, i) => i === index ? { ...item, tabLabel } : item))} allowEmpty /><GridEditor value={file} onChange={(next) => setFiles(block.files!.map((item, i) => i === index ? next : item))} /><TableOptions value={file} onChange={(next) => setFiles(block.files!.map((item, i) => i === index ? next : item))} /><button type="button" disabled={block.files!.length === 1} onClick={() => setFiles(block.files!.filter((_, i) => i !== index))} className="text-xs text-red-600 disabled:opacity-30">表を削除</button></fieldset>)}<div className="flex flex-wrap gap-3"><button type="button" onClick={() => setFiles([...block.files!, { headers: [emptyText()], rows: [[emptyText()]], showRowNumbers: false, rowNumberStart: 1 }])} className="secondary-link">表を追加</button><button type="button" onClick={() => { const first = block.files![0]; onChange({ ...block, files: undefined, ...first } as T); }} className="text-xs text-slate-500">単一表に戻す</button></div></div>;
  }
  const value: SchoolTableFile = { headers: block.headers, rows: block.rows, rawText: block.rawText, caption: block.caption, showRowNumbers: block.showRowNumbers, rowNumberStart: block.rowNumberStart, preserveCellWhitespace: block.preserveCellWhitespace, monospace: block.monospace };
  const update = (next: SchoolTableFile) => onChange({ ...block, ...next } as T);
  if (block.rawText !== undefined && !block.headers?.length) {
    return <div className="space-y-4"><label className="block text-sm font-medium dark:text-slate-200">Raw text<textarea value={block.rawText} onChange={(event) => onChange({ ...block, rawText: event.target.value } as T)} rows={12} className={`${cellClass} mt-1 font-mono`} /></label><button type="button" onClick={() => onChange({ ...block, rawText: undefined, headers: [emptyText()], rows: [[emptyText()]] } as T)} className="secondary-link">グリッドへ変換</button><TableOptions value={value} onChange={update} /></div>;
  }
  return <div className="space-y-4"><GridEditor value={value} onChange={update} /><TableOptions value={value} onChange={update} /><button type="button" onClick={() => setFiles([{ ...value, tabLabel: { ja: "表 1", en: "Table 1" } }])} className="secondary-link">複数表にする</button></div>;
}

function TableOptions({ value, onChange }: { value: SchoolTableFile; onChange: (value: SchoolTableFile) => void }) {
  return <div className="space-y-4"><LocalizedInput label="キャプション" value={value.caption} onChange={(caption) => onChange({ ...value, caption })} allowEmpty /><div className="flex flex-wrap items-center gap-5 text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(value.showRowNumbers)} onChange={(event) => onChange({ ...value, showRowNumbers: event.target.checked })} />行番号</label><label>開始番号 <input type="number" value={value.rowNumberStart ?? 1} onChange={(event) => onChange({ ...value, rowNumberStart: Number(event.target.value) })} className="ml-2 w-20 border border-slate-300 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-950" /></label><label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(value.monospace)} onChange={(event) => onChange({ ...value, monospace: event.target.checked })} />等幅</label><label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(value.preserveCellWhitespace)} onChange={(event) => onChange({ ...value, preserveCellWhitespace: event.target.checked })} />空白保持</label></div></div>;
}
