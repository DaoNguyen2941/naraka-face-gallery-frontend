import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { trackPageService } from '@/lib/services/public/track.service';
export function useTrackPageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams()

    useEffect(() => {
        if (!pathname) return;
        const timer = setTimeout(() => {
            const fullPath = searchParams.toString()? `${pathname}?${searchParams.toString()}` : pathname
            trackPageService(fullPath).catch(console.error);
        }, 10000);
        return () => clearTimeout(timer);
    }, [pathname,searchParams]);
}
