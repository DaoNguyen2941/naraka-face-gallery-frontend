import http from "@/lib/api/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/routers/apiRouter";
import { PublicTag } from "@/types";

export const getTagService = async (): Promise<PublicTag[]> => {
    const response: AxiosResponse = await http.get(apiRoutes.public.tag());
    return response.data;
}