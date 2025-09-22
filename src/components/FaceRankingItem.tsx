import { PublicFace } from "@/types/face/publicFace.type"

interface FaceRankingItemProps {
  face: PublicFace
  rank: number
  onClick?: (slug: string) => void
}

export default function FaceRankingItem({ face, rank, onClick }: FaceRankingItemProps) {
  return (
    <div
      className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
      onClick={() => onClick?.(face.slug)}
    >
      {/* Rank */}
      <span className="w-8 text-center text-base font-bold text-red-500">
        {rank}
      </span>

      {/* Thumbnail */}
      <img
        src={face.imageReviews}
        alt={face.title}
        className="w-12 h-12 rounded-md object-cover flex-shrink-0"
      />

      {/* Nội dung */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate group-hover:text-black">
          {face.title}
        </p>
        <p className="text-[11px] text-gray-500 truncate">
          {face.views} lượt xem
        </p>
      </div>
    </div>
  )
}
