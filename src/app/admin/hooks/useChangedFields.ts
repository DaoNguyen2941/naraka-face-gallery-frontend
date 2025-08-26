import { useMemo } from "react"
import { getChangedFields } from "@/lib/utils/getChangedFields"

export function useChangedFields<T extends Record<string, any>>(
  newData: T,
  oldData: T,
  customCompare?: Partial<{ [K in keyof T]: (a: T[K], b: T[K]) => boolean }>
) {
  return useMemo(() => {
    return getChangedFields(newData, oldData, customCompare)
  }, [newData, oldData])
}