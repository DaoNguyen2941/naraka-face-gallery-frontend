import FaceGalleryPage from "@/components/FaceGalleryPage"
import { FaceSort } from "@/lib/services/interface/face"

export const metadata = {
  title: 'new | Tàng Mỹ Quán',
  description: 'Danh sách QR Face mới nhất cho các nhân vật Naraka.',
  openGraph: {
    title: 'new | Tàng Mỹ Quán',
    url: `https://narakaqrface.com/new`,
    description: 'Danh sách QR Face mới nhất cho các nhân vật Naraka.',
    images: [{ url: 'https://cdn.narakaqrface.com/public/banner.png', width: 1200, height: 630, alt: 'new' }],
  },
};
export default function NewPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">🔥 Mới cập nhật</h1>
      <FaceGalleryPage sort={FaceSort.NEW} />
    </div>
  )
}
