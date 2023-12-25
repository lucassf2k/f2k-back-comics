import { IdGenerate } from '@/domain/IdGenerate'

const REGEX_TO_VALIDATE_NAME = /^[a-zA-Z]+$/

export class Category {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly createdAt: Date,
  ) {}

  static create(name: string): Category {
    if (!this.validateName(name)) throw new Error(`Invalid param: ${name}`)
    const newId = IdGenerate.uuid()
    const newDate = new Date()
    return new Category(newId, name, newDate)
  }

  static validateName(name: string): boolean {
    return REGEX_TO_VALIDATE_NAME.test(name)
  }
}
