export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500
  ) {
    super(message)
    this.name = "AppError"
  }
}

export class DomainError extends AppError {
  constructor(message: string, code: string) {
    super(message, code, 422)
    this.name = "DomainError"
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} tidak ditemukan`, "NOT_FOUND", 404)
    this.name = "NotFoundError"
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public readonly fields?: Record<string, string>
  ) {
    super(message, "VALIDATION_ERROR", 400)
    this.name = "ValidationError"
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Tidak memiliki akses") {
    super(message, "UNAUTHORIZED", 401)
    this.name = "UnauthorizedError"
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Akses ditolak") {
    super(message, "FORBIDDEN", 403)
    this.name = "ForbiddenError"
  }
}