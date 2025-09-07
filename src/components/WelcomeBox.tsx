import Image from "next/image"
import Link from "next/link"

export default function WelcomeBox() {
  return (
    <div className="flex items-center gap-4 bg-gray-900 text-white p-4 rounded-lg shadow">
      {/* Nhân vật bên trái */}
      <Image
        src="/yotohime-removebg-preview.png" // đổi thành đường dẫn ảnh chibi bạn có
        alt="Chibi"
        width={100}
        height={100}
       unoptimized 
      />

      {/* Nội dung */}
      <div className="space-y-1 text-sm md:text-base leading-tight">
        <p>
          <span className="font-bold text-cyan-400">
            Hoan Nghênh Đạo Hữu Đã Ghé Thăm NarakaMakeUp
          </span>
        </p>
        <p>
       
        </p>
        <p>
      
        </p>
      </div>
    </div>
  )
}
