import http from "@/lib/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/constants/apiRouter";
import { ParamGetHistory, defaultHistoryParams} from "../interface";
import { PaginationResponse } from "@/types/page.type";
import { History } from "@/types/history";

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
