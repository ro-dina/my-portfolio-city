import type { I18nText } from "@/data/schoolTypes";
import { toLocalized } from "@/components/admin/editor-utils";

export default function LocalizedInput({
  label,
  value,
  onChange,
  multiline = false,
  required = false,
  allowEmpty = false,
  rows = 4,
}: {
  label: string;
  value?: I18nText;
  onChange: (value: I18nText | undefined) => void;
  multiline?: boolean;
  required?: boolean;
  allowEmpty?: boolean;
  rows?: number;
}) {
  const localized = toLocalized(value);
  const update = (locale: "ja" | "en", next: string) => {
    const result = { ...localized, [locale]: next };
    onChange(allowEmpty && !result.ja && !result.en ? undefined : result);
  };
  const Element = multiline ? "textarea" : "input";
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}{required ? <span className="ml-1 text-red-600">*</span> : null}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {(["ja", "en"] as const).map((locale) => (
          <label key={locale} className="block">
            <span className="mb-1 block font-mono text-[11px] uppercase text-slate-500">{locale}</span>
            <Element
              value={localized[locale]}
              onChange={(event) => update(locale, event.target.value)}
              rows={multiline ? rows : undefined}
              className="w-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}
