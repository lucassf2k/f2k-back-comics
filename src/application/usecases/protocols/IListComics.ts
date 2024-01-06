import { Name } from '@/domain/Name'

export type ListComicsOutPut = {
  id: string
  name: string
  synopsis: string
  releaseDate: Date
  authorName: Name
  coverPath?: string
  chapters?: {
    number: string
    title: string
    releaseDate: Date
    path: string
  }[]
  genres?: {
    id: string
    name: string
  }[]
}

export interface IListComics {
  execute(): Promise<ListComicsOutPut[]>
}
