export const CONTENT_LOCALES = ["ja", "en", "de", "it", "fr", "ru"] as const;

export type Locale = (typeof CONTENT_LOCALES)[number];
export type LocalizedText = string | Partial<Record<Locale, string>>;

export const localeLabels: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  de: "Deutsch",
  it: "Italiano",
  fr: "Français",
  ru: "Русский",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return CONTENT_LOCALES.includes(value as Locale);
}

export function getLocalizedText(value: LocalizedText | null | undefined, requestedLocale: Locale): string {
  if (typeof value === "string") return value;
  if (!value) return "";

  const candidates = [
    value[requestedLocale],
    value.ja,
    value.en,
    ...CONTENT_LOCALES.map((locale) => value[locale]),
    ...Object.values(value),
  ];
  return candidates.find((candidate) => typeof candidate === "string" && candidate.trim().length > 0) ?? "";
}

export function hasLocalizedText(value: LocalizedText | null | undefined): boolean {
  return getAvailableTranslations(value).length > 0;
}

export function hasTranslation(value: LocalizedText | null | undefined, locale: Locale): boolean {
  if (typeof value === "string") return locale === "ja" && value.trim().length > 0;
  return Boolean(value?.[locale]?.trim());
}

export function getAvailableTranslations(value: LocalizedText | null | undefined): Array<[Locale, string]> {
  if (typeof value === "string") return value.trim() ? [["ja", value]] : [];
  if (!value) return [];
  return CONTENT_LOCALES.flatMap((locale) => {
    const text = value[locale]?.trim();
    return text ? [[locale, text] as [Locale, string]] : [];
  });
}

export function compactLocalizedText(value: LocalizedText | null | undefined): LocalizedText | undefined {
  if (typeof value === "string") return value.trim() ? value : undefined;
  if (!value) return undefined;
  const compacted = Object.fromEntries(
    CONTENT_LOCALES.flatMap((locale) => {
      const text = value[locale];
      return typeof text === "string" && text.trim() ? [[locale, text]] : [];
    }),
  ) as Partial<Record<Locale, string>>;
  return Object.keys(compacted).length ? compacted : undefined;
}
