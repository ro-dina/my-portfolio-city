import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Tag from "@/components/ui/Tag";
import { getPortfolioProject, pickProjectText, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return {};
  return { title: pickProjectText(project.title), description: pickProjectText(project.summary) };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();
  const title = pickProjectText(project.title);

  return (
    <article className="pb-24">
      <header className="page-shell pt-10 sm:pt-16">
        <Link href="/projects" className="quiet-link inline-flex">← Projects</Link>
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow">{project.categories.join(" / ")}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl dark:text-white">{title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">{pickProjectText(project.summary)}</p>
          </div>
          <dl className="grid grid-cols-2 gap-5 border-l border-slate-200 pl-5 text-sm lg:grid-cols-1 dark:border-slate-800">
            <div><dt className="text-xs text-slate-500">Status</dt><dd className="mt-1 capitalize dark:text-slate-200">{project.status ?? "Project"}</dd></div>
            <div><dt className="text-xs text-slate-500">Updated</dt><dd className="mt-1 dark:text-slate-200"><time dateTime={project.updatedAt}>{project.updatedAt}</time></dd></div>
          </dl>
        </div>
        <div className="mt-8 flex flex-wrap gap-1.5">{project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
      </header>

      {project.image ? (
        <div className="page-shell mt-12">
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-900">
            <Image src={project.image.src} alt={pickProjectText(project.image.alt)} fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-contain" />
          </div>
        </div>
      ) : null}

      <div className="page-shell mt-16 grid gap-12 lg:grid-cols-[13rem_minmax(0,46rem)] lg:gap-16">
        <aside>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500">Case study</p>
          <p className="mt-3 text-sm leading-6 text-slate-500">存在する情報から順次更新しています。未確認の成果や役割は記載しません。</p>
          {project.links?.length ? (
            <div className="mt-6 flex flex-col items-start gap-3">
              {project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="quiet-link inline-flex">{link.label} <span aria-hidden>↗</span></a>)}
            </div>
          ) : null}
        </aside>
        <div className="space-y-12">
          {(project.sections?.length ? project.sections : [{ title: "Overview", body: pickProjectText(project.summary) }]).map((section) => (
            <section key={section.title} className="border-t border-slate-200 pt-6 dark:border-slate-800">
              <h2 className="text-xl font-semibold tracking-tight dark:text-white">{section.title}</h2>
              <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">{section.body}</p>
              {section.items?.length ? <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-400">{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
            </section>
          ))}

          {project.aiUsage ? (
            <section className="border-t border-slate-200 pt-6 dark:border-slate-800">
              <h2 className="text-xl font-semibold tracking-tight dark:text-white">AI Usage</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">使用有無ではなく、任せた範囲と人間側の責任を分けて記録します。</p>
              <dl className="mt-6 grid gap-px bg-slate-200 sm:grid-cols-2 dark:bg-slate-800">
                {[
                  ["AIに任せたこと", project.aiUsage.delegated],
                  ["自分が設計したこと", project.aiUsage.designed],
                  ["自分がレビューしたこと", project.aiUsage.reviewed],
                  ["動作確認", project.aiUsage.validated],
                ].map(([label, value]) => <div key={label} className="bg-white p-5 dark:bg-slate-950"><dt className="text-xs font-semibold text-slate-500">{label}</dt><dd className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{value}</dd></div>)}
              </dl>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
