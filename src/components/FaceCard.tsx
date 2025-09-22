"use client";

import Image from "next/image";
import { PublicFace } from "@/types/face/publicFace.type";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'
import { buildFaceDetailUrl } from "@/lib/constants/routes";

interface FaceCardProps {
    face: PublicFace;
}

export default function FaceCardImage({ face }: FaceCardProps) {
    const router = useRouter()

    const handleClick = (slug: string) => {
    router.push(buildFaceDetailUrl(slug))

    }
    return (
        <motion.div
            className="relative rounded-xl border bg-white shadow-sm hover:shadow-xl 
             transition-all duration-300 overflow-hidden group cursor-pointer
             flex flex-col"
            onClick={() => { handleClick(face.slug) }}
        >
            {/* Hình ảnh */}
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <Image
                    src={face.imageReviews}
                    alt={face.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Nội dung */}
            <div className="relative flex-[1] p-2 bg-black/80 text-amber-100 text-sm">
                <div className="relative z-10 space-y-1">
                    <div className="flex items-center gap-1">
                        <span className="font-medium">Tên:</span>
                        <span className="truncate">{face.title}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-medium">Nhân vật:</span>
                        <span className="truncate">{face.character}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}