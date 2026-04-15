import { format } from "date-fns";
import { hangangApi } from "@/lib/api";
import { HangangResponse } from "@/types/hangang";

export async function getHangangTemp(): Promise<number> {
  const ymd = format(new Date(), "yyyyMMdd");

  const data = await hangangApi.get(ymd).json<HangangResponse>();

  const rows = data.WPOSInformationTime?.row ?? [];
  const target = rows[0];
  if (!target) throw new Error("한강 수온 데이터 없음");

  const temp = parseFloat(target.WATT);
  if (isNaN(temp)) throw new Error("수온 파싱 실패");
  return temp;
}
