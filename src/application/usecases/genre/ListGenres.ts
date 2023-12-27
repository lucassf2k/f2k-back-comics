import {
  IListGenres,
  ListGenresOutPut,
} from '@/domain/usecases/genre/IListGenres'
import { IGenresRepository } from '@/domain/genre/IGenresRepository'

export class ListGenres implements IListGenres {
  constructor(private readonly GenresRepository: IGenresRepository) {}

  async execute(): Promise<ListGenresOutPut[]> {
    return this.GenresRepository.list()
  }
}
