"use client"

import { useState } from "react"
import { HistoryColumns } from "./historyColumn"
import { DataTable } from "@/components/ui/data-table"
import { useAdminHistory } from "@/app/admin/hooks/useAdminHistory"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import { ServerDataTable } from "@/components/ServerDataTable"

function formatDate(date: Date) {
    return date.toISOString().split("T")[0]
}

export default function HistoryTable() {
    const today = new Date()
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(today.getDate() - 7)
    const [page, setPage] = useState<number>(1)

    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [fromDate, setFromDate] = useState<string>(formatDate(sevenDaysAgo))
    const [toDate, setToDate] = useState<string>(formatDate(today))
    const { data: history, isLoading } = useAdminHistory({ page, order: "DESC", toDate, fromDate })
    const [pageSize, setPageSize] = useState<number>(12)
    const [search, setSearch] = useState('')
    const handleNextPage = () => {
        if (history?.meta.hasNextPage) {
            setPage(page + 1)
        }
    }

    const handlePreviousPage = () => {
        if (history?.meta.hasPreviousPage) {
            setPage(page - 1)
        }
    }

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                {/* Hàng 1: Filter ngày */}
                <div className="flex items-center gap-2">
                    <span className="text-black font-medium">Từ</span>
                    <Input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-40 text-black bg-white border border-gray-300"
                    />
                    <span className="text-black font-medium">Đến</span>
                    <Input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-40 text-black bg-white border border-gray-300"
                    />
                </div>

                {/* Hàng 2: Search + Pagination + PageSize */}
                <div className="flex justify-between items-center flex-wrap gap-4">
                    {/* Search bên trái */}
                    <Input
                        placeholder="Tìm kiếm module..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-64"
                    />

                    {/* Pagination + PageSize bên phải */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="default"
                                size="sm"
                                onClick={handlePreviousPage}
                                disabled={!history?.meta.hasPreviousPage}
                            >
                                Trước
                            </Button>
                            <span className="text-sm">
                                Trang {page} / {history?.meta.pageCount}
                            </span>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={handleNextPage}
                                disabled={!history?.meta.hasNextPage}
                            >
                                Sau
                            </Button>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="text-sm">Hiển thị:</span>
                            <select
                                className="border rounded px-2 py-1 text-sm"
                                value={pageSize}
                                onChange={(e) => {
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
            </div>


            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <LoadingSpinner className="h-8 w-8 text-orange-500" />
                </div>
            ) : (
                <ServerDataTable
                    columns={HistoryColumns()}
                    data={history?.data ?? []}
                    searchKey="module"
                />
            )}
        </div>
    )
}
