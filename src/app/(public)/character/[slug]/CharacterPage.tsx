"use client";
import { notFound } from "next/navigation"
import { useParams } from "next/navigation";
import { useGetCharacter } from "@/app/(public)/hooks/useGetCharacter";
import FaceGalleryPage from "@/components/FaceGalleryPage";

export default function CharacterPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: characters = [], isLoading } = useGetCharacter()
  const character = characters.find((char) => char.slug === slug)

  if (!isLoading && !character) return notFound()

  return (
    < div
      className="p-4 min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${character?.avatar})`
      }}>
      <h1 className="text-xl font-bold inline-block px-2 py-1 bg-black/90 text-white">
        QR khuân mặt của {character?.name}
      </h1>
      <FaceGalleryPage character={character?.slug} />
    </div >
  )
}

