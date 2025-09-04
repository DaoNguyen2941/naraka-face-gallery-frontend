'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import FaceGallery from '@/components/FaceGallery'
import { PaginationResponse } from "@/types/page.type"
import { PublicFace } from '@/types/face/publicFace.type'
import { useState } from "react"
import { getFaceService } from '@/lib/services/public/face'
export default function HomePage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const sort = searchParams.get('sort')
  const highlighted = searchParams.get('highlighted')
  const [page, setPage] = useState<number>(1)
  const [tagFilter, setTagFilter] = useState<string[]>([])

  const {
    data: faces,
    isLoading: faceLoading,
  } = useQuery<PaginationResponse<PublicFace>>({
    queryKey: ["Qr-face", page, tagFilter],
    queryFn: () => getFaceService({ page: page, tagSlugs: tagFilter, take: 12 }),
  })

  return (
    <div className="p-4 space-y-4">
      {/* Hình ảnh đầu trang */}
      <img
        src="https://pub-8f6128da76624084a24e3ae5210c2a86.r2.dev/img/category/de-thuong/cover-photo.jpg"
        alt="Naraka Banner"
        className="w-full h-40 md:h-60 object-cover rounded shadow"
      />

      <h1 className="text-2xl font-bold">QR Face Gallery</h1>

      <FaceGallery
        faceCodes={
          faces ?? {
            data: [],
            meta: {
              page: 1,
              take: 10,
              itemCount: 0,
              pageCount: 0,
              hasPreviousPage: false,
              hasNextPage: false,
            },
          }
        }
        loading={faceLoading}
      />
    </div>
  )
}
