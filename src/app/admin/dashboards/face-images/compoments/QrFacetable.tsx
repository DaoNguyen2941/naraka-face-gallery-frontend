"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import FaceDialog from "./FaceDialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteQrFaceService } from "@/lib/services/admin/face"
import { toast } from "sonner"
import ConfirmDialog from "@/app/admin/components/ConfirmDialog"
import { Face } from "@/types/face/face.type"
import { useAdminTags } from "@/app/admin/hooks/useAdminTags"
import { PaginationResponse } from "@/types/page.type"
import FaceCardGrid from "./FaceCardGrid"
import { useAdminFaces } from "@/app/admin/hooks/useAdminFaces"
import { Input } from "@/components/ui/input"
import TagFilterDialog from "@/components/TagFilterDialog"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import {SlidersHorizontal} from 'lucide-react'

export default function QrFaceTable() {
    const [selected, setSelected] = useState<Face | null>(null)
    const [open, setOpen] = useState(false)
    const [deleteQrFaceId, setDeleteQrFaceId] = useState<string | null>(null)
    const [search, setSearch] = useState("")
    const queryClient = useQueryClient()
    const { data: tagList } = useAdminTags()
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(12)
    const [showTagFilter, setShowTagFilter] = useState(false)
    const [tagFilter, setTagFilter] = useState<string[]>([])
    const { data: faces, isLoading } = useAdminFaces({ page, pageSize, tagFilter });

    const { mutate } = useMutation({
        mutationFn: (id: string) => DeleteQrFaceService(id),
        onSuccess(_, faceId) {
            toast.success("Đã xóa khuôn mặt thành công!")
            queryClient.setQueryData<PaginationResponse<Face>>(
                ["admin-Qr-face", page, pageSize, tagFilter],
                (old) => {
                    if (!old) return old
                    return {
                        ...old,
                        data: old.data.filter((face) => face.id !== faceId),
                    }
                }
            )
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
        queryClient.setQueryData<PaginationResponse<Face> | undefined>(
            ["admin-Qr-face", page, pageSize, tagFilter],
            (old) => {
                if (!old) {
                    // Trường hợp cache chưa có gì
                    return {
                        data: [face],
                        meta: {
                            page: 1,
                            take: pageSize,
                            itemCount: 1,
                            pageCount: 1,
                            hasPreviousPage: false,
                            hasNextPage: false,
                        },
                    } satisfies PaginationResponse<Face>;
                }

                // Cập nhật khi đã có dữ liệu
                const newData = isEdit
                    ? old.data.map((t) => (t.id === face.id ? face : t))
                    : [face, ...old.data];

                const newItemCount = isEdit ? old.meta.itemCount : old.meta.itemCount + 1;
                const newPageCount = Math.ceil(newItemCount / old.meta.take);

                return {
                    ...old,
                    data: newData,
                    meta: {
                        ...old.meta,
                        itemCount: newItemCount,
                        pageCount: newPageCount,
                    },
                } satisfies PaginationResponse<Face>;
            }
        );

        setOpen(false);
    };



    const handleDelete = (id: string) => {
        setDeleteQrFaceId(id)
    }

    const handleConfirmDelete = (qrFakeId: string | null) => {
        if (qrFakeId) {
            mutate(qrFakeId)
            setDeleteQrFaceId(null)
        }
    }

    const handleNextPage = () => {
        if (faces?.meta.hasNextPage) {
            setPage(page + 1)
        }
    }

    const handlePreviousPage = () => {
        if (faces?.meta.hasPreviousPage) {
            setPage(page - 1)
        }
    }

    const handleApplyFilter = (tagSlug: string[]) => {
        setTagFilter(tagSlug)
    }

    const filteredFaces = (faces?.data ?? []).filter((face) =>
        face.title.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">Danh sách QR khuôn mặt</h2>
                </div>
                <Button onClick={() => { setSelected(null); setOpen(true) }}>
                    <PlusCircle className="w-4 h-4 mr-2" /> Thêm khuôn mặt
                </Button>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">

                    <Input
                        type="text"
                        placeholder="Tìm theo tên..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-95"
                    />

                    <button
                        onClick={() => setShowTagFilter(true)}
                        className="p-2 hover:bg-gray-800 rounded"
                        title="Lọc theo nhãn"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handlePreviousPage}
                            disabled={!faces?.meta.hasPreviousPage}
                        >
                            Trước
                        </Button>
                        <span className="text-sm">
                            Trang {page} / {faces?.meta.pageCount}
                        </span>
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handleNextPage}
                            disabled={!faces?.meta.hasNextPage}
                        >
                            Sau
                        </Button>
                    </div>

                    {/* Dropdown chọn pageSize */}
                    <div className="flex items-center gap-1">
                        <span className="text-sm">Hiển thị:</span>
                        <select
                            className="border rounded px-2 py-1 text-sm"
                            value={pageSize}
                            onChange={(e) => {
                                console.log(e.target.value);

                                setPageSize(Number(e.target.value))
                                setPage(1)
                            }}
                        >
                            {[12, 24, 48].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <LoadingSpinner className="h-8 w-8 text-orange-500" />
                </div>
            ) : (
                <FaceCardGrid
                    data={filteredFaces}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
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
            <TagFilterDialog
                isOpen={showTagFilter}
                onClose={() => setShowTagFilter(false)}
                onApply={(tagSlugs) => {
                    handleApplyFilter(tagSlugs)
                }}
                tags={tagList}
            />
        </div>
    )
}
