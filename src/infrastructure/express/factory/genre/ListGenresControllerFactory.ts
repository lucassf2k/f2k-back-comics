import { ListGenres } from '@/application/usecases/genre/ListGenres'
import { IGenresRepository } from '@/domain/genre/IGenresRepository'
import { ListGenresController } from '@/infrastructure/express/controllers/genre/ListGenresController'

export class ListGenresControllerFactory {
  static make(genresRepository: IGenresRepository): ListGenresController {
    const listGenres = new ListGenres(genresRepository)
    return new ListGenresController(listGenres)
  }
}
