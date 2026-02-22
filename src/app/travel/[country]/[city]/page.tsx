import { notFound } from "next/navigation"
import FacilityGate from "@/components/facilities/FacilityGate"
import TravelMap from "@/components/travel/TravelMap"
import { getTravelCity, getTravelCountry, travelCountries, travelUiText } from "@/data/travelContent"

export default async function TravelCityPage({
  params,
}: {
  params: Promise<{ country: string; city: string }>
}) {
  const { country: countrySlug, city: citySlug } = await params
  const country = getTravelCountry(countrySlug)
  const city = getTravelCity(countrySlug, citySlug)
  if (!country || !city) return notFound()

  const points = city.places.map((place) => ({
    id: place.slug,
    name: place.name,
    subtitle: place.summary,
    position: place.position,
    zoom: place.zoom,
    href: `/travel/${countrySlug}/${city.slug}/${place.slug}`,
  }))

  return (
    <FacilityGate facility="travel">
      <TravelMap
        title={city.name}
        subtitle={city.summary}
        hint={travelUiText.worldHint}
        listTitle={travelUiText.placeListTitle}
        defaultCenter={city.position}
        defaultZoom={city.zoom}
        points={points}
        breadcrumbs={[
          { href: "/travel", label: { ja: "Travel", en: "Travel", ru: "Путешествия" } },
          { href: `/travel/${country.slug}`, label: country.name },
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
