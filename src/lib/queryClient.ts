import { QueryClient } from "@tanstack/react-query"

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { 
        staleTime: 1000 * 60 * 3, // 3 phút
      },
    },
  })
}
