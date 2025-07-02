import faceCodes from '@/data/faceCodes.json'

export const getFaceCodesFromJson = ({
  categoryId,
  sort,
  highlighted,
}: {
  categoryId?: string
  sort?: string
  highlighted?: boolean
}) => {
  let results = faceCodes

  if (categoryId) {
    results = results.filter((item) => item.category === categoryId)
  }

  if (highlighted) {
    // Giả lập lọc nổi bật (ví dụ: id chẵn là nổi bật)
    results = results.filter((item) => Number(item.id) % 2 === 0)
  }

  if (sort === 'newest') {
    results = [...results].sort((a, b) => Number(b.id) - Number(a.id))
  }

  return Promise.resolve(results)
}
