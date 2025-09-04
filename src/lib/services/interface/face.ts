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

export interface ParamGetFace {
  page?: number;
  take?: number;
  order?: string;
  tagSlugs?: string[]
}

export const defaultFaceParams: Required<ParamGetFace> = {
  page: 1,
  take: 10,
  order: "DESC",
  tagSlugs: [],
};