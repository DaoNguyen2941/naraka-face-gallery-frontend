import { ColumnDef } from "@tanstack/react-table"
import { Tag } from "@/types/tag.type"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import { Face } from "@/types/face.type"
export const FaceColumns = (
  onEdit: (face: Face) => void,
  onDelete: (id: string) => void
): ColumnDef<Face>[] => [
    {
      accessorKey: "name",
      header: "Tên thẻ",
      cell: ({ row }) => row.original.title,
    },
    // {
    //   accessorKey: "avatar",
    //   header: "Ảnh",
    //   cell: ({ row }) => (
    //     <img
    //       src={row.original.avatar.url}
    //       alt={row.original.name}
    //       className="w-10 h-10  object-cover"
    //     />
    //   ),
    // },
    {
      accessorKey: "description",
      header: "Mô tả thẻ",
      cell: ({ row }) => row.original.description,
    },
    {
      id: "actions",
      header: "Hành động",
      cell: ({ row }) => (
        <div className="flex gap-2">
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
