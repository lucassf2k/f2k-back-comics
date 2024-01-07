import { AddChaptersToComic } from '@/application/usecases/AddChaptersToComic'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { IChaptersRepository } from '@/application/repositories/IChaptersRepository'
import { AddChaptersToComicController } from '@/infrastructure/express/controllers/AddChaptersToComicController'

export class AddChaptersToComicControllerFactory {
  static make(
    chaptersRepository: IChaptersRepository,
    comicsRepository: IComicsRepository,
  ): AddChaptersToComicController {
    const addChaptersToComic = new AddChaptersToComic(
      chaptersRepository,
      comicsRepository,
    )
    return new AddChaptersToComicController(addChaptersToComic)
  }
}
