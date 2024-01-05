import { GetComicOfId } from '@/application/usecases/GetComicOfId'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { GetComicOfIdController } from '@/infrastructure/express/controllers/GetComicOfIdController'

export class GetComicOfIdControllerFactory {
  static make(comicsRepository: IComicsRepository): GetComicOfIdController {
    const getComicOfId = new GetComicOfId(comicsRepository)
    return new GetComicOfIdController(getComicOfId)
  }
}
