import { ColumnDef } from "@tanstack/react-table"
import { Character } from "@/types"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import Image from "next/image"

export const columns = (
  onEdit: (character: Character) => void,
  onDelete: (id: string) => void
): ColumnDef<Character>[] => [
  {
    accessorKey: "avatar",
    header: "Ảnh",
    cell: ({ row }) => (
      <div className="w-10 h-10 relative">
        <Image
          src={row.original.avatar.url}
          alt={row.original.name}
          fill
          className="object-cover rounded"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "description",
    header: "Mô tả",
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
