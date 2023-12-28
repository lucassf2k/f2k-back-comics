import { Genre } from '@/domain/Genre'
import { IGenresRepository } from '@/application/repositories/IGenresRepository'

export class GenresInMemoryRepository implements IGenresRepository {
  #db: Genre[]

  constructor() {
    this.#db = []
  }

  async save(input: Genre): Promise<Genre> {
    return new Promise((resolve) => {
      this.#db.push(input)
      resolve(input)
    })
  }

  async list(): Promise<Genre[]> {
    return new Promise((resolve) => {
      resolve(this.#db)
    })
  }
}
