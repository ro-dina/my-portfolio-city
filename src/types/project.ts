import type { ReactNode } from "react";

export type Link = { label: string; href: string};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  updatedAt: string;
  hero?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  links?: Link[];
  body: () => ReactNode;
};