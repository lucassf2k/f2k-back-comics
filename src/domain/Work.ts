import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

export type WorkProps = {
  title: string
  releaseDate: Date
  path: string
}

export class Work {
  private readonly _id: string
  private readonly props: Required<WorkProps>

  constructor(props: WorkProps) {
    if (!this._id) this._id = IdGenerateService.ULID()
    this.props = props
  }

  updateTitle(title: string): void {
    if (title) this.props.title = title
  }

  updatePath(path: string): void {
    if (path) this.props.path = path
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
