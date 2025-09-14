import { useQuery } from '@tanstack/react-query'
import { GetAdminPageTraffic, ParamsAnalyticTraffic } from '@/lib/services/admin/analytics'
import { ParamsPageTraffic } from '@/lib/services/admin/analytics'
export const useAdminPageTraffic = (params: ParamsPageTraffic) => {
  return useQuery({
    queryKey: ['admin-page-traffic', params.date],
    queryFn: () => GetAdminPageTraffic(params),
    staleTime: 60 * 60 * 1000, // cache 60 phút
  })
}
