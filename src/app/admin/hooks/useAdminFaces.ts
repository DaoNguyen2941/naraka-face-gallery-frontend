// hooks/useAdminFaces.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { adminGetFaceService } from "@/lib/services/admin/face";
import { PaginationResponse, Face } from "@/types";

interface UseAdminFacesProps {
  page: number;
  pageSize: number;
  tagFilter?: string[];
}

export function useAdminFaces({ page, pageSize, tagFilter }: UseAdminFacesProps) {
  return useQuery<PaginationResponse<Face>>({
    queryKey: ["admin-Qr-face", page, pageSize, tagFilter],
    queryFn: () =>
      adminGetFaceService({
        page,
        take: pageSize,
        tagSlugs: tagFilter,
      }),
    placeholderData: keepPreviousData,// giữ data cũ khi đổi page
  });
}
