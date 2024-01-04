import { HttpStatusCodes } from '@/application/enums/HttpStatusCodes'
import { ApiError } from '@/domain/errors/ApiError'

export class NotFoundError extends ApiError {
  constructor() {
    super()
    this.name = 'NotFoundError'
    this.message = 'Not found'
    this.code = HttpStatusCodes.NOT_FOUND
  }
}
