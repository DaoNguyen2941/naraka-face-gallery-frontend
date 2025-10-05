"use client";

import Image from "next/image";
import { Face } from "@/types";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"

interface FaceCardProps {
  face: Face;
  onEdit: (character: Face) => void,
  onDelete: (id: string) => void
}

export default function FaceCard({ face, onDelete, onEdit }: FaceCardProps) {
  return (
    <motion.div
      className="relative rounded-xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Hình ảnh */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={face.imageReviews[0].url}
          alt={face.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="p-2">
          <h3 className="font-medium text-sm truncate">{face.title}</h3>
        </div>
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <Button
            size="icon"
            variant="outline"
            className="text-xs"
          onClick={() => onEdit(face)}
          >
            ✏️
          </Button>
          <Button
            size="icon"
            variant="destructive"
            className="text-xs"
          onClick={() => onDelete(face.id)}
          >
            🗑️
          </Button>
        </div>
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
      </div>
    </motion.div>
  );
}