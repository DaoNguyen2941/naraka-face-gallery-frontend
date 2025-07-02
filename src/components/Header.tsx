'use client'

import {
  Menu,
  Search,
  SlidersHorizontal, // icon lọc
} from 'lucide-react'
import { useState } from 'react'

export default function Header({
  onToggleSidebar,
  onToggleTagFilter, // ✅ thêm prop để mở bộ lọc theo tag
}: {
  onToggleSidebar: () => void
  onToggleTagFilter: () => void
}) {
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  return (
    <header className="w-full shadow bg-gray-900 text-white">
      <div className="w-full px-4 py-2 flex items-center gap-2">
        {/* Nút mở sidebar */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded hover:bg-gray-800 transition"
        >
          <Menu className="w-7 h-7" strokeWidth={3} />
        </button>

        {/* Logo */}
        <div className="font-semibold text-sm sm:text-base">
          Naraka make up
        </div>

        {/* Ô tìm kiếm */}
        <div className="ml-2 flex items-center gap-2">
          <div className="sm:hidden">
            {!showMobileSearch ? (
              <button
                onClick={() => setShowMobileSearch(true)}
                className="p-2 hover:bg-gray-800 rounded"
              >
                <Search className="w-5 h-5" />
              </button>
            ) : (
              <input
                autoFocus
                type="text"
                placeholder="Tìm..."
                className="w-32 px-2 py-1 rounded bg-white text-black placeholder-gray-500 focus:outline-none"
                onBlur={() => setShowMobileSearch(false)}
              />
            )}
          </div>

          <div className="hidden sm:block">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-64 px-3 py-1 rounded bg-white text-black placeholder-gray-500 focus:outline-none"
            />
          </div>

          {/* ✅ Nút mở bộ lọc tag */}
          <button
            onClick={onToggleTagFilter}
            className="p-2 hover:bg-gray-800 rounded"
            title="Lọc theo tag"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
