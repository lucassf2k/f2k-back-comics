import { Email } from '@/domain/Email'
import { User, UserProps } from '@/domain/User'
import { Privileges } from '@/domain/enums/Privileges'
import { SHA1Password } from '@/domain/password/SHA1Password'
import { PBKDF2Password } from '@/domain/password/PBKDF2Password'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

let userProps: UserProps

describe('User Test', () => {
  beforeEach(() => {
    userProps = {
      username: 'user test',
      email: new Email('test@mail.com'),
      password: PBKDF2Password.create('123456'),
      privilege: Privileges.READER,
    }
  })

  test('should create a reader user with PBKDF2', () => {
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

  test('should update from reader to admin', () => {
    const sut = User.create(userProps)
    sut.updatePrivilege(Privileges.ADMIN)
    expect(sut.id).toBeTruthy()
    expect(sut.username).toStrictEqual('user test')
    expect(sut.email.value).toStrictEqual('test@mail.com')
    const isPasswordValid = sut.password.validate('123456')
    expect(isPasswordValid).toBeTruthy()
    expect(sut.privilege).toStrictEqual('ADMIN')
  })

  test('should update email and password', () => {
    const sut = User.create({
      username: '',
      email: new Email('test@mail.com'),
      password: PBKDF2Password.create('123456'),
      privilege: Privileges.READER,
    })
    sut.updateEmail(new Email('tes@mail.com'))
    sut.updatePassword(SHA1Password.create('12345'))
    expect(sut.id).toBeTruthy()
    expect(sut.username).toStrictEqual('user test')
    expect(sut.email.value).toStrictEqual('tes@mail.com')
    const isPasswordValid = sut.password.validate('12345')
    expect(isPasswordValid).toBeTruthy()
    expect(sut.privilege).toStrictEqual('READER')
  })
})
