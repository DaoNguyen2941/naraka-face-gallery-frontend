"use client";

import FaceGalleryPage from "@/components/FaceGalleryPage"
import { FaceSort } from "@/types"

export default function NewPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">🔥 Mới cập nhật</h1>
      <FaceGalleryPage sort={FaceSort.NEW} />
    </div>
  )
}
