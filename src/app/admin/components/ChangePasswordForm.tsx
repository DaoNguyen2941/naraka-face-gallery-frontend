"use client";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { ChangePasswordInput, adminChangePasswordService, AdminChangePasswordData } from "@/lib/services/admin/auth";
import { useMutation } from "@tanstack/react-query";
import { ControllerRenderProps } from "react-hook-form";

const schema = z
    .object({
        oldPassword: z.string().min(6, "Mật khẩu cũ tối thiểu 6 ký tự"),
        newPassword: z.string().min(6, "Mật khẩu mới tối thiểu 6 ký tự"),
        confirmPassword: z.string().min(6, "Xác nhận mật khẩu tối thiểu 6 ký tự"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Mật khẩu xác nhận không khớp",
    });

type FormValues = z.infer<typeof schema>;

function PasswordInput({
  label,
  placeholder,
  field,
}: {
  label: string;
  placeholder: string;
  field: ControllerRenderProps<FormValues, keyof FormValues>;
}) {
  const [show, setShow] = useState(false);
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type={show ? "text" : "password"}
            placeholder={placeholder}
            {...field}
          />
          <button
            type="button"
            onClick={() => setShow((p) => !p)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default function ChangePasswordForm({ onSuccess }: { onSuccess?: () => void }) {
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    });

    const { handleSubmit, setError, control, formState: { errors } } = form;

    const { mutate, isPending } = useMutation({
        mutationFn: (data: ChangePasswordInput) => {
            const dt: AdminChangePasswordData = {
                password: data.oldPassword,
                newPassword: data.confirmPassword
            }
            return adminChangePasswordService(dt)
        },
        onSuccess: () => {
            toast.success("Đổi mật khẩu thành công!");
            onSuccess?.();
            form.reset();
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const message =
                error?.response?.data?.message || "Đổi mật khẩu thất bại. Vui lòng thử lại sau.";
            setError("root", { type: "manual", message });
            toast.error(message);
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => mutate(data as ChangePasswordInput);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Root error */}
                {errors.root?.message && (
                    <p className="text-red-500 text-sm">{errors.root.message}</p>
                )}

                <FormField
                    control={control}
                    name="oldPassword"
                    render={({ field }) => (
                        <PasswordInput label="Mật khẩu cũ" placeholder="Nhập mật khẩu cũ" field={field} />
                    )}
                />

                <FormField
                    control={control}
                    name="newPassword"
                    render={({ field }) => (
                        <PasswordInput label="Mật khẩu mới" placeholder="Nhập mật khẩu mới" field={field} />
                    )}
                />

                <FormField
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <PasswordInput
                            label="Xác nhận mật khẩu mới"
                            placeholder="Xác nhận mật khẩu mới"
                            field={field}
                        />
                    )}
                />

                <Button type="submit" className="w-full py-3 text-lg" disabled={isPending}>
                    {isPending ? "Đang xử lý..." : "Đổi mật khẩu"}
                </Button>
            </form>
        </Form>
    );
}
