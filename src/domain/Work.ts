import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

export class Work {
  readonly id: string

  constructor(
    readonly title: string,
    readonly releaseDate: Date,
    readonly idComic: string,
  ) {
    if (!this.id) this.id = IdGenerateService.ULID()
  }
}
