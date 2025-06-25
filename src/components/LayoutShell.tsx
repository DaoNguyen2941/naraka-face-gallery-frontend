'use client'

import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white p-2 relative">
      <Header onToggleSidebar={() => setShowSidebar(true)} />
      <main className="flex flex-1 overflow-hidden relative z-0">
        <div className="flex-1 overflow-auto">{children}</div>
        <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
      </main>
    </div>
  )
}
