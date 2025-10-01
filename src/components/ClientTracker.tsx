// ClientTracker.tsx
'use client'
import { useTrackPageView } from '@/app/(public)/hooks/track/useTrackPageView'

export default function ClientTracker() {
  useTrackPageView()
  return null
}
