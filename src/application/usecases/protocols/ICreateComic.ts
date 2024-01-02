import { Name } from '@/domain/Name'
import { Genre } from '@/domain/Genre'
import { UploadingServiceInput } from '@/infrastructure/services/UploadingService'

export type CreateComicInput = {
  name: string
  synopsis: string
  authorName: Name
  genres: Genre[]
  chapters?: {
    number: string
    title: string
    fileCover?: UploadingServiceInput
    file?: UploadingServiceInput
  }[]
  fileCover?: UploadingServiceInput
  file?: UploadingServiceInput
}
export type CreateComicOutPut = {
  location: string
}
export interface ICreateComic {
  execute(input: CreateComicInput): Promise<CreateComicOutPut>
}
