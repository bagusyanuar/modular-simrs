import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios"
import { HttpError, NetworkError, TimeoutError } from "../error"

export interface ApiClientConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
}

export function createApiClient(config: ApiClientConfig): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? 30_000,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  })

  // Request interceptor — inject token
  instance.interceptors.request.use(
    (req: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("token")
      if (token && req.headers) {
        req.headers.Authorization = `Bearer ${token}`
      }
      return req
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor — normalize error
  instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    (error) => {
      if (axios.isCancel(error)) {
        return Promise.reject(new TimeoutError())
      }

      if (!error.response) {
        return Promise.reject(new NetworkError())
      }

      const { status, data } = error.response
      return Promise.reject(
        new HttpError(
          status,
          data?.message ?? error.message,
          data?.code ?? "HTTP_ERROR",
          data
        )
      )
    }
  )

  return instance
}

export type { AxiosInstance, AxiosRequestConfig }