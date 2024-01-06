/* eslint-disable no-useless-escape */
import { InvalidParameterError } from '@/domain/errors/InvalidParameterError'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

export type ChapterProps = {
  number: string
  title: string
  releaseDate: Date
  path?: string
}

export class Chapter {
  private readonly _id: string
  private readonly props: Required<ChapterProps>

  constructor(props: ChapterProps) {
    if (!this._id) this._id = IdGenerateService.ULID()
    this.props = {
      ...props,
      path: props.path || '',
    }
  }

  addChapterPath(name: string): void {
    if (!name) throw new InvalidParameterError('Name not be empty')
    this.props.path = name
  }

  updateTitle(value: string): void {
    if (value) this.props.title = value
  }

  get number(): string {
    return this.props.number
  }

  get title(): string {
    return this.props.title
  }

  get releaseDate(): Date {
    return this.props.releaseDate
  }

  get path(): string {
    return this.props.path
  }

  get id(): string {
    return this._id
  }
}
