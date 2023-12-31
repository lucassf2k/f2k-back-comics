import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

// eslint-disable-next-line no-useless-escape
const REGEX_TO_VALIDATE_CHAPTER_NAME = /^[^.\/][^\/]+(\.[^\/.]+)+$/

export class Chapter {
  private readonly _id: string

  constructor(
    public number: string,
    public title: string,
    public releaseDate: Date,
    public coverPath?: string,
    public path?: string,
  ) {
    if (!this._id) this._id = IdGenerateService.ULID()
  }

  addChapterPath(name: string): void {
    if (!this.validateChapterPath(name)) {
      throw new InvalidParameterError('Invalid file name')
    }
    this.path = name
  }

  addChapterCoverPath(name: string): void {
    if (!this.validateChapterPath(name)) {
      throw new InvalidParameterError('Invalid cover name')
    }
    this.coverPath = name
  }

  private validateChapterPath(input: string): boolean {
    return REGEX_TO_VALIDATE_CHAPTER_NAME.test(input)
  }

  get id(): string {
    return this._id
  }
}
