"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Users, ImageIcon } from "lucide-react"

export default function AdminHome() {
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
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Tổng số nhân vật</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Số ảnh mặt</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Ảnh QR khuôn mặt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Số danh mục</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Ảnh QR khuôn mặt</p>
          </CardContent>
        </Card>
      </div>

      {/* Hành động nhanh */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Hành động nhanh</h2>
        <div className="flex gap-2 flex-wrap">
          <Link href="/admin/dashboards/characters">
            <Button variant="default">
              <Plus className="mr-2 h-4 w-4" />
              Quản lý nhân vật
            </Button>
          </Link>
          <Link href="/admin/images">
            <Button variant="secondary">
              <ImageIcon className="mr-2 h-4 w-4" />
              Quản lý ảnh mặt
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
