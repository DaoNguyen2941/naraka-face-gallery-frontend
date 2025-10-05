"use client";

import FaceGalleryPage from "@/components/FaceGalleryPage"
import { FaceSort } from "@/types"
import ClientTracker from "@/components/ClientTracker";

export default function HotPage() {
    ClientTracker()
    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">🔥 Xem nhiều nhất</h1>
            <FaceGalleryPage sort={FaceSort.HOT} />
        </div>
    )
}
