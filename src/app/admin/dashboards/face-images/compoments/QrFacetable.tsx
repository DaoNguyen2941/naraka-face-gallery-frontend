"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import FaceDialog from "./FaceDialog"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getFaceService } from "@/lib/services/admin/face"
import { DeleteQrFaceService } from "@/lib/services/admin/face"
import { toast } from "sonner"
import ConfirmDialog from "@/app/admin/components/ConfirmDialog"
import { Face } from "@/types/face.type"
import { useAdminTags } from "@/app/admin/hooks/useAdminTags"

export default function QrFaceTable() {
    const [selected, setSelected] = useState<Face | null>(null)
    const [open, setOpen] = useState(false)
    const [deleteQrFaceId, setDeleteQrFaceId] = useState<string | null>(null)
    const [search, setSearch] = useState("")
    const queryClient = useQueryClient()
    const { data: tagList, isLoading: tagsLoading } = useAdminTags()

    const {
        data: faces = [],
        isLoading,
    } = useQuery<Face[]>({
        queryKey: ["admin-Qr-face"],
        queryFn: getFaceService,
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => DeleteQrFaceService(id),
        onSuccess(data, tagId) {
            toast.success("Đã xóa khuôn mặt thành công!")
            queryClient.setQueryData<Face[]>(["admin-Qr-face"], (oldData) => {
                return oldData?.filter((face) => face.id !== tagId) ?? []
            })
        },
        onError: () => {
            toast.error("Có lỗi khi xóa mẫu khuôn mặt")
        },
    })

    const handleEdit = (face: Face) => {
        setSelected(face)
        setOpen(true)
    }

    const handleSave = (face: Face, isEdit: boolean) => {
        queryClient.setQueryData<Face[]>(["admin-Qr-face"], (old) => {
            if (!old) return [face]
            return isEdit
                ? old.map((t) => (t.id === face.id ? face : t))
                : [face, ...old]
        })
        setOpen(false)
    }

    const handleDelete = (id: string) => {
        setDeleteQrFaceId(id)
    }

    const handleConfirmDelete = (qrFakeId: string | null) => {
        if (qrFakeId) {
            mutate(qrFakeId)
            setDeleteQrFaceId(null)
        }
    }

    const filteredFaces = faces.filter((face) =>
        face.title.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">Danh sách QR khuôn mặt</h2>
                    <input
                        type="text"
                        placeholder="Tìm theo tên..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mt-2 border rounded px-3 py-1 w-64 text-sm"
                    />
                </div>
                <Button onClick={() => { setSelected(null); setOpen(true) }}>
                    <PlusCircle className="w-4 h-4 mr-2" /> Thêm khuôn mặt
                </Button>
            </div>

            {isLoading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredFaces.map((face) => (
                        <div
                            key={face.id}
                            className="border rounded-lg overflow-hidden shadow-sm relative group transition hover:shadow-md"
                        >
                            <img
                                src={face.qrCodeGlobals.url}
                                alt={face.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-2">
                                <h3 className="font-medium text-sm truncate">{face.title}</h3>
                            </div>
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="text-xs"
                                    onClick={() => handleEdit(face)}
                                >
                                    ✏️
                                </Button>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    className="text-xs"
                                    onClick={() => handleDelete(face.id)}
                                >
                                    🗑️
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <FaceDialog
                open={open}
                onOpenChange={setOpen}
                face={selected}
                tags={tagList}
                onSave={handleSave}
            />

            <ConfirmDialog
                open={!!deleteQrFaceId}
                title="Xác nhận xoá QR mặt này?"
                description="Bạn có chắc chắn muốn xoá mẫu khuôn mặt này? Thao tác này không thể hoàn tác."
                onCancel={() => setDeleteQrFaceId(null)}
                onConfirm={() => handleConfirmDelete(deleteQrFaceId)}
                confirmText="Xoá"
                cancelText="Huỷ"
            />
        </div>
    )
}
