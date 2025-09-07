'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import { PaginationResponse } from "@/types/page.type"
import { PublicFace } from '@/types/face/publicFace.type'
import FaceCardImage from './FaceCard'

export default function FaceGallery({
  faceCodes,
  loading,
}: {
  faceCodes: PaginationResponse<PublicFace>
  loading: boolean
}) {
  if (loading) {
    return <div className="text-white text-center py-10">Đang tải...</div>
  }

  if (!faceCodes.data.length) {
    return <div className="text-black text-center py-10">Không có dữ liệu.</div>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {faceCodes.data.map((face) => (
        <FaceCardImage
          key={face.id}
          face={face}
        />
      ))}
    </div>
  )
}
