import { randomBytes, pbkdf2Sync } from 'node:crypto'
import { IPassword } from '@/domain/password/IPassword'

export class PBKDF2Password implements IPassword {
  algorithm: string

  private constructor(
    readonly value: string,
    readonly salt: string,
  ) {
    this.algorithm = 'pbkdf2'
  }

  static create(password: string): PBKDF2Password {
    const salt = randomBytes(20).toString('hex')
    const value = pbkdf2Sync(password, salt, 100, 64, 'sha512').toString('hex')
    return new PBKDF2Password(value, salt)
  }

  static restore(password: string, salt: string): PBKDF2Password {
    return new PBKDF2Password(password, salt)
  }

  validate(password: string): boolean {
    const passwordToValidate = pbkdf2Sync(
      password,
      this.salt,
      100,
      64,
      'sha512',
    ).toString('hex')
    return this.value === passwordToValidate
  }
}
