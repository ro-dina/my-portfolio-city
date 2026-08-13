import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLanguage, languages } from "@/data/languages";

export function generateStaticParams() {
  return languages.map((language) => ({ slug: language.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const language = getLanguage(slug);
  return language ? { title: language.name, description: language.summary } : {};
}

export default async function LanguageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const language = getLanguage(slug);
  if (!language) notFound();

  return (
    <article className="page-shell pb-24 pt-10 sm:pt-16">
      <Link href="/languages" className="quiet-link inline-flex">← Languages & Culture</Link>
      <header className="page-intro !pb-12">
        <p className="eyebrow">{language.nativeName}</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl dark:text-white">{language.name}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">{language.summary}</p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,46rem)] lg:gap-16">
        <aside className="border-l border-slate-200 pl-5 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Current level</p>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{language.currentLevel}</p>
        </aside>
        <div className="space-y-12">
          <section className="border-t border-slate-200 pt-6 dark:border-slate-800">
            <h2 className="text-xl font-semibold dark:text-white">Goals</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-400">{language.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
          </section>
          <section className="border-t border-slate-200 pt-6 dark:border-slate-800">
            <h2 className="text-xl font-semibold dark:text-white">Learning History</h2>
            {language.learningHistory.length ? <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-400">{language.learningHistory.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="mt-4 text-slate-500">記録を追加予定です。</p>}
          </section>
          <section id="culture" className="border-t border-slate-200 pt-6 dark:border-slate-800">
            <h2 className="text-xl font-semibold dark:text-white">Books / Films / Travel</h2>
            <div className="mt-5 grid gap-px bg-slate-200 sm:grid-cols-2 dark:bg-slate-800">
              {language.cultureLinks.map((item) => <Link key={`${item.type}-${item.href}`} href={item.href} className="group bg-white p-5 dark:bg-slate-950"><span className="font-mono text-xs text-slate-500">{item.type}</span><span className="mt-2 flex items-center justify-between font-medium group-hover:text-blue-700 dark:group-hover:text-blue-400">{item.label}<span aria-hidden>→</span></span></Link>)}
            </div>
          </section>
          <section className="border-t border-slate-200 pt-6 dark:border-slate-800">
            <h2 className="text-xl font-semibold dark:text-white">Writing Samples / Resources</h2>
            {language.resources.length ? <ul className="mt-4 space-y-2">{language.resources.map((item) => <li key={item.href}><Link href={item.href} className="quiet-link inline-flex">{item.label} →</Link></li>)}</ul> : <p className="mt-4 text-slate-500">文章と学習リソースを追加予定です。</p>}
          </section>
        </div>
      </div>
    </article>
  );
}
