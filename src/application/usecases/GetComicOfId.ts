import {
  GetComicOfIdInput,
  GetComicOfIdOutPut,
  IGetComicOfId,
} from '@/application/usecases/protocols/IGetComicOfId'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { NotFoundError } from '@/domain/errors/NotFoundError'

export class GetComicOfId implements IGetComicOfId {
  constructor(private readonly comicsRepository: IComicsRepository) {}

  async execute(input: GetComicOfIdInput): Promise<GetComicOfIdOutPut> {
    const output = await this.comicsRepository.getById(input.id)
    if (!output) throw new NotFoundError()
    return {
      id: output.id,
      name: output.name,
      synopsis: output.synopsis,
      releaseDate: output.releaseDate,
      coverPath: output.coverPath,
      chapters: output.chapters.map((chapter) => {
        return {
          id: chapter.id,
          number: chapter.number,
          title: chapter.title,
          releaseDate: chapter.releaseDate,
          path: chapter.path,
        }
      }),
      genres: output.genres.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
        }
      }),
    }
  }
}
