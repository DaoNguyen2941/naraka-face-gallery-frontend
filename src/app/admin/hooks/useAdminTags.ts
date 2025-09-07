import { useQuery } from "@tanstack/react-query"
import { adminGetTagsService } from "@/lib/services/admin/tag"
export function useAdminTags() {
  return useQuery({
    queryKey: ['admin-tags'],
    queryFn: adminGetTagsService,
    staleTime: 1000 * 60 * 60,
  })
}
