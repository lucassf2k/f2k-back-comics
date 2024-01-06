export type GetComicOfIdInput = {
  id: string
}
export type GetComicOfIdOutPut = {
  id: string
  name: string
  synopsis: string
  releaseDate: Date
  coverPath: string
  chapters?: {
    id: string
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
export interface IGetComicOfId {
  execute(input: GetComicOfIdInput): Promise<GetComicOfIdOutPut>
}
