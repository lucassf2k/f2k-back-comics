import { createHash } from 'node:crypto'
import { IPassword } from '@/domain/password/IPassword'

export class SHA1Password implements IPassword {
  algorithm: string

  private constructor(
    readonly value: string,
    readonly salt: string,
  ) {
    this.algorithm = 'sha1'
  }

  static create(password: string): SHA1Password {
    const value = createHash('sha1').update(password).digest('hex')
    return new SHA1Password(value, '')
  }

  static restore(password: string, salt: string): SHA1Password {
    return new SHA1Password(password, salt)
  }

  validate(password: string): boolean {
    const value = createHash('sha1').update(password).digest('hex')
    return this.value === value
  }
}
