import { useQuery } from '@tanstack/react-query'
import { adminGetCharactersService } from '@/lib/services/admin/characters'

export const useCharacterList = () => {
  return useQuery({
    queryKey: ['admin-characters'],
    queryFn: adminGetCharactersService,
    staleTime: 15 * 60 * 1000, // 15 phút cache
    refetchOnWindowFocus: false,
  })
}
