import { notFound } from "next/navigation"
import FacilityGate from "@/components/facilities/FacilityGate"
import TravelArticleView from "@/components/travel/TravelArticleView"
import {
  getTravelCity,
  getTravelCountry,
  getTravelPlace,
  travelCountries,
} from "@/data/travelContent"

export default async function TravelPlacePage({
  params,
}: {
  params: Promise<{ country: string; city: string; place: string }>
}) {
  const { country: countrySlug, city: citySlug, place: placeSlug } = await params

  const country = getTravelCountry(countrySlug)
  const city = getTravelCity(countrySlug, citySlug)
  const place = getTravelPlace(countrySlug, citySlug, placeSlug)
  if (!country || !city || !place) return notFound()

  return (
    <FacilityGate facility="travel">
      <TravelArticleView
        breadcrumbs={[
          { href: "/travel", label: { ja: "Travel", en: "Travel", ru: "Путешествия" } },
          { href: `/travel/${country.slug}`, label: country.name },
          { href: `/travel/${country.slug}/${city.slug}`, label: city.name },
        ]}
        place={place}
        quickRows={[
          {
            id: "places-in-city",
            items: city.places.map((item) => ({
              href: `/travel/${country.slug}/${city.slug}/${item.slug}`,
              label: item.name,
              active: item.slug === place.slug,
            })),
          },
          {
            id: "countries",
            items: travelCountries.map((item) => ({
              href: `/travel/${item.slug}`,
              label: item.name,
              active: item.slug === country.slug,
            })),
          },
        ]}
      />
    </FacilityGate>
  )
}
