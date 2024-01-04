import { Name } from '@/domain/Name'

export type UpdateComicOfIdInput = {
  id: string
  data: {
    name?: string
    synopsis?: string
    fileCover?: string
    author?: {
      id: string
      name?: Name
      releaseDate?: Date
    }
    genres: {
      id: string
      name: string
    }[]
  }
}
export interface IUpdateComicOfId {
  execute(input: UpdateComicOfIdInput): Promise<void>
}
