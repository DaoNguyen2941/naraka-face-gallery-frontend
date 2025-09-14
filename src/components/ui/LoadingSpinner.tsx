"use client"

import { Loader2 } from "lucide-react"
import { cn } from '@/lib/utils/utils'

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <Loader2
      className={cn("animate-spin h-8 w-8 text-orange-500", className)}
    />
  )
}
