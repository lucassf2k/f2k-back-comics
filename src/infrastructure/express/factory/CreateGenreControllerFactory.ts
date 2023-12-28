import { CreateGenre } from '@/application/usecases/CreateGenre'
import { IGenresRepository } from '@/application/repositories/IGenresRepository'
import { CreateGenreController } from '@/infrastructure/express/controllers/CreateGenreController'

export class CreateGenreControllerFactory {
  static make(genresRepository: IGenresRepository): CreateGenreController {
    const createGenre = new CreateGenre(genresRepository)
    return new CreateGenreController(createGenre)
  }
}
