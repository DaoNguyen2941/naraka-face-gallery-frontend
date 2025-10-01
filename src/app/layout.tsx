import '../styles/globals.css';
import { ReactQueryProvider } from '@/provider/ReactQueryProvider';
import { Toaster } from "sonner"

export const metadata = {
  title: 'Tàng Mỹ Quán',                // Title mặc định cho site
  description: 'Trang tổng hợp và tria sẻ QR Face của game Naraka: Bladepoint.', // Mô tả chung
  // authors: [{ name: 'Tên bạn hoặc nhóm phát triển' }], 
  keywords: ['Naraka: Bladepoint', 'QR Face Naraka', 'Naraka QR Face', 'Mẫu mặt Naraka'], // Từ khóa SEO
  icons: '/favicon.ico',                        // Favicon
  openGraph: {                                 // Metadata Open Graph cho chia sẻ mạng xã hội
    title: 'Tàng Mỹ Quán',
    description: 'Trang tổng hợp và tria sẻ QR Face của game Naraka: Bladepoint.',
    url: 'narakaqrface.com',
    siteName: 'Naraka Face Gallery',
    images: [
      {
        url: 'https://cdn.narakaqrface.com/public/banner.png', // hình hiển thị khi chia sẻ
        width: 1200,
        height: 630,
        alt: 'Tàng Mỹ Quán',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
};

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
