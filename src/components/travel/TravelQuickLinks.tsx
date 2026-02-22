"use client"

import Link from "next/link"
import { useI18n } from "@/components/common/LanguageProvider"
import { LocalizedText, pickLocalizedText } from "@/data/travelContent"

export type TravelQuickRow = {
  id: string
  items: {
    href: string
    label: LocalizedText
    active?: boolean
  }[]
}

export default function TravelQuickLinks({ rows }: { rows: TravelQuickRow[] }) {
  const { locale } = useI18n()

  if (rows.length === 0) return null

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="space-y-3">
        {rows.map((row, idx) => (
          <div key={row.id}>
            {idx > 0 ? <div className="mb-3 border-t border-slate-200" /> : null}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              {row.items.map((item, itemIdx) => (
                <span key={`${row.id}-${item.href}`} className="inline-flex items-center">
                  {itemIdx > 0 ? <span className="mr-2 text-slate-300">|</span> : null}
                  <Link
                    href={item.href}
                    className={`hover:underline ${
                      item.active ? "font-semibold text-orange-600" : "text-sky-700"
                    }`}
                  >
                    {pickLocalizedText(item.label, locale)}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
