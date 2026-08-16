"use client";

import { useState } from "react";
import type { I18nText } from "@/data/schoolTypes";
import { toLocalized } from "@/components/admin/editor-utils";
import { CONTENT_LOCALES, localeLabels, type Locale } from "@/lib/localization";

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
  const [activeLocale, setActiveLocale] = useState<Locale>("ja");
  const localized = toLocalized(value);
  const update = (locale: Locale, next: string) => {
    const result = { ...localized, [locale]: next };
    const compact = Object.fromEntries(CONTENT_LOCALES.flatMap((key) => result[key].trim() ? [[key, result[key]]] : []));
    onChange(allowEmpty && Object.keys(compact).length === 0 ? undefined : compact);
  };
  const Element = multiline ? "textarea" : "input";
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}{required ? <span className="ml-1 text-red-600">*</span> : null}</legend>
      <div className="flex flex-wrap border-b border-slate-200 dark:border-slate-800" role="tablist" aria-label={`${label}の言語`}>
        {CONTENT_LOCALES.map((locale) => <button key={locale} type="button" role="tab" aria-selected={activeLocale === locale} onClick={() => setActiveLocale(locale)} className={`relative px-2.5 py-1.5 text-xs ${activeLocale === locale ? "border-b-2 border-blue-600 font-semibold text-blue-700 dark:text-blue-300" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}>{localeLabels[locale]}{localized[locale].trim() ? <span className="ml-1 text-emerald-600" aria-label="入力済み">●</span> : null}</button>)}
      </div>
      <label className="block">
        <span className="sr-only">{localeLabels[activeLocale]}</span>
        <Element value={localized[activeLocale]} onChange={(event) => update(activeLocale, event.target.value)} rows={multiline ? rows : undefined} lang={activeLocale} className="w-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
      </label>
      {required ? <p className="text-[11px] text-slate-500">6言語のうち1つ以上を入力してください。</p> : null}
    </fieldset>
  );
}
