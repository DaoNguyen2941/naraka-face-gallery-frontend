'use client'
import { useEffect } from 'react'
import { trackFaceViewService } from '@/lib/services/public/track.service'

/**
 * Hook để track Face View (theo slug)
 * @param slug slug của face
 */
export function useTrackFaceView(slug: string) {
  useEffect(() => {
    if (!slug) return

    const timer = setTimeout(() => {
      trackFaceViewService(slug).catch((err) => {
        console.error('Track face view error:', err)
      })
    }, 10000) 

    return () => clearTimeout(timer)
  }, [slug])
}
