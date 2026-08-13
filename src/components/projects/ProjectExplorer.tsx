"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { projectCategories, type PortfolioProject, type ProjectCategory } from "@/data/projects";

export default function ProjectExplorer({ projects }: { projects: PortfolioProject[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ProjectCategory>("All");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const inCategory = category === "All" || project.categories.includes(category);
      const searchable = [
        typeof project.title === "string" ? project.title : Object.values(project.title).join(" "),
        typeof project.summary === "string" ? project.summary : Object.values(project.summary).join(" "),
        ...project.tags,
        ...project.categories,
      ].join(" ").toLowerCase();
      return inCategory && (!normalized || searchable.includes(normalized));
    });
  }, [category, projects, query]);

  return (
    <>
      <div className="mb-10 border-y border-slate-200 py-4 dark:border-slate-800">
        <label htmlFor="project-search" className="sr-only">プロジェクトを検索</label>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden>⌕</span>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="タイトル・技術で検索"
              className="w-full border-0 border-b border-slate-300 bg-transparent py-2 pl-6 pr-3 text-sm outline-none transition focus:border-blue-600 dark:border-slate-700 dark:text-white dark:focus:border-blue-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1" aria-label="プロジェクト分類">
            {(["All", ...projectCategories] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`shrink-0 border px-3 py-1.5 text-xs font-medium transition ${
                  category === item
                    ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                    : "border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-950 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-3 text-xs text-slate-500" aria-live="polite">{filtered.length} projects</p>
      {filtered.length ? (
        <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      ) : (
        <div className="border-y border-slate-200 py-16 text-center text-sm text-slate-500 dark:border-slate-800">
          条件に一致するプロジェクトはありません。
        </div>
      )}
    </>
  );
}
