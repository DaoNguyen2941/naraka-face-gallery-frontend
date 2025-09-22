"use client"

import { useState } from "react"
import { albumColumns } from "./AlbumColumn"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import AlbumDialog from "./AlbumDialog"
import { Album } from "@/types/album.type"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getAlbumsService } from "@/lib/services/admin/album"
import { useQueryClient } from "@tanstack/react-query"
import { deleteAlbumService } from "@/lib/services/admin/album"
import { toast } from "sonner"
import ConfirmDialog from "@/app/admin/components/ConfirmDialog"
import { redirect } from 'next/navigation'

export default function AlbumTable() {
    const [selected, setSelected] = useState<Album | null>(null)
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

    const {
        data: album = [],
        isLoading,
        refetch,
    } = useQuery<Album[]>({
        queryKey: ["admin-albums"],
        queryFn: getAlbumsService,
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteAlbumService(id),
        onSuccess(data, deletedId) {
            toast.success('Đã xóa album thành công!')
            queryClient.setQueryData<Album[]>(['admin-albums'], (oldData) => {
                return oldData?.filter(character => character.id !== deletedId) ?? [];
            });
        },
        onError: () => {
            toast.error("Có lỗi khi xóa album")
        },
    })

    function handleEdit(album: Album) {
        setSelected(album)
        setOpen(true)
    }

    const handleSave = (album: Album, isEdit: boolean) => {
        queryClient.setQueryData<Album[]>(['admin-albums'], (old) => {
            if (!old) return [album]
            return isEdit
                ? old.map(c => c.id === album.id ? album : c)
                : [album, ...old]
        })

        // hoặc dùng invalidateQueries nếu không muốn xử lý thủ công
        // queryClient.invalidateQueries({ queryKey: ['admin-characters'] })
        setOpen(false)
    }

    const handleDelete = (id: string) => {
        setDeleteTargetId(id)
    }

    const handleOpen = (slug: string) => {
        redirect(`album/${slug}`)
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
                <h2 className="text-lg font-semibold">Danh sách album</h2>
                <Button onClick={() => { setSelected(null); setOpen(true) }}>
                    <PlusCircle className="w-4 h-4 mr-2" /> Thêm album
                </Button>
            </div>
            <DataTable
                columns={albumColumns(handleEdit, handleDelete, handleOpen)}
                data={album}
                searchKey="name"
            />
            <AlbumDialog
                open={open}
                onOpenChange={setOpen}
                album={selected}
                onSave={handleSave}
            />

            <ConfirmDialog
                open={!!deleteTargetId}
                title="Xác nhận xoá album"
                description="Bạn có chắc chắn muốn xoá album này? Thao tác này không thể hoàn tác."
                onCancel={() => setDeleteTargetId(null)}
                onConfirm={() => handleConfirmDelete(deleteTargetId)}
                confirmText="Xoá"
                cancelText="Huỷ"
            />

        </div>
    )
}
