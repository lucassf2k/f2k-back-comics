import { ListComics } from '@/application/usecases/ListComics'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { ListComicsController } from '@/infrastructure/express/controllers/ListComicsController'

export class ListComicsControllerFactory {
  static make(comicsRepository: IComicsRepository): ListComicsController {
    const listComics = new ListComics(comicsRepository)
    return new ListComicsController(listComics)
  }
}
