import { useQuery } from '@tanstack/react-query'
import { GetAdminAnalyticTraffic, ParamsAnalyticTraffic } from '@/lib/services/admin/analytics'

export const useAdminAnalyticTraffic = (params: ParamsAnalyticTraffic) => {
  return useQuery({
    queryKey: ['admin-analytic-traffic', params.start, params.end], // để React Query refetch khi params thay đổi
    queryFn: () => GetAdminAnalyticTraffic(params),
    enabled: !!params.start && !!params.end, // chỉ gọi khi có khoảng ngày
    staleTime: 60 * 60 * 1000, // cache 60 phút
  })
}
