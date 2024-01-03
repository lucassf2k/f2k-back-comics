import { CreateComic } from '@/application/usecases/CreateComic'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { IChaptersRepository } from '@/application/repositories/IChaptersRepository'
import { CreateComicController } from '@/infrastructure/express/controllers/CreateComicController'

export class CreateComicControllerFactory {
  static make(
    comicsRepository: IComicsRepository,
    chaptersRepository: IChaptersRepository,
  ): CreateComicController {
    const createComic = new CreateComic(comicsRepository, chaptersRepository)
    return new CreateComicController(createComic)
  }
}
