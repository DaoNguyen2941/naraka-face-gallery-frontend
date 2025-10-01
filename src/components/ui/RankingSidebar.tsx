"use client"

import FaceRankingItem from "../FaceRankingItem"
import { useRouter } from "next/navigation"
import { buildFaceDetailUrl } from "@/lib/constants/routes"
import { useFaces } from "@/app/(public)/hooks/useGetFaces"
import { FaceSort } from "@/lib/services/interface/face"

export default function RankingSidebar() {
  const router = useRouter()
  const { data } = useFaces({ sort: FaceSort.HOT });
  const faceList = data?.pages.flatMap((page) => page.data) ?? []

  // Lấy top 10 theo lượt xem
  const topFaces = [...faceList]
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)

  const handleClick = (slug: string) => {
    router.push(buildFaceDetailUrl(slug))
  }

  return (
    <aside className="hidden lg:block w-[200px]">
      <div className="sticky top-4 bg-gray-900/60 rounded-lg p-3">
        <h2 className="text-sm font-bold mb-3 text-white">🔥 Bảng xếp hạng</h2>
        <div className="flex flex-col space-y-2">
          {topFaces.map((face, i) => (
            <FaceRankingItem
              key={face.slug}
              face={face}
              rank={i + 1}
              onClick={(slug) => handleClick(slug)}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
