import { Name } from '@/domain/Name'
import { Author } from '@/domain/Author'
import { IRepository } from './IRepository'

export interface IAuthorsRepository extends IRepository<Author, string> {
  getByName(name: Name): Promise<Author>
}
