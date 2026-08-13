import type { I18nText, SchoolBlock, SchoolExerciseContentBlock, SchoolListItem } from "@/data/schoolTypes";
import CodeEditor from "@/components/admin/CodeEditor";
import ImageEditor from "@/components/admin/ImageEditor";
import LocalizedInput from "@/components/admin/LocalizedInput";
import ParagraphEditor from "@/components/admin/ParagraphEditor";
import TableEditor from "@/components/admin/TableEditor";
import { cloneValue, createNestedBlock, emptyText } from "@/components/admin/editor-utils";

export const blockLabels: Record<SchoolBlock["type"], string> = {
  lead: "Lead",
  section: "Section",
  list: "List",
  toc: "Table of contents",
  paragraph: "Paragraph",
  image: "Image / Gallery",
  table: "Table",
  code: "Code",
  exercise: "Exercise",
};

export default function BlockEditor({ block, index, total, onChange, onMove, onDuplicate, onDelete }: {
  block: SchoolBlock;
  index: number;
  total: number;
  onChange: (block: SchoolBlock) => void;
  onMove: (direction: -1 | 1) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  return (
    <section className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3"><span className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span><h3 className="text-sm font-semibold dark:text-white">{blockLabels[block.type]}</h3><code className="text-[11px] text-slate-500">{block.type}</code></div>
        <div className="flex items-center gap-1 text-xs"><button type="button" disabled={index === 0} onClick={() => onMove(-1)} className="px-2 py-1 hover:bg-slate-200 disabled:opacity-30 dark:hover:bg-slate-800" aria-label="上へ移動">↑</button><button type="button" disabled={index === total - 1} onClick={() => onMove(1)} className="px-2 py-1 hover:bg-slate-200 disabled:opacity-30 dark:hover:bg-slate-800" aria-label="下へ移動">↓</button><button type="button" onClick={onDuplicate} className="px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-800">複製</button><button type="button" onClick={onDelete} className="px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">削除</button></div>
      </header>
      <div className="p-4 sm:p-5"><BlockFields block={block} onChange={onChange} /></div>
    </section>
  );
}

function OptionalTitle({ block, onChange }: { block: Extract<SchoolBlock, { type: "image" | "table" | "code" }>; onChange: (block: SchoolBlock) => void }) {
  return <LocalizedInput label="見出し" value={block.title} onChange={(title) => onChange({ ...block, title })} allowEmpty />;
}

function BlockFields({ block, onChange }: { block: SchoolBlock; onChange: (block: SchoolBlock) => void }) {
  if (block.type === "lead" || block.type === "section" || block.type === "paragraph") return <ParagraphEditor block={block} onChange={onChange} />;
  if (block.type === "code") return <div className="space-y-4"><OptionalTitle block={block} onChange={onChange} /><CodeEditor block={block} onChange={onChange} /></div>;
  if (block.type === "table") return <div className="space-y-4"><OptionalTitle block={block} onChange={onChange} /><TableEditor block={block} onChange={onChange} /></div>;
  if (block.type === "image") return <div className="space-y-4"><OptionalTitle block={block} onChange={onChange} /><ImageEditor block={block} onChange={onChange} /></div>;
  if (block.type === "list") return <ListEditor block={block} onChange={onChange} />;
  if (block.type === "toc") return <TocEditor block={block} onChange={onChange} />;
  return <ExerciseEditor block={block} onChange={onChange} />;
}

function ListEditor({ block, onChange }: { block: Extract<SchoolBlock, { type: "list" }>; onChange: (block: SchoolBlock) => void }) {
  const updateItem = (index: number, next: SchoolListItem) => onChange({ ...block, items: block.items.map((item, i) => i === index ? next : item) });
  return <div className="space-y-4"><LocalizedInput label="見出し" value={block.title} onChange={(title) => onChange({ ...block, title: title ?? emptyText() })} required />{block.items.map((item, index) => { const detailed = typeof item === "object" && item !== null && "title" in item; return <fieldset key={index} className="space-y-3 border-l-2 border-slate-200 pl-4 dark:border-slate-800"><legend className="text-xs text-slate-500">ITEM {index + 1}</legend><LocalizedInput label="項目" value={detailed ? item.title : item as I18nText} onChange={(value) => updateItem(index, detailed ? { ...item, title: value ?? emptyText() } : value ?? emptyText())} required />{detailed ? <LocalizedInput label="説明" value={item.description} onChange={(description) => updateItem(index, { ...item, description })} multiline allowEmpty /> : <button type="button" onClick={() => updateItem(index, { title: item as I18nText, description: emptyText() })} className="text-xs text-slate-500">説明を追加</button>}<button type="button" disabled={block.items.length === 1} onClick={() => onChange({ ...block, items: block.items.filter((_, i) => i !== index) })} className="text-xs text-red-600 disabled:opacity-30">項目を削除</button></fieldset>; })}<button type="button" onClick={() => onChange({ ...block, items: [...block.items, emptyText()] })} className="secondary-link">項目を追加</button></div>;
}

function TocEditor({ block, onChange }: { block: Extract<SchoolBlock, { type: "toc" }>; onChange: (block: SchoolBlock) => void }) {
  return <div className="space-y-4"><LocalizedInput label="見出し" value={block.title} onChange={(title) => onChange({ ...block, title })} allowEmpty />{block.items.map((item, index) => <div key={index} className="grid gap-3 border-l-2 border-slate-200 pl-4 sm:grid-cols-[1fr_14rem_auto] dark:border-slate-800"><LocalizedInput label={`項目 ${index + 1}`} value={item.title} onChange={(title) => onChange({ ...block, items: block.items.map((current, i) => i === index ? { ...current, title: title ?? emptyText() } : current) })} required /><label className="text-sm">Anchor<input value={item.anchor ?? ""} onChange={(event) => onChange({ ...block, items: block.items.map((current, i) => i === index ? { ...current, anchor: event.target.value } : current) })} className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" /></label><button type="button" disabled={block.items.length === 1} onClick={() => onChange({ ...block, items: block.items.filter((_, i) => i !== index) })} className="self-end px-2 py-2 text-xs text-red-600 disabled:opacity-30">削除</button></div>)}<button type="button" onClick={() => onChange({ ...block, items: [...block.items, { title: emptyText(), anchor: "" }] })} className="secondary-link">目次項目を追加</button></div>;
}

function ExerciseEditor({ block, onChange }: { block: Extract<SchoolBlock, { type: "exercise" }>; onChange: (block: SchoolBlock) => void }) {
  return <div className="space-y-5"><LocalizedInput label="見出し" value={block.title} onChange={(title) => onChange({ ...block, title: title ?? emptyText() })} required /><LocalizedInput label="問題" value={block.question} onChange={(question) => onChange({ ...block, question: question ?? emptyText() })} multiline required /><NestedBlocksEditor label="問題の補助ブロック" blocks={block.questionBlocks ?? []} onChange={(questionBlocks) => onChange({ ...block, questionBlocks })} /><LocalizedInput label="回答" value={block.answer} onChange={(answer) => onChange({ ...block, answer })} multiline allowEmpty /><NestedBlocksEditor label="回答の補助ブロック" blocks={block.answerBlocks ?? []} onChange={(answerBlocks) => onChange({ ...block, answerBlocks })} /><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(block.initiallyOpen)} onChange={(event) => onChange({ ...block, initiallyOpen: event.target.checked })} />最初から回答を開く</label></div>;
}

function NestedBlocksEditor({ label, blocks, onChange }: { label: string; blocks: SchoolExerciseContentBlock[]; onChange: (blocks: SchoolExerciseContentBlock[]) => void }) {
  const add = (type: SchoolExerciseContentBlock["type"]) => onChange([...blocks, createNestedBlock(type)]);
  return <fieldset className="space-y-3 border border-dashed border-slate-300 p-4 dark:border-slate-700"><legend className="px-2 text-xs font-semibold text-slate-500">{label}</legend>{blocks.map((block, index) => <div key={index} className="space-y-3 border border-slate-200 p-3 dark:border-slate-800"><div className="flex items-center justify-between"><code className="text-xs text-slate-500">{block.type}</code><div className="flex gap-2 text-xs"><button type="button" disabled={index === 0} onClick={() => { const next = [...blocks]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; onChange(next); }}>↑</button><button type="button" disabled={index === blocks.length - 1} onClick={() => { const next = [...blocks]; [next[index + 1], next[index]] = [next[index], next[index + 1]]; onChange(next); }}>↓</button><button type="button" onClick={() => onChange([...blocks.slice(0, index + 1), cloneValue(block), ...blocks.slice(index + 1)])}>複製</button><button type="button" onClick={() => onChange(blocks.filter((_, i) => i !== index))} className="text-red-600">削除</button></div></div><NestedBlockFields block={block} onChange={(next) => onChange(blocks.map((current, i) => i === index ? next : current))} /></div>)}<div className="flex flex-wrap gap-2">{(["paragraph", "list", "code", "table", "image"] as const).map((type) => <button key={type} type="button" onClick={() => add(type)} className="border border-slate-300 px-2 py-1 text-xs dark:border-slate-700">+ {type}</button>)}</div></fieldset>;
}

function NestedBlockFields({ block, onChange }: { block: SchoolExerciseContentBlock; onChange: (block: SchoolExerciseContentBlock) => void }) {
  if (block.type === "paragraph") return <LocalizedInput label="本文" value={block.body} onChange={(body) => onChange({ ...block, body: body ?? emptyText() })} multiline required />;
  if (block.type === "code") return <CodeEditor block={block} onChange={onChange} />;
  if (block.type === "table") return <TableEditor block={block} onChange={onChange} />;
  if (block.type === "image") return <ImageEditor block={block} onChange={onChange} />;
  return <div className="space-y-3">{block.items.map((item, index) => <div key={index} className="flex items-end gap-2"><div className="flex-1"><LocalizedInput label={`項目 ${index + 1}`} value={typeof item === "object" && item !== null && "title" in item ? item.title : item as I18nText} onChange={(value) => onChange({ ...block, items: block.items.map((current, i) => i === index ? value ?? emptyText() : current) })} required /></div><button type="button" disabled={block.items.length === 1} onClick={() => onChange({ ...block, items: block.items.filter((_, i) => i !== index) })} className="px-2 py-2 text-xs text-red-600 disabled:opacity-30">削除</button></div>)}<button type="button" onClick={() => onChange({ ...block, items: [...block.items, emptyText()] })} className="secondary-link">項目を追加</button></div>;
}
