import { useQuery } from '@tanstack/react-query'
import { adminGetCharactersService } from '@/lib/services/admin/characters'

export const useAdminCharacterList = () => {
  return useQuery({
    queryKey: ['admin-characters'],
    queryFn: adminGetCharactersService,
    staleTime: 60 * 60 * 1000, // 60 phút cache
    refetchOnWindowFocus: false,
  })
}
