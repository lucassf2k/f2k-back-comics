import { Category } from '@/domain/Category'
import {
  CreateCategoryInput,
  CreateCategoryOutPut,
  ICreateCategory,
} from '@/domain/usecases/category/ICreateCategory'
import { ICategoriesRepository } from '@/application/repositories/ICategoriesRepository'
import { AppEnvs } from '@/infrastructure/configurations/environments/AppEnvs'

export class CreateCategory implements ICreateCategory {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutPut> {
    const newCategory = Category.create(input.name)
    const response = await this.categoriesRepository.save(newCategory)
    const url = `${AppEnvs.APP_DNS}/${response.id}`
    return { url } as CreateCategoryOutPut
  }
}
