import { Email } from '@/domain/Email'
import { User, UserProps } from '@/domain/User'
import { IUsersRepository } from '@/application/repositories/IUsersRepository'
import { UsersInMemoryRepository } from '@/infrastructure/repositories/inmemory/UsersInMemoryRepository'
import { PBKDF2Password } from '@/domain/password/PBKDF2Password'
import { Privileges } from '@/domain/enums/Privileges'

let usersRepository: IUsersRepository
let userProps: UserProps

describe('UsersInMemoryRepository Test', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()
    userProps = {
      username: 'test123',
      email: new Email('test@mail.com'),
      password: PBKDF2Password.create('senhateste'),
      privilege: Privileges.READER,
    }
  })

  test('should store a user', async () => {
    const user = User.create(userProps)
    await usersRepository.save(user)
    const output = await usersRepository.list()
    expect(output.length).toBe(1)
  })

  test('should list all users', async () => {
    const user = User.create(userProps)
    await usersRepository.save(user)
    const user2 = User.create({
      username: 'test1',
      email: new Email('test1@mail.com'),
      password: PBKDF2Password.create('123456'),
      privilege: Privileges.READER,
    })
    await usersRepository.save(user2)
    const output = await usersRepository.list()
    expect(output.length).toBe(2)
  })

  test('should delete a user', async () => {
    const user = User.create(userProps)
    await usersRepository.save(user)
    const user2 = User.create({
      username: 'test1',
      email: new Email('test1@mail.com'),
      password: PBKDF2Password.create('123456'),
      privilege: Privileges.READER,
    })
    await usersRepository.save(user2)
    await usersRepository.delete(user.id)
    const output = await usersRepository.list()
    expect(output.length).toBe(1)
  })

  test('should get by username', async () => {
    const user = User.create(userProps)
    await usersRepository.save(user)
    const output = await usersRepository.getOfUsername(user.username)
    expect(output.id).toBe(user.id)
  })

  test('should update a Comic', async () => {
    const user = User.create(userProps)
    await usersRepository.save(user)
    const user2 = User.create({
      username: 'test1',
      email: new Email('test1@mail.com'),
      password: PBKDF2Password.create('123456'),
      privilege: Privileges.READER,
    })
    await usersRepository.update(user2, user.id)
    const output = await usersRepository.getOfId(user.id)
    expect(output.id).toStrictEqual(user.id)
    expect(output.username).toStrictEqual(user2.username)
    expect(output.email.value).toStrictEqual(user2.email.value)
    const isPasswordValid = output.password.validate('123456')
    expect(isPasswordValid).toBeTruthy()
  })
})
