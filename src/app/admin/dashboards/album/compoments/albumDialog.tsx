"use client"

import { useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { createAlbumService, updateAlbumService } from "@/lib/services/admin/album"
import { Album } from "@/types"
import { Loader2 } from "lucide-react"
import { formDataCharacter } from "@/lib/services/admin/characters"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  album: Album | null
  onSave: (character: Album, isEdit: boolean) => void
}

const baseSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  description: z.string().optional(),
});

const createSchema = baseSchema.extend({
  coverPhoto: z
    .instanceof(File, { message: "Ảnh bìa là bắt buộc" }),
});

const editSchema = baseSchema.extend({
  coverPhoto: z
    .instanceof(File)
    .or(z.null())
    .or(z.undefined()),
});

export default function CharacterDialog({
  open,
  onOpenChange,
  album,
  onSave,
}: Props) {
  const isEdit = !!album
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const schema = isEdit ? editSchema : createSchema

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      coverPhoto: undefined,
    },
  })

  const coverPhoto = watch("coverPhoto")
  const previewUrl =
    coverPhoto instanceof File
      ? URL.createObjectURL(coverPhoto)
      : album?.cover_photo.url ?? ""

  // Cleanup preview URL to avoid memory leak
  useEffect(() => {
    if (coverPhoto instanceof File) {
      const objectUrl = URL.createObjectURL(coverPhoto)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [coverPhoto])

  useEffect(() => {
    if (!open) return;

    if (album) {
      reset({
        name: album.name,
        description: album.description ?? "",
        coverPhoto: undefined,
      });
    } else {
      reset({
        name: "",
        description: "",
        coverPhoto: undefined,
      });
    }
  }, [album, open, reset]);


  const mutation = useMutation({
    mutationFn: async ({ data, file, }: {
      data: formDataCharacter
      file?: File
    }) => {
      return isEdit
        ? updateAlbumService(data, file, album.id)
        : createAlbumService(data, file!)
    },
    onSuccess: (newCharacter) => {
      toast.success(isEdit ? "Cập nhật album thành công" : "Tạo album vật thành công")
      onSave(newCharacter, isEdit)
    },
    onError: () => {
      toast.error(isEdit ? "Lỗi khi cập nhật album" : "Lỗi khi tạo album")
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
    const file = data.coverPhoto as File | undefined

    if (!file && !isEdit) {
      toast.error("Vui lòng chọn ảnh bìa")
      return
    }

    const newCharacter: formDataCharacter = {
      name: data.name,
      description: data.description ?? "",
    }

    mutation.mutate({ data: newCharacter, file })
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Chỉnh sửa nhân vật" : "Thêm nhân vật"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Avatar preview */}
          <div
            className="w-full aspect-[3/2] rounded-md overflow-hidden mx-auto cursor-pointer border"
            onClick={triggerFileSelect}
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="cover photo preview"
                width={128}
                height={128}
                className="object-cover w-full h-full"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                Chọn ảnh
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setValue("coverPhoto", e.target.files?.[0])}
            hidden
          />
          {errors.coverPhoto && (
            <p className="text-red-500 text-sm">{errors.coverPhoto.message}</p>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Tên</label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <Input {...register("description")} />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
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
