import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Naraka",
  description: "Trang quản trị",
}
export default async function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="bg-black text-white min-h-screen">
      {children}
    </div>
  )
}