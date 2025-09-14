import http from "@/lib/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/api/apiRouter";

export interface InputTrackPage {
    path: string,
    visitorId: string,
    sessionId: string,
    newVisitor: boolean
}

export const trackPageService = async (data: InputTrackPage) => {
    const response: AxiosResponse = await http.post(apiRoutes.public.trackPage(), data);
    return response.data;
}


export const trackFaceViewService = async (slug: string) => {
    const response: AxiosResponse = await http.post(apiRoutes.public.trackFace(slug));
    return response.data;
}