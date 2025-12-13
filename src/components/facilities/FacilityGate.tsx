import { facilities, FacilityKey } from "@/config/facilities";
import UnderConstruction from "@/components/common/UnderConstruction";;

export default function FacilityGate({
  facility,
  //readyTitle,
  children,
}: {
  facility: FacilityKey;
  readyTitle?: string;      // 必要なら公開時の見出しに使える
  children: React.ReactNode;
}) {
  if (!facilities[facility]) {
    // 準備中表示（ここは共通）
    return <UnderConstruction title="この施設は準備中です" />;
  }
  // 公開中なら中身をそのまま表示
  return <>{children}</>;
}