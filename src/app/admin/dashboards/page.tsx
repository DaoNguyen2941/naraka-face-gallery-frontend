"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users, ImageIcon, Folder } from "lucide-react"
import StatsChart from "../components/statsChart"
import { useAdminCharacterList } from "../hooks/useAdminCharacterList"
import { useAdminFaces } from "../hooks/useAdminFaces"
import { useAdminTags } from "../hooks/useAdminTags"
import { useState } from "react"

export default function AdminHome() {
  const [pageSize, setPageSize] = useState<number>(12)
  const [tagFilter, setTagFilter] = useState<string[]>([])

  const { data: tags = [], isLoading: tagLoading } = useAdminTags()
  const { data: faces, isLoading: faceLoading } = useAdminFaces({ page: 1, pageSize:12 });
  const { data: characters = [], isLoading: characterLoading } = useAdminCharacterList()

  const stats = {
    characters: 12,
    faces: 48,
    categories: 6,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Chào mừng đến trang quản trị</h1>
        <p className="text-muted-foreground">Quản lý dữ liệu cho Naraka QR Face Gallery.</p>
      </div>

      {/* Thống kê */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nhân vật</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{characters.length}</div>
            <p className="text-xs text-muted-foreground">Tổng số nhân vật</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ảnh mặt</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faces?.meta.itemCount}</div>
            <p className="text-xs text-muted-foreground">Tổng số ảnh khuôn mặt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nhãn</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tags.length}</div>
            <p className="text-xs text-muted-foreground">Số danh mục ảnh</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Album</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tags.length}</div>
            <p className="text-xs text-muted-foreground">Số danh mục ảnh</p>
          </CardContent>
        </Card>
      </div>
      <hr className="my-4 border-muted" />
      <StatsChart />
    </div>
  )
}
