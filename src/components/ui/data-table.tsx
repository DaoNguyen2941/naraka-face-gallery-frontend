"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: keyof TData
  disableLocalPagination?: boolean
  disableLocalSearch?: boolean
}

export function DataTable<Data, TValue>({
  columns,
  data,
  searchKey,
  disableLocalPagination = false,
  disableLocalSearch = false,
}: DataTableProps<Data, TValue>) {
  const [filter, setFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(disableLocalSearch ? {} : { getFilteredRowModel: getFilteredRowModel() }),
    ...(disableLocalPagination ? {} : { getPaginationRowModel: getPaginationRowModel() }),
    autoResetPageIndex: false,
    state: disableLocalSearch ? {} : { globalFilter: filter },
    onGlobalFilterChange: disableLocalSearch ? undefined : setFilter,
    globalFilterFn: disableLocalSearch
      ? undefined
      : (row, columnId, filterValue) => {
        if (!searchKey) return true
        const value = row.original[searchKey]
        return String(value).toLowerCase().includes(filterValue.toLowerCase())
      },
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {!disableLocalSearch && searchKey && (
          <Input
            placeholder="Tìm kiếm..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
        )}
        {!disableLocalPagination && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Trước
              </Button>
              <span className="text-sm">
                Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
              </span>
              <Button
                variant="default"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Sau
              </Button>
            </div>

            {/* Dropdown chọn pageSize */}
            <div className="flex items-center gap-1">
              <span className="text-sm">Hiển thị:</span>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div>
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* Cột STT */}
                <TableHead>STT</TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="divide-y divide-gray-200">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {/* Cell STT tuyệt đối */}
                  <TableCell>
                    {table.getSortedRowModel().rows.findIndex(r => r.id === row.id) + 1}
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-6">
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
