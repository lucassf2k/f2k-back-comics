import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

export class Email {
  readonly value: string

  constructor(email: string) {
    if (!email.match(/^(.+)@(.+)$/)) {
      throw new InvalidParameterError('Invalid email')
    }
    this.value = email
  }
}
