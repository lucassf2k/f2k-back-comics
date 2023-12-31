import { Chapter } from '@/domain/Chapter'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'
import { InvalidParameterError } from './errors/InvalidParameterError'
import { UploadingService } from '@/infrastructure/services/UploadingService'
import { Name } from './Name'

type OutPutList = {
  path: string
  chapterNumber: number
}

export class Comic {
  private readonly _id: string

  constructor(
    public name: string,
    public synopsis: string,
    public releaseDate: Date,
    public authorName: Name,
    public path?: string,
    public coverPath?: string,
    readonly chapters: Chapter[] = [],
  ) {
    if (!this._id) this._id = IdGenerateService.ULID()
  }

  addChapter(chapter: Chapter): void {
    this.chapters.push(chapter)
  }

  addComicPath(name: string): void {
    if (!name) throw new InvalidParameterError('folder name field is mandatory')
    this.path = name
  }

  addComicCoverPath(name: string): void {
    if (!name) throw new InvalidParameterError('Cover name field is required')
    this.coverPath = name
  }

  sortChapterNumbersAscendingOrder(): OutPutList[] {
    const paths = this.cocatenateFolderWithChapterName()
    return paths.sort(this.compareChaptersByNumber)
  }

  private cocatenateFolderWithChapterName(): OutPutList[] {
    if (!this.path)
      throw new InvalidParameterError('comic directories were not created')
    return this.chapters.map((chapter) => {
      return {
        path: `${UploadingService.joinPaths(this.path, chapter.path)}`,
        chapterNumber: Number(chapter.number),
      }
    })
  }

  private compareChaptersByNumber(a: OutPutList, b: OutPutList): number {
    return a.chapterNumber - b.chapterNumber
  }

  get id(): string {
    return this._id
  }
}
