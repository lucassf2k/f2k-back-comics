import { Name } from '@/domain/Name'

export type AddAuthorToComicInput = {
  idComic: string
  author: {
    name: Name
    about: string
    dateOfBirth: Date
    works?: {
      title: string
      releaseDate: Date
    }[]
  }
}

export type AddAuthorToComicOutPut = void

export interface IAddAuthorToComic {
  execute(input: AddAuthorToComicInput): Promise<AddAuthorToComicOutPut>
}
