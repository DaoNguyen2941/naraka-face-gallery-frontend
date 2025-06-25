'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const router = useRouter()

    const handleLogin = () => {
        if (password === "naraka123") {
            localStorage.setItem("isAdmin", "true");
            router.push("/admin/dashboards");
        } else {
            alert("Sai mật khẩu!");
        }
    };
    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            {/* Hình nền game Naraka (link ảnh có thể tùy chỉnh hoặc đổi sang ảnh bạn có) */}
            <img
                src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_71fe1be9ac44a747aad1f94382c53f18a6183bb3.1920x1080.jpg"
                alt="Naraka background"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
            />

            {/* Overlay làm mờ */}
            <div className="absolute inset-0 bg-black bg-opacity-60" />

            {/* Card login */}
            <div className="relative z-10 bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md w-full text-white">
                <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Mật khẩu</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu admin"
                    />
                </div>

                <button
                    className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition"
                    onClick={handleLogin}
                >
                    Đăng nhập
                </button>
            </div>
        </div>
    );
}
