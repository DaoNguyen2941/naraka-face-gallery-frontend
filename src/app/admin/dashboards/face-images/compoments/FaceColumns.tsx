import { ColumnDef } from "@tanstack/react-table"
import { Face } from "@/types/face/face.type"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"

export const FaceColumns = (
  onEdit: (character: Face) => void,
  onDelete: (id: string) => void
): ColumnDef<Face>[] => [
    {
      accessorKey: "title",
      header: "Tên",
      cell: ({ row }) => row.original.title,
    },
    {
      accessorKey: "character",
      header: "Nhân vật",
      cell: ({ row }) => row.original.character.name,
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
