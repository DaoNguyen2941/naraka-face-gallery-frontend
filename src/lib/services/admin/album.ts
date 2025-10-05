import http from "@/lib/api/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/routers/apiRouter";

export interface formDataAlbum {
    name: string,
    description: string,
}

export const getAlbumsService = async () => {
    const response: AxiosResponse = await http.get(apiRoutes.admin.album())
    return response.data
}

export const createAlbumService = async (data: formDataAlbum, cover_photo: File) => {
    const formData = new FormData()
    formData.append("name", data.name!)
    formData.append("description", data.description || "")
    formData.append("cover_photo", cover_photo)
    const response: AxiosResponse = await http.post(apiRoutes.admin.album(), formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export const updateAlbumService = async (data: formDataAlbum, cover_photo: File | undefined, id: string) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    if (cover_photo) {
        formData.append("cover_photo", cover_photo)
    }
    const response: AxiosResponse = await http.put(apiRoutes.admin.album(id), formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export const deleteAlbumService = async (id: string) => {
    const response: AxiosResponse = await http.delete(apiRoutes.admin.album(id))
    return response.data
}