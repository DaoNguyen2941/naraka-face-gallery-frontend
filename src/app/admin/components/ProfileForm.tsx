"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import Image from "next/image";

const schema = z.object({
  fullName: z.string().min(2, "Tên tối thiểu 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ProfileForm({
  defaultValues,
}: {
  defaultValues?: FormValues;
  onSuccess?: () => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || { fullName: "", email: "", phone: "", address: "" },
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const onSubmit = async () => {
    toast.success("Cập nhật thông tin thành công 🎉");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <Image
              src={avatarPreview || "/default-avatar.png"}
              alt="Avatar"
              fill
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 text-sm hover:bg-primary/80"
              onClick={() => avatarRef.current?.click()}
            >
              Change
            </button>
            <input
              type="file"
              accept="image/*"
              ref={avatarRef}
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập họ tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email (readonly) */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Nhập số điện thoại" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input placeholder="Nhập địa chỉ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full py-3 text-lg">
          Cập nhật thông tin
        </Button>
      </form>
    </Form>
  );
}
