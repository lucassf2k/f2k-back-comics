import { IListGenres, ListGenresOutPut } from '@/domain/usecases/IListGenres'
import { IGenresRepository } from '@/application/repositories/IGenresRepository'

export class ListGenres implements IListGenres {
  constructor(private readonly genresRepository: IGenresRepository) {}

  async execute(): Promise<ListGenresOutPut[]> {
    return this.genresRepository.list()
  }
}
