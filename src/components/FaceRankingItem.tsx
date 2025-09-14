import { PublicFace } from "@/types/face/publicFace.type"

interface FaceRankingItemProps {
  face: PublicFace
  rank: number
  onClick?: (slug: string) => void
}

export default function FaceRankingItem({ face, rank, onClick }: FaceRankingItemProps) {
  return (
    <div
      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
      onClick={() => onClick?.(face.slug)}
    >
      <span className="w-6 text-center text-sm font-bold text-red-500">{rank}</span>
      <img
        src={face.imageReviews}
        alt={face.title}
        className="w-12 h-12 rounded-md object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{face.title}</p>
        <p className="text-xs text-gray-500">{face.views} lượt xem</p>
      </div>
    </div>
  )
}
