import { Comic } from '@/domain/Comic'
import { IListComics } from '@/application/usecases/protocols/IListComics'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'

export class ListComics implements IListComics {
  constructor(private readonly comicsRepository: IComicsRepository) {}

  async execute(): Promise<Comic[]> {
    return this.comicsRepository.list()
  }
}
