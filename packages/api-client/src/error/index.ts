import { AppError } from "@genmedical/core/error"

export class HttpError extends AppError {
  constructor(
    public readonly status: number,
    message: string,
    code: string,
    public readonly data?: unknown
  ) {
    super(message, code, status)
    this.name = "HttpError"
  }
}

export class NetworkError extends AppError {
  constructor(message = "Tidak dapat terhubung ke server") {
    super(message, "NETWORK_ERROR", 0)
    this.name = "NetworkError"
  }
}

export class TimeoutError extends AppError {
  constructor(message = "Request timeout") {
    super(message, "TIMEOUT_ERROR", 408)
    this.name = "TimeoutError"
  }
}