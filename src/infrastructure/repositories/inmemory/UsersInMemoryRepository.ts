import { User } from '@/domain/User'
import { IUsersRepository } from '@/application/repositories/IUsersRepository'

export class UsersInMemoryRepository implements IUsersRepository {
  private readonly db: User[]

  constructor() {
    this.db = []
  }

  save(input: User): Promise<User> {
    return new Promise((resolve) => {
      this.db.push(input)
      resolve(input)
    })
  }

  update(input: User, id: string): Promise<User> {
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

  delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.db.forEach((user, index) => {
        if (user.id === id) this.db.splice(index, 1)
      })
      resolve()
    })
  }

  list(): Promise<User[]> {
    return new Promise((resolve) => resolve(this.db))
  }

  getOfId(id: string): Promise<User> {
    return new Promise((resolve) => {
      const user = this.db.find((user) => user.id === id)
      resolve(user)
    })
  }

  getOfUsername(input: string): Promise<User> {
    return new Promise((resolve) => {
      const user = this.db.find((user) => user.username === input)
      resolve(user)
    })
  }
}
