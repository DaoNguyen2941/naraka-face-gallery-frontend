'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import FaceGallery from '@/components/FaceGallery'
import { PaginationResponse } from "@/types/page.type"
import { PublicFace } from '@/types/face/publicFace.type'
import { useState } from "react"
import { getFaceService } from '@/lib/services/public/face.service'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useGetCharacter } from './hooks/useGetCharacter'
import WelcomeBox from '@/components/WelcomeBox'

export default function HomePage() {
  const searchParams = useSearchParams()
  const tags = searchParams.get("tags")?.split(",") ?? []
  const [page, setPage] = useState<number>(1)

  const {
    data: faces,
    isLoading: faceLoading,
  } = useQuery<PaginationResponse<PublicFace>>({
    queryKey: ["Qr-face", page, tags],
    queryFn: () => getFaceService({ page, tagSlugs: tags, take: 12 }),
  })

  return (
    <div className="p-4 space-y-4">
      {/* Hình ảnh đầu trang */}
      <div className="relative w-full h-40 md:h-60 mb-16">
        <img
          src="/banner.png"
          alt="Naraka Banner"
          className="w-full h-40 md:h-60 object-cover rounded shadow"
        />
        <div className="absolute inset-0 bg-black/10 rounded flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold">Naraka Make Up</h1>
          <p className="text-sm md:text-lg text-gray-200 mt-1">
            Bộ sưu tập QR face code của Naraka
          </p>
        </div>
      </div>

      <WelcomeBox/>

      {/* Gallery */}
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
