"use client"

import Link from "next/link"
import { useI18n } from "@/components/common/LanguageProvider"
import {
  LocalizedText,
  TravelPlace,
  pickLocalizedText,
  travelUiText,
} from "@/data/travelContent"
import TravelQuickLinks, { type TravelQuickRow } from "./TravelQuickLinks"

type Breadcrumb = {
  href: string
  label: LocalizedText
}

export default function TravelArticleView({
  breadcrumbs,
  place,
  quickRows,
}: {
  breadcrumbs: Breadcrumb[]
  place: TravelPlace
  quickRows?: TravelQuickRow[]
}) {
  const { locale } = useI18n()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-600">
        {breadcrumbs.map((crumb) => (
          <Link key={crumb.href} href={crumb.href} className="hover:text-sky-700 hover:underline">
            {pickLocalizedText(crumb.label, locale)}
          </Link>
        ))}
      </nav>

      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {pickLocalizedText(place.name, locale)}
        </h1>
        <p className="mt-3 text-slate-700">{pickLocalizedText(place.articleLead, locale)}</p>

        <h2 className="mt-8 text-xl font-semibold text-slate-900">
          {pickLocalizedText(travelUiText.articleSectionTitle, locale)}
        </h2>

        <div className="mt-4 space-y-6">
          {place.articleSections.map((section) => (
            <section key={section.id}>
              <h3 className="text-lg font-semibold text-slate-900">
                {pickLocalizedText(section.title, locale)}
              </h3>
              <div className="mt-2 space-y-2 text-slate-700">
                {section.body.map((paragraph, idx) => (
                  <p key={`${section.id}-${idx}`}>{pickLocalizedText(paragraph, locale)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      {quickRows && quickRows.length > 0 ? (
        <div className="mt-6">
          <TravelQuickLinks rows={quickRows} />
        </div>
      ) : null}
    </div>
  )
}
