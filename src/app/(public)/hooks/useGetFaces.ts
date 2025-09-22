import { useInfiniteQuery } from "@tanstack/react-query";
import { getFaceService } from "@/lib/services/public/face.service";
import { PaginationResponse } from "@/types";
import { PublicFace } from "@/types";
import { FaceSortOption } from "@/lib/services/interface/face";

export interface UseFacesOptions {
  tags?: string[] | undefined;
  sort?: FaceSortOption;
  take?: number;
  search?: string
  character?: string
}

export const useFaces = ({ tags =undefined, sort = undefined, take = 30, search, character }: UseFacesOptions) => {
  const queryKey = ["Qr-face", { tags, sort, search, take, character }];

  return useInfiniteQuery<PaginationResponse<PublicFace>, Error>({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      getFaceService({ page: pageParam as number, tagSlugs: tags, take, sort, search, characterSlug: character }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    initialPageParam: 1,
  });
};

