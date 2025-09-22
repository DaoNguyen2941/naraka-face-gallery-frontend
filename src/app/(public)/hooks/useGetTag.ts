import { useQuery } from "@tanstack/react-query"
import { getTagService } from "@/lib/services/public/tag.service"
import { PublicTag } from "@/types";

export function useGetTag() {
     return useQuery<PublicTag[]>({
        queryKey: ['tag'],
        queryFn: getTagService,
        staleTime: 1000 * 60 * 60,
      })
}