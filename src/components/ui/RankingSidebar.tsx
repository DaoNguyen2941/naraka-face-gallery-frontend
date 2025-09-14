"use client"

import { PublicFace } from "@/types/face/publicFace.type"
import FaceRankingItem from "../FaceRankingItem"
import { useRouter } from "next/navigation"

interface RankingSidebarProps {
  faces: PublicFace[]
}

export default function RankingSidebar({ faces }: RankingSidebarProps) {
  const router = useRouter()
  const topFaces = [...faces].sort((a, b) => b.views - a.views).slice(0, 10)

  return (
    <aside className="hidden lg:block w-[180px]">
      <div className="sticky top-4">
        <h2 className="text-sm font-bold mb-3">🔥 Bảng xếp hạng</h2>
        <div className="flex flex-col space-y-1">
          {topFaces.map((face, i) => (
            <FaceRankingItem
              key={face.slug}
              face={face}
              rank={i + 1}
              onClick={(slug) => router.push(`/faces/${slug}`)}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}



