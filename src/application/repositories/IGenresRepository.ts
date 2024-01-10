import { Genre } from '@/domain/Genre'

export interface IGenresRepository {
  save(input: Genre): Promise<Genre>
  list(): Promise<Genre[]>
  getOfId(id: string): Promise<Genre | undefined>
  getOfName(name: string): Promise<Genre | undefined>
}
