export interface formDataQrFace {
  title: string,
  description: string,
  characterId: string,
  tagIds: string[],
  source: string
}

export type formDataQrFaceUpdate = Partial<formDataQrFace>


export interface filesData {
  imageReviews: File[];
  qrCodeCN?: File;
  qrCodeGlobals: File;
}

export enum FaceSort {
  NEW = "new",
  HOT = "hot",
}

export type FaceSortOption = FaceSort | undefined;


export interface ParamGetFace {
  page?: number;
  take?: number;
  order?: string;
  tagSlugs?: string[];
  sort?: FaceSort
  search?: string;
  characterSlug?: string
}

export const defaultFaceParams: ParamGetFace = {
  page: 1,
  take: 12,
  order: "DESC",
};