import { ListCategories } from '@/application/usecases/category/ListCategories'
import { CreateCategory } from '@/application/usecases/category/CreateCategory'
import { ICategoriesRepository } from '@/application/repositories/ICategoriesRepository'
import { CategoriesInMemoryRepository } from '@/infrastructure/repositories/inmemory/CategoriesInMemoryCategory'

let categoriesRepository: ICategoriesRepository

describe('ListCategories Test', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesInMemoryRepository()
  })

  test('should be return all categories', async () => {
    const createCategory = new CreateCategory(categoriesRepository)
    await createCategory.execute({ name: 'Fantasia' })
    await createCategory.execute({ name: 'Ação' })
    const sut = new ListCategories(categoriesRepository)
    const categories = await sut.execute()
    console.log(categories)
    expect(categories.length).toBe(2)
  })
})
