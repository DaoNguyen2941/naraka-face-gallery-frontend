import FaceGalleryPage from "@/components/FaceGalleryPage"
import { FaceSort } from "@/lib/services/interface/face"

export const metadata = {
  title: 'hot | Tàng Mỹ Quán',
  description: 'Danh sách QR Face mới nhất cho các nhân vật Naraka.',
  openGraph: {
    title: 'hot | Tàng Mỹ Quán',
    url: `https://narakaqrface.com/hot`,
    description: 'Danh sách QR Face nhiều lượt xem nhất cho các nhân vật Naraka.',
    images: [{ url: 'https://cdn.narakaqrface.com/public/banner.png', width: 1200, height: 630, alt: 'hot' }],
  },
};

export default function HotPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">🔥 Xem nhiều nhất</h1>
      <FaceGalleryPage sort={FaceSort.HOT} />
    </div>
  )
}
