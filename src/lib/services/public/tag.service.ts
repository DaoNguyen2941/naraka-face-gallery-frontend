import http from "@/lib/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/constants/apiRouter";
import { PublicTag } from "@/types";

export const getTagService = async (): Promise<PublicTag[]> => {
    const response: AxiosResponse = await http.get(apiRoutes.public.tag());
    return response.data;
}