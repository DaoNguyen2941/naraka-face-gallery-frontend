import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { trackPageService, InputTrackPage } from '@/lib/services/public/track.service';
import { v4 as uuidv4 } from 'uuid';

function getOrCreateVisitorId() {
  let id = localStorage.getItem('visitorId');
  let isNew = false;
  if (!id) {
    id = uuidv4();
    isNew = true;
    localStorage.setItem('visitorId', id);
  }
  return { id, isNew };
}

function getOrCreateSessionId() {
  let id = sessionStorage.getItem('sessionId');
  if (!id) {
    id = uuidv4();
    sessionStorage.setItem('sessionId', id);
  }
  return id;
}

export function useTrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const visitor = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();
    const fullPath = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    const timer = setTimeout(() => {
      const data: InputTrackPage = {
        visitorId: visitor.id,
        sessionId,
        path: fullPath,
        newVisitor: visitor.isNew,
      };
      trackPageService(data).catch(console.error);
    }, 5000);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);
}
