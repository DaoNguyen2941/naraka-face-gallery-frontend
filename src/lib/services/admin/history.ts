import http from "@/lib/api/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/routers/apiRouter";
import { ParamGetHistory, defaultHistoryParams } from "@/types";
import { PaginationResponse } from "@/types";
import { History } from "@/types";

export const adminGetHistoryService = async (
  params: ParamGetHistory = {}
): Promise<PaginationResponse<History>> => {
  const merged = { ...defaultHistoryParams, ...params };

  const response: AxiosResponse<PaginationResponse<History>> = await http.get(
    apiRoutes.admin.history(),
    { params: merged }
  );
  return response.data;
};
