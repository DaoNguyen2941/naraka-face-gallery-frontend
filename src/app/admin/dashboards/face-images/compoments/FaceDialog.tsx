"use client"

import { useEffect, useRef, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { any, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Face } from "@/types/face/face.type"
import { Tag } from "@/types"
import { Character } from "@/types"
import { formDataQrFace, formDataQrFaceUpdate, filesData, } from "@/lib/services/interface/face"
import {
  createQrFaceService,
  updateQrFaceService,
} from "@/lib/services/admin/face"
import { useCharacterList } from "@/app/admin/hooks/useAdminCharacterList"
import type { File as MyFile } from "@/types/file.type"
import { getChangedFields } from "@/lib/utils/getChangedFields"
import { AxiosError } from "axios"
type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  face: Face | null
  tags: Tag[]
  tagLoading?: boolean
  onSave: (face: Face, isEdit: boolean) => void
}

const sharedSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().optional(),
  imageReviews: z.array(z.any()),
  qrCodeCN: z.any().optional(),
  qrCodeGlobals: z.any().optional(),
  tags: z.array(z.string()).min(1, "Chọn ít nhất 1 tag"),
  characterId: z.string().min(1, "Vui lòng chọn nhân vật"),
  source: z.string().optional(),
})

const createSchema = sharedSchema.extend({
  imageReviews: z.array(z.instanceof(File))
    .min(1, "Cần chọn ít nhất 1 ảnh")
    .max(5, "Chỉ được chọn tối đa 5 ảnh"),
  qrCodeGlobals: z.instanceof(File).refine(
    (file) => file.size > 0,
    "QR code không được để trống"
  ),
})

const editSchema = sharedSchema.extend({
  imageReviews: z.array(z.any()).max(5, "Chỉ được chọn tối đa 5 ảnh"),
  qrCodeGlobals: z.any().optional(),
})

export default function FaceDialog({
  open,
  onOpenChange,
  face,
  onSave,
  tags,
  tagLoading,
}: Props) {
  const isEdit = !!face
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const cnInputRef = useRef<HTMLInputElement | null>(null)
  const globalInputRef = useRef<HTMLInputElement | null>(null)

  const { data: characters = [], isLoading: charactersLoading } = useCharacterList()

  const schema = isEdit ? editSchema : createSchema

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      imageReviews: [],
      qrCodeCN: undefined,
      qrCodeGlobals: undefined,
      tags: [],
      characterId: "",
      source: "",
    },
  })

  const imageReviews = watch("imageReviews")
  const cnFile = watch("qrCodeCN")
  const globalFile = watch("qrCodeGlobals")

  const previewUrls = useMemo(() => {
    return imageReviews.map((item) => {
      if (item instanceof File) {
        return { url: URL.createObjectURL(item), cleanup: true }
      } else {
        return { url: (item as MyFile).url, cleanup: false }
      }
    })
  }, [imageReviews])

  useEffect(() => {
    return () => {
      previewUrls.forEach((p) => {
        if (p.cleanup) URL.revokeObjectURL(p.url)
      })
    }
  }, [previewUrls])

  useEffect(() => {
    if (!open) return
    if (face) {
      reset({
        title: face.title,
        description: face.description ?? "",
        imageReviews: face.imageReviews as any,
        qrCodeCN: undefined,
        qrCodeGlobals: undefined,
        tags: face.tags.map((tag) => tag.id),
        characterId: face.character.id,
        source: face.source ?? "",
      })
    }

  }, [face, open, reset])

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: async ({ data, files }: { data: formDataQrFaceUpdate; files: filesData }) => {
      return isEdit
        ? updateQrFaceService(data, files, face!.id)
        : createQrFaceService(data as formDataQrFace, files)
    },
    onSuccess: (newFace) => {
      toast.success(isEdit ? "Cập nhật thành công" : "Tạo mới thành công")
      reset()
      onSave(newFace, isEdit)
    },
    onError: (error: AxiosError<any>) => {
      const isDuplicateTitle = error.response?.data?.message?.includes('đã tồn tại');
      if (isDuplicateTitle) {
        toast.error("Tiêu đề đã tồn tại. Vui lòng chọn tiêu đề khác");
        setError('title', {
          type: "manual",
          message: "Tiêu đề đã tồn tại. Vui lòng nhập tiêu đề khác.",
        })
      } else {
        toast.error(`Lỗi khi cập nhật: ${error.response?.data?.message || 'Không rõ lỗi'}`);
      }
    }
  })

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
    const payload: formDataQrFace = {
      title: data.title,
      description: data.description ?? "",
      tagIds: data.tags,
      characterId: data.characterId,
      source: data.source ?? "",
    }

    const files: filesData | any = {}

    if (data.qrCodeGlobals instanceof File) files.qrCodeGlobals = data.qrCodeGlobals
    if (data.qrCodeCN instanceof File) files.qrCodeCN = data.qrCodeCN
    if (data.imageReviews.some((f) => f instanceof File)) {
      files.imageReviews = data.imageReviews.filter((f) => f instanceof File) as File[]
    }

    if (isEdit && face) {
      const original: formDataQrFace = {
        title: face.title,
        description: face.description ?? "",
        source: face.source ?? "",
        characterId: face.character.id,
        tagIds: face.tags.map((t) => t.id),
      }

      const { changed, isChanged } = getChangedFields(payload, original, {
        tagIds: (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort()),
      })

      const hasFiles = Object.keys(files).length > 0
      if (!isChanged && !hasFiles) {
        toast.info("Không có thay đổi nào")
        return
      }
      mutate({ data: changed, files })
      return
    }
    // create
    mutate({ data: payload, files })
  }

  const triggerFileSelect = () => fileInputRef.current?.click()

  const closeDialog = () => {
    reset({
      title: "",
      description: "",
      imageReviews: [],
      qrCodeCN: undefined,
      qrCodeGlobals: undefined,
      tags: [],
      characterId: "",
      source: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Chỉnh sửa khuôn mặt" : "Thêm mã khuôn mặt"}</DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

          {/* Multiple image previews */}
          <div className="grid grid-cols-3 gap-2 cursor-pointer"
            onClick={triggerFileSelect}
          >
            {previewUrls.length > 0 ? (
              previewUrls.map((file, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded border">
                  <Image
                    src={file.url}
                    alt={`Preview ${index}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              ))
            ) : (
              <div className="col-span-3 aspect-[3/2] flex items-center justify-center text-sm text-muted-foreground border rounded">
                Chọn ảnh
              </div>
            )}
          </div>
          <Controller
            name="imageReviews"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                ref={fileInputRef}
                onChange={(e) => field.onChange(Array.from(e.target.files ?? []))}
              />
            )}
          />
          {errors.imageReviews && (
            <p className="text-red-500 text-sm">{errors.imageReviews.message}</p>
          )}

          {/* QR Code inputs */}
          <div className="grid grid-cols-2 gap-4">
            {/* CN */}
            <div>
              <label className="block text-sm font-medium mb-1">Ảnh QR Code (CN)</label>
              <div
                onClick={() => cnInputRef.current?.click()}
                className="cursor-pointer border rounded aspect-[3/2] overflow-hidden"
              >
                {cnFile ? (
                  <Image src={URL.createObjectURL(cnFile)} alt="qrCN" width={300} height={200} className="w-full h-full object-cover" />
                ) : face?.qrCodeCN?.url ? (
                  <Image src={face.qrCodeCN.url} alt="qrCN" width={300} height={200} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    Chọn ảnh
                  </div>
                )}
              </div>
              <Controller
                name="qrCodeCN"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={cnInputRef}
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                )}
              />
            </div>

            {/* Global */}
            <div>
              <label className="block text-sm font-medium mb-1">Ảnh QR Code (Global)</label>
              <div
                onClick={() => globalInputRef.current?.click()}
                className="cursor-pointer border rounded aspect-[3/2] overflow-hidden"
              >
                {globalFile ? (
                  <Image src={URL.createObjectURL(globalFile)} alt="qrGlobal" width={300} height={200} className="w-full h-full object-cover" />
                ) : face?.qrCodeGlobals?.url ? (
                  <Image src={face.qrCodeGlobals.url} alt="qrGlobal" width={300} height={200} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    Chọn ảnh
                  </div>
                )}
              </div>
              <Controller
                name="qrCodeGlobals"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={globalInputRef}
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                )}
              />
              {errors.qrCodeGlobals?.message && (
                <p className="text-red-500 text-sm">
                  {String(errors.qrCodeGlobals.message)}
                </p>
              )}

            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Tiêu đề</label>
            <Input {...register("title")} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <Input {...register("description")} />
          </div>

          {/* Character Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Nhân vật</label>
            <Controller
              name="characterId"
              control={control}
              render={({ field }) => (
                <select {...field} className="w-full border rounded px-3 py-2">
                  <option value="">-- Chọn nhân vật --</option>
                  {characters.map((char: Character) => (
                    <option key={char.id} value={char.id}>
                      {char.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.characterId && (
              <p className="text-red-500 text-sm">{errors.characterId.message}</p>
            )}
          </div>

          {/* Tag Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags (ít nhất 1)</label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map((id) => {
                      const tag = tags.find((t) => t.id === id)
                      if (!tag) return null
                      return (
                        <div
                          key={id}
                          className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
                        >
                          {tag.name}
                          <button
                            type="button"
                            onClick={() => field.onChange(field.value.filter((v) => v !== id))}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tagLoading ? (
                      <p className="text-sm text-muted-foreground">Đang tải tag...</p>
                    ) : (
                      tags.map((tag) => {
                        const selected = field.value.includes(tag.id)
                        return (
                          <button
                            key={tag.id}
                            type="button"
                            onClick={() =>
                              field.onChange(
                                selected
                                  ? field.value.filter((id) => id !== tag.id)
                                  : [...field.value, tag.id]
                              )
                            }
                            className={`px-3 py-1 rounded-full text-sm border ${selected
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-800 hover:bg-gray-100"
                              }`}
                          >
                            {tag.name}
                          </button>
                        )
                      })
                    )}
                  </div>
                </>
              )}
            />
            {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium mb-1">Nguồn gốc</label>
            <Input {...register("source")} />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang lưu...
                </span>
              ) : isEdit ? "Lưu" : "Thêm mới"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}