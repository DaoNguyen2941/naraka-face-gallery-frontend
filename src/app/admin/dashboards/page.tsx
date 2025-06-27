"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users, ImageIcon, Folder } from "lucide-react"

export default function AdminHome() {
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
            <div className="text-2xl font-bold">{stats.characters}</div>
            <p className="text-xs text-muted-foreground">Tổng số nhân vật</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ảnh mặt</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.faces}</div>
            <p className="text-xs text-muted-foreground">Tổng số ảnh khuôn mặt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Danh mục</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories}</div>
            <p className="text-xs text-muted-foreground">Số danh mục ảnh</p>
          </CardContent>
        </Card>
      </div>

      <hr className="my-4 border-muted" />

      <h2 className="text-lg font-semibold">Truy cập gần đây</h2>
      <p className="text-sm text-muted-foreground">Hiển thị những trang bạn mới vào gần đây.</p>

    </div>
  )
}
