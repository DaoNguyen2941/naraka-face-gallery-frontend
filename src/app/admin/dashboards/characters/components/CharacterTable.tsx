"use client"

import { useState } from "react"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import CharacterDialog from "./CharacterDialog"
import { Character } from "@/types/character.type"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getCharactersService } from "@/lib/services/admin/characters"
import { useQueryClient } from "@tanstack/react-query"
import { DeleteCharacterService } from "@/lib/services/admin/characters"
import { toast } from "sonner"
import ConfirmDialog from "@/app/admin/components/ConfirmDialog"

export default function CharacterTable() {
  const [selected, setSelected] = useState<Character | null>(null)
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  const {
    data: characters = [],
    isLoading,
    refetch,
  } = useQuery<Character[]>({
    queryKey: ["admin-characters"],
    queryFn: getCharactersService,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => DeleteCharacterService(id),
    onSuccess(data, deletedId) {
      toast.success('Đã xóa nhân vật thành công!')
      queryClient.setQueryData<Character[]>(['admin-characters'], (oldData) => {
        return oldData?.filter(character => character.id !== deletedId) ?? [];
      });
    },
    onError: () => {
      toast.error("Có lỗi khi xóa nhân vật")
    },
  })

  function handleEdit(character: Character) {
    setSelected(character)
    setOpen(true)
  }

  const handleSave = (character: Character, isEdit: boolean) => {
    queryClient.setQueryData<Character[]>(['admin-characters'], (old) => {
      if (!old) return [character]
      return isEdit
        ? old.map(c => c.id === character.id ? character : c)
        : [character, ...old]
    })

    // hoặc dùng invalidateQueries nếu không muốn xử lý thủ công
    // queryClient.invalidateQueries({ queryKey: ['admin-characters'] })
    setOpen(false)
  }

  const handleDelete = (id: string) => {
    setDeleteTargetId(id)
  }

  const handleConfirmDelete = (deleteTargetId: string | null) => {
    if (deleteTargetId) {
      mutate(deleteTargetId)
      setDeleteTargetId(null)
    }
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

      <ConfirmDialog
        open={!!deleteTargetId}
        title="Xác nhận xoá nhân vật"
        description="Bạn có chắc chắn muốn xoá nhân vật này? Thao tác này không thể hoàn tác."
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={() => handleConfirmDelete(deleteTargetId)}
        confirmText="Xoá"
        cancelText="Huỷ"
      />

    </div>
  )
}
