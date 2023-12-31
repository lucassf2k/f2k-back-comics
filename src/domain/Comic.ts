import { Chapter } from '@/domain/Chapter'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'
import { InvalidParameterError } from './errors/InvalidParameterError'
import { UploadingService } from '@/infrastructure/services/UploadingService'
import { Name } from './Name'

type PathsType = {
  path: string
  compare: number
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
    if (!name) throw new InvalidParameterError('folder name field is mandatory')
    this.coverPath = name
  }

  sortChapterNumbersAscendingOrder(): PathsType[] {
    const paths = this.cocatenateFolderWithChapterName()
    return paths.sort(this.compareChaptersByNumber)
  }

  private cocatenateFolderWithChapterName(): PathsType[] {
    if (!this.path) throw new InvalidParameterError('Path of comic is required')
    return this.chapters.map((chapter) => {
      return {
        path: `${UploadingService.joinPaths(this.path, chapter.path)}`,
        compare: Number(chapter.number),
      }
    })
  }

  private compareChaptersByNumber(a: PathsType, b: PathsType): number {
    return a.compare - b.compare
  }

  get id(): string {
    return this._id
  }
}
