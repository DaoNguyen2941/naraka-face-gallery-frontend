"use client"

import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { PlusCircle } from "lucide-react"

import { columns } from "./Columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import CharacterDialog from "./CharacterDialog"
import ConfirmDialog from "@/app/admin/components/ConfirmDialog"

import { Character } from "@/types"
import { useAdminCharacterList } from "@/app/admin/hooks/useAdminCharacterList"
import { DeleteCharacterService } from "@/lib/services/admin/characters"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

export default function CharacterTable() {
  const [selected, setSelected] = useState<Character | null>(null)
  const [open, setOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const { data: characters = [], isLoading } = useAdminCharacterList()

  const { mutate } = useMutation({
    mutationFn: (id: string) => DeleteCharacterService(id),
    onSuccess(_, deletedId) {
      toast.success("Đã xóa nhân vật thành công!")
      queryClient.setQueryData<Character[]>(["admin-characters"], (old) =>
        old?.filter((c) => c.id !== deletedId) ?? []
      )
    },
    onError: () => {
      toast.error("Có lỗi khi xóa nhân vật")
    },
  })

  const handleEdit = (character: Character) => {
    setSelected(character)
    setOpen(true)
  }

  const handleSave = (character: Character, isEdit: boolean) => {
    queryClient.setQueryData<Character[]>(["admin-characters"], (old) => {
      if (!old) return [character]
      return isEdit
        ? old.map((c) => (c.id === character.id ? character : c))
        : [character, ...old]
    })
    setOpen(false)
  }

  const handleDelete = (id: string) => setDeleteTargetId(id)

  const handleConfirmDelete = (id: string | null) => {
    if (id) {
      mutate(id)
      setDeleteTargetId(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Danh sách nhân vật</h2>
        <Button onClick={() => { setSelected(null); setOpen(true) }}>
          <PlusCircle className="w-4 h-4 mr-2" /> Thêm nhân vật
        </Button>
      </div>

      {/* Table or Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner className="h-8 w-8 text-orange-500" />
        </div>
      ) : (
        <DataTable
          columns={columns(handleEdit, handleDelete)}
          data={characters}
          searchKey="name"
        />
      )}

      {/* Dialogs */}
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
