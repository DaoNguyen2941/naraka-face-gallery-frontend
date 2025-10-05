// components/ClientInstructions.tsx
'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useTrackPageView } from "../../hooks/track/useTrackPageView";

function InstructionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full mx-auto aspect-[16/9]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain rounded shadow-md hover:scale-105 transition-transform"
      />
    </div>
  );
}

export default function ClientInstructions() {
  const router = useRouter();
  useTrackPageView()
  return (
    <div className="relative min-h-screen w-full bg-[url('/Naraka.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="backdrop-blur-md bg-black/70 rounded-2xl shadow-lg p-6 space-y-6">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Hướng dẫn sử dụng QR Face để tạo mẫu mặt cho nhân vật Naraka
          </h1>

          <section className="space-y-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay về
            </button>
            <h2 className="text-2xl font-semibold">Bước 1: Tải ảnh QR-Code</h2>
            <p>Tải xuống ảnh QR-Code và lưu vào máy tính. Hình minh họa bên dưới:</p>
            <InstructionImage
              src="https://cdn.narakaqrface.com/public/instructions/b0.png"
              alt="Tải QR-Code"
            />
          </section>

          {/* Các bước tiếp theo... copy y hệt từ trước */}
        </div>
      </div>
    </div>
  );
}
