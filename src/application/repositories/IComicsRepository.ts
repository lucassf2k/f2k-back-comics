import { Comic } from '@/domain/Comic'
import { IRepository } from '@/application/repositories/IRepository'

export interface IComicsRepository extends IRepository<Comic, string> {
  searchByName(name: string): Promise<Comic[]>
}
