import FacilityGate from "@/components/facilities/FacilityGate";

export default function LeatherPage() {
  return (
    <FacilityGate facility="leather">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">✒️ 学習メモ</h1>
        <ul className="space-y-2">
          <li></li>
          <li>
          </li>
          {/* Markdownで管理したいなら後述のCMS導入を検討 */}
        </ul>
      </div>
    </FacilityGate>
  )
}