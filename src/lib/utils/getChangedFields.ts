// Hàm thuần: dùng ở mọi nơi (service, mutation...)
export function getChangedFields<T extends object>(
  newData: T,
  oldData: T,
  customCompare?: Partial<{ [K in keyof T]: (a: T[K], b: T[K]) => boolean }>
): {
  changed: Partial<T>
  changedKeys: (keyof T)[]
  isChanged: boolean
} {
  const changed: Partial<T> = {}
  const changedKeys: (keyof T)[] = []

  for (const key in newData) {
    const newVal = newData[key]
    const oldVal = oldData[key]

    const isEqual =
      customCompare?.[key]
        ? customCompare[key]!(newVal, oldVal)
        : JSON.stringify(newVal) === JSON.stringify(oldVal)

    if (!isEqual) {
      changed[key] = newVal
      changedKeys.push(key)
    }
  }

  return { changed, changedKeys, isChanged: changedKeys.length > 0 }
}

