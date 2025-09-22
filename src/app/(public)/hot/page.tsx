import FaceGalleryPage from "@/components/FaceGalleryPage"
import { FaceSort } from "@/lib/services/interface/face"

export default function HotPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">🔥 Xem nhiều nhất</h1>
      <FaceGalleryPage sort={FaceSort.HOT} />
    </div>
  )
}
