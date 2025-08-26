"use client"

import { useState } from "react"
import { TagColumns } from "./tagColumn"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import TagDialog from "./tagDialog"
import { Tag } from "@/types/tag.type"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getTagsService } from "@/lib/services/admin/tag"
import { useQueryClient } from "@tanstack/react-query"
import { deleteTagService } from "@/lib/services/admin/tag"
import { toast } from "sonner"
import ConfirmDialog from "@/app/admin/components/ConfirmDialog"

export default function TagTable() {
    const [selected, setSelected] = useState<Tag | null>(null)
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

    const {
        data: tags = [],
        isLoading,
        refetch,
    } = useQuery<Tag[]>({
        queryKey: ["admin-tags"],
        queryFn: getTagsService,
    })

    const { mutate, isPending } = useMutation({
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
                <h2 className="text-lg font-semibold">Danh sách nhân vật</h2>
                <Button onClick={() => { setSelected(null); setOpen(true) }}>
                    <PlusCircle className="w-4 h-4 mr-2" /> Thêm nhân vật
                </Button>
            </div>
            <DataTable
                columns={TagColumns(handleEdit, handleDelete)}
                data={tags}
                searchKey="name"
            />
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
