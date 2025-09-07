"use client";

import Image from "next/image";
import { PublicFace } from "@/types/face/publicFace.type";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'

interface FaceCardProps {
    face: PublicFace;
}

export default function FaceCardImage({ face }: FaceCardProps) {
    const router = useRouter()

    const handleClick = (slug: string) => {
        router.push(`/home/faces/${slug}`)
    }
    return (
        <motion.div
            className="relative rounded-xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={()=> {handleClick(face.slug)}}
        >
            {/* Hình ảnh */}
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <Image
                    src={face.imageReviews}
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
            </div>

            {/* Nội dung */}
            <div className="relative p-4 space-y-2 overflow-hidden">
                <Image
                    src="/naraka-bladepoint.webp"
                    alt="Background"
                    fill
                    className="absolute inset-0 object-cover"
                />
                <div className="space-y-1 relative z-10 text-amber-100">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-amber-100 group-hover:text-blue-300">Tên:</h3>
                        <h3 className="text-lg font-semibold text-amber-100 truncate
                         group-hover:text-blue-300 
                         transition-colors duration-200">
                            {face.title}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-amber-100 group-hover:text-blue-300">Nhân vật:</span>
                        <p className="text-sm font-medium text-amber-100 truncate group-hover:text-blue-300">
                            {face.character}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}