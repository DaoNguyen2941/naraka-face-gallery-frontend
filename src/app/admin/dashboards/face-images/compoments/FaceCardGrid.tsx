'use client'
import FaceCard from "./FaceCard";
import { Face } from "@/types/face/face.type";

interface FaceCardGridProps {
  data: Face[]
  onEdit: (face: Face) => void
  onDelete: (id: string) => void
}

export default function FaceCardGrid({
  data,
  onEdit,
  onDelete
}: FaceCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((face) => (
        <FaceCard
          key={face.id}
          face={face}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
