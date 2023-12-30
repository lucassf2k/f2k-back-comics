import { IdGenerateService } from '@/infrastructure/services/IdGenerateService'
import {
  File,
  UploadingFileComicsService,
} from '@/infrastructure/services/UploadingFileComicsService'

export class Chapter {
  private readonly _id: string

  constructor(
    public number: string,
    public title: string,
    public releaseDate: Date,
    public coverURL?: string,
    public contentURL?: string,
  ) {
    if (!this._id) this._id = IdGenerateService.ULID()
  }

  async addContentURL(file: File): Promise<string> {
    return (this.contentURL = await UploadingFileComicsService.execute(file))
  }

  get id(): string {
    return this._id
  }
}
