import FacilityGate from "@/components/facilities/FacilityGate"

export default function CinemaPage() {
  return (
    <FacilityGate facility="cinema">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">📽️ 見た映画の感想</h1>
        <ul className="space-y-2">
          <li>『』- 感想と気づき...</li>
          <li>『』- 技術的な要点まとめ...</li>
          {/* Markdownで管理したいなら後述のCMS導入を検討 */}
        </ul>
      </div>
    </FacilityGate>
  )
}