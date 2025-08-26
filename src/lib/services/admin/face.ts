import http from "@/lib/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/api/apiRouter";
import { Face } from "@/types/face.type";

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

export const getFaceService = async (): Promise<Face[]> => {
  const response: AxiosResponse = await http.get(apiRoutes.admin.face())
  return response.data
}

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
  console.log(data);
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

  if (Array.isArray(data.tagIds)) {
    data.tagIds.forEach((tagId) => formData.append("tagIds", tagId))
  }


  if (files.qrCodeCN) {
    formData.append("qrCodeCN", files.qrCodeCN)
  }

  if (files.qrCodeGlobals) {
    formData.append("qrCodeGlobals", files.qrCodeGlobals)
  }

  const debugObj: Record<string, any[]> = {}

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