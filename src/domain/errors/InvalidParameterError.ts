import { ApiError } from '@/domain/errors/ApiError'

export class InvalidParameterError extends ApiError {
  constructor(message: string) {
    super()
    this.name = 'InvalidParameterError'
    this.message = message
  }
}
