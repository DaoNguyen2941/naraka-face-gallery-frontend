"use client";

import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, KeyRound } from "lucide-react";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

// Validation schema
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

export default function ChangePasswordPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1000)); // fake API
      toast.success("Đổi mật khẩu thành công 🎉");
      form.reset();
    } catch (err: any) {
      toast.error(err?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar giả lập */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Button variant="ghost" className="justify-start">Dashboard</Button>
          <Button variant="ghost" className="justify-start">Người dùng</Button>
          <Button variant="ghost" className="justify-start">Cài đặt</Button>
          <Button variant="ghost" className="justify-start" disabled>Đổi mật khẩu</Button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Đổi mật khẩu</h1>
        </header>

        {/* Form card */}
        <Card className="max-w-md shadow-lg border border-gray-200 rounded-xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <KeyRound className="w-5 h-5 text-primary" />
              Thay đổi mật khẩu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Old Password */}
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu cũ</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu cũ"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* New Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Nhập mật khẩu mới" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Xác nhận mật khẩu mới" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full py-3 text-lg" disabled={loading}>
                  {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
