import { UploadingServiceInput } from '@/infrastructure/services/UploadingService'

export type AddChaptersToComicInput = {
  idComic: string
  chapters: {
    number: string
    title: string
    file: UploadingServiceInput
  }[]
}

export type AddChaptersToComicOutPut = {
  location: string
}

export interface IAddChaptersToComic {
  execute(input: AddChaptersToComicInput): Promise<AddChaptersToComicOutPut>
}
