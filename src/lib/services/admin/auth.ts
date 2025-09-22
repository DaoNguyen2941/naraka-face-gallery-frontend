import http from "@/lib/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/constants/apiRouter";
export interface AdminLoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const adminLoginService = async (data: AdminLoginDto): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await http.post(apiRoutes.admin.login(), data);
  return response.data;
};
