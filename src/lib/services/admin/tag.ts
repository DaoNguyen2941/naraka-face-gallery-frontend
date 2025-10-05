import http from "@/lib/api/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/routers/apiRouter";

export interface formDataTag {
    name?: string,
    description?: string,
}

export const adminGetTagsService = async () => {
    const response: AxiosResponse = await http.get(apiRoutes.admin.tag())
    return response.data
}

export const createTagService = async (data: formDataTag) => {
    const response: AxiosResponse = await http.post(apiRoutes.admin.tag(), data)
    return response.data
}

export const updateTagService = async (data: formDataTag, id: string) => {    
    const response: AxiosResponse = await http.put(apiRoutes.admin.tag(id), data)    
    return response.data
}

export const deleteTagService = async (id: string) => {
    const response: AxiosResponse = await http.delete(apiRoutes.admin.tag(id))
    return response.data
}