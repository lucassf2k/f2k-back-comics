import {
  GetComicOfIdInput,
  GetComicOfIdOutPut,
  IGetComicOfId,
} from '@/application/usecases/protocols/IGetComicOfId'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'

export class GetComicOfId implements IGetComicOfId {
  constructor(private readonly comicsRepository: IComicsRepository) {}

  async execute(input: GetComicOfIdInput): Promise<GetComicOfIdOutPut> {
    const output = await this.comicsRepository.getById(input.id)
    return {
      id: output.id,
      name: output.name,
      synopsis: output.synopsis,
      releaseDate: output.releaseDate,
      cover: output.coverPath,
      path: output.path,
      chapters: output.chapters.map((chapter) => {
        return {
          id: chapter.id,
          number: chapter.number,
          title: chapter.title,
          releaseDate: chapter.releaseDate,
          path: chapter.path,
        }
      }),
    }
  }
}