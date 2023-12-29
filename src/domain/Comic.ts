import { Chapter } from '@/domain/Chapter'
import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'

export class Comic {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly synopsis: string,
    readonly releaseDate: Date,
    readonly authorName: string,
    readonly chapters: Chapter[],
  ) {}

  static create(
    name: string,
    synopsis: string,
    releaseDate: Date,
    authorName: string,
    chapters: Chapter[],
  ): Comic {
    const newId = IdGenerateService.ULID()
    return new Comic(newId, name, synopsis, releaseDate, authorName, chapters)
  }
}
