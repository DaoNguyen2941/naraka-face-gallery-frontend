import { useQuery } from "@tanstack/react-query"
import { getTagsService } from "@/lib/services/admin/tag"
export function useAdminTags() {
  return useQuery({
    queryKey: ['admin-tags'],
    queryFn: getTagsService,
    staleTime: 1000 * 60 * 10,
  })
}
