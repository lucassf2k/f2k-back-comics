import {
  IListCategories,
  ListCategoriesOutPut,
} from '@/domain/usecases/category/IListCategories'
import { ICategoriesRepository } from '@/application/repositories/ICategoriesRepository'

export class ListCategories implements IListCategories {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<ListCategoriesOutPut[]> {
    return this.categoriesRepository.list()
  }
}
