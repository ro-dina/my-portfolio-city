import type { LocalizedText } from "@/lib/localization";

export type LanguageLink = {
  label: LocalizedText;
  href: string;
};

export type LanguageCultureLink = LanguageLink & {
  type: "Travel" | "Books" | "Films";
};

export type LanguageRecord = {
  slug: string;
  name: LocalizedText;
  nativeName: string;
  currentLevel?: LocalizedText;
  summary?: LocalizedText;
  goals: LocalizedText[];
  learningHistory: LocalizedText[];
  resources: LanguageLink[];
  cultureLinks: LanguageCultureLink[];
};
