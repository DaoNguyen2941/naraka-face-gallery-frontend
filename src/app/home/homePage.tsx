"use client"

import { Pacifico, Sigmar } from "next/font/google"
import { useSearchParams } from "next/navigation"
import { useInfiniteQuery } from "@tanstack/react-query"
import FaceGallery from "@/components/FaceGallery"
import { PaginationResponse } from "@/types/page.type"
import { PublicFace } from "@/types/face/publicFace.type"
import { useEffect, useRef } from "react"
import { getFaceService } from "@/lib/services/public/face.service"
import WelcomeBox from "@/components/WelcomeBox"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { FaceSort } from "@/lib/services/interface/face"
import RankingSidebar from "@/components/ui/RankingSidebar"

const sigmar = Sigmar({
  weight: "400",
  subsets: ["latin"],
})

export default function HomePage() {
  const searchParams = useSearchParams()
  const tags = searchParams.get("tags")?.split(",") ?? []
  const rawSort = searchParams.get("sort")
  const sort = Object.values(FaceSort).includes(rawSort as FaceSort)
    ? (rawSort as FaceSort)
    : FaceSort.NEW // mặc định

  const rawSearch = searchParams.get('search')
  const search = rawSearch ?? undefined

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<PaginationResponse<PublicFace>, Error>({
    queryKey: ["Qr-face", tags, sort, search],
    queryFn: ({ pageParam = 1 }) =>
      getFaceService({ page: pageParam as number, tagSlugs: tags, take: 30, sort, search }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    initialPageParam: 1,
  })

  const faceList = data?.pages.flatMap((page) => page.data) ?? []

  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loadMoreRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1 }
    )

    observer.observe(loadMoreRef.current)

    return () => observer.disconnect()
  }, [loadMoreRef, hasNextPage, fetchNextPage])

  return (
    <div className="p-4 space-y-4">
      {/* Banner */}
      <div className="relative w-full h-40 md:h-60 mb-16">
        <img
          src="/banner.png"
          alt="Naraka Banner"
          className="w-full h-40 md:h-60 object-cover rounded shadow"
        />
        <div className="absolute inset-0 bg-black/60 rounded flex flex-col items-center justify-center text-center text-white">
          <h1
            className={`${sigmar.className} text-3xl md:text-6xl font-bold 
              bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 
              bg-clip-text text-transparent leading-tight md:leading-snug pb-1`}
          >
            Tàng Mĩ Quán
          </h1>
          <p
            className={`${sigmar.className} text-sm md:text-lg text-gray-200 mt-1`}
          >
            Nơi lưu chữ và chia sẻ mã Qr làm đẹp cho nhân vật game
            Naraka:Bladepoint miễn phí
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Welcome box chiếm full width */}
        <WelcomeBox />

        {/* Gallery + Ranking chia 2 cột */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-4">
          {/* Gallery */}
          <div>
            <FaceGallery
              faceCodes={{
                data: faceList,
                meta: {
                  page: 1,
                  take: 10,
                  itemCount: faceList.length,
                  pageCount: 1,
                  hasPreviousPage: false,
                  hasNextPage: hasNextPage ?? false,
                },
              }}
              loading={isLoading}
            />
          </div>

          {/* Sidebar */}
          <RankingSidebar faces={faceList} />
        </div>
      </div>
    </div>
  )
}