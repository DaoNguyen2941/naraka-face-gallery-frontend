import { useQuery } from "@tanstack/react-query"
import { getCharacterService } from "@/lib/services/public/character.service"
import { PublicCharacter } from "@/types"
export function useGetCharacter() {
     return useQuery<PublicCharacter[]>({
        queryKey: ['characters'],
        queryFn: getCharacterService,
        staleTime: 1000 * 60 * 60,
      })
}