import { useMemo } from "react"
import { getChangedFields } from "@/lib/utils/getChangedFields"

export function useChangedFields<T extends object>(
  newData: T,
  oldData: T,
  customCompare?: Partial<{ [K in keyof T]: (a: T[K], b: T[K]) => boolean }>
) {
  return useMemo(
    () => getChangedFields(newData, oldData, customCompare),
    [newData, oldData, customCompare]
  )
}