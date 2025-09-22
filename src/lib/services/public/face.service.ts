import http from "@/lib/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/constants/apiRouter";
import { Face } from "@/types/face/face.type";
import { PaginationResponse } from "@/types/page.type";
import { ParamGetFace, formDataQrFace, filesData, formDataQrFaceUpdate, defaultFaceParams } from "../interface/face";
import { PublicFace } from "@/types/face/publicFace.type";
import { PublicFaceDetails } from "@/types/face/publicFaceDetails.type";

export async function downloadQrFileService(urlFile: string, slug: string) {
  const urlApi = apiRoutes.public.face(slug) + `/download`;

  const response: AxiosResponse<Blob> = await http.get(urlApi, {
    params: { urlFile },
    responseType: "blob", // 👈 bắt buộc để nhận về blob
  });

  const blob = response.data;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = slug;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


export const getFaceDetailsService = async (slug: string): Promise<PublicFaceDetails> => {
  const response: AxiosResponse = await http.get(apiRoutes.public.face(slug));
  return response.data;
}

export const getFaceService = async (
  params: ParamGetFace = {}
): Promise<PaginationResponse<PublicFace>> => {
  const merged = { ...defaultFaceParams, ...params };
  const { tagSlugs, sort,...rest } = merged;

  const finalParams: Record<string, any> = { ...rest };
  if (tagSlugs && tagSlugs.length > 0) {
    finalParams.tagSlugs = tagSlugs.join(','); // gửi dạng tagSlugs=slug1,slug2
  }

  if (sort) {
    finalParams.sort = sort
  }

  const response: AxiosResponse = await http.get(apiRoutes.public.face(), {
    params: finalParams,
  });

  return response.data;
};

