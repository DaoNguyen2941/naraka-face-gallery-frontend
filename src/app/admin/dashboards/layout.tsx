import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Metadata } from "next"
import { isTokenValid } from "@/lib/utils/jwt"

export const metadata: Metadata = {
  title: "Admin dashboards",
  description: "Trang quản trị",
}

export default async function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('Authentication')?.value

 if (!token || !isTokenValid(token)) {
    redirect('/admin/login')
  }

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
