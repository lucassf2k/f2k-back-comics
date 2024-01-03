import { Genre } from '@/domain/Genre'
import { Author } from '@/domain/Author'
import { UploadingServiceInput } from '@/infrastructure/services/UploadingService'

export type CreateComicInput = {
  name: string
  synopsis: string
  author: Author
  genres: Genre[]
  chapters?: {
    number: string
    title: string
    file?: UploadingServiceInput
  }[]
  fileCover?: UploadingServiceInput
}
export type CreateComicOutPut = {
  location: string
}
export interface ICreateComic {
  execute(input: CreateComicInput): Promise<CreateComicOutPut>
}
