import { SHA1Password } from '@/domain/password/SHA1Password'
import { PBKDF2Password } from '@/domain/password/PBKDF2Password'

export type PasswordFactoryOutPut = typeof PBKDF2Password | typeof SHA1Password

export class PasswordFactory {
  static create(algorithm: string): PasswordFactoryOutPut {
    if (algorithm === 'pbkdf2') return PBKDF2Password
    if (algorithm === 'sha1') return SHA1Password
    throw new Error(
      `algorithm used in the password is not implemented: ${algorithm}`,
    )
  }
}
