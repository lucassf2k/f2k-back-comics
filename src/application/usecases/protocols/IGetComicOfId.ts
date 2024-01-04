export type GetComicOfIdInput = {
  id: string
}
export type GetComicOfIdOutPut = {
  id: string
  name: string
  synopsis: string
  releaseDate: Date
  chapters: {
    id: string
    number: string
    title: string
    releaseDate: Date
    path: string
  }[]
  cover: string
  path: string
}
export interface IGetComicOfId {
  execute(input: GetComicOfIdInput): Promise<GetComicOfIdOutPut>
}
