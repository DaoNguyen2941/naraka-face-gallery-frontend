import { ColumnDef } from "@tanstack/react-table"
import { PageTraffic } from "@/types"

export const PageColumns = (
): ColumnDef<PageTraffic>[] => [
        {
            accessorKey: "path",
            header: "Path",
            cell: ({ row }) => row.original.path,
        },
        {
            accessorKey: "views",
            header: "lượt truy cập",
            cell: ({ row }) => row.original.views,
        },
            {
            accessorKey: "date",
            header: "Ngày",
            cell: ({ row }) => row.original.date,
        },
    ]
