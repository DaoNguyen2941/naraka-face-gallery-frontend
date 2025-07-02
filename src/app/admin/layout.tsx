import { ReactQueryProvider } from "../../provider/ReactQueryProvider"
import type { Metadata } from "next"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isTokenValid } from "@/lib/utils/jwt"

export const metadata: Metadata = {
  title: "Admin Naraka",
  description: "Trang quản trị",
}
export default async function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="bg-black text-white min-h-screen">
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </div>
  )
}