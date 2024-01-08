import { Name } from '@/domain/Name'
import { Author } from '@/domain/Author'
import { IAuthorsRepository } from '@/application/repositories/IAuthorsRepository'

export class AuthorsInMemoryRepository implements IAuthorsRepository {
  private readonly db: Author[]

  constructor() {
    this.db = []
  }

  async save(author: Author): Promise<Author> {
    return new Promise((resolve) => {
      this.db.push(author)
      resolve(author)
    })
  }

  async update(updatedAuthor: Author, id: string): Promise<Author> {
    const haveAuthor = this.db.find((item) => item.id === id)
    haveAuthor.updateName(updatedAuthor.name)
    haveAuthor.updateAbout(updatedAuthor.about)
    haveAuthor.updateDateOfBirth(updatedAuthor.dateOfBirth)
    return new Promise((resolve) => {
      resolve(haveAuthor)
    })
  }

  async list(): Promise<Author[]> {
    return new Promise((resolve) => resolve(this.db))
  }

  async delete(id: string): Promise<void> {
    this.db.forEach((item, index) => {
      if (item.id === id) this.db.splice(index, 1)
    })
    return new Promise((resolve) => resolve())
  }

  async getOfId(id: string): Promise<Author> {
    const author = this.db.find((item) => item.id === id)
    return new Promise((resolve) => resolve(author))
  }

  async getOfName(name: Name): Promise<Author> {
    const author = this.db.find((item) => item.name === name)
    return new Promise((resolve) => resolve(author))
  }
}
