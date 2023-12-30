import { Name } from '@/domain/Name'
import { Author } from '@/domain/Author'

export interface IAuthorsRepository {
  save(author: Author): Promise<Author>
  update(updatedAuthor: Author): Promise<Author>
  list(): Promise<Author[]>
  delete(id: string): Promise<void>
  getById(id: string): Promise<Author>
  getByName(name: Name): Promise<Author>
}
