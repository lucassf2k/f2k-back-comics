import { Work } from '@/domain/Work'
import { Name } from '@/domain/Name'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

export class Author {
  readonly id: string

  constructor(
    readonly name: Name,
    readonly about: string,
    readonly dateOfBirth: Date,
    readonly works: Work[] = [],
  ) {
    if (!this.id) this.id = IdGenerateService.ULID()
  }

  addWork(work: Work): void {
    this.works.push(work)
  }
}
