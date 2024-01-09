import { User } from '@/domain/User'
import { IUsersRepository } from '@/application/repositories/IUsersRepository'

export class UsersInMemoryRepository implements IUsersRepository {
  private readonly db: User[]

  constructor() {
    this.db = []
  }

  async save(input: User): Promise<User> {
    return new Promise((resolve) => {
      this.db.push(input)
      resolve(input)
    })
  }

  async update(input: User, id: string): Promise<User> {
    return new Promise((resolve) => {
      this.db.forEach((user) => {
        if (user.id === id) {
          user.updateUsername(input.username)
          user.updateEmail(input.email)
          user.updatePassword(input.password)
          user.updatePrivilege(input.privilege)
        }
      })
      resolve(input)
    })
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.db.forEach((user, index) => {
        if (user.id === id) this.db.splice(index, 1)
      })
      resolve()
    })
  }

  async list(): Promise<User[]> {
    return new Promise((resolve) => resolve(this.db))
  }

  async getOfId(id: string): Promise<User> {
    return new Promise((resolve) => {
      const user = this.db.find((user) => user.id === id)
      resolve(user)
    })
  }

  async getOfUsername(input: string): Promise<User> {
    return new Promise((resolve) => {
      const user = this.db.find((user) => user.username === input)
      resolve(user)
    })
  }

  async getOfEmail(input: string): Promise<User> {
    return new Promise((resolve) => {
      const user = this.db.find((user) => user.email.value === input)
      resolve(user)
    })
  }
}
