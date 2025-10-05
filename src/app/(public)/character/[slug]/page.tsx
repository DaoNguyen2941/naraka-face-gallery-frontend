import type { Metadata } from 'next'
import CharacterPage from "./CharacterPage"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { createServerHttp } from "@/lib/api/axios/createServerHttp";
import { getFacesService } from "@/lib/services";
import { getQueryClient } from "@/lib/queryClient";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { slug } = await params
  return {
    title: slug,
  }
}

export default async function Page({ params }: Props,) {
  const { slug } = await params
  const queryClient = getQueryClient()
  const serverHttp = await createServerHttp()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["Qr-face", { character: slug, take: 30 }],
    queryFn: ({ pageParam = 1 }) =>
      getFacesService(serverHttp, { characterSlug: slug, page: pageParam, take: 30 }),
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CharacterPage />
    </HydrationBoundary>
  )
}
