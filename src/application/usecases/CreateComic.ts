import { Comic } from '@/domain/Comic'
import { Chapter } from '@/domain/Chapter'
import {
  CreateComicInput,
  CreateComicOutPut,
  ICreateComic,
} from '@/application/usecases/protocols/ICreateComic'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { UploadingService } from '@/infrastructure/services/UploadingService'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { IChaptersRepository } from '@/application/repositories/IChaptersRepository'

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
    if (!input.author.name) {
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
    const [_, comicPath] = newComic.path.split('/')
    if (input.fileCover) {
      const coverName = UploadingService.createFilename(
        input.fileCover.originalname,
      )
      newComic.addComicCoverPath(
        UploadingService.joinPaths(comicPath, coverName),
      )
      const fullCoverPath = UploadingService.joinPaths(newComic.path, coverName)
      UploadingService.createFile(fullCoverPath, input.fileCover.buffer)
    }
    if (input.chapters) {
      input.chapters.forEach(async (chapter) => {
        const newChapter = Chapter.create({
          number: chapter.number,
          title: chapter.title,
          releaseDate,
        })
        if (chapter.file) {
          const chapterName = UploadingService.createFilename(
            chapter.file.originalname,
          )
          newChapter.addChapterPath(
            UploadingService.joinPaths(comicPath, chapterName),
          )
          const filePath = UploadingService.joinPaths(
            newComic.path,
            chapterName,
          )
          UploadingService.createFile(filePath, chapter.file.buffer)
        }
        newComic.addChapter(newChapter)
        await this.chaptersRepository.save(newChapter)
      })
    }
    await this.comicsRepository.save(newComic)
    const location = `comics/${newComic.id}`
    return { location }
  }
}
