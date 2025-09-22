import http from "@/lib/axios/HttpClient";
import { AxiosResponse } from "axios";
import { apiRoutes } from "@/lib/constants/apiRouter";
import { PublicCharacter } from "@/types";

export const getCharacterService = async (): Promise<PublicCharacter[]> => {
  const response: AxiosResponse = await http.get(apiRoutes.public.character());
  return response.data;
}