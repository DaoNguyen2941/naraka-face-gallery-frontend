export type PaginationMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type PaginationResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};
