// lib/api/axios/createServerHttp.ts
import axios, { AxiosInstance } from "axios"
import { cookies } from "next/headers"
import { apiRoutes } from "@/lib/routers/apiRouter"

export async function createServerHttp(): Promise<AxiosInstance> {
  const cookieStore = await Promise.resolve(cookies())
  const accessToken = cookieStore?.get("Authentication")?.value

  const instance = axios.create({
    baseURL: apiRoutes.host,
    timeout: 5000, 
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  })

  return instance
}
