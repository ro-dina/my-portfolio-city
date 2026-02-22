"use client"

import dynamic from "next/dynamic"
import type { LocalizedText } from "@/data/travelContent"
import type { TravelQuickRow } from "./TravelQuickLinks"

export type TravelMapPoint = {
  id: string
  name: LocalizedText
  subtitle: LocalizedText
  position: [number, number]
  zoom: number
  href: string
}

type TravelMapProps = {
  title: LocalizedText
  subtitle: LocalizedText
  hint: LocalizedText
  listTitle: LocalizedText
  defaultCenter: [number, number]
  defaultZoom: number
  points: TravelMapPoint[]
  breadcrumbs?: { href: string; label: LocalizedText }[]
  quickRows?: TravelQuickRow[]
  secondaryCards?: TravelMapPoint[]
  secondaryCardsTitle?: LocalizedText
}

const TravelMapInner = dynamic(() => import("./TravelMapInner"), {
  ssr: false,
  loading: () => <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">Loading map...</div>,
})

export default function TravelMap(props: TravelMapProps) {
  return <TravelMapInner {...props} />
}
