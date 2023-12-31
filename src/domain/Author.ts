import { Work } from '@/domain/Work'
import { Name } from '@/domain/Name'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

export type AuthorProps = {
  name: Name
  about: string
  dateOfBirth: Date
  works?: Work[]
}

export class Author {
  private readonly props: Required<AuthorProps>
  private readonly _id: string

  constructor(props: AuthorProps) {
    if (!this._id) this._id = IdGenerateService.ULID()
    this.props = {
      ...props,
      works: props.works || [],
    }
  }

  addWork(work: Work): void {
    this.props.works.push(work)
  }

  listWorks(): Work[] {
    return this.props.works
  }

  updateName(name: Name): void {
    if (name) this.props.name = name
  }

  updateAbout(about: string): void {
    if (about) this.props.about = about
  }

  updateDateOfBirth(dateOfBirth: Date): void {
    if (dateOfBirth) this.props.dateOfBirth = dateOfBirth
  }

  get name(): Name {
    return this.props.name
  }

  get about(): string {
    return this.props.about
  }

  get dateOfBirth(): Date {
    return this.props.dateOfBirth
  }

  get works(): Work[] {
    return this.props.works
  }

  get id(): string {
    return this._id
  }
}
