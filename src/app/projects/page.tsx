import type { Metadata } from "next";
import ProjectExplorer from "@/components/projects/ProjectExplorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software、Hardware、AI、Web、Securityなどの制作・研究記録。",
};

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  return (
    <div className="page-shell pb-24">
      <header className="page-intro">
        <p className="eyebrow">Work / Experiments</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl dark:text-white">Projects</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
          Software / Hardware / Researchを横断した制作記録。各ページでは、目的、設計判断、課題、AIとの役割分担、検証と学びを可能な範囲でまとめます。
        </p>
      </header>
      <ProjectExplorer projects={sorted} />
    </div>
  );
}
