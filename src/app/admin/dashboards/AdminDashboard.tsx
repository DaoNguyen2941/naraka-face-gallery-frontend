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

export default function AdminDashboard() {
  const { data: tags = [], isLoading: tagLoading } = useAdminTags()
  const { data: faces, isLoading: faceLoading } = useAdminFaces({ page: 1, pageSize: 12 })
  const { data: characters = [], isLoading: characterLoading } = useAdminCharacterList()

  // Helper để hiển thị số liệu hoặc skeleton
  const renderStat = (loading: boolean, value: number | undefined) => {
    if (loading) {
      return <span className="inline-block h-6 w-12 bg-gray-200 animate-pulse rounded"></span>
    }
    return value ?? 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Chào mừng đến trang quản trị</h1>
        <p className="text-muted-foreground">Quản lý dữ liệu cho Naraka QR Face Gallery.</p>
      </div>

      {/* Thống kê */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nhân vật</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{renderStat(characterLoading, characters.length)}</div>
            <p className="text-xs text-muted-foreground">Tổng số nhân vật</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ảnh mặt</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {renderStat(faceLoading, faces?.meta.itemCount)}
            </div>
            <p className="text-xs text-muted-foreground">Tổng số ảnh khuôn mặt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nhãn</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{renderStat(tagLoading, tags.length)}</div>
            <p className="text-xs text-muted-foreground">Số danh mục ảnh</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Album</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{renderStat(tagLoading, tags.length)}</div>
            <p className="text-xs text-muted-foreground">Số danh mục ảnh</p>
          </CardContent>
        </Card>
      </div>

      <hr className="my-4 border-muted" />

      {/* Chart */}
      {faceLoading || characterLoading || tagLoading ? (
        <div className="h-64 w-full bg-gray-200 animate-pulse rounded"></div>
      ) : (
        <StatsChart />
      )}
    </div>
  )
}
