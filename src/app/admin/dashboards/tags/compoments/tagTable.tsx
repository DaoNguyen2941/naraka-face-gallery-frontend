"use client"

import { useState } from "react"
import { TagColumns } from "./TagColumn"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import TagDialog from "./TagDialog"
import { Tag } from "@/types/tag/tag.type"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { deleteTagService } from "@/lib/services/admin/tag"
import { toast } from "sonner"
import ConfirmDialog from "@/app/admin/components/ConfirmDialog"
import { useAdminTags } from "@/app/admin/hooks/useAdminTags"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

export default function TagTable() {
    const [selected, setSelected] = useState<Tag | null>(null)
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
    const { data: tags = [], isLoading } = useAdminTags()

    const { mutate } = useMutation({
        mutationFn: (id: string) => deleteTagService(id),
        onSuccess(data, tagId) {
            toast.success('Đã xóa thẻ thành công thành công!')
            queryClient.setQueryData<Tag[]>(['admin-tags'], (oldData) => {
                return oldData?.filter(tags => tags.id !== tagId) ?? [];
            });
        },
        onError: () => {
            toast.error("Có lỗi khi xóa thẻ")
        },
    })

    function handleEdit(tag: Tag) {
        setSelected(tag)
        setOpen(true)
    }

    const handleSave = (tag: Tag, isEdit: boolean) => {
        queryClient.setQueryData<Tag[]>(['admin-tags'], (old) => {
            if (!old) return [tag]
            return isEdit
                ? old.map(t => t.id === tag.id ? tag : t)
                : [tag, ...old]
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
                <h2 className="text-lg font-semibold">Danh sách thẻ</h2>
                <Button onClick={() => { setSelected(null); setOpen(true) }}>
                    <PlusCircle className="w-4 h-4 mr-2" /> Thêm thẻ
                </Button>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <LoadingSpinner className="h-8 w-8 text-orange-500" />
                </div>
            ) : (
                <DataTable
                    columns={TagColumns(handleEdit, handleDelete)}
                    data={tags}
                    searchKey="name"
                />
            )}

            <TagDialog
                open={open}
                onOpenChange={setOpen}
                tag={selected}
                onSave={handleSave}
            />

            <ConfirmDialog
                open={!!deleteTargetId}
                title="Xác nhận xoá thẻ này?"
                description="Bạn có chắc chắn muốn xoá thẻ này? Thao tác này không thể hoàn tác."
                onCancel={() => setDeleteTargetId(null)}
                onConfirm={() => handleConfirmDelete(deleteTargetId)}
                confirmText="Xoá"
                cancelText="Huỷ"
            />
        </div>
    )
}
