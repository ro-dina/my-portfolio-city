import { notFound } from "next/navigation"
import FacilityGate from "@/components/facilities/FacilityGate"
import TravelMap from "@/components/travel/TravelMap"
import {
  getTravelCountry,
  travelCountries,
  travelUiText,
} from "@/data/travelContent"

export default async function TravelCountryPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country: countrySlug } = await params
  const country = getTravelCountry(countrySlug)
  if (!country) return notFound()

  const points = country.cities.map((city) => ({
    id: city.slug,
    name: city.name,
    subtitle: city.summary,
    position: city.position,
    zoom: city.zoom,
    href: `/travel/${country.slug}/${city.slug}`,
  }))

  return (
    <FacilityGate facility="travel">
      <TravelMap
        title={country.name}
        subtitle={country.summary}
        hint={travelUiText.worldHint}
        listTitle={travelUiText.cityListTitle}
        defaultCenter={country.position}
        defaultZoom={country.zoom}
        points={points}
        breadcrumbs={[
          { href: "/travel", label: { ja: "Travel", en: "Travel", ru: "Путешествия" } },
        ]}
        secondaryCardsTitle={travelUiText.countryListTitle}
        secondaryCards={travelCountries
          .filter((item) => item.slug !== country.slug)
          .map((item) => ({
            id: item.slug,
            name: item.name,
            subtitle: item.summary,
            position: item.position,
            zoom: item.zoom,
            href: `/travel/${item.slug}`,
          }))}
      />
    </FacilityGate>
  )
}
