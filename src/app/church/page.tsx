import FacilityGate from "@/components/facilities/FacilityGate"

export default function ChurchPage() {
  return (
    <FacilityGate facility="church">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">📚 読んだ本の記録</h1>
        <ul className="space-y-2">
          <li>『君たちはどう生きるか』- 感想と気づき...</li>
          <li>『Deep Learning』- 技術的な要点まとめ...</li>
          {/* Markdownで管理したいなら後述のCMS導入を検討 */}
        </ul>
      </div>
    </FacilityGate>
  )
}