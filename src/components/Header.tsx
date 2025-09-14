'use client'

import { Menu, Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from "next/navigation"

export default function Header({
  onToggleSidebar,
  onToggleTagFilter,
}: {
  onToggleSidebar: () => void
  onToggleTagFilter: () => void
}) {
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchValue.trim()) return
    router.push(`/home?search=${encodeURIComponent(searchValue)}`)
  }

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

        {/* Logo (ẩn khi mobile search mở) */}
        {!showMobileSearch && (
          <div className="font-semibold text-sm sm:text-base">
            NarakaMakeUp
          </div>
        )}

        {/* Form tìm kiếm */}
        <form
          onSubmit={handleSearch}
          className="ml-2 flex items-center gap-2 flex-1"
        >
          {/* Mobile search */}
          <div className="sm:hidden flex items-center gap-2 flex-1">
            {!showMobileSearch ? (
              <button
                type="button"
                onClick={() => setShowMobileSearch(true)}
                className="p-2 hover:bg-gray-800 rounded"
              >
                <Search className="w-5 h-5" />
              </button>
            ) : (
              <div className="relative flex-1">
                <input
                  autoFocus
                  type="text"
                  placeholder="Tìm..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pr-8 pl-2 py-1 rounded bg-white text-black placeholder-gray-500 focus:outline-none"
                  onBlur={() => setShowMobileSearch(false)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Desktop search */}
          <div className="hidden sm:block relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-64 pr-8 pl-3 py-1 rounded bg-white text-black placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Nút mở bộ lọc tag */}
          <button
            type="button"
            onClick={onToggleTagFilter}
            className="p-2 hover:bg-gray-800 rounded"
            title="Lọc theo tag"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </form>
      </div>
    </header>
  )
}
