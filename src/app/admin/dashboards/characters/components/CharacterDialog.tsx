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
import { createCharacterService, updateCharacterService } from "@/lib/services/admin/characters"
import { Character } from "@/types"
import { Loader2 } from "lucide-react"
import { formDataCharacter } from "@/lib/services/admin/characters"
import { AxiosError } from "axios"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  character: Character | null
  onSave: (character: Character, isEdit: boolean) => void
}

const baseSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  description: z.string().optional(),
});

const createSchema = baseSchema.extend({
  avatarFile: z
    .instanceof(File, { message: "Ảnh đại diện là bắt buộc" }),
});

const editSchema = baseSchema.extend({
  avatarFile: z
    .instanceof(File)
    .or(z.null())
    .or(z.undefined()),
});

export default function CharacterDialog({
  open,
  onOpenChange,
  character,
  onSave,
}: Props) {
  const isEdit = !!character
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
      avatarFile: undefined,
    },
  })

  const avatarFile = watch("avatarFile")
  const previewUrl =
    avatarFile instanceof File
      ? URL.createObjectURL(avatarFile)
      : character?.avatar.url ?? ""

  // Cleanup preview URL to avoid memory leak
  useEffect(() => {
    if (avatarFile instanceof File) {
      const objectUrl = URL.createObjectURL(avatarFile)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [avatarFile])

  useEffect(() => {
    if (!open) return;

    if (character) {
      reset({
        name: character.name,
        description: character.description ?? "",
        avatarFile: undefined,
      });
    } else {
      reset({
        name: "",
        description: "",
        avatarFile: undefined,
      });
    }
  }, [character, open, reset]);


  const mutation = useMutation({
    mutationFn: async ({ data, file, }: {
      data: formDataCharacter
      file?: File
    }) => {
      return isEdit
        ? updateCharacterService(data, file, character.id)
        : createCharacterService(data, file!)
    },
    onSuccess: (newCharacter) => {
      toast.success(isEdit ? "Cập nhật nhân vật thành công" : "Tạo nhân vật thành công")
      onSave(newCharacter, isEdit)
    },
    onError: (e: AxiosError) => {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data?.message || "Có lỗi xảy ra")
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
    const file = data.avatarFile as File | undefined

    if (!file && !isEdit) {
      toast.error("Vui lòng chọn ảnh đại diện")
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
                alt="Avatar preview"
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
            onChange={(e) => setValue("avatarFile", e.target.files?.[0])}
            hidden
          />
          {errors.avatarFile && (
            <p className="text-red-500 text-sm">{errors.avatarFile.message}</p>
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
