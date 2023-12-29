import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

const REGEX_TO_VALIDATE_NAME = /[a-zA-Z] [a-zA-Z]+/

export class Name {
  constructor(readonly value: string) {
    if (this.isInvalidName(value))
      throw new InvalidParameterError(
        'The name of an author should follow the pattern of names separated by space.',
      )
  }

  private isInvalidName(value: string): boolean {
    return !value.match(REGEX_TO_VALIDATE_NAME)
  }
}
