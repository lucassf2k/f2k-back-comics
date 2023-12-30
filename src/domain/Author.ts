import { Work } from '@/domain/Work'
import { Name } from '@/domain/Name'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

type AuthorProps = {
  id: string
  name: Name
  about: string
  dateOfBirth: Date
  works: Work[]
}

export class Author {
  private readonly props = {} as AuthorProps

  constructor(
    name: Name,
    about: string,
    dateOfBirth: Date,
    works: Work[] = [],
  ) {
    if (!this.props.id) this.props.id = IdGenerateService.ULID()
    this.props.name = name
    this.props.about = about
    this.props.dateOfBirth = dateOfBirth
    this.props.works = works
  }

  set name(value: Name) {
    this.props.name = value
  }

  get name(): Name {
    return this.props.name
  }

  set about(value: string) {
    this.props.about = value
  }

  get about(): string {
    return this.props.about
  }

  set dateOfBirth(value: Date) {
    this.props.dateOfBirth = value
  }

  get dateOfBirth(): Date {
    return this.props.dateOfBirth
  }

  set works(value: Work[]) {
    this.props.works = value
  }

  get works(): Work[] {
    return this.props.works
  }

  get id(): string {
    return this.props.id
  }
}
