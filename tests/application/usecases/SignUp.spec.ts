import { ApiError } from '@/domain/errors/ApiError'
import { SignUp } from '@/application/usecases/SignUp'
import { SignUpInput } from '@/application/usecases/protocols/ISignUp'
import { IUsersRepository } from '@/application/repositories/IUsersRepository'
import { UsersInMemoryRepository } from '@/infrastructure/repositories/inmemory/UsersInMemoryRepository'

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
})
