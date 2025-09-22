"use client"

import FaceGalleryPage from "@/components/FaceGalleryPage"
import { FaceSort, FaceSortOption } from "@/lib/services/interface/face"
import WelcomeBox from "@/components/WelcomeBox"
import { Sigmar } from "next/font/google"
import { useSearchParams } from "next/navigation"

const sigmar = Sigmar({
  weight: "400",
  subsets: ["latin"],
})

export default function HomePage() {
  const searchParams = useSearchParams()
  const tags = searchParams.get("tags")?.split(",") ?? undefined
  const rawSearch = searchParams.get('search');
  const search = rawSearch ?? undefined

  return (
    <div className="p-4 space-y-4">
      {/* Banner */}
      <div className="relative w-full h-40 md:h-60 mb-8">
        <img
          src="/banner.png"
          alt="Naraka Banner"
          className="w-full h-40 md:h-60 object-cover rounded shadow"
        />
        <div className="absolute inset-0 bg-black/60 rounded flex flex-col items-center justify-center text-center">
          {/* Title */}
          <h1
            className={`${sigmar.className} text-3xl md:text-6xl font-bold 
              bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 
              bg-clip-text text-transparent leading-tight md:leading-snug pb-1`}
          >
            Tàng Mĩ Quán
          </h1>
          {/* Subtitle */}
          <p
            className={`${sigmar.className} text-sm md:text-lg 
              bg-gradient-to-r from-orange-300 via-yellow-200 to-pink-300 
              bg-clip-text text-transparent mt-1`}
          >
            Nơi lưu trữ và chia sẻ mã Qr làm đẹp cho nhân vật game Naraka:Bladepoint miễn phí
          </p>
        </div>
      </div>

      {/* Welcome box */}
      <WelcomeBox />
      {/* Gallery + Ranking */}
      <FaceGalleryPage search={search}  sort={FaceSort.NEW} tags={tags} showRanking={tags ? false : true} />
    </div>
  )
}
