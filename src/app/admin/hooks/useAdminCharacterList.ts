import { useQuery } from '@tanstack/react-query'
import { getCharactersService } from '@/lib/services/admin/characters'

export const useCharacterList = () => {
  return useQuery({
    queryKey: ['admin-characters'],
    queryFn: getCharactersService,
    staleTime: 15 * 60 * 1000, // 15 phút cache
    refetchOnWindowFocus: false,
  })
}
