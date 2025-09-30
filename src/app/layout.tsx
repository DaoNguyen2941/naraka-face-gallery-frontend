import '../styles/globals.css';
import { ReactQueryProvider } from '@/provider/ReactQueryProvider';
import type { Metadata } from "next"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Naraka",
  description: "Trang web",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
   <body>
        <ReactQueryProvider>
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
