import { GetComicOfName } from '@/application/usecases/GetComicOfName'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { GetComicOfNameController } from '@/infrastructure/express/controllers/GetComicOfNameController'

export class GetComicOfNameControllerFactory {
  static make(comicsRepository: IComicsRepository): GetComicOfNameController {
    const getComicOfName = new GetComicOfName(comicsRepository)
    return new GetComicOfNameController(getComicOfName)
  }
}
