import { Comic } from '@/domain/Comic'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'

export class ComicsInMemoryRepository implements IComicsRepository {
  private readonly db: Comic[]

  constructor() {
    this.db = []
  }

  async save(input: Comic): Promise<Comic> {
    return new Promise((resolve) => {
      this.db.push(input)
      resolve(input)
    })
  }

  async update(input: Comic, id: string): Promise<Comic> {
    return new Promise((resolve) => {
      this.db.forEach((comic) => {
        if (comic.id === id) {
          comic.updateName(input.name)
          comic.updateSynopsis(input.synopsis)
          comic.updateAuthorName(input.authorName)
          comic.updateCoverPath(input.coverPath)
          comic.updatePath(input.path)
          for (const chapter of input.chapters) comic.addChapter(chapter)
        }
      })
      resolve(this.db.find((comic) => comic.id === id))
    })
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.db.forEach((comic, index) => {
        if (comic.id === id) this.db.splice(index, 1)
      })
      resolve()
    })
  }

  async list(): Promise<Comic[]> {
    return new Promise((resolve) => resolve(this.db))
  }

  async getById(id: string): Promise<Comic> {
    return new Promise((resolve) =>
      resolve(this.db.find((comic) => comic.id === id)),
    )
  }

  async searchByName(name: string): Promise<Comic[]> {
    const regexToSearch = new RegExp(`.*${name}.*`)
    return new Promise((resolve) => {
      const output = this.db.filter((comic) => regexToSearch.test(comic.name))
      resolve(output)
    })
  }
}
