import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

const REGEX_TO_VALIDATE_NAME = /^[\p{L}]+$/u

export class Genre {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly createdAt: Date,
  ) {}

  static create(name: string): Genre {
    if (!this.validateName(name)) throw new InvalidParameterError(name)
    const newId = IdGenerateService.ULID()
    const newDate = new Date()
    return new Genre(newId, name, newDate)
  }

  static validateName(name: string): boolean {
    return REGEX_TO_VALIDATE_NAME.test(name)
  }
}
