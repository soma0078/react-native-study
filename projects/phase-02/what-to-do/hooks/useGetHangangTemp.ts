import { useQuery } from "@tanstack/react-query";
import { getHangangTemp } from "@/services/hangang";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useGetHangangTemp() {
  return useQuery({
    queryKey: QUERY_KEYS.hangang(),
    queryFn: () => getHangangTemp(),
    staleTime: 1000 * 60 * 30,
    retry: 0,
  });
}
