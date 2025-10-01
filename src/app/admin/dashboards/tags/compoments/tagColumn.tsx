import { ColumnDef } from "@tanstack/react-table"
import { Tag } from "@/types/tag/tag.type"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"

export const TagColumns = (
  onEdit: (character: Tag) => void,
  onDelete: (id: string) => void
): ColumnDef<Tag>[] => [
    {
      accessorKey: "name",
      header: "Tên thẻ",
      cell: ({ row }) => row.original.name,
    },
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
