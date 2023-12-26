import { Genre } from '@/domain/Genre'

export interface IGenresRepository {
  save(input: Genre): Promise<Genre>
  list(): Promise<Genre[]>
}
