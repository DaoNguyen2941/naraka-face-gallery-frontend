"use client"

import { useState } from "react"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import CharacterDialog from "./CharacterDialog"
import { Character } from "@/types/character.type"
import characterData from "@/data/characters.json"

export default function CharacterTable() {
  const [characters, setCharacters] = useState<Character[]>(characterData)
  const [selected, setSelected] = useState<Character | null>(null)
  const [open, setOpen] = useState(false)

  const handleSave = (character: Character) => {
    if (character.id) {
      setCharacters(prev => prev.map(c => (c.id === character.id ? character : c)))
    } else {
      const newId = `new-${Date.now()}`
      setCharacters(prev => [...prev, { ...character, id: newId }])
    }
    setOpen(false)
  }

  const handleDelete = (id: string) => {
    setCharacters(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Danh sách nhân vật</h2>
        <Button onClick={() => { setSelected(null); setOpen(true) }}>
          <PlusCircle className="w-4 h-4 mr-2" /> Thêm nhân vật
        </Button>
      </div>
      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={characters}
        searchKey="name"
      />
      <CharacterDialog
        open={open}
        onOpenChange={setOpen}
        character={selected}
        onSave={handleSave}
      />
    </div>
  )

  function handleEdit(character: Character) {
    setSelected(character)
    setOpen(true)
  }
}
