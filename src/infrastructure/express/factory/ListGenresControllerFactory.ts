import { ListGenres } from '@/application/usecases/ListGenres'
import { IGenresRepository } from '@/application/repositories/IGenresRepository'
import { ListGenresController } from '@/infrastructure/express/controllers/ListGenresController'

export class ListGenresControllerFactory {
  static make(genresRepository: IGenresRepository): ListGenresController {
    const listGenres = new ListGenres(genresRepository)
    return new ListGenresController(listGenres)
  }
}
