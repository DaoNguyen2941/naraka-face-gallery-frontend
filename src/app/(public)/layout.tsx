import type { ReactNode } from "react";
import LayoutShell from "@/components/LayoutShell";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning={true}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
