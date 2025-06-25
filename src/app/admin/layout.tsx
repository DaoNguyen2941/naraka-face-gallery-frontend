// app/admin/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="bg-black text-white min-h-screen">
      {children}
    </div>
  )
}
