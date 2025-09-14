'use client'

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TagFilterDialog from './TagFilterDialog';
import { useGetTag } from '@/app/home/hooks/useGetTag';
import { useRouter } from 'next/navigation'
import { useTrackPageView } from '@/app/home/hooks/track/useTrackPageView';
import Footer from './Footer';
export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showTagFilter, setShowTagFilter] = useState(false)
  const { data: tags = [], isLoading } = useGetTag()
  const router = useRouter()
  useTrackPageView()

  const handleApply = (tags: string[]) => {
    tags.length ?
      router.push(`/home?tags=${tags}`) :
      router.push(`/home`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white p-2 relative">
      {/* Header */}
      <Header
        onToggleSidebar={() => setShowSidebar(true)}
        onToggleTagFilter={() => setShowTagFilter(true)}
      />

      {/* Main content */}
      <main className="flex-1 overflow-auto relative z-0 flex">
        <div className="flex-1 overflow-auto">{children}</div>
        <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
      </main>

      <Footer />

      {/* Dialog */}
      <TagFilterDialog
        tags={tags}
        isOpen={showTagFilter}
        onClose={() => setShowTagFilter(false)}
        onApply={(tags) => handleApply(tags)}
      />
    </div>
  )
}
