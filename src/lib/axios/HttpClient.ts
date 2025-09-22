import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios"
import { apiRoutes } from "../constants/apiRouter"

export class HttpClient {
  instance: AxiosInstance
  isRefreshing = false
  failedQueue: Array<{
    resolve: (value?: unknown) => void
    reject: (reason?: any) => void
  }> = []

  constructor() {
    this.instance = axios.create({
      baseURL: apiRoutes.host,
      withCredentials: true, // gửi cookie trong mọi request
      timeout: 10000,
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any

        // Nếu không phải lỗi 401 hoặc là login/refresh, thì bỏ qua
        if (
          !originalRequest ||
          error.response?.status !== 401 ||
          originalRequest._retry ||
          originalRequest.url.includes("/auth/login") ||
          originalRequest.url.includes("/auth/refresh")
        ) {
          return Promise.reject(error)
        }

        originalRequest._retry = true

        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject })
          })
            .then(() => this.instance(originalRequest))
            .catch((err) => Promise.reject(err))
        }

        this.isRefreshing = true

        try {
          await this.instance.get(apiRoutes.admin.refresh()) // server sẽ set lại cookie access token

          this.failedQueue.forEach(p => p.resolve())
          this.failedQueue = []

          return this.instance(originalRequest)
        } catch (refreshError) {
          this.failedQueue.forEach(p => p.reject(refreshError))
          this.failedQueue = []
          window.location.href = "/admin/login"
          
          return Promise.reject(refreshError)
        } finally {
          this.isRefreshing = false
        }
      }
    )
  }
}

const http = new HttpClient().instance
export default http
