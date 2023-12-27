import {
  IListGenres,
  ListGenresOutPut,
} from '@/domain/usecases/genre/IListGenres'
import { IGenresRepository } from '@/domain/genre/IGenresRepository'

export class ListGenres implements IListGenres {
  constructor(private readonly genresRepository: IGenresRepository) {}

  async execute(): Promise<ListGenresOutPut[]> {
    return this.genresRepository.list()
  }
}
