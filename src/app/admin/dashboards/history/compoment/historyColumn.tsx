import { ColumnDef } from "@tanstack/react-table"
import { History } from "@/types"

export const HistoryColumns = (): ColumnDef<History>[] => [
    {
        accessorKey: "module",
        header: "Bản ghi",
        cell: ({ row }) => row.original.module,
    },
    {
        accessorKey: "action",
        header: "Hành động",
        cell: ({ row }) => row.original.action,
    },
    {
        accessorKey: "createdAt",
        header: "Thời gian",
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt)
            // Hiển thị dạng "23/09/2025 11:07:23"
            return date.toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })
        },
    },
    {
        accessorKey: "adminId",
        header: "AdminId",
        cell: ({ row }) => row.original.adminId,
    },
    {
        accessorKey: "recordId",
        header: "Id bản ghi",
        cell: ({ row }) => row.original.recordId,
    },

]
