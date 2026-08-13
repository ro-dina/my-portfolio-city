import type { SchoolBlock } from "@/data/schoolTypes";
import LocalizedInput from "@/components/admin/LocalizedInput";

type TextBlock = Extract<SchoolBlock, { type: "lead" | "section" | "paragraph" }>;

export default function ParagraphEditor({ block, onChange }: { block: TextBlock; onChange: (block: TextBlock) => void }) {
  if (block.type === "lead") {
    return <LocalizedInput label="リード文" value={block.text} onChange={(text) => onChange({ ...block, text: text ?? { ja: "", en: "" } })} multiline required />;
  }
  return (
    <div className="space-y-4">
      <LocalizedInput label="見出し" value={block.title} onChange={(title) => {
        if (block.type === "section") onChange({ ...block, title: title ?? { ja: "", en: "" } });
        else onChange({ ...block, title });
      }} required={block.type === "section"} allowEmpty={block.type === "paragraph"} />
      <LocalizedInput label="本文" value={block.body} onChange={(body) => onChange({ ...block, body: body ?? { ja: "", en: "" } })} multiline required rows={7} />
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Anchor
        <input value={block.anchor ?? ""} onChange={(event) => onChange({ ...block, anchor: event.target.value })} className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-950" />
      </label>
    </div>
  );
}
