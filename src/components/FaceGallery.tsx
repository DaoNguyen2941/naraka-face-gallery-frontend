'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'

interface FaceCode {
  id: string
  name: string
  imageUrl: string
  characterId: string
  characterName: string
  category: string
}

export default function FaceGallery({
  faceCodes,
  loading,
}: {
  faceCodes: FaceCode[]
  loading: boolean
}) {
  const [selectedImage, setSelectedImage] = useState<FaceCode | null>(null)

  if (loading) {
    return <div className="text-white text-center py-10">Đang tải...</div>
  }

  if (!faceCodes.length) {
    return <div className="text-white text-center py-10">Không có dữ liệu.</div>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {faceCodes.map((face) => (
        <div
          key={face.id}
          className="cursor-pointer group relative"
          onClick={() => setSelectedImage(face)}
        >
          <Image
            src={face.imageUrl}
            alt={face.name}
            width={300}
            height={300}
            className="w-full aspect-square object-cover rounded-lg border border-white/10 group-hover:opacity-80"
          />
          <div className="absolute bottom-0 left-0 w-full px-2 py-1 bg-black/60 text-sm text-white rounded-b-lg text-center">
            {face.name}
          </div>
        </div>
      ))}

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative bg-black rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-white hover:text-red-500"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            {selectedImage && (
              <div className="p-4">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.name}
                  width={800}
                  height={800}
                  className="mx-auto max-h-[80vh] object-contain"
                />
                <p className="text-center mt-2 text-white font-semibold text-lg">
                  {selectedImage.name} — {selectedImage.characterName}
                </p>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
