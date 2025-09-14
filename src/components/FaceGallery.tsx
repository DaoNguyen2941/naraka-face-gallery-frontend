'use client'

import { PaginationResponse } from "@/types/page.type"
import { PublicFace } from '@/types/face/publicFace.type'
import FaceCardImage from './FaceCard'
import { LoadingSpinner } from "./ui/LoadingSpinner"
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

  if (!faceCodes.data.length) {
    return <div className="text-black text-center py-10">Không có dữ liệu.</div>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {faceCodes.data.map((face) => (
        <FaceCardImage
          key={face.id}
          face={face}
        />
      ))}
    </div>
  )
}
