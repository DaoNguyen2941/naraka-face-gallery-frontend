import http from "@/lib/api/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/routers/apiRouter";

export interface formDataCharacter {
    name: string,
    description: string,
}

export const adminGetCharactersService = async () => {
    const response: AxiosResponse = await http.get(apiRoutes.admin.characters())
    return response.data
}

export const createCharacterService = async (data: formDataCharacter, file: File) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description || "")
    formData.append("file", file)
    const response: AxiosResponse = await http.post(apiRoutes.admin.characters(), formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export const updateCharacterService = async (data: formDataCharacter, file: File | undefined, id: string) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    if (file) {
        formData.append("avatar", file)
    }
    const response: AxiosResponse = await http.put(apiRoutes.admin.characters(id), formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export const DeleteCharacterService = async (id: string) => {
    const response: AxiosResponse = await http.delete(apiRoutes.admin.characters(id))
    return response.data
}