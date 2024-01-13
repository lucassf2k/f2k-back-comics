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

  constructor(id: string, props: ChapterProps) {
    this._id = id
    this.props = {
      ...props,
      path: props.path || '',
    }
  }

  static create(props: ChapterProps): Chapter {
    const newId = IdGenerateService.ULID()
    return new Chapter(newId, props)
  }

  static restore(id: string, props: ChapterProps): Chapter {
    return new Chapter(id, props)
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
