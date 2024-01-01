import { IChaptersRepository } from '@/application/repositories/IChaptersRepository'
import { Chapter } from '@/domain/Chapter'

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

  update(input: Chapter, id: string): Promise<Chapter> {
    return new Promise((resolve) => {
      const output = this.db.find((chapter) => chapter.id === id)
      output.updateTitle(input.title)
      resolve(output)
    })
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.db.forEach((chapter, index) => {
        if (chapter.id === id) this.db.splice(index, 1)
      })
      resolve()
    })
  }

  list(): Promise<Chapter[]> {
    return new Promise((resolve) => resolve(this.db))
  }

  getByTitle(title: string): Promise<Chapter> {
    return new Promise((resolve) => {
      const output = this.db.find((chapter) => chapter.title === title)
      resolve(output)
    })
  }
}
