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
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { createTagService, updateTagService } from "@/lib/services/admin/tag"
import { Tag } from "@/types/tag.type"
import { Loader2 } from "lucide-react"
import { formDataTag } from "@/lib/services/admin/tag"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  tag: Tag | null
  onSave: (character: Tag, isEdit: boolean) => void
}

const createSchema = z.object({
  name: z.string().min(1, "Tên thẻ không được để trống"),
  description: z.string().optional(),
});

const editSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});


export default function TagDialog({
  open,
  onOpenChange,
  tag,
  onSave,
}: Props) {
  const isEdit = !!tag
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
    },
  })

  // Cleanup preview URL to avoid memory leak

  useEffect(() => {
    if (!open) return;

    if (tag) {
      reset({
        name: tag.name,
        description: tag.description ?? "",
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [tag, open, reset]);


  const mutation = useMutation({
    mutationFn: async ({ data }: {data: formDataTag}) => {
      return isEdit
        ? updateTagService(data, tag.id)
        : createTagService(data)
    },
    onSuccess: (newTag) => {
      toast.success(isEdit ? "Cập nhật thẻ thành công" : "Tạo thẻ mới thành công")
      onSave(newTag, isEdit)
    },
    onError: () => {
      toast.error(isEdit ? "Lỗi khi cập nhật thẻ" : "Lỗi khi tạo thẻ")
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
    const newTag: formDataTag = {
      name: data.name,
      description: data.description ?? "",
    }
    mutation.mutate({ data: newTag })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Chỉnh sửa nhân vật" : "Thêm nhân vật"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
