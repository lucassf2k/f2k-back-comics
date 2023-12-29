import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

export class Chapter {
  readonly id: string

  constructor(
    readonly number: string,
    readonly title: string,
    readonly releaseDate: Date,
    public coverURL?: string,
    public contentURL?: string,
  ) {
    if (!this.id) this.id = IdGenerateService.ULID()
  }
}
