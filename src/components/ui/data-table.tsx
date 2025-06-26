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
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: keyof TData
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [filter, setFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    state: {
      globalFilter: filter,
    },
    onGlobalFilterChange: setFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId)
      return String(value).toLowerCase().includes(filterValue.toLowerCase())
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {searchKey && (
          <Input
            placeholder="Tìm kiếm..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
        )}

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

      </div>

      <div>
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6">
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
