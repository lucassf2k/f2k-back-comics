import { Comic } from '@/domain/Comic'
import { Chapter } from '@/domain/Chapter'
import {
  CreateComicInput,
  CreateComicOutPut,
  ICreateComic,
} from '@/application/usecases/protocols/ICreateComic'
import { UploadingService } from '@/infrastructure/services/UploadingService'
import { AppEnvs } from '@/infrastructure/configurations/environments/AppEnvs'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { IChaptersRepository } from '@/application/repositories/IChaptersRepository'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'

export class CreateComic implements ICreateComic {
  constructor(
    private readonly comicsRepository: IComicsRepository,
    private readonly chaptersRepository: IChaptersRepository,
  ) {}

  async execute(input: CreateComicInput): Promise<CreateComicOutPut> {
    if (!input.name) throw new InvalidParameterError('Field name is required')
    if (!input.synopsis) {
      throw new InvalidParameterError('Field synopsis is required')
    }
    if (input.genres.length === 0) {
      throw new InvalidParameterError('Field genders is required')
    }
    if (!input.author) {
      throw new InvalidParameterError('Field authors is required')
    }
    const releaseDate = new Date()
    const newComic = new Comic({
      name: input.name,
      synopsis: input.synopsis,
      authorName: input.author.name,
      releaseDate,
    })
    input.genres.forEach((genre) => newComic.addGenre(genre))
    newComic.addComicPath(UploadingService.createDirectory())
    if (input.fileCover) {
      const coverName = UploadingService.createFilename(
        input.fileCover.originalname,
      )
      newComic.addComicCoverPath(
        UploadingService.joinPaths(newComic.path, coverName),
      )
      UploadingService.createFile(newComic.coverPath, input.fileCover.buffer)
    }
    if (input.chapters) {
      input.chapters.forEach(async (chapter) => {
        const newChapter = new Chapter({
          number: chapter.number,
          title: chapter.title,
          releaseDate,
        })
        if (chapter.file) {
          newChapter.addChapterPath(
            UploadingService.createFilename(chapter.file.originalname),
          )
          const filePath = UploadingService.joinPaths(
            newComic.path,
            newChapter.path,
          )
          UploadingService.createFile(filePath, chapter.file.buffer)
        }
        newComic.addChapter(newChapter)
        await this.chaptersRepository.save(newChapter)
      })
    }
    await this.comicsRepository.save(newComic)
    const location = `${AppEnvs.APP_DNS}/comics/${newComic.id}`
    return { location }
  }
}
