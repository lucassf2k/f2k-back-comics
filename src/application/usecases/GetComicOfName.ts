import {
  GetComicsOfNameInput,
  GetComicsOfNameOutPut,
  IGetComicsOfName,
} from '@/application/usecases/protocols/IGetComicsOfName'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

export class GetComicOfName implements IGetComicsOfName {
  constructor(private readonly comicsRepository: IComicsRepository) {}

  async execute(input: GetComicsOfNameInput): Promise<GetComicsOfNameOutPut> {
    if (!input.name) throw new InvalidParameterError('Field name is required')
    const output = await this.comicsRepository.searchByName(input.name)
    return output.map((item) => {
      return {
        id: item.id,
        name: item.name,
        synopsis: item.synopsis,
        releaseDate: item.releaseDate,
        coverPath: item.coverPath,
      }
    }) as GetComicsOfNameOutPut
  }
}
