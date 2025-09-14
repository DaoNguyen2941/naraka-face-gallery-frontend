import Image from "next/image"
import Link from "next/link"

export default function WelcomeBox() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-900 text-white p-4 rounded-lg shadow">
      {/* Nhân vật bên trái */}
      <Image
        src="/image.gif"
        alt="Chibi"
        width={60}
        height={60}
        unoptimized
        className="hover:scale-110 transition-transform duration-300"
      />

      {/* Nội dung */}
      <div className="space-y-2 text-sm md:text-base leading-tight">
        <p>
          <span className="font-bold text-cyan-400">
            Chào Mừng Đạo Hữu Đã Ghé Thăm Tàng Mĩ Quán.
          </span>
        </p>
        <p>
          Tàng quán đang trong giai đoạn thử nghiệm
          và sẽ chính thức khai trương trong thời gian tới.
        </p>
        <p>Sau khi khai trương sẽ mở thêm nhiều mục mới</p>
      </div>
    </div>
  )
}
