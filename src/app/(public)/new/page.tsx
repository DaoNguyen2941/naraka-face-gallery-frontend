import NewPage from "./newPage";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { createServerHttp } from "@/lib/api/axios/createServerHttp";
import { FaceSort } from "@/types";
import { getFacesService } from "@/lib/services";
import { getQueryClient } from "@/lib/queryClient";

export const metadata = {
  title: 'new | Tàng Mỹ Quán',
  description: 'Danh sách QR Face mới nhất cho các nhân vật Naraka.',
  openGraph: {
    title: 'new | Tàng Mỹ Quán',
    url: `https://narakaqrface.com/new`,
    description: 'Danh sách QR Face mới nhất cho các nhân vật Naraka.',
    images: [{ url: 'https://cdn.narakaqrface.com/public/banner.png', width: 1200, height: 630, alt: 'new' }],
  },
};

export default async function Page() {
  const queryClient = getQueryClient()
  const serverHttp = await createServerHttp()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["Qr-face", { sort: FaceSort.NEW }],
    queryFn: ({ pageParam = 1 }) =>
      getFacesService(serverHttp, { sort: FaceSort.NEW, page: pageParam }),
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NewPage />
    </HydrationBoundary>

  )
}
