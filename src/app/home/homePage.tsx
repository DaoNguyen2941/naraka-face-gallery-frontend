'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getFaceCodesFromJson } from '@/lib/services/mock.service'
import FaceGallery from '@/components/FaceGallery'

export default function HomePage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const sort = searchParams.get('sort')
  const highlighted = searchParams.get('highlighted')

  const { data: faceCodes, isLoading } = useQuery({
    queryKey: ['mock-face-codes', { category, sort, highlighted }],
    queryFn: () =>
      getFaceCodesFromJson({
        categoryId: category ?? undefined,
        sort: sort ?? undefined,
        highlighted: highlighted === 'true',
      }),
  })

  return (
    <div className="p-4 space-y-4">
      {/* Hình ảnh đầu trang */}
      <img
        src="https://pub-8f6128da76624084a24e3ae5210c2a86.r2.dev/img/category/de-thuong/cover-photo.jpg"
        alt="Naraka Banner"
        className="w-full h-40 md:h-60 object-cover rounded shadow"
      />

      <h1 className="text-2xl font-bold">QR Face Gallery</h1>

      <FaceGallery faceCodes={faceCodes ?? []} loading={isLoading} />
    </div>
  )
}
