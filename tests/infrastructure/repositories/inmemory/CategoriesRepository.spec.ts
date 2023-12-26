import { Category } from '@/domain/Category'
import { ICategoriesRepository } from '@/application/repositories/ICategoriesRepository'
import { CategoriesInMemoryRepository } from '@/infrastructure/repositories/inmemory/CategoriesInMemoryCategory'

let categoriesRepository: ICategoriesRepository

describe('CategoriesRepository Test', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesInMemoryRepository()
  })

  test('should be create a category', async () => {
    const newCategory = Category.create('Drama')
    const sut = await categoriesRepository.save(newCategory)
    expect(sut).toBe(newCategory)
  })

  test('should be return all categories', async () => {
    const newCategory = Category.create('Drama')
    const newCategory2 = Category.create('Fantasia')
    await categoriesRepository.save(newCategory)
    await categoriesRepository.save(newCategory2)
    const sut = await categoriesRepository.list()
    expect(sut.length).toBe(2)
  })
})
