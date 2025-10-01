"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getFaceDetailsService } from "@/lib/services/public/face.service";
import { useMutation } from "@tanstack/react-query";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { downloadQrFileService } from "@/lib/services/public/face.service";
import { useTrackFaceView } from "../../hooks/track/useTrackFaceView";
import { ROUTES } from "@/lib/constants/routes";
import { useParams } from "next/navigation";

export default function FaceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const router = useRouter();
  useTrackFaceView(slug)

  const {
    data: faceData,
    isPending,
    mutate: fetchFace,
  } = useMutation({
    mutationFn: (slug: string) => getFaceDetailsService(slug),
  });

  const {
    mutate: downloadQr,
  } = useMutation({
    mutationFn: ({ urlFile, slug }: { urlFile: string; slug: string }) =>
      downloadQrFileService(urlFile, slug),
  });


  // Fetch mỗi khi slug thay đổi
  useEffect(() => {
    if (slug) fetchFace(slug);
  }, [slug, fetchFace]);

  // Loading / chưa có data
  if (isPending || !faceData) return <p className="p-6">Loading...</p>;

  // Chuẩn bị slides cho Lightbox
  const slides = [
    ...(faceData.imageReviews?.map((url) => ({ src: url })) ?? []),
    ...(faceData.qrCodeCN ? [{ src: faceData.qrCodeCN }] : []),
    ...(faceData.qrCodeGlobals ? [{ src: faceData.qrCodeGlobals }] : []),
  ];

  const handleDownload = async (url: string) => {
    const value = {
      urlFile: url,
      slug: slug
    }
    downloadQr(value)
  };



  return (
    <div className="relative min-h-screen w-full bg-[url('https://pub-8f6128da76624084a24e3ae5210c2a86.r2.dev/img/characters/co-thanh-han/avatar.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="max-w-5xl mx-auto p-6">
        <div className="backdrop-blur-md bg-black/70 rounded-2xl shadow-lg p-6 space-y-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay về
          </button>
          {/* Tiêu đề */}
          <h1 className="text-2xl font-bold">tên: {faceData.title}</h1>
          <p>Nhân vật: {faceData.character}</p>

          <div className="flex flex-wrap items-start gap-2 mt-2">
            <p className="font-medium">Nhãn: </p>
            <div className="flex flex-wrap gap-2">
              {faceData.tags.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 whitespace-nowrap"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p>Mô tả: {faceData.description}</p>
          <p className="text-sm text-gray-400">
            Thời gian tạo:{" "}
            {new Date(faceData.createdAt).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>

          <div className="border-t border-gray-600" />

          {/* Ảnh review */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Ảnh xem trước</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {faceData.imageReviews.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded overflow-hidden border cursor-pointer"
                  onClick={() => setLightboxIndex(index)}
                >
                  <Image
                    src={url}
                    alt={faceData.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-600" />

          {/* QR codes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* QR CN */}
            {faceData.qrCodeCN && (
              <div className="text-center relative">
                <h2 className="text-lg font-semibold mb-2">QR server Trung Quốc</h2>
                <div
                  onClick={() => setLightboxIndex(faceData.imageReviews.length)}
                  className="cursor-pointer inline-block"
                >
                  <Image
                    src={faceData.qrCodeCN}
                    alt="QR CN"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-auto mx-auto rounded-lg border"
                  />
                </div>

                {/* Nút download */}
                <button
                  onClick={() => handleDownload(faceData.qrCodeCN!)}
                  className="absolute bottom-2 right-2 bg-black/60 p-2 rounded-full hover:bg-black/80 transition"
                >
                  <Download className="w-5 h-5 text-white" />
                </button>
              </div>
            )}

            {/* QR Global */}
            {faceData.qrCodeGlobals && (
              <div className="text-center relative">
                <h2 className="text-lg font-semibold mb-2">QR server Quốc tế</h2>
                <div
                  onClick={() => setLightboxIndex(faceData.imageReviews.length + 1)}
                  className="cursor-pointer inline-block"
                >
                  <Image
                    src={faceData.qrCodeGlobals}
                    alt="QR Global"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-auto h-auto mx-auto rounded-lg border"
                  />
                </div>

                {/* Nút download */}
                <button
                  onClick={() =>
                    handleDownload(faceData.qrCodeGlobals!)
                  }
                  className="absolute bottom-2 right-2 bg-black/60 p-2 rounded-full hover:bg-black/80 transition"
                >
                  <Download className="w-5 h-5 text-white" />
                </button>
              </div>
            )}

          </div>

          <div className="border-t border-gray-600" />

          {/* Lưu ý */}
          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-600 mt-4">
            <p className="text-yellow-400 font-semibold mb-1">Lưu ý:</p>
            <p className="text-sm text-gray-200">
              Một số tác phẩm được tham khảo và sưu tầm từ nhiều nguồn trên Internet, cùng với nội dung tự thực hiện.
              Chúng ta cần tôn trọng tác giả gốc, người đã sáng tạo và chia sẻ.
              Bạn có thể xem tác phẩm nguyên bản tại link ở dưới nếu có!
            </p>
            {faceData.source ? (
              <a
                href={faceData.source}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-400 hover:underline mt-1"
              >
                nguồn gốc
              </a>
            ) : null}

          </div>

          {/* Mẹo */}
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-600 mt-4">
            <p className="text-blue-400 font-semibold mb-1">Mẹo:</p>
            <p className="text-sm text-gray-200">
              Bạn không biết dùng mã QR để làm đẹp cho nhân vật của mình?{" "}
              Hãy tới phần hướng dẫn {" "}
              <a href={ROUTES.public.instruction} className="text-blue-400 hover:underline">
                tại đây
              </a>
              !
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </div>
  );
}
