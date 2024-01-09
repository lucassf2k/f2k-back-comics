import { ApiError } from '@/domain/errors/ApiError'
import { SignUp } from '@/application/usecases/SignUp'
import { SignUpInput } from '@/application/usecases/protocols/ISignUp'
import { IUsersRepository } from '@/application/repositories/IUsersRepository'
import { UsersInMemoryRepository } from '@/infrastructure/repositories/inmemory/UsersInMemoryRepository'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

let usersRepository: IUsersRepository
let signUpInput: SignUpInput

describe('SignUp Test', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()
    signUpInput = {
      username: 'test123',
      email: 'test@mail.com',
      password: '123456',
    }
  })

  test('should signup with username, email, password', async () => {
    const sut = new SignUp(usersRepository)
    const { location } = await sut.execute(signUpInput)
    expect(location).toBeTruthy()
  })

  test('should throw an api error if the email is already in use', async () => {
    const signUpInput2: SignUpInput = {
      username: 'test123',
      email: 'test@mail.com',
      password: '123456',
    }
    const sut = new SignUp(usersRepository)
    await sut.execute(signUpInput)
    expect(() => sut.execute(signUpInput2)).rejects.toThrow(
      new ApiError('Email already in use'),
    )
  })

  test('should throw an api error if the username is already in use', async () => {
    const signUpInput2: SignUpInput = {
      username: 'test123',
      email: 'tes2t@mail.com',
      password: '123456',
    }
    const sut = new SignUp(usersRepository)
    await sut.execute(signUpInput)
    expect(() => sut.execute(signUpInput2)).rejects.toThrow(
      new ApiError('Username already in use'),
    )
  })

  test('should throw an api error if the username is empty', async () => {
    const signUpInput2: SignUpInput = {
      username: '',
      email: 'tes2t@mail.com',
      password: '123456',
    }
    const sut = new SignUp(usersRepository)
    await sut.execute(signUpInput)
    expect(() => sut.execute(signUpInput2)).rejects.toThrow(
      new InvalidParameterError('Username is required'),
    )
  })

  test('should throw an api error if the email is empty', async () => {
    const signUpInput2: SignUpInput = {
      username: 'test123',
      email: '',
      password: '123456',
    }
    const sut = new SignUp(usersRepository)
    await sut.execute(signUpInput)
    expect(() => sut.execute(signUpInput2)).rejects.toThrow(
      new InvalidParameterError('E-mail is required'),
    )
  })

  test('should throw an api error if the password is empty', async () => {
    const signUpInput2: SignUpInput = {
      username: 'test123',
      email: 'test@mail.com',
      password: '',
    }
    const sut = new SignUp(usersRepository)
    await sut.execute(signUpInput)
    expect(() => sut.execute(signUpInput2)).rejects.toThrow(
      new InvalidParameterError('Password is required'),
    )
  })
})
