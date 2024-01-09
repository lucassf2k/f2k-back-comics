import { User } from '@/domain/User'
import { IRepository } from '@/application/repositories/IRepository'

export interface IUsersRepository extends IRepository<User, string> {
  getOfUsername(input: string): Promise<User>
  getOfEmail(input: string): Promise<User>
}
