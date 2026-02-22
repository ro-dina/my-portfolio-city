"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import L, { DivIcon } from "leaflet"
import { useI18n } from "@/components/common/LanguageProvider"
import { pickLocalizedText, travelUiText } from "@/data/travelContent"
import TravelQuickLinks, { type TravelQuickRow } from "./TravelQuickLinks"
import type { LocalizedText } from "@/data/travelContent"
import type { TravelMapPoint } from "./TravelMap"

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

function buildMarkerIcon(active: boolean): DivIcon {
  return L.divIcon({
    className: "travel-marker-wrapper",
    html: `<div class="travel-marker${active ? " travel-marker-active" : ""}"></div>`,
    iconSize: active ? [18, 18] : [14, 14],
    iconAnchor: active ? [9, 9] : [7, 7],
  })
}

function FlyToPoint({ position, zoom }: { position: [number, number]; zoom: number }) {
  const map = useMap()
  map.flyTo(position, zoom, { duration: 1.2 })
  return null
}

export default function TravelMapInner({
  title,
  subtitle,
  hint,
  listTitle,
  defaultCenter,
  defaultZoom,
  points,
  breadcrumbs,
  quickRows,
  secondaryCards,
  secondaryCardsTitle,
}: TravelMapProps) {
  const { locale } = useI18n()
  const [activePoint, setActivePoint] = useState<TravelMapPoint | null>(points[0] ?? null)

  const icons = useMemo(
    () =>
      points.reduce<Record<string, DivIcon>>((acc, point) => {
        acc[point.id] = buildMarkerIcon(point.id === activePoint?.id)
        return acc
      }, {}),
    [activePoint?.id, points]
  )

  if (points.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{pickLocalizedText(title, locale)}</h1>
        <p className="mt-3 text-slate-600">{pickLocalizedText(subtitle, locale)}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {breadcrumbs ? (
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          {breadcrumbs.map((crumb) => (
            <Link key={crumb.href} href={crumb.href} className="hover:text-sky-700 hover:underline">
              {pickLocalizedText(crumb.label, locale)}
            </Link>
          ))}
        </nav>
      ) : null}

      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{pickLocalizedText(title, locale)}</h1>
        <p className="mt-2 text-slate-600">{pickLocalizedText(subtitle, locale)}</p>
        <p className="mt-1 text-sm text-slate-500">{pickLocalizedText(hint, locale)}</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          minZoom={2}
          scrollWheelZoom
          className="h-[58vh] min-h-[460px] w-full"
          worldCopyJump
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles &copy; Esri'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          />

          {activePoint ? <FlyToPoint position={activePoint.position} zoom={activePoint.zoom} /> : null}

          {points.map((point) => (
            <Marker
              key={point.id}
              position={point.position}
              icon={icons[point.id]}
              eventHandlers={{
                click: () => setActivePoint(point),
              }}
            >
              <Popup>
                <strong>{pickLocalizedText(point.name, locale)}</strong>
                <br />
                <span>{pickLocalizedText(point.subtitle, locale)}</span>
                <br />
                <Link href={point.href} className="text-sky-700 underline">
                  {pickLocalizedText(travelUiText.openPage, locale)}
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <h2 className="mt-6 text-lg font-semibold text-slate-900">{pickLocalizedText(listTitle, locale)}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((point) => (
          <div
            key={point.id}
            className={`rounded-xl border p-4 transition ${
              activePoint?.id === point.id
                ? "border-orange-400 bg-orange-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <Link href={point.href} className="text-base font-semibold text-sky-700 hover:underline">
              {pickLocalizedText(point.name, locale)}
            </Link>
            <p className="mt-1 text-sm text-slate-600">{pickLocalizedText(point.subtitle, locale)}</p>
            <button
              type="button"
              onClick={() => setActivePoint(point)}
              className="mt-3 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              {pickLocalizedText(travelUiText.zoomButton, locale)}
            </button>
          </div>
        ))}
      </div>

      {quickRows && quickRows.length > 0 ? (
        <div className="mt-6">
          <TravelQuickLinks rows={quickRows} />
        </div>
      ) : null}

      {secondaryCards && secondaryCards.length > 0 ? (
        <section className="mt-6 border-t border-slate-200 pt-4">
          {secondaryCardsTitle ? (
            <h3 className="mb-3 text-sm font-semibold text-slate-700">
              {pickLocalizedText(secondaryCardsTitle, locale)}
            </h3>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryCards.map((card) => (
              <div key={card.id} className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300">
                <Link href={card.href} className="text-base font-semibold text-sky-700 hover:underline">
                  {pickLocalizedText(card.name, locale)}
                </Link>
                <p className="mt-1 text-sm text-slate-600">{pickLocalizedText(card.subtitle, locale)}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
