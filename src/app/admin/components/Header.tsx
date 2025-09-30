"use client";

import { useState, useRef, useEffect } from "react";
import { User, Lock, LogOut } from "lucide-react";
import { Transition } from "@headlessui/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ChangePasswordForm from "./ChangePasswordForm";
import ProfileForm from "./ProfileForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Header() {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Xử lý logout: xóa token, redirect về login
    localStorage.removeItem("token"); // ví dụ
    toast.success("Đăng xuất thành công 🎉");
    router.push("/login"); // chuyển về trang login
  };

  return (
    <header className="h-16 px-6 border-b border-zinc-800 bg-zinc-900 text-white flex items-center justify-between">
      <h1 className="text-lg font-semibold">Trang quản trị</h1>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 focus:outline-none"
        >
          <span className="text-sm text-zinc-400">admin@example.com</span>
          <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-white font-semibold">
            AD
          </div>
        </button>

        <Transition
          show={open}
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-150 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="absolute right-0 mt-2 w-56 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg overflow-hidden z-50">
            <button
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-zinc-700"
              onClick={() => {
                setOpen(false);
                setOpenProfile(true);
              }}
            >
              <User className="h-5 w-5" />
              Thông tin tài khoản
            </button>

            <button
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-zinc-700"
              onClick={() => {
                setOpen(false);
                setOpenChangePassword(true);
              }}
            >
              <Lock className="h-5 w-5" />
              Đổi mật khẩu
            </button>

            <button
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-zinc-700"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Đăng xuất
            </button>
          </div>
        </Transition>
      </div>

      {/* Modal Profile */}
      <Dialog open={openProfile} onOpenChange={setOpenProfile}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thông tin tài khoản</DialogTitle>
          </DialogHeader>
          <ProfileForm
            defaultValues={{
              fullName: "Nguyễn Văn A",
              email: "admin@example.com",
              phone: "0123456789",
              address: "Hà Nội, Việt Nam",
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Modal Change Password */}
      <Dialog open={openChangePassword} onOpenChange={setOpenChangePassword}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Đổi mật khẩu</DialogTitle>
          </DialogHeader>
          <ChangePasswordForm onSuccess={() => setOpenChangePassword(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
}
