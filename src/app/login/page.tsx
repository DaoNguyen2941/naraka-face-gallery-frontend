"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query";
import { adminLoginService, AdminLoginData } from "@/lib/services/admin/auth"
const schema = z.object({
  username: z.string().min(1, "Tên đăng nhập bắt buộc"),
  password: z.string().min(1, "Mật khẩu bắt buộc"),
})

type FormData = z.infer<typeof schema>

export default function AdminLogin() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AdminLoginData) => adminLoginService(data),
    onSuccess: () => {
      router.push("/admin/dashboards")
    },
    onError: (error: any) => {
      console.error("❌ Đăng nhập thất bại:", error);

      const message =
        error?.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại sau.";

      setError("root", {
        type: "manual",
        message,
      });
    }
  });

  const onSubmit: SubmitHandler<AdminLoginData> = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <img
        src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_71fe1be9ac44a747aad1f94382c53f18a6183bb3.1920x1080.jpg"
        alt="Naraka background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative z-10 bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
        {errors.root && (
          <p className="text-red-500 text-sm mb-2">{errors.root.message}</p>
        )}
        <form onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(onSubmit)(event);
        }}
          autoComplete="off"
          className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên đăng nhập</label>
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
            )}
            <input
              type="text"
              {...register("username")}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition"
            disabled={isPending}
          >
            {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  )
}
