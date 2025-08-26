import { ColumnDef } from "@tanstack/react-table"
import { Album } from "@/types/album.type"
import { Button } from "@/components/ui/button"
import { Pencil, Trash, FolderOpenDot  } from "lucide-react"
import { redirect } from 'next/navigation'

export const albumColumns = (
    onEdit: (album: Album) => void,
    onDelete: (id: string) => void,
    onOpen: (slug: string) => void
): ColumnDef<Album>[] => [
        {
            accessorKey: "name",
            header: "Tên",
            cell: ({ row }) => row.original.name,
        },
        {
            accessorKey: "avatar",
            header: "Ảnh",
            cell: ({ row }) => (
                <img
                    src={row.original.cover_photo.url}
                    alt={row.original.name}
                    className="w-10 h-10  object-cover"
                />
            ),
        },
        {
            accessorKey: "description",
            header: "Mô tả",
            cell: ({ row }) => row.original.description,
        },
        {
            accessorKey: "items",
            header: "Số lượng mục",
            cell: ({ row }) => row.original.slug,
        },
        {
            id: "actions",
            header: "Hành động",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>onOpen(row.original.slug)}
                    >
                        <FolderOpenDot className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onEdit(row.original)}
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(row.original.id)}
                    >
                        <Trash className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ]
