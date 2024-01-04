import {
  GetComicsOfNameInput,
  GetComicsOfNameOutPut,
  IGetComicsOfName,
} from '@/application/usecases/protocols/IGetComicsOfName'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { NotFoundError } from '@/domain/errors/NotFoundError'

export class GetComicOfName implements IGetComicsOfName {
  constructor(private readonly comicsRepository: IComicsRepository) {}

  async execute(input: GetComicsOfNameInput): Promise<GetComicsOfNameOutPut> {
    if (!input.name) throw new InvalidParameterError('Field name is required')
    const output = await this.comicsRepository.getByName(input.name)
    if (!output) throw new NotFoundError()
    return {
      id: output.id,
      name: output.name,
      synopsis: output.synopsis,
      releaseDate: output.releaseDate,
      cover: output.coverPath,
    }
  }
}
