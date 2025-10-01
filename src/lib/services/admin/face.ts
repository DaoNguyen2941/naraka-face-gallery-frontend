import http from "@/lib/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/constants/apiRouter";
import { Face } from "@/types/face/face.type";
import { PaginationResponse } from "@/types/page.type";
import { ParamGetFace, formDataQrFace, filesData, formDataQrFaceUpdate, defaultFaceParams } from "../interface/face";

export const adminGetFaceService = async (
  params: ParamGetFace = {}
): Promise<PaginationResponse<Face>> => {
  const merged = { ...defaultFaceParams, ...params };
  const { tagSlugs, ...rest } = merged;
  const finalParams: Record<string, unknown> = { ...rest };
  if (tagSlugs && tagSlugs.length > 0) {
    finalParams.tagSlugs = tagSlugs.join(','); // gửi dạng tagSlugs=slug1,slug2
  }
  const response: AxiosResponse = await http.get(apiRoutes.admin.face(), {
    params: finalParams,
  });
  return response.data;
};

export const createQrFaceService = async (
  data: formDataQrFace,
  files: filesData
) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("characterId", data.characterId);
  formData.append("description", data.description);
  formData.append("source", data.source)
  formData.append("tagIds", JSON.stringify(data.tagIds || []));
  files.imageReviews?.forEach((file) => {
    formData.append("imageReviews", file); // append từng file một
  });
  if (files.qrCodeCN) {
    formData.append("qrCodeCN", files.qrCodeCN);
  }
  if (files.qrCodeGlobals) {
    formData.append("qrCodeGlobals", files.qrCodeGlobals);
  }
  const response: AxiosResponse = await http.post(apiRoutes.admin.face(), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


export const updateQrFaceService = async (
  data: formDataQrFaceUpdate,
  files: filesData,
  id: string
) => {
  const formData = new FormData()
  const { characterId, title, tagIds, description, source } = data;

  // Add changed data fields
  if (title) {
    formData.append("title", title);
  }

  if (characterId) {
    formData.append("characterId", characterId);
  }

  if (description) {
    formData.append("description", description);
  }

  if (source) {
    formData.append("source", source)
  }

  // Add files if available
  if (files.imageReviews && files.imageReviews.length > 0) {
    files.imageReviews.forEach((file) => {
      formData.append("imageReviews", file)
    })
  }

  if (Array.isArray(tagIds)) {
    tagIds.forEach((tagId) => formData.append("tagIds", tagId))
  }


  if (files.qrCodeCN) {
    formData.append("qrCodeCN", files.qrCodeCN)
  }

  if (files.qrCodeGlobals) {
    formData.append("qrCodeGlobals", files.qrCodeGlobals)
  }

  const debugObj: Record<string, unknown[]> = {}

  for (const [key, value] of formData.entries()) {
    if (!debugObj[key]) {
      debugObj[key] = []
    }
    debugObj[key].push(value)
  }
  const response: AxiosResponse = await http.put(
    apiRoutes.admin.face(id),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return response.data
}

export const DeleteQrFaceService = async (id: string) => {
  const response: AxiosResponse = await http.delete(apiRoutes.admin.face(id))
  return response.data
}