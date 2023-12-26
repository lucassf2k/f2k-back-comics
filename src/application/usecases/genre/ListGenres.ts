import {
  IListGenres,
  ListGenresOutPut,
} from '@/application/usecases/protocols/genre/IListGenres'
import { IGenresRepository } from '@/application/repositories/IGenresRepository'

export class ListGenres implements IListGenres {
  constructor(private readonly GenresRepository: IGenresRepository) {}

  async execute(): Promise<ListGenresOutPut[]> {
    return this.GenresRepository.list()
  }
}
