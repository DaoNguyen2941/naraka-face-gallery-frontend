'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/utils'
import {
  LayoutDashboard,
  Users,
  ImageIcon,
  Folder,
  Tag,
  History,
  ArrowDownUp,
  FileUser,
  Trash2,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'
import { ROUTES } from "@/lib/routers/routes";

const navItems = [
  { label: 'Dashboard', href: ROUTES.admin.dashboards, icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Nhân vật', href: ROUTES.admin.characters, icon: <Users className="w-5 h-5" /> },
  { label: 'Ảnh mặt', href: ROUTES.admin.faces, icon: <ImageIcon className="w-5 h-5" /> },
  { label: 'Tags', href: ROUTES.admin.tags, icon: <Tag className="w-5 h-5" /> },
  { label: 'Album', href: ROUTES.admin.album, icon: <Folder className="w-5 h-5" /> },
  { label: 'Lịch sử hoạt động', href: ROUTES.admin.history, icon: <History className="w-5 h-5" /> },
  {
    label: 'Lưu lượng truy cập',
    icon: <ArrowDownUp className="w-5 h-5" />,
    children: [
      { label: 'Theo ngày', href: ROUTES.admin.traffic.daily },
      { label: 'Theo page', href: ROUTES.admin.traffic.page },
    ],
  },
  { label: 'Thông tin liên hệ', href:  ROUTES.admin.contact, icon: <FileUser className="w-5 h-5" /> },
  { label: 'Thùng rác', href:  ROUTES.admin.trashCan, icon: <Trash2 className="w-5 h-5" /> },
]

export function Sidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <aside className="w-64 bg-zinc-900 text-white border-r border-zinc-800 flex flex-col">
      <div className="h-16 px-6 flex items-center text-xl font-bold border-b border-zinc-800">
        QR Face Admin
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) =>
          item.children ? (
            <div key={item.label}>
              <button
                onClick={() => toggleMenu(item.label)}
                className={cn(
                  'flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-zinc-800 transition',
                  openMenus[item.label] && 'bg-zinc-800 font-semibold'
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </div>
                {openMenus[item.label] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {openMenus[item.label] && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'block px-3 py-1 rounded-md hover:bg-zinc-800 transition text-sm',
                        pathname === child.href && 'bg-zinc-800 font-semibold'
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition',
                pathname === item.href && 'bg-zinc-800 font-semibold'
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        )}
      </nav>
    </aside>
  )
}
