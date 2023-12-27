import { HttpStatusCodes } from '@/application/enums/HttpStatusCodes'

export class ApiError extends Error {
  code: number = HttpStatusCodes.BAD_REQUEST
  name = 'ApiError'
  message: string
}
