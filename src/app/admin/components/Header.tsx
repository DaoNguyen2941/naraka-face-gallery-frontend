'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header() {
  return (
    <header className="h-16 px-6 border-b border-zinc-800 bg-zinc-900 text-white flex items-center justify-between">
      <h1 className="text-lg font-semibold">Trang quản trị</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-zinc-400">admin@example.com</span>
        <Avatar className="h-8 w-8">
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
