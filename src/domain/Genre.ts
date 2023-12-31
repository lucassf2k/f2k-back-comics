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
    if (!this.validateName(name))
      throw new InvalidParameterError(
        `The property name cannot contain special symbols or numbers`,
      )
    return new Genre(IdGenerateService.ULID(), name, new Date())
  }

  static restore(id: string, name: string, date: Date): Genre {
    return new Genre(id, name, date)
  }

  static validateName(name: string): boolean {
    return REGEX_TO_VALIDATE_NAME.test(name)
  }
}
