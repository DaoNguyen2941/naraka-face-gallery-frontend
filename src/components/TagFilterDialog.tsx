'use client'

import { X, Search } from 'lucide-react'
import { useState } from 'react'

const allTags = [
  'Ngầu',
  'Đáng yêu',
  'Ma mị',
  'Hài hước',
  'Tarka Ji',
  'Kurumi',
  'Matari',
  'Wuchen',
]

export default function TagFilterDialog({
  isOpen,
  onClose,
  onApply,
}: {
  isOpen: boolean
  onClose: () => void
  onApply: (selectedTags: string[]) => void
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const toggleTag = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const removeTag = (tag: string) => {
    setSelected((prev) => prev.filter((t) => t !== tag))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 text-white w-[90%] max-w-md rounded-lg p-6 z-50 shadow-2xl border border-red-600">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">🎯 Lọc theo tag</h2>
          <button onClick={onClose} className="p-1 hover:bg-red-700 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search box */}
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
          {selected.length === 0 ? (
            <span className="text-gray-400 text-sm">Chưa chọn tag nào</span>
          ) : (
            selected.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="hover:text-black"
                  title="Bỏ tag"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>

        {/* Tag sections */}
        <div className="max-h-[50vh] overflow-y-auto pr-1">
          <div className="flex flex-wrap gap-2">
            {allTags
              .filter((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full border text-sm transition
            ${selected.includes(tag)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-white hover:bg-red-700'
                    }`}
                >
                  {tag}
                </button>
              ))}
          </div>
        </div>


        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => setSelected([])}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={() => {
              onApply(selected)
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
