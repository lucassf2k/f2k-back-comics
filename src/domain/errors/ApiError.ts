import { HttpStatusCodes } from '@/application/enums/HttpStatusCodes'

export class ApiError extends Error {
  public code: number

  constructor(message?: string, code = HttpStatusCodes.BAD_REQUEST) {
    super()
    this.name = 'ApiError'
    this.message = message
    this.code = code
  }
}
