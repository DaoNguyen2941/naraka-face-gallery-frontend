'use client'

import { X, Search } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { Tag } from '@/types'
import { PublicTag } from '@/types'

export default function TagFilterDialog({
  isOpen,
  onClose,
  onApply,
  tags = [],
}: {
  isOpen: boolean
  onClose: () => void
  onApply: (selectedSlugs: string[]) => void
  tags?: Tag[] | PublicTag[]
}) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  // Khởi tạo selected từ props nếu muốn mặc định chọn một số tag
  useEffect(() => {
    if (tags.length > 0) setSelectedSlugs([]) // hoặc map mặc định nếu muốn
  }, [tags])

  const toggleTag = (slug: string) => {
    setSelectedSlugs(prev =>
      prev.includes(slug) ? prev.filter(t => t !== slug) : [...prev, slug]
    )
  }

  const removeTag = (slug: string) => {
    setSelectedSlugs(prev => prev.filter(t => t !== slug))
  }

  const filteredTags = useMemo(
    () =>
      tags.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [tags, searchTerm]
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div
        className="relative bg-gray-900 text-white w-[90%] max-w-md rounded-lg p-6 z-50 shadow-2xl border border-red-600 max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">🎯 Lọc theo nhãn</h2>
          <button onClick={onClose} className="p-1 hover:bg-red-700 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Tìm tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>

        {/* Selected preview */}
        <div className="min-h-[40px] border border-gray-700 rounded px-3 py-2 mb-4 bg-gray-800 flex flex-wrap gap-2">
          {selectedSlugs.length === 0 ? (
            <span className="text-gray-400 text-sm">Chưa chọn tag nào</span>
          ) : (
            selectedSlugs.map(slug => {
              const tag = tags.find(t => t.slug === slug)
              if (!tag) return null
              return (
                <span
                  key={tag.slug}
                  className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  {tag.name}
                  <button
                    onClick={() => removeTag(tag.slug)}
                    className="hover:text-black"
                    title="Bỏ tag"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )
            })
          )}
        </div>

        {/* Tag list */}
        <div className="max-h-[50vh] overflow-y-auto pr-1">
          <div className="flex flex-wrap gap-2">
            {filteredTags.map(tag => (
              <button
                key={tag.slug}
                onClick={() => toggleTag(tag.slug)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  selectedSlugs.includes(tag.slug)
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-white hover:bg-red-700'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => setSelectedSlugs([])}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={() => {
              onApply(selectedSlugs) // trả về mảng string slug
              onClose()
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  )
}
