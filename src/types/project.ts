import type { ReactNode } from "react";

export type Locale = "ja" | "en" | "ru";
export type Localized<T> = {ja: T; en?: T; ru?: T;};

export type Link = {
  // Link label can be localized, but plain string is also acceptable.
  // Use `label` as Localized<string> so you can show it in the current locale.
  label: Localized<string>;
  href: string;
};

export type Project = {
  slug: string;

  // Localized strings
  title: Localized<string>;
  summary: Localized<string>;

  // Tags are usually tech names and can stay language-agnostic.
  tags: string[];

  // Allow Date or string for flexibility
  updatedAt: string | Date;

  // Hero image alt text often needs localization
  hero?: {
    src: string;
    alt: Localized<string>;
    width: number;
    height: number;
  };

  links?: Link[];

  // Body is localized JSX. Each locale returns ReactNode.
  body: Localized<() => ReactNode>;

  // Optional content controls (for future flexibility)
  visibility?: "public" | "unlisted" | "hidden";
  detailPolicy?: "page" | "redirect" | "disabled";
};