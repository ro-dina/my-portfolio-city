import type { Metadata } from "next";
import Link from "next/link";
import LanguageCard from "@/components/languages/LanguageCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { languages } from "@/data/languages";
import { travelCountries } from "@/data/travelContent";

export const metadata: Metadata = {
  title: "Languages & Culture",
  description: "外国語の学習履歴と、本・映画・旅行を通した文化体験の記録。",
};

export default function LanguagesPage() {
  return (
    <div className="pb-24">
      <header className="page-shell page-intro">
        <p className="eyebrow">Practice / Context</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl dark:text-white">Languages & Culture</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
          語彙や資格だけではなく、外国語を何のために学び、旅行・本・映画・文章の中でどう使ったかを記録します。
        </p>
      </header>

      <section className="page-shell">
        <SectionHeader title="Languages" description="現在地は誇張せず、具体的な学習・実践記録と一緒に更新します。" />
        <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
          {languages.map((language) => <LanguageCard key={language.slug} language={language} />)}
        </div>
      </section>

      <section className="mt-20 border-y border-slate-200 bg-slate-50/70 py-20 dark:border-slate-800 dark:bg-slate-900/25">
        <div className="page-shell">
          <SectionHeader title="Culture archive" description="既存の旅行データを、言語と文化に触れた実世界の記録として残しています。後からTravelを独立させても使える階層データです。" href="/travel" linkLabel="地図アーカイブ" />
          <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
            {travelCountries.map((country) => (
              <article key={country.slug} className="border-t border-slate-300 py-5 dark:border-slate-700">
                <p className="font-mono text-xs text-slate-500">{country.region.ja}</p>
                <h3 className="mt-1 font-semibold dark:text-white"><Link href={`/travel/${country.slug}`} className="hover:text-blue-700 dark:hover:text-blue-400">{country.name.ja} →</Link></h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{country.summary.ja || "訪問・文化記録を追加予定です。"}</p>
                <p className="mt-4 text-xs text-slate-500">{country.cities.length} cities recorded</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
