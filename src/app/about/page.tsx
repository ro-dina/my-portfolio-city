import type { Metadata } from "next";
import Link from "next/link";
import Tag from "@/components/ui/Tag";
import { profile, skillFields } from "@/data/profile";
import { getAllLanguages } from "@/lib/language-storage";
import { getLocalizedText } from "@/lib/localization";

export const metadata: Metadata = { title: "About", description: "Isaoについて、興味分野、技術、言語。" };

export default async function AboutPage() {
  const languages = await getAllLanguages();
  return (
    <article className="page-shell pb-24">
      <header className="page-intro">
        <p className="eyebrow">About</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl dark:text-white">{profile.name}</h1>
        <p className="mt-6 max-w-3xl text-xl font-medium leading-9 text-slate-800 dark:text-slate-200">{profile.headline}</p>
        <p className="mt-5 max-w-2xl leading-8 text-slate-600 dark:text-slate-400">{profile.introduction}</p>
        <div className="mt-7 flex flex-wrap gap-2">{profile.interests.map((interest) => <Tag key={interest}>{interest}</Tag>)}</div>
      </header>

      <div className="grid gap-x-16 gap-y-12 border-t border-slate-200 pt-10 md:grid-cols-2 dark:border-slate-800">
        <section>
          <h2 className="text-xl font-semibold dark:text-white">How I work</h2>
          <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">動くものを作るだけでなく、なぜその構成にしたか、どこで詰まり、どう確かめたかを記録します。AIを使う場合も、設計・レビュー・検証の責任範囲が分かる形で残します。</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold dark:text-white">Technology</h2>
          <div className="mt-4 flex flex-wrap gap-2">{Array.from(new Set(skillFields.flatMap((field) => field.items))).map((item) => <Tag key={item}>{item}</Tag>)}</div>
        </section>
        <section>
          <h2 className="text-xl font-semibold dark:text-white">Languages</h2>
          <ul className="mt-4 space-y-3">{languages.map((language) => <li key={language.slug}><Link href={`/languages/${language.slug}`} className="quiet-link inline-flex">{getLocalizedText(language.name, "ja")} / {language.nativeName} <span aria-hidden>→</span></Link></li>)}</ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold dark:text-white">Links</h2>
          <div className="mt-4 flex flex-wrap gap-3"><a href="https://github.com/ro-dina" target="_blank" rel="noreferrer" className="primary-link">GitHub ↗</a><Link href="/projects" className="secondary-link">Projects →</Link></div>
        </section>
      </div>
    </article>
  );
}
