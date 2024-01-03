import { Genre } from '@/domain/Genre'
import { UploadingServiceInput } from '@/infrastructure/services/UploadingService'
import { Author } from '@/domain/Author'

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
