import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import NoteCard from "@/components/notes/NoteCard";
import LanguageCard from "@/components/languages/LanguageCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import { profile, skillFields } from "@/data/profile";
import { projects } from "@/data/projects";
import { languages } from "@/data/languages";
import { getAllArticles } from "@/lib/article-storage";

export default async function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 6);
  const recentNotes = (await getAllArticles())
    .filter((note) => note.updatedAt)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  return (
    <>
      <section className="page-shell">
        <div className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:py-24">
          <div className="max-w-4xl">
            <p className="eyebrow">{profile.eyebrow}</p>
            <h1 className="mt-6 text-[clamp(2.8rem,8vw,6.8rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-slate-950 dark:text-white">
              {profile.name}
              <span className="block text-slate-400 dark:text-slate-600">Build. Learn. Record.</span>
            </h1>
            <p className="mt-8 max-w-3xl text-xl font-medium leading-8 tracking-tight text-slate-800 sm:text-2xl sm:leading-9 dark:text-slate-200">
              {profile.headline}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
              {profile.introduction}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {profile.interests.map((interest) => <Tag key={interest}>{interest}</Tag>)}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/projects" className="primary-link">View projects <span aria-hidden>→</span></Link>
              <a href="https://github.com/ro-dina" target="_blank" rel="noreferrer" className="secondary-link">GitHub <span aria-hidden>↗</span></a>
            </div>
          </div>

          <aside className="border-l border-slate-200 pl-6 dark:border-slate-800" aria-label="このサイトで分かること">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">What you will find</p>
            <ol className="mt-5 space-y-5 text-sm text-slate-600 dark:text-slate-400">
              <li><span className="mr-3 font-mono text-blue-600 dark:text-blue-400">01</span>何を、なぜ作ったか</li>
              <li><span className="mr-3 font-mono text-blue-600 dark:text-blue-400">02</span>技術選定と設計判断</li>
              <li><span className="mr-3 font-mono text-blue-600 dark:text-blue-400">03</span>課題、検証、学び</li>
              <li><span className="mr-3 font-mono text-blue-600 dark:text-blue-400">04</span>AIとの役割分担</li>
              <li><span className="mr-3 font-mono text-blue-600 dark:text-blue-400">05</span>語学と文化の実践記録</li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-200 py-20 sm:py-28 dark:border-slate-800">
        <div className="page-shell">
          <SectionHeader eyebrow="Selected work" title="Featured Projects" description="完成度だけでなく、考え方・技術的な広がり・学びが伝わる制作を選んでいます。" href="/projects" linkLabel="すべて見る" />
          <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} priority={index < 3} />)}
          </div>
          <Link href="/projects" className="quiet-link mt-7 inline-flex sm:hidden">すべてのプロジェクト <span aria-hidden>→</span></Link>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/70 py-20 sm:py-28 dark:border-slate-800 dark:bg-slate-900/25">
        <div className="page-shell">
          <SectionHeader eyebrow="Capabilities" title="Skills / Fields" description="自己評価の数値ではなく、実際に制作・実験・学習で扱った領域を示します。" />
          <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {skillFields.map((field) => (
              <article key={field.title} className="border-t border-slate-300 py-5 dark:border-slate-700">
                <h3 className="font-semibold text-slate-950 dark:text-white">{field.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{field.description}</p>
                <ul className="mt-4 space-y-1.5 font-mono text-xs text-slate-500 dark:text-slate-500">
                  {field.items.map((item) => <li key={item}>+ {item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 py-20 sm:py-28 dark:border-slate-800">
        <div className="page-shell">
          <SectionHeader eyebrow="Languages & Culture" title="言葉を、実際の体験とつなげる" description="レベルだけでなく、学習履歴、本・映画・旅行などを通じて、どのように言語と文化に触れたかを記録します。" href="/languages" linkLabel="すべて見る" />
          <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
            {languages.slice(0, 5).map((language) => <LanguageCard key={language.slug} language={language} />)}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 py-20 sm:py-28 dark:border-slate-800">
        <div className="page-shell">
          <SectionHeader eyebrow="Learning in public" title="Recent Notes" description="技術メモ、実験、研究過程を、あとから再現できる形で残しています。" href="/notes" linkLabel="ノートを探す" />
          <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-4">
            {recentNotes.map((note) => <NoteCard key={note.slug} note={{ slug: note.slug, title: note.title, summary: note.summary, category: note.category, tags: note.tags, updatedAt: note.updatedAt }} />)}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 py-20 dark:border-slate-800">
        <div className="page-shell flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Explore</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl dark:text-white">成果物だけでなく、そこに至る思考まで。</h2>
          </div>
          <Link href="/about" className="primary-link shrink-0">About me <span aria-hidden>→</span></Link>
        </div>
      </section>
    </>
  );
}
