'use client'

import { PaginationResponse } from "@/types/page.type"
import { PublicFace } from '@/types/face/publicFace.type'
import FaceCardImage from './FaceCard'
import { LoadingSpinner } from "./ui/LoadingSpinner"
import { ImageOff } from "lucide-react" // icon

export default function FaceGallery({
  faceCodes,
  loading,
}: {
  faceCodes: PaginationResponse<PublicFace>
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {faceCodes.data.length > 0 ? (
        faceCodes.data.map((face) => (
          <FaceCardImage
            key={face.id}
            face={face}
          />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 text-gray-500">
          <ImageOff className="w-10 h-10 mb-2 text-gray-400" />
          <p className="text-sm">Không có dữ liệu để hiển thị</p>
        </div>
      )}
    </div>
  )
}
