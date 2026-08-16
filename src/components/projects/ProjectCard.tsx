"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/common/LanguageProvider";
import type { PortfolioProject } from "@/data/projects";
import { pickProjectText } from "@/data/projects";
import Tag from "@/components/ui/Tag";

const statusText = { done: "Completed", wip: "In progress", idea: "Exploring" } as const;

export default function ProjectCard({ project, priority = false }: { project: PortfolioProject; priority?: boolean }) {
  const { locale } = useI18n();
  const title = pickProjectText(project.title, locale);
  const summary = pickProjectText(project.summary, locale);
  const imageAlt = project.image ? pickProjectText(project.image.alt, locale) : title;

  return (
    <article className="group flex h-full flex-col border-t border-slate-200 py-5 dark:border-slate-800">
      <Link href={`/projects/${project.slug}`} className="block focus-visible:outline-offset-4">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
          {project.image ? (
            <Image
              src={project.image.src}
              alt={imageAlt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="absolute inset-0 flex items-end bg-[linear-gradient(135deg,#f8fafc,#e2e8f0)] p-5 dark:bg-[linear-gradient(135deg,#0f172a,#1e293b)]">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {project.categories.join(" / ")}
              </span>
            </div>
          )}
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
            {title}
          </h3>
          <span className="mt-0.5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700 dark:group-hover:text-blue-400" aria-hidden>
            ↗
          </span>
        </div>
      </Link>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 5).map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </div>
      <div className="mt-auto flex items-center justify-between pt-5 text-xs text-slate-500 dark:text-slate-500">
        <span>{project.categories.join(" · ")}</span>
        <span>
          {project.status ? statusText[project.status] : "Project"} · <time dateTime={project.updatedAt}>{project.updatedAt}</time>
        </span>
      </div>
    </article>
  );
}
