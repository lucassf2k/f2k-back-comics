import { IGenresRepository } from '@/domain/genre/IGenresRepository'
import { CreateGenre } from '@/application/usecases/genre/CreateGenre'
import { CreateGenreController } from '@/infrastructure/express/controllers/genre/CreateGenreController'

export class CreateGenreControllerFactory {
  static make(genresRepository: IGenresRepository): CreateGenreController {
    const createGenre = new CreateGenre(genresRepository)
    return new CreateGenreController(createGenre)
  }
}
