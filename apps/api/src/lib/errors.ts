import { ERROR_CODE, type ErrorCode } from '@throne/shared'

export class AppError extends Error {
  constructor(
    readonly code: ErrorCode,
    readonly status: number,
    message: string,
    override readonly cause?: unknown,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const notFound = (message = 'Not found') => new AppError(ERROR_CODE.NOT_FOUND, 404, message)
export const unauthorized = (message = 'Missing or invalid credentials') =>
  new AppError(ERROR_CODE.UNAUTHORIZED, 401, message)
export const validation = (message: string) => new AppError(ERROR_CODE.VALIDATION, 400, message)
export const conflict = (code: ErrorCode, message: string) => new AppError(code, 409, message)
