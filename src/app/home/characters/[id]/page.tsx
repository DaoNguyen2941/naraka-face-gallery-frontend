// app/characters/[id]/page.tsx
import { notFound } from "next/navigation"
import characters from "@/data/characters.json"

type Props = {
  params: { id: string }
}

export default function CharacterPage({ params }: Props) {
  const character = characters.find((char) => char.id === params.id)

  if (!character) return notFound()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ảnh QR của {character.name}</h1>
      <p>(Sẽ hiển thị danh sách ảnh ở đây...)</p>
    </div>
  )
}
