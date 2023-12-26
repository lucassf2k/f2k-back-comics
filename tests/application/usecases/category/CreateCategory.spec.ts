import { CreateCategory } from '@/application/usecases/category/CreateCategory'
import { ICategoriesRepository } from '@/application/repositories/ICategoriesRepository'
import { CategoriesInMemoryRepository } from '@/infrastructure/repositories/inmemory/CategoriesInMemoryCategory'

let categoriesRepository: ICategoriesRepository

describe('CreateCategory Test', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesInMemoryRepository()
  })

  test('should be return a url', async () => {
    const sut = new CreateCategory(categoriesRepository)
    const categoryName = 'Ação'
    const output = await sut.execute({ name: categoryName })
    expect(output.url).toBeTruthy()
  })
})
