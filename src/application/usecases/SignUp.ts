import { User } from '@/domain/User'
import { Email } from '@/domain/Email'
import {
  ISignUp,
  SignUpInput,
  SignUpOutPut,
} from '@/application/usecases/protocols/ISignUp'
import { ApiError } from '@/domain/errors/ApiError'
import { Privileges } from '@/domain/enums/Privileges'
import { PBKDF2Password } from '@/domain/password/PBKDF2Password'
import { IUsersRepository } from '@/application/repositories/IUsersRepository'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

export class SignUp implements ISignUp {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(input: SignUpInput): Promise<SignUpOutPut> {
    if (!input.username) throw new InvalidParameterError('Username is required')
    if (!input.email) throw new InvalidParameterError('E-mail is required')
    if (!input.password) throw new InvalidParameterError('Password is required')
    const emailAlreadyInUse = await this.usersRepository.getOfEmail(input.email)
    if (emailAlreadyInUse) throw new ApiError('Email already in use')
    const usernameAlreadyInUse = await this.usersRepository.getOfUsername(
      input.username,
    )
    if (usernameAlreadyInUse) throw new ApiError('Username already in use')
    const newUser = User.create({
      username: input.username,
      email: new Email(input.email),
      password: PBKDF2Password.create(input.password),
      privilege: Privileges.READER,
    })
    const output = await this.usersRepository.save(newUser)
    const location = `users/${output.id}`
    return { location }
  }
}
