import HomePage from './HomePage'
import { getQueryClient } from "@/lib/queryClient";
import { createServerHttp } from "@/lib/api/axios/createServerHttp";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { FaceSort } from "@/types";
import { getFacesService } from "@/lib/services";

export default async function Page() {
  const queryClient = getQueryClient()
  const serverHttp = await createServerHttp()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["Qr-face", { sort: FaceSort.NEW, take: 30}],
    queryFn: ({ pageParam = 1 }) =>
      getFacesService(serverHttp, { sort: FaceSort.NEW, page: pageParam, take: 30 }),
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePage />
    </HydrationBoundary>
  )
}
