import { HttpStatusCodes } from '@/application/enums/HttpStatusCodes'
import { ApiError } from '@/domain/errors/ApiError'

export class InvalidParameterError extends ApiError {
  constructor(param: string) {
    super()
    this.name = 'InvalidParameterError'
    this.message = param
  }
}
