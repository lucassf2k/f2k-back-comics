import { Name } from '@/domain/Name'
import { Author } from '@/domain/Author'
import { IRepository } from '@/application/repositories/IRepository'

export interface IAuthorsRepository extends IRepository<Author, string> {
  getOfName(name: Name): Promise<Author>
}
