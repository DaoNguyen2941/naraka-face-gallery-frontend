import Link from "next/link"
import characters from "@/data/characters.json"

export default function CharacterSidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r min-h-full">
      <h2 className="text-lg font-semibold mb-4">Nhân vật</h2>
      <ul className="space-y-2">
        {characters.map((char) => (
          <li key={char.id}>
            <Link
              href={`/characters/${char.id}`}
              className="text-blue-600 hover:underline"
            >
              {char.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
