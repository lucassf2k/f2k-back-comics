import {
  GetComicsOfNameInput,
  GetComicsOfNameOutPut,
  IGetComicsOfName,
} from '@/application/usecases/protocols/IGetComicsOfName'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'

export class GetComicOfName implements IGetComicsOfName {
  constructor(private readonly comicsRepository: IComicsRepository) {}

  async execute(input: GetComicsOfNameInput): Promise<GetComicsOfNameOutPut> {
    const output = await this.comicsRepository.getByName(input.name)
    return {
      id: output.id,
      name: output.name,
      synopsis: output.synopsis,
      releaseDate: output.releaseDate,
      cover: output.coverPath,
    }
  }
}
