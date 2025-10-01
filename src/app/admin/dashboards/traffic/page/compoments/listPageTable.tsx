"use client"

import { useState } from "react"
import { PageColumns } from "./PageColumn"
import { DataTable } from "@/components/ui/data-table"
import { useAdminPageTraffic } from "@/app/admin/hooks/useAdminPageTraffic"
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

function formatDate(date: Date) {
  return date.toISOString().split("T")[0]
}

export default function PageTable() {
  const today = new Date()
  const [day, setDate] = useState<string>(formatDate(today))
  const { data: page = [], isLoading } = useAdminPageTraffic({ date: day })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Chọn ngày:</label>
        <Input
          type="date"
          value={day}
          onChange={(e) => setDate(e.target.value)}
          className="w-40 text-black bg-white border border-gray-300"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner className="h-8 w-8 text-orange-500" />
        </div>
      ) : (
        <DataTable
          columns={PageColumns()}
          data={page}
          searchKey="path"
        />
      )}


    </div>
  )
}
