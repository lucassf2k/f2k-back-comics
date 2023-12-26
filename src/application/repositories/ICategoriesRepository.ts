import { Category } from '@/domain/Category'

export interface ICategoriesRepository {
  save(input: Category): Promise<Category>
  list(): Promise<Category[]>
}
