"use client";

import { SiTiktok } from "react-icons/si";
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-between h-full">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white">NarakaQRFace</h2>
            <p className="text-sm text-gray-400 mt-1">
              Bộ sưu tập QR Face Code của{" "}
              <span className="text-red-400">Naraka: Bladepoint</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Fan-made project, unofficial from 24 Entertainment
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Liên hệ</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Email: support@narakamakeup.com</li>
              <li>Discord: discord.gg/naraka</li>
            </ul>
          </div>

          {/* Social + Donate */}
          <div className="flex space-x-3 justify-start md:justify-end">
            <a
              href="https://www.tiktok.com/@banhmychamsua29"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 w-12 flex items-center justify-center bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <SiTiktok size={28} />
            </a>

            {/* Donate Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="hover:opacity-80 transition">
                  <Image
                    src="/donate.jpg"
                    alt="Donate"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-md md:max-w-2xl bg-[url('/donate2.png')] bg-cover bg-center text-white">
                <DialogHeader>
                  <DialogTitle className="text-black">Donate!</DialogTitle>
                  <div className="text-black space-y-1">
                    <div className="font-semibold">
                      Nếu đạo hữu cảm thấy vui, muốn đóng góp chút bạc.
                    </div>
                    <div className="font-semibold">
                      Hãy sử dụng mã qr bên dưới.
                    </div>
                    <div className="font-semibold">
                      Mọi đóng góp sẽ giúp phát triển và duy trì tàng quán.
                    </div>
                  </div>
                </DialogHeader>

                <div className="flex flex-col items-start space-y-4 mt-4">
                  <Image
                    src="/vcb.jpg"
                    alt="QR Code for Donate"
                    width={160}
                    height={160}
                    className="object-contain border-4 border-white rounded-lg ml-3"
                  />
                  <b className="text-sm text-center">
                    <span className="text-green-500">Vietcombank:</span>
                    <span className="text-black"> 1019746033</span>
                  </b>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()} Naraka Qr Face. Fan Project. <br />
          <span className="text-[10px] sm:text-xs text-gray-600">
            Naraka: Bladepoint © 24 Entertainment. This is just a community project.
          </span>
        </div>
      </div>
    </footer>
  );
}
