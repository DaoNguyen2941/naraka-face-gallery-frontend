import http from "@/lib/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/constants/apiRouter";
import { PageTraffic, TrafficByDay } from "@/types";

export interface ParamsAnalyticTraffic {
    limit?: number;
    start?: string; // YYYY-MM-DD
    end?: string;   // YYYY-MM-DD
}

export interface ParamsPageTraffic {
    date: string;
}

export const GetAdminAnalyticTraffic = async ( params: ParamsAnalyticTraffic = {}) : Promise<TrafficByDay[]> => {
    const response: AxiosResponse = await http.get(apiRoutes.admin.analytics.dailyTrafficAnalysis(),{params})
    return response.data
}

export const GetAdminPageTraffic = async (params: ParamsPageTraffic): Promise<PageTraffic[]> => {
    const response: AxiosResponse = await http.get(apiRoutes.admin.analytics.pageTrafficAnalysis(), {params})
    return response.data
}