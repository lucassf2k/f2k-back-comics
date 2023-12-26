import { Category } from '@/domain/Category'
import { ICategoriesRepository } from '@/application/repositories/ICategoriesRepository'

export class CategoriesInMemoryRepository implements ICategoriesRepository {
  #db: Category[]

  constructor() {
    this.#db = []
  }

  async save(input: Category): Promise<Category> {
    return new Promise((resolve) => {
      this.#db.push(input)
      resolve(input)
    })
  }

  async list(): Promise<Category[]> {
    return new Promise((resolve) => {
      resolve(this.#db)
    })
  }
}
