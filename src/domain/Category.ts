import { IdGenerate } from '@/domain/IdGenerate'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

const REGEX_TO_VALIDATE_NAME = /^[\p{L}]+$/u

export class Category {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly createdAt: Date,
  ) {}

  static create(name: string): Category {
    if (!this.validateName(name)) throw new InvalidParameterError(name)
    const newId = IdGenerate.ulid()
    const newDate = new Date()
    return new Category(newId, name, newDate)
  }

  static validateName(name: string): boolean {
    return REGEX_TO_VALIDATE_NAME.test(name)
  }
}
