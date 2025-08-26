import { ReactQueryProvider } from "../../provider/ReactQueryProvider"
import type { Metadata } from "next"
import { Toaster } from "sonner"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const metadata: Metadata = {
  title: "Admin Naraka",
  description: "Trang quản trị",
}
export default async function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="bg-black text-white min-h-screen">
      <ReactQueryProvider>{children}</ReactQueryProvider>
      <Toaster />
    </div>
  )
}