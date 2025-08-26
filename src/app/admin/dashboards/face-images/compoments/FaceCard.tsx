"use client";

import Image from "next/image";
import { Face } from "@/types/face.type";
import { motion } from "framer-motion";

interface FaceCardProps {
  face: Face;
}

export default function FaceCard({ face }: FaceCardProps) {
  return (
    <motion.div
      className="relative rounded-xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Hình ảnh */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={face.qrCodeGlobals.url}
          alt={face.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Nội dung */}
      <div className="p-4 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Title:</span>
            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
              {face.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Nhân vật phù hợp:</span>
            <p className="text-sm font-medium text-gray-600 truncate">{face.character.name}</p>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-center gap-4 mt-4">
          <motion.button
            className="text-blue-600 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-md transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sửa
          </motion.button>
          <motion.button
            className="text-red-500 text-sm font-medium hover:bg-red-50 px-3 py-1 rounded-md transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Xoá
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}