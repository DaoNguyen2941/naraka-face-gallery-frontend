"use client";
import { notFound } from "next/navigation"
import { useParams } from "next/navigation";
import { useGetCharacter } from "@/app/home/hooks/useGetCharacter";
import FaceGallery from "@/components/FaceGallery";
import { useQuery } from '@tanstack/react-query'
import { PaginationResponse } from "@/types/page.type"
import { PublicFace } from '@/types/face/publicFace.type'
import { useState } from "react"
import { getFaceService } from '@/lib/services/public/face.service'

export default function CharacterPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: characters = [], isLoading } = useGetCharacter()
  const character = characters.find((char) => char.slug === slug)

  if (!isLoading && !character) return notFound()

  const [page, setPage] = useState<number>(1)

  const {
    data: faces,
    isLoading: faceLoading,
  } = useQuery<PaginationResponse<PublicFace>>({
    queryKey: ["Qr-face", page, slug],
    queryFn: () => getFaceService({ page: page, characterSlug: slug, take: 12 }),
  })

  return (
    < div
      className="p-4 min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${character?.avatar})`
      }}>
      <h1 className="text-2xl font-bold mb-4 text-black">Ảnh QR của {character?.name}</h1>
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
    </div >
  )
}

