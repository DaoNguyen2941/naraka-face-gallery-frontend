'use client'

import { getFaceService } from "@/lib/services/admin/face";
import FaceCard from "./FaceCard";
import { useQuery } from "@tanstack/react-query"
import { Face } from "@/types/face.type";
import QrFaceTable from "./QrFacetable";
export default function FaceCardGrid() {
    const {
        data: faces = [],
        isLoading,
        refetch,
    } = useQuery<Face[]>({
        queryKey: ["admin-face"],
        queryFn: getFaceService,
    });

    if (isLoading) return <div>Đang tải...</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {faces.map((face) => (
                <FaceCard key={face.id} face={face} />
            ))}
        </div>
    );
}
