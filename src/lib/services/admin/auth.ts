import http from "@/lib/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/constants/apiRouter";
export interface AdminLoginData {
  username: string;
  password: string;
}

export interface AdminChangePassword {
  password: string;
  newPassword: string;
}

export const adminLoginService = async (data: AdminLoginData) => {
  const response: AxiosResponse = await http.post(apiRoutes.admin.login(), data);
  return response.data;
};

export const adminLogoutService = async () => {
  const response: AxiosResponse = await http.post(apiRoutes.admin.logout());
  return response.data;
};

export const adminChangePasswordService = async (data: AdminChangePassword) => {
  const response: AxiosResponse = await http.post(apiRoutes.admin.changePassword(), data);
  return response.data;
};