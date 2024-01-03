import { Name } from '@/domain/Name'
import { Genre } from '@/domain/Genre'
import { Chapter } from '@/domain/Chapter'
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { UploadingService } from '@/infrastructure/services/UploadingService'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

type ChapterList = {
  path: string
  chapterNumber: number
}

export type ComicProps = {
  name: string
  synopsis: string
  releaseDate: Date
  authorName: Name
  chapters?: Chapter[]
  genres?: Genre[]
  path?: string
  coverPath?: string
}

export class Comic {
  private readonly _id: string
  private readonly props: Required<ComicProps>

  constructor(props: ComicProps) {
    if (!this._id) this._id = IdGenerateService.ULID()
    this.props = {
      ...props,
      chapters: props.chapters || [],
      genres: props.genres || [],
      path: props.path || '',
      coverPath: props.coverPath || '',
    }
  }

  addChapter(chapter: Chapter): void {
    this.props.chapters.push(chapter)
  }

  addComicPath(name: string): void {
    if (!name) throw new InvalidParameterError('folder name field is mandatory')
    this.props.path = name
  }

  addComicCoverPath(name: string): void {
    if (!name) throw new InvalidParameterError('Cover name field is required')
    this.props.coverPath = name
  }

  sortChapterNumbersAscendingOrder(): ChapterList[] {
    const paths = this.cocatenateFolderWithChapterName()
    return paths.sort(this.compareChaptersByNumber)
  }

  addGenre(genre: Genre): void {
    this.props.genres.push(genre)
  }

  listGenres(): Genre[] {
    return this.props.genres
  }

  updateName(value: string): void {
    if (value) this.props.name = value
  }

  updateSynopsis(value: string): void {
    if (value) this.props.synopsis = value
  }

  updateAuthorName(value: Name): void {
    if (value.value) this.props.authorName = value
  }

  updateCoverPath(path: string): void {
    if (path) this.addComicCoverPath(path)
  }

  updatePath(path: string): void {
    if (path) this.addComicPath(path)
  }

  private cocatenateFolderWithChapterName(): ChapterList[] {
    if (!this.props.path)
      throw new InvalidParameterError('comic directories were not created')
    return this.props.chapters.map((chapter) => {
      return {
        path: `${UploadingService.joinPaths(this.props.path, chapter.path)}`,
        chapterNumber: Number(chapter.number),
      }
    })
  }

  private compareChaptersByNumber(a: ChapterList, b: ChapterList): number {
    return a.chapterNumber - b.chapterNumber
  }

  get name(): string {
    return this.props.name
  }

  get synopsis(): string {
    return this.props.synopsis
  }

  get releaseDate(): Date {
    return this.props.releaseDate
  }

  get authorName(): Name {
    return this.props.authorName
  }

  get chapters(): Chapter[] {
    return this.props.chapters
  }

  get genres(): Genre[] {
    return this.props.genres
  }

  get path(): string {
    return this.props.path
  }

  get coverPath(): string {
    return this.props.coverPath
  }

  get id(): string {
    return this._id
  }
}
