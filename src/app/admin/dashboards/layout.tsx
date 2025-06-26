'use client'

import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4 bg-black">
          {children}
        </main>
      </div>
    </div>
  )
}
