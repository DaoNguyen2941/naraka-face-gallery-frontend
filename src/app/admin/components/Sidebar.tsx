'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/utils'
import {
  LayoutDashboard,
  Users,
  ImageIcon,
  Folder,
  LogOut,
  Tag,
  History,
  ArrowDownUp,
  FileUser,
  Trash2
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboards', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Nhân vật', href: '/admin/dashboards/characters', icon: <Users className="w-5 h-5" /> },
  { label: 'Ảnh mặt', href: '/admin/dashboards/face-images', icon: <ImageIcon className="w-5 h-5" /> },
  { label: 'Tags', href: '/admin/dashboards/tags', icon: <Tag className="w-5 h-5" /> },
  { label: 'album', href: '/admin/dashboards/album', icon: <Folder className="w-5 h-5" /> },
  { label: 'Lịch sủ hoạt động', href: '/admin/dashboards/history', icon: <History className="w-5 h-5" /> },
  { label: 'Lưu lượng truy cập', href: '/admin/dashboards/traffic', icon: <ArrowDownUp className="w-5 h-5" /> },
  { label: 'Thông tin liên hệ', href: '/admin/dashboards/contact', icon: <FileUser className="w-5 h-5" /> },
  { label: 'Thùng rác', href: '/admin/dashboards/trash-can', icon: <Trash2 className="w-5 h-5" /> },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-zinc-900 text-white border-r border-zinc-800 flex flex-col">
      <div className="h-16 px-6 flex items-center text-xl font-bold border-b border-zinc-800">
        QR Face Admin
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition',
              pathname === item.href && 'bg-zinc-800 font-semibold'
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-zinc-800">
        <button className="w-full text-left flex items-center gap-2 text-red-500 hover:underline">
          <LogOut className="w-4 h-4" />
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}
