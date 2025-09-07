'use client'

import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TagFilterDialog from './TagFilterDialog';
import { useGetTag } from '@/app/home/hooks/useGetTag';
import { useRouter } from 'next/navigation'
import { useTrackPageView } from '@/app/home/hooks/track/useTrackPageView';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showTagFilter, setShowTagFilter] = useState(false)
  const { data: tags = [], isLoading } = useGetTag()
  const router = useRouter()
  useTrackPageView()

  const handleApply = (tags: string[]) => {
    router.push(`/home?tags=${tags}`)
  }

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
        tags={tags}
        isOpen={showTagFilter}
        onClose={() => setShowTagFilter(false)}
        onApply={(tags) => {
          handleApply(tags)
        }}
      />
    </div>
  )
}
