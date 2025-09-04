import http from "@/lib/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/api/apiRouter";
import { Face } from "@/types/face/face.type";
import { PaginationResponse } from "@/types/page.type";
import { ParamGetFace, formDataQrFace, filesData, formDataQrFaceUpdate, defaultFaceParams } from "../interface/face";
import { PublicFace } from "@/types/face/publicFace.type";
import { PublicFaceDetails } from "@/types/face/publicFaceDetails.type";

export const getFaceDetailsService = async (slug: string): Promise<PublicFaceDetails> => {
  const response: AxiosResponse = await http.get(apiRoutes.public.face(slug));
  return response.data;
}

export const getFaceService = async (
  params: ParamGetFace = {}
): Promise<PaginationResponse<PublicFace>> => {
  const merged = { ...defaultFaceParams, ...params };
  const { tagSlugs, ...rest } = merged;

  const finalParams: Record<string, any> = { ...rest };
  if (tagSlugs && tagSlugs.length > 0) {
    finalParams.tagSlugs = tagSlugs.join(','); // gửi dạng tagSlugs=slug1,slug2
  }

  const response: AxiosResponse = await http.get(apiRoutes.public.face(), {
    params: finalParams,
  });

  return response.data;
};

