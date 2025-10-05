import { useQuery } from "@tanstack/react-query"
import { adminGetHistoryService } from "@/lib/services/admin/history"
import { ParamGetHistory } from "@/types";
export function useAdminHistory(params: ParamGetHistory) {
  return useQuery({
    queryKey: ['admin-history', params], // thêm params vào queryKey để cache riêng
    queryFn: () => adminGetHistoryService(params),
    staleTime: 1000 * 60 * 15, // 15 phút
  });
}

