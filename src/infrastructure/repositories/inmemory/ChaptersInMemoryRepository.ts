import { Chapter } from '@/domain/Chapter'
import { IChaptersRepository } from '@/application/repositories/IChaptersRepository'

export class ChaptersInMemoryRepository implements IChaptersRepository {
  private readonly db: Chapter[]

  constructor() {
    this.db = []
  }

  async save(input: Chapter): Promise<Chapter> {
    return new Promise((resolve) => {
      this.db.push(input)
      resolve(input)
    })
  }

  async update(input: Chapter, id: string): Promise<Chapter> {
    return new Promise((resolve) => {
      const output = this.db.find((chapter) => chapter.id === id)
      output.updateTitle(input.title)
      resolve(output)
    })
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.db.forEach((chapter, index) => {
        if (chapter.id === id) this.db.splice(index, 1)
      })
      resolve()
    })
  }

  async list(): Promise<Chapter[]> {
    return new Promise((resolve) => resolve(this.db))
  }

  async getByTitle(title: string): Promise<Chapter> {
    return new Promise((resolve) => {
      const output = this.db.find((chapter) => chapter.title === title)
      resolve(output)
    })
  }

  async getById(id: string): Promise<Chapter> {
    return new Promise((resolve) => {
      const output = this.db.find((chapter) => chapter.id === id)
      resolve(output)
    })
  }
}
