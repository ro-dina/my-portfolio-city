"use client";

import { useI18n } from "@/components/common/LanguageProvider";
import type { Project } from "@/types/project";
type ProjectClient = Omit<Project, "body">;
import { ReactNode } from "react";

export default function CodingProjectClient({
  project,
  body,
}: {
  project: ProjectClient;
  body: { ja: ReactNode; en?: ReactNode };
}) {
  const { locale } = useI18n();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <article className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {project.title[locale] ?? project.title.ja}
          </h1>

          <div className="space-y-6">
            {locale === "en" && body.en ? body.en : body.ja}
          </div>
        </article>
      </div>
    </div>
  );
}