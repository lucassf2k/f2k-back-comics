import { Genre } from '@/domain/genre/Genre'

export interface IGenresRepository {
  save(input: Genre): Promise<Genre>
  list(): Promise<Genre[]>
}
