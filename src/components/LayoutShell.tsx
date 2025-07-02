'use client'

import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import TagFilterDialog from './TagFilterDialog'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showTagFilter, setShowTagFilter] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white p-2 relative">
      <Header
        onToggleSidebar={() => setShowSidebar(true)}
        onToggleTagFilter={() => setShowTagFilter(true)}

      />
      <main className="flex flex-1 overflow-hidden relative z-0">
        <div className="flex-1 overflow-auto">{children}</div>
        <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
      </main>
      <TagFilterDialog
        isOpen={showTagFilter}
        onClose={() => setShowTagFilter(false)}
        onApply={(tags) => {
          console.log('Tag đã chọn:', tags)
        }}
      />
    </div>
  )
}
