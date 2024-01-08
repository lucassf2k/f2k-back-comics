import {
  AddChaptersToComicInput,
  AddChaptersToComicOutPut,
  IAddChaptersToComic,
} from '@/application/usecases/protocols/IAddChaptersToComic'
import { IChaptersRepository } from '@/application/repositories/IChaptersRepository'
import { Chapter } from '@/domain/Chapter'
import { IComicsRepository } from '@/application/repositories/IComicsRepository'
import { UploadingService } from '@/infrastructure/services/UploadingService'

export class AddChaptersToComic implements IAddChaptersToComic {
  constructor(
    private readonly chaptersRepository: IChaptersRepository,
    private readonly comicsRepository: IComicsRepository,
  ) {}

  async execute(
    input: AddChaptersToComicInput,
  ): Promise<AddChaptersToComicOutPut> {
    const releaseDate = new Date()
    const comic = await this.comicsRepository.getOfId(input.idComic)
    const [, comicPath] = comic.path.split('/')
    const chapters = input.chapters.map((chapter) => {
      const chapterName = UploadingService.createFilename(
        chapter.file.originalname,
      )
      const chapterPath = UploadingService.joinPaths(comicPath, chapterName)
      UploadingService.createFile(chapterPath, chapter.file.buffer)
      const newChapter = new Chapter({
        number: chapter.number,
        title: chapter.title,
        releaseDate,
      })
      newChapter.addChapterPath(chapterPath)
      return newChapter
    })
    chapters.forEach(
      async (chapter) => await this.chaptersRepository.save(chapter),
    )
    const location = `comics/${comic.id}`
    return { location }
  }
}
