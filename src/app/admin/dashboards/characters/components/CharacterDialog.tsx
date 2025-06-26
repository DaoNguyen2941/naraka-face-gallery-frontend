"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Character = {
  id: string
  name: string
  avatar?: string
  slug: string
  description: string
  faces: string[]
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  character: Character | null
  onSave: (character: Character) => void
}

export default function CharacterDialog({
  open,
  onOpenChange,
  character,
  onSave,
}: Props) {
  const [name, setName] = useState("")
  const [avatar, setAvatar] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (character) {
      setName(character.name ?? "")
      setAvatar(character.avatar ?? "")
      setSlug(character.slug ?? "")
      setDescription(character.description ?? "")
    } else {
      setName("")
      setAvatar("")
      setSlug("")
      setDescription("")
    }
  }, [character])

  const handleSubmit = () => {
    const newCharacter: Character = {
      id: character?.id ?? "", // Nếu không có, cha component sẽ generate ID
      name,
      avatar,
      slug,
      description,
      faces: character?.faces ?? [],
    }
    onSave(newCharacter)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{character ? "Chỉnh sửa nhân vật" : "Thêm nhân vật"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Tên</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Slug</label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Mô tả</label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Avatar URL</label>
            <Input value={avatar} onChange={(e) => setAvatar(e.target.value)} />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>{character ? "Lưu" : "Thêm mới"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
