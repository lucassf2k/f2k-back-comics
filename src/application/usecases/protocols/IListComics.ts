import { Comic } from '@/domain/Comic'

export interface IListComics {
  execute(): Promise<Comic[]>
}
