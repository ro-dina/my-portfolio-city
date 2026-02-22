import FacilityGate from "@/components/facilities/FacilityGate"
import TravelMap from "@/components/travel/TravelMap"
import { travelCountries, travelUiText } from "@/data/travelContent"

export default function TravelPage() {
  const points = travelCountries.map((country) => ({
    id: country.slug,
    name: country.name,
    subtitle: country.summary,
    position: country.position,
    zoom: country.zoom,
    href: `/travel/${country.slug}`,
  }))

  return (
    <FacilityGate facility="travel">
      <TravelMap
        title={travelUiText.worldTitle}
        subtitle={travelUiText.worldSubtitle}
        hint={travelUiText.worldHint}
        listTitle={travelUiText.countryListTitle}
        defaultCenter={[20, 10]}
        defaultZoom={2}
        points={points}
      />
    </FacilityGate>
  )
}
