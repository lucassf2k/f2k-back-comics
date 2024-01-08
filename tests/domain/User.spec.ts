import { Email } from '@/domain/Email'
import { User, UserProps } from '@/domain/User'
import { Privileges } from '@/domain/enums/Privileges'
import { PBKDF2Password } from '@/domain/password/PBKDF2Password'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

describe('User Test', () => {
  test('should create a reader user with PBKDF2', () => {
    const userProps: UserProps = {
      username: 'user test',
      email: new Email('test@mail.com'),
      password: PBKDF2Password.create('123456'),
      privilege: Privileges.READER,
    }
    const sut = User.create(userProps)
    expect(sut.id).toBeTruthy()
    expect(sut.username).toStrictEqual('user test')
    expect(sut.email.value).toStrictEqual('test@mail.com')
    const isPasswordValid = sut.password.validate('123456')
    expect(isPasswordValid).toBeTruthy()
    expect(sut.privilege).toStrictEqual('READER')
  })

  test('should restore a reader user', () => {
    const sut = User.restore(
      IdGenerateService.ULID(),
      'user test',
      new Email('test@mail.com'),
      PBKDF2Password.create('123456'),
      Privileges.READER,
    )
    expect(sut.id).toBeTruthy()
    expect(sut.username).toStrictEqual('user test')
    expect(sut.email.value).toStrictEqual('test@mail.com')
    const isPasswordValid = sut.password.validate('123456')
    expect(isPasswordValid).toBeTruthy()
    expect(sut.privilege).toStrictEqual('READER')
  })

  test('should not create a user with invalid email', () => {
    expect(() =>
      User.restore(
        IdGenerateService.ULID(),
        'user test',
        new Email('testmail.com'),
        PBKDF2Password.create('123456'),
        Privileges.READER,
      ),
    ).toThrow(new InvalidParameterError('Invalid email'))
  })
})
